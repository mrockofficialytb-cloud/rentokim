"use client";

import React, { useState } from "react";

export default function LuxusniRezervacePage(){
  const [step, setStep] = useState(1);
  const [fromLocal, setFromLocal] = useState("");
  const [toLocal, setToLocal] = useState("");
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  // demo data (nahraď API voláním)
  const MODELS = [
    { id: 'm1', title: 'Nový Caravelle', subtitle: 'Luxusní shuttle', img: '/images/caravelle.jpg', count: 2 },
    { id: 'm2', title: 'Caravelle — Style', subtitle: 'Business class', img: '/images/caravelle-style.jpg', count: 1 },
    { id: 'm3', title: 'Crafter (střední)', subtitle: 'Užitkový komfort', img: '/images/crafter-mid.jpg', count: 1 },
    { id: 'm4', title: 'Multivan — Long', subtitle: 'Rodinný komfort', img: '/images/multivan.jpg', count: 1 },
  ];

  const UNITS = [
    { id: 'u1', plate: '2B1 1111', color: 'Bílá', mileage: 15000 },
    { id: 'u2', plate: '2B1 1112', color: 'Stříbrná', mileage: 20000 },
  ];

  const accent = 'text-[#0071e3]'; // apple-ish blue accent

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#0b0b0b] font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-3xl bg-white shadow-sm flex items-center justify-center">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#f2f6fb] to-[#e8f1ff] flex items-center justify-center text-[#0071e3] font-semibold">AP</div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Autopůjčovna — Rezervace</h1>
              <p className="text-sm text-slate-500">Elegantně. Rychle. Bez zbytečných kroků.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm text-slate-600">
              <button className="hover:text-black transition">Flotila</button>
              <button className="hover:text-black transition">Ceník</button>
              <button className="hover:text-black transition">Kontakt</button>
            </nav>
            <button className="px-4 py-2 rounded-lg bg-white shadow-sm border border-transparent text-sm hover:shadow-md">Přihlásit</button>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-8">
          <section className="col-span-12 lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-md border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Rezervace vozidla</h2>
                  <p className="text-sm text-slate-500">Krok {step} • 24h rolling — zadej přesné časy</p>
                </div>
                <div className="text-sm text-slate-400">Bezpečné platby • Pojištění</div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm text-slate-600">Od (datum a čas)</label>
                  <input type="datetime-local" value={fromLocal} onChange={(e)=>setFromLocal(e.target.value)} className="w-full rounded-lg border border-slate-200 p-3 bg-white" />

                  <label className="block text-sm text-slate-600">Do (datum a čas)</label>
                  <input type="datetime-local" value={toLocal} onChange={(e)=>setToLocal(e.target.value)} className="w-full rounded-lg border border-slate-200 p-3 bg-white" />

                  <div className="flex gap-3 mt-3">
                    <button onClick={()=>setStep(2)} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#0071e3] to-[#005bb5] text-white font-medium shadow">Zkontrolovat dostupnost</button>
                    <button onClick={()=>{setFromLocal(''); setToLocal('')}} className="px-4 py-3 rounded-lg border border-slate-200 text-sm">Vymazat</button>
                  </div>

                  <p className="text-xs text-slate-400">Tip: pro rychlý test použij krátké intervaly (např. zítra 09:00–12:00).</p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Vyber model dostupný v intervalu</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {MODELS.map(m=> (
                      <article key={m.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={()=>{ setSelectedModel(m); setStep(3); }}>
                        <div className="w-28 h-16 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                          <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{m.title}</div>
                              <div className="text-sm text-slate-500">{m.subtitle}</div>
                            </div>
                            <div className="text-sm text-slate-500">Kusy: <span className="font-medium text-slate-700">{m.count}</span></div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={()=>setStep(1)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">Zpět</button>
                  </div>
                </div>
              )}

              {step === 3 && selectedModel && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Vyber konkrétní vůz</h3>
                      <div className="text-sm text-slate-500">{selectedModel.title}</div>
                    </div>
                    <div className="text-sm text-slate-400">Období: {fromLocal} — {toLocal}</div>
                  </div>

                  <ul className="space-y-3">
                    {UNITS.map(u=> (
                      <li key={u.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                        <div>
                          <div className="font-medium">SPZ: {u.plate} • {u.color}</div>
                          <div className="text-sm text-slate-500">KM: {u.mileage}</div>
                        </div>
                        <button onClick={()=>{ setSelectedUnit(u); setStep(4); }} className="px-4 py-2 rounded-lg bg-[#f2f6fb] text-[#0071e3] font-medium border border-transparent">Vybrat</button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <button onClick={()=>setStep(2)} className="px-3 py-2 rounded-lg border border-slate-200">Zpět</button>
                  </div>
                </div>
              )}

              {step === 4 && selectedUnit && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Údaje zákazníka</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input placeholder="Jméno a příjmení" className="p-3 rounded-lg border border-slate-100" />
                    <input placeholder="Email" className="p-3 rounded-lg border border-slate-100" />
                    <input placeholder="Telefon" className="p-3 rounded-lg border border-slate-100" />
                    <input placeholder="Číslo řidičského průkazu" className="p-3 rounded-lg border border-slate-100" />
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={()=>setStep(3)} className="px-3 py-2 rounded-lg border border-slate-200">Zpět</button>
                    <button onClick={()=>setStep(5)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0071e3] to-[#005bb5] text-white font-medium">Dále — shrnutí</button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Kontrola a odeslání</h3>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 mb-4">
                    <div className="flex justify-between"><div className="text-sm text-slate-600">Model</div><div className="font-medium">{selectedModel?.title}</div></div>
                    <div className="flex justify-between mt-2"><div className="text-sm text-slate-600">Vozidlo</div><div className="font-medium">{selectedUnit?.plate}</div></div>
                    <div className="flex justify-between mt-2"><div className="text-sm text-slate-600">Období</div><div className="font-medium">{fromLocal} — {toLocal}</div></div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={()=>setStep(4)} className="px-3 py-2 rounded-lg border border-slate-200">Upravit</button>
                    <button className="px-4 py-2 rounded-lg bg-[#34c759] text-white font-semibold">Odeslat rezervaci</button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="col-span-12 lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-md border p-5">
                <div className="relative h-56 rounded-lg overflow-hidden bg-slate-100">
                  <img src="/images/hero-car.jpg" alt="hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
                    <div className="bg-white/80 text-[#0b0b0b] rounded-md px-3 py-2 inline-block">Doporučeno</div>
                    <h3 className="text-lg font-semibold mt-2">{MODELS[0].title}</h3>
                    <p className="text-sm text-slate-500">{MODELS[0].subtitle}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">🚗</div>
                    <div>
                      <div className="font-medium">Premium vozy</div>
                      <div className="text-sm text-slate-500">Pečlivě servisované, připravené ihned.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">🔒</div>
                    <div>
                      <div className="font-medium">Pojištění v ceně</div>
                      <div className="text-sm text-slate-500">Základní krytí je součástí rezervace.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">⚡</div>
                    <div>
                      <div className="font-medium">24/7 podpora</div>
                      <div className="text-sm text-slate-500">Pomůžeme kdykoli.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a href="#" className="block w-full text-center py-3 rounded-lg border border-slate-200">Prohlédnout flotilu</a>
                </div>
              </div>

              <div className="text-sm text-slate-500">Design ve stylu Apple: hodně bílého prostoru, jemné stíny, měkké rohy a precizní typografie. Můžu doplnit i micro‑interactions nebo framer‑motion animace.</div>
            </div>
          </aside>
        </main>

        <footer className="mt-10 text-center text-sm text-slate-400">© {new Date().getFullYear()} Autopůjčovna — všechny práva vyhrazena</footer>
      </div>
    </div>
  );
}
