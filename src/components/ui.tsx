import type { ReactNode } from "react";
import type { Tautan } from "../data";

export function PageHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-3 text-5xl">{icon}</div>
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-blue-100">{subtitle}</p>
      </div>
    </div>
  );
}

export function Section({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-10 ${className}`}>
      {title && (
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-sky-400" />
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 p-6 text-slate-700 leading-relaxed">
      <span className="absolute -top-3 left-4 text-5xl text-indigo-300">“</span>
      <p className="relative pl-2">{children}</p>
    </blockquote>
  );
}

export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-slate-50" : "bg-white"}>
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-3 ${j === 0 ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function List({ items, icon, color = "text-emerald-600" }: { items: string[]; icon: string; color?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-slate-700">
          <span className={`mt-0.5 ${color}`}>{icon}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function DriveIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 87.3 78" className={className} aria-hidden="true">
      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 48.4A9.06 9.06 0 000 52.9h27.5z" fill="#00ac47" />
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 11.45z" fill="#ea4335" />
      <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
      <path d="M59.8 52.9H27.5L13.75 76.7c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
      <path d="M73.4 26.4L60.45 3.95l-13.75 23.8 13.75 23.8h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
    </svg>
  );
}

function YouTubeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    </svg>
  );
}

export function LinkCard({ item }: { item: Tautan }) {
  const drive = item.platform === "drive";
  const kosong = !item.url;
  const cls = `group flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition ${
    kosong
      ? "cursor-not-allowed border-dashed border-slate-300 opacity-70"
      : drive
      ? "border-slate-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
      : "border-slate-200 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
  }`;
  const inner = (
    <>
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${drive ? "bg-blue-50" : "bg-red-50"}`}>
        {drive ? <DriveIcon /> : <YouTubeIcon className="h-8 w-8 text-red-600" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-slate-800 group-hover:text-indigo-700">{item.title}</div>
        <div className="text-sm text-slate-500">{item.desc}</div>
        {kosong ? (
          <div className="mt-1 text-xs font-medium italic text-slate-400">Tautan belum ditambahkan</div>
        ) : (
          <div className="mt-1 truncate text-xs font-medium text-blue-600 group-hover:underline">{item.url}</div>
        )}
      </div>
      {kosong ? (
        <span className="shrink-0 rounded-lg bg-slate-300 px-3 py-1.5 text-xs font-semibold text-white">Segera</span>
      ) : (
        <span className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-white ${drive ? "bg-blue-600" : "bg-red-600"}`}>Buka ↗</span>
      )}
    </>
  );

  if (kosong) return <div className={cls}>{inner}</div>;
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  );
}

export function LinkGrid({ items, cols = 2 }: { items: Tautan[]; cols?: 2 | 3 }) {
  return <div className={`grid gap-4 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{items.map((i) => <LinkCard key={i.title} item={i} />)}</div>;
}

export function LinkNote({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
      <span className="text-lg leading-none">🔗</span>
      <p>{children}</p>
    </div>
  );
}

export function Gallery({ items }: { items: { title: string; emoji: string; color: string; img?: string; url?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {items.map((g) =>
        g.url ? (
          <a
            key={g.title}
            href={g.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${g.color} text-5xl`}>
              <span className="transition group-hover:scale-110">{g.img ? <img src={g.img} alt={g.title} className="h-full w-full object-cover" /> : g.emoji}</span>
              <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-xs font-bold text-white backdrop-blur">
                ↗
              </span>
            </div>
            <div className="p-3 text-center text-sm font-semibold text-slate-700 group-hover:text-blue-700">{g.title}</div>
          </a>
        ) : (
          <div key={g.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${g.color} text-5xl`}>{g.emoji}</div>
            <div className="p-3 text-center text-sm font-semibold text-slate-700">{g.title}</div>
          </div>
        )
      )}
    </div>
  );
}

export function DriveButton({ url, label = "Buka di Google Drive" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
    >
      <DriveIcon className="h-5 w-5" /> {label}
    </a>
  );
}

export function YouTubeButton({ url, label = "Tonton di YouTube" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
    >
      <YouTubeIcon className="h-5 w-5" /> {label}
    </a>
  );
}
