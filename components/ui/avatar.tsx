type AvatarProps = {
  name: string;
  initials?: string;
  tone?: "violet" | "sky" | "slate";
};

export function Avatar({ name, initials, tone = "violet" }: AvatarProps) {
  const tones = {
    violet: "bg-violet-600 text-white",
    sky: "bg-sky-600 text-white",
    slate: "bg-slate-800 text-white",
  } as const;

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${tones[tone]}`}>
      {initials ?? name.slice(0, 2).toUpperCase()}
    </div>
  );
}
