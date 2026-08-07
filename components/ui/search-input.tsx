import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <label className="flex items-center gap-2 rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 shadow-sm">
      <Search className="h-4 w-4" />
      <input
        className="w-36 border-none bg-transparent outline-none placeholder:text-slate-400 sm:w-48"
        placeholder="Search"
      />
    </label>
  );
}
