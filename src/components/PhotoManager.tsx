import { useEffect, useRef, useState } from "react";
import { usePhotos, setPhoto, resetPhoto, isKustom, adaFileAset, fileKeDataUrl, EVENT_BUKA_ATUR_FOTO, type PhotoKey } from "../photos";

type Slot = { key: PhotoKey; label: string; hint: string; maxW: number; aspect: string; file: string };

const SLOTS: Slot[] = [
  { key: "profil", label: "Foto Profil", hint: "Foto wisuda / foto formal Anda (potret)", maxW: 1000, aspect: "aspect-[3/4]", file: "foto-profil.jpg" },
  { key: "hero", label: "Foto Latar Beranda", hint: "Foto suasana mengajar / kelas (lanskap)", maxW: 1800, aspect: "aspect-video", file: "foto-beranda.jpg" },
  { key: "kegiatan", label: "Foto Kegiatan Nonmengajar", hint: "Foto bersama siswa / kegiatan sekolah (lanskap)", maxW: 1800, aspect: "aspect-video", file: "foto-kegiatan.jpg" },
];

function SlotEditor({ slot }: { slot: Slot }) {
  const photos = usePhotos();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  const terima = async (f?: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Pilih berkas gambar (JPG/PNG).");
    setBusy(true);
    try {
      setPhoto(slot.key, await fileKeDataUrl(f, slot.maxW));
    } catch {
      alert("Gagal memproses gambar.");
    }
    setBusy(false);
  };

  const kustom = isKustom(slot.key);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="font-semibold text-slate-800">{slot.label}</div>
        {kustom ? (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">Foto Anda</span>
        ) : adaFileAset(slot.key) ? (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">Dari src/assets</span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">Foto contoh</span>
        )}
      </div>
      <p className="mb-3 text-xs text-slate-500">{slot.hint}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          terima(e.dataTransfer.files?.[0]);
        }}
        onClick={() => input.current?.click()}
        className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition ${slot.aspect} ${
          drag ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400"
        }`}
      >
        <img src={photos[slot.key]} alt={slot.label} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/45 text-center text-white opacity-0 transition hover:opacity-100">
          <span className="text-3xl">📤</span>
          <span className="mt-1 text-xs font-semibold">{busy ? "Memproses..." : "Klik / seret foto ke sini"}</span>
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          terima(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <div className="mt-3 flex gap-2">
        <button onClick={() => input.current?.click()} className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
          Unggah Foto
        </button>
        {kustom && (
          <button onClick={() => resetPhoto(slot.key)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">
            Hapus
          </button>
        )}
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        Permanen: salin foto ke <code className="rounded bg-slate-100 px-1">src/assets/{slot.file}</code>
      </p>
    </div>
  );
}

export default function PhotoManager() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const buka = () => setOpen(true);
    window.addEventListener(EVENT_BUKA_ATUR_FOTO, buka);
    return () => window.removeEventListener(EVENT_BUKA_ATUR_FOTO, buka);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Atur foto portfolio"
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur transition hover:bg-indigo-600"
      >
        📷 <span className="hidden sm:inline">Atur Foto</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-slate-50 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">📷 Atur Foto Portfolio</h2>
                <p className="text-sm text-slate-500">Unggah foto Anda sendiri untuk mengganti foto contoh.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-200" aria-label="Tutup">
                ✕
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SLOTS.map((s) => (
                <SlotEditor key={s.key} slot={s} />
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              <b>Catatan penting.</b> Foto yang diunggah di sini tersimpan pada browser perangkat ini saja. Agar foto ikut terbawa saat website
              dibagikan atau di-hosting, salin berkas foto ke folder <code className="rounded bg-amber-100 px-1">src/assets/</code> dengan nama
              <code className="mx-1 rounded bg-amber-100 px-1">foto-profil.jpg</code>,
              <code className="mx-1 rounded bg-amber-100 px-1">foto-beranda.jpg</code>, dan
              <code className="mx-1 rounded bg-amber-100 px-1">foto-kegiatan.jpg</code>, lalu bangun ulang website.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
