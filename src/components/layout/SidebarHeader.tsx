export default function SidebarHeader() {
  return (
    <header className="flex items-center gap-3 px-5 py-4 border-b border-border bg-white">
      <div className="w-9 h-9 rounded-full bg-brand-900 flex items-center justify-center">
        <span className="text-white text-xs font-bold">BS</span>
      </div>
      <h1 className="text-lg font-bold text-brand-900">Blank Street</h1>
    </header>
  );
}
