/* src/app/page.tsx */
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#0b0b0b] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md p-8">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-[#f2f6fb] to-[#e8f1ff] flex items-center justify-center text-[#0071e3] font-semibold">AP</div>
            <div>
              <h1 className="text-2xl font-semibold">Autopůjčovna — RentOkim</h1>
              <p className="text-sm text-slate-500">Rezervace vozidel — rychle a přehledně.</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">Ready</div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-[#f8fafc]">
            <h2 className="text-lg font-medium mb-2">Rezervace</h2>
            <p className="text-sm text-slate-600 mb-4">Začni tím, že vybereš datum a vůz. Testovací režim aktivní.</p>
            <a href="/reservation" className="inline-block px-4 py-2 rounded-lg bg-[#0071e3] text-white">Otevřít rezervaci</a>
          </div>

          <div className="p-6 rounded-lg bg-[#f8fafc]">
            <h2 className="text-lg font-medium mb-2">Informace</h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Testovací databáze: SQLite (dočasně)</li>
              <li>• SMTP: nakonfigurovat v env</li>
              <li>• Doporučeno: přejít na Neon/Postgres</li>
            </ul>
          </div>
        </section>

        <footer className="mt-6 text-sm text-slate-400">© {new Date().getFullYear()} RentOkim</footer>
      </div>
    </main>
  );
}
