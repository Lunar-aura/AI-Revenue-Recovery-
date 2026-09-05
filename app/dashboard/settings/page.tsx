"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import {
  User,
  Store as StoreIcon,
  Bell,
  BrainCircuit,
  Palette,
  Shield,
  AlertTriangle,
  Loader2,
  Save,
  LogOut,
  Trash2,
  CheckCircle2,
  XCircle,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { getUserSettings, upsertUserSettings, updateProfile, updateStoreSettings, changePassword, deleteAccount, logout } from "@/app/actions";
import { createClient } from "@/lib/supabase";
import type { Store } from "@/lib/store-data";

type Tab = "profile" | "store" | "notifications" | "ai" | "appearance" | "security";

type NotificationsState = {
  newOrder: boolean;
  pendingOrder: boolean;
  atRiskCustomer: boolean;
  revenueAlert: boolean;
};

type AiAgentState = {
  enabled: boolean;
  responseStyle: "concise" | "balanced" | "detailed";
  recommendations: boolean;
  riskAnalysis: boolean;
};

type AppearanceState = "light" | "dark" | "system";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "store", label: "Store", icon: StoreIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai", label: "AI Agent", icon: BrainCircuit },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  const [userStores, setUserStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeActive, setStoreActive] = useState(true);

  const [notifications, setNotifications] = useState<NotificationsState>({
    newOrder: true,
    pendingOrder: true,
    atRiskCustomer: true,
    revenueAlert: true,
  });

  const [aiAgent, setAiAgent] = useState<AiAgentState>({
    enabled: true,
    responseStyle: "balanced",
    recommendations: true,
    riskAnalysis: true,
  });

  const [appearance, setAppearance] = useState<AppearanceState>("system");
  const [passwordForm, setPasswordForm] = useState({ current: "", newPassword: "", confirm: "" });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const supabase = createClient();

    async function load() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");
      setUserEmail(user.email ?? "");

      const { data: storesData } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", user.id);

      const mapped: Store[] = (storesData ?? []).map((row: Record<string, unknown>) => ({
        id: row.id as string,
        ownerId: row.owner_id as string,
        name: row.name as string,
        slug: row.slug as string,
        description: (row.description as string) || "",
        logo: (row.logo_url as string) || "",
        heroTitle: (row.hero_title as string) || "",
        heroDescription: (row.hero_description as string) || "",
        createdAt: (row.created_at as string)?.split("T")[0],
      }));

      setUserStores(mapped);
      if (mapped.length > 0 && !selectedStoreId) {
        setSelectedStoreId(mapped[0].id);
        setStoreName(mapped[0].name);
        setStoreDescription(mapped[0].description);
        setStoreActive(true);
      }

      const settingsResult = await getUserSettings();
      if (!cancelled && settingsResult.settings && !settingsResult.error) {
        const s = settingsResult.settings as Record<string, unknown>;
        const notificationsData = s.notifications as NotificationsState | null;
        const aiAgentData = s.ai_agent as AiAgentState | null;
        const appearanceData = s.appearance as AppearanceState | null;

        if (notificationsData) setNotifications(notificationsData);
        if (aiAgentData) setAiAgent(aiAgentData);
        if (appearanceData) setAppearance(appearanceData);
      }

      setProfileLoading(false);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (appearance === "dark") {
      html.classList.add("dark");
    } else if (appearance === "light") {
      html.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
    localStorage.setItem("settings-appearance", appearance);
  }, [appearance, mounted]);

  async function handleSaveProfile() {
    setSaving(true);
    setFeedback(null);
    const result = await updateProfile({ full_name: userName });
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Profile saved successfully." });
    }
  }

  async function handleSaveStore() {
    if (!selectedStoreId) return;
    setSaving(true);
    setFeedback(null);
    const result = await updateStoreSettings(selectedStoreId, {
      name: storeName,
      description: storeDescription,
      active: storeActive,
    });
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Store settings saved successfully." });
    }
  }

  async function handleSaveNotifications() {
    setSaving(true);
    setFeedback(null);
    const result = await upsertUserSettings({ notifications });
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Notification preferences saved." });
    }
  }

  async function handleSaveAiAgent() {
    setSaving(true);
    setFeedback(null);
    const result = await upsertUserSettings({ ai_agent: aiAgent });
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "AI Agent settings saved." });
    }
  }

  async function handleSaveAppearance() {
    setSaving(true);
    setFeedback(null);
    const result = await upsertUserSettings({ appearance });
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Appearance preference saved." });
    }
  }

  async function handleChangePassword() {
    setPasswordError(null);
    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setSaving(true);
    const result = await changePassword({
      currentPassword: passwordForm.current,
      newPassword: passwordForm.newPassword,
    });
    setSaving(false);
    if (result.error) {
      setPasswordError(result.error);
    } else {
      setPasswordForm({ current: "", newPassword: "", confirm: "" });
      setFeedback({ type: "success", message: "Password changed successfully." });
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "DELETE") {
      setFeedback({ type: "error", message: 'Please type "DELETE" to confirm.' });
      return;
    }
    setSaving(true);
    const result = await deleteAccount();
    setSaving(false);
    if (result.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      window.location.href = "/login";
    }
  }

  function renderTabContent() {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Personal"
              title="Profile"
              description="Manage your personal information and how it appears across the dashboard."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your full name"
              />
              <Input
                label="Email"
                value={userEmail}
                disabled
                className="bg-slate-100 text-slate-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveProfile} disabled={saving || profileLoading}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Profile
              </Button>
              {feedback && activeTab === "profile" && (
                <span className={`flex items-center gap-1 text-sm ${feedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
                  {feedback.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        );

      case "store":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Business"
              title="Store Settings"
              description="Update your store details and visibility."
            />
            {userStores.length === 0 ? (
              <p className="text-sm text-slate-500">No store found. Create a store first.</p>
            ) : (
              <>
                {userStores.length > 1 && (
                  <div>
                    <label htmlFor="store-select" className="block text-sm font-medium text-slate-700">Select Store</label>
                    <select
                      id="store-select"
                      value={selectedStoreId}
                      onChange={(e) => {
                        const store = userStores.find((s) => s.id === e.target.value);
                        if (store) {
                          setSelectedStoreId(store.id);
                          setStoreName(store.name);
                          setStoreDescription(store.description);
                          setStoreActive(true);
                        }
                      }}
                      className="mt-2 block w-full max-w-md rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
                    >
                      {userStores.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="My Store"
                  />
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <input
                      id="store-active"
                      type="checkbox"
                      checked={storeActive}
                      onChange={(e) => setStoreActive(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    <label htmlFor="store-active" className="text-sm font-medium text-slate-700">Store is active</label>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={handleSaveStore} disabled={saving || !selectedStoreId}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Store
                  </Button>
                  {feedback && activeTab === "store" && (
                    <span className={`flex items-center gap-1 text-sm ${feedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
                      {feedback.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {feedback.message}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Preferences"
              title="Notifications"
              description="Choose what notifications you receive."
            />
            <div className="space-y-4">
              {[
                { key: "newOrder", label: "New order notifications", description: "Get notified when a new order is placed." },
                { key: "pendingOrder", label: "Pending order alerts", description: "Get notified when an order is pending for more than 3 days." },
                { key: "atRiskCustomer", label: "At-risk customer alerts", description: "Get notified when a customer has failed or cancelled orders." },
                { key: "revenueAlert", label: "Revenue/recovery alerts", description: "Get notified about recoverable revenue opportunities." },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof NotificationsState]}
                      onChange={(e) => setNotifications((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 transition-colors" />
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveNotifications} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Notifications
              </Button>
              {feedback && activeTab === "notifications" && (
                <span className={`flex items-center gap-1 text-sm ${feedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
                  {feedback.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        );

      case "ai":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Intelligence"
              title="AI Agent"
              description="Control how the AI Revenue Agent behaves."
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Enable AI Agent</p>
                  <p className="text-xs text-slate-500">Allow the AI agent to analyze your data and respond.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={aiAgent.enabled}
                    onChange={(e) => setAiAgent((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 transition-colors" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </label>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-900">Response Style</p>
                <p className="text-xs text-slate-500 mb-3">Choose how detailed the AI responses should be.</p>
                <div className="flex flex-wrap gap-2">
                  {(["concise", "balanced", "detailed"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setAiAgent((prev) => ({ ...prev, responseStyle: style }))}
                      className={`rounded-[12px] border px-3 py-2 text-xs font-medium capitalize transition ${
                        aiAgent.responseStyle === style
                          ? "border-violet-600 bg-violet-50 text-violet-700"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Recommendations</p>
                  <p className="text-xs text-slate-500">Show AI-generated recovery recommendations.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={aiAgent.recommendations}
                    onChange={(e) => setAiAgent((prev) => ({ ...prev, recommendations: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 transition-colors" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Risk Analysis</p>
                  <p className="text-xs text-slate-500">Include at-risk customer and order analysis in responses.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={aiAgent.riskAnalysis}
                    onChange={(e) => setAiAgent((prev) => ({ ...prev, riskAnalysis: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 transition-colors" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveAiAgent} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save AI Settings
              </Button>
              {feedback && activeTab === "ai" && (
                <span className={`flex items-center gap-1 text-sm ${feedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
                  {feedback.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Display"
              title="Appearance"
              description="Choose how the dashboard looks."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((option) => {
                const Icon = option.icon;
                const selected = appearance === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setAppearance(option.value as AppearanceState)}
                    className={`flex flex-col items-center gap-2 rounded-[18px] border p-4 transition ${
                      selected ? "border-violet-600 bg-violet-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${selected ? "text-violet-600" : "text-slate-500"}`} />
                    <span className={`text-sm font-medium ${selected ? "text-violet-700" : "text-slate-700"}`}>{option.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveAppearance} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Appearance
              </Button>
              {feedback && activeTab === "appearance" && (
                <span className={`flex items-center gap-1 text-sm ${feedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
                  {feedback.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Protection"
              title="Security"
              description="Manage your password and account access."
            />
            <div className="space-y-4 rounded-[18px] border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-900">Change Password</p>
              <p className="text-xs text-slate-500">Enter your current password and choose a new one.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, current: e.target.value }))}
                  placeholder="••••••••"
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="••••••••"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirm: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              {passwordError && <p className="text-sm text-rose-600">{passwordError}</p>}
              <Button onClick={handleChangePassword} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Update Password
              </Button>
            </div>

            <div className="rounded-[18px] border border-rose-200 bg-rose-50 p-4">
              <p className="text-sm font-medium text-rose-900">Danger Zone</p>
              <p className="text-xs text-rose-700 mb-3">Irreversible actions. Proceed with caution.</p>
              <div className="flex flex-wrap gap-3">
                <form action={logout}>
                  <Button type="submit" variant="secondary">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </form>
                <button
                  onClick={() => setDeleteConfirm("DELETE")}
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-rose-300 bg-white px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  if (!mounted || loading) {
    return (
      <DashboardShell>
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-64 w-full animate-pulse rounded-[24px] bg-slate-200" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      user={{
        name: userName,
        email: userEmail,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Preferences</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Settings</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">Manage your profile, store, notifications, and account security.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-[24px] border border-slate-200 bg-white p-3">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setFeedback(null);
                    }}
                    className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-violet-600 text-white shadow-[0_10px_24px_-16px_rgba(124,92,252,0.75)]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
            {renderTabContent()}
          </section>
        </div>
      </div>

      {deleteConfirm === "DELETE" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirm("")} />
          <div className="relative z-10 w-full max-w-md rounded-[20px] border border-rose-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-950">Delete Account</h3>
            <p className="mt-2 text-sm text-slate-600">
              This action is permanent and cannot be undone. All your data, including stores, products, orders, and settings, will be permanently removed.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-900">
              Type <span className="font-semibold text-rose-700">DELETE</span> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder='Type "DELETE"'
              className="mt-2 block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-100"
            />
            <div className="mt-4 flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setDeleteConfirm("")}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteAccount}
                disabled={saving || deleteConfirm !== "DELETE"}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Permanently Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
