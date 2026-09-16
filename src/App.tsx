import { useEffect, useState } from "react";
import { menu, profil, tautanPerencanaan, type PageId } from "./data";
import { Beranda, Profil, Perencanaan, Materi, Media, Video, Nonmengajar, Penilaian, Refleksi } from "./pages";
import PhotoManager from "./components/PhotoManager";

const ids = menu.map((m) => m.id);
const fromHash = (): PageId => {
  const h = window.location.hash.replace("#", "") as PageId;
  return ids.includes(h) ? h : "beranda";
};

export default function App() {
  const [page, setPage] = useState<PageId>(fromHash);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setPage(fromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (p: PageId) => {
    window.location.hash = p;
    setOpen(false);
  };

  const isHome = page === "beranda";
  const solid = !isHome || scrolled;

  const pages: Record<PageId, React.ReactNode> = {
    beranda: <Beranda go={go} />,
    profil: <Profil />,
    perencanaan: <Perencanaan />,
    materi: <Materi />,
    media: <Media />,
    video: <Video />,
    nonmengajar: <Nonmengajar />,
    penilaian: <Penilaian />,
    refleksi: <Refleksi />,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button onClick={() => go("beranda")} className={`flex items-center gap-2 font-extrabold ${solid ? "text-indigo-700" : "text-white"}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-lg text-white">✨</span>
            <span className="hidden sm:inline">E-Portfolio PMM</span>
          </button>
          <nav className="hidden items-center gap-1 xl:flex">
            {menu.map((m) => (
              <button
                key={m.id}
                onClick={() => go(m.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  page === m.id
                    ? "bg-indigo-600 text-white"
                    : solid
                    ? "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                    : "text-white/90 hover:bg-white/15"
                }`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className={`rounded-lg p-2 xl:hidden ${solid ? "text-slate-700" : "text-white"}`} aria-label="Menu">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg xl:hidden">
            <div className="grid gap-1 sm:grid-cols-2">
              {menu.map((m) => (
                <button
                  key={m.id}
                  onClick={() => go(m.id)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium ${page === m.id ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-indigo-50"}`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className={isHome ? "" : "pt-16"}>{pages[page]}</main>

      {!isHome && (
        <div className="mx-auto flex max-w-6xl justify-between px-6 pb-10">
          {(() => {
            const i = ids.indexOf(page);
            const prev = ids[i - 1];
            const next = ids[i + 1];
            return (
              <>
                {prev ? (
                  <button onClick={() => go(prev)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    ← {menu[i - 1].label}
                  </button>
                ) : <span />}
                {next && (
                  <button onClick={() => go(next)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                    {menu[i + 1].label} →
                  </button>
                )}
              </>
            );
          })()}
        </div>
      )}

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold text-white">✨ E-Portfolio Praktik Mengajar Mandiri</div>
            <p className="mt-2 text-sm italic text-slate-400">"Membangun Pembelajaran Bermakna melalui Inovasi dan Refleksi Guru"</p>
          </div>
          <div>
            <div className="mb-3 font-semibold text-white">Navigasi</div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {menu.map((m) => (
                <button key={m.id} onClick={() => go(m.id)} className="text-left hover:text-white">
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <div className="mb-3 font-semibold text-white">Identitas</div>
            <p className="font-semibold text-slate-200">{profil.nama}</p>
            <p>NIM: {profil.nim}</p>
            <p>Program Studi: {profil.prodi}</p>
            <p>{profil.sekolah}</p>
            <a
              href={tautanPerencanaan[0].url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              📁 Folder Google Drive ↗
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} {profil.nama} · E-Portfolio Praktik Mengajar Mandiri</div>
      </footer>

      <PhotoManager />
    </div>
  );
}
