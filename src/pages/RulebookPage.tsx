import SectionList from "../components/SectionList";

export default function RulebookPage() {
  return (
    <main className="py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Rulebook</h1>
        <p className="text-sm text-slate-800 dark:text-slate-300">
          Browse sections and open a rule to view details.
        </p>
      </header>

      <SectionList />
    </main>
  );
}
