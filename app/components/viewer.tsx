import { ChartNoAxesColumn } from "lucide-react";

export default async function ViewsLast24() {
  const response = await fetch("https://tanav.me/api/view-count");
  const data = await response.json();

  return (
    <div className="flex gap-1 items-center justify-center text-(--text-muted)">
      <ChartNoAxesColumn className="w-4 h-4" aria-hidden="true" />
      <span className="text-sm font-semibold">{(data.count / 1000).toFixed(1)}k</span>
    </div>
  );
}
