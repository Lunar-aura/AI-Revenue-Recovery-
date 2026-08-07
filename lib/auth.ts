export type AuthState = {
  email: string;
  name: string;
  token: string;
};

const LS_KEY = "airev_auth_token";
const SS_KEY = "airev_auth_session";

export const DUMMY_EMAIL = "demo@airevenue.com";
export const DUMMY_PASSWORD = "12345678";

export const DEMO_ACCOUNT = {
  email: DUMMY_EMAIL,
  password: DUMMY_PASSWORD,
  name: "Alicia Lane",
};

export function setAuth(state: AuthState, remember: boolean) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(state);
  if (remember) {
    localStorage.setItem(LS_KEY, payload);
  } else {
    sessionStorage.setItem(SS_KEY, payload);
  }
}

export function getAuth(): AuthState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LS_KEY) ?? sessionStorage.getItem(SS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getAuth();
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
  sessionStorage.removeItem(SS_KEY);
}

export function validateCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DUMMY_EMAIL.toLowerCase() &&
    password === DUMMY_PASSWORD
  );
}

export function buildAuthState(email: string): AuthState {
  return {
    email,
    name: email === DUMMY_EMAIL ? DEMO_ACCOUNT.name : email.split("@")[0],
    token: `${email}:${Date.now()}`,
  };
}
