import { useSyncExternalStore } from "react";

export type PhotoKey = "profil" | "hero" | "kegiatan";

/* Foto cadangan (dipakai bila foto Anda belum dipasang) */
const FALLBACK: Record<PhotoKey, string> = {
  profil: "https://images.pexels.com/photos/15170876/pexels-photo-15170876.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  hero: "https://images.pexels.com/photos/32148974/pexels-photo-32148974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  kegiatan: "https://images.pexels.com/photos/32165229/pexels-photo-32165229.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
};

/* Deteksi otomatis file di src/assets:
   - foto-profil.(jpg|jpeg|png|webp)
   - foto-beranda.(jpg|jpeg|png|webp)  */
const files = import.meta.glob("./assets/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function fromAssets(base: string): string {
  const hit = Object.keys(files).find((k) => k.toLowerCase().includes(`/${base}.`));
  return hit ? files[hit] : "";
}

const ASSET: Record<PhotoKey, string> = {
  profil: fromAssets("foto-profil"),
  hero: fromAssets("foto-beranda"),
  kegiatan: fromAssets("foto-kegiatan"),
};

export const adaFileAset = (k: PhotoKey) => !!ASSET[k];

/* ---------- penyimpanan di browser ---------- */
const KEY = "eportfolio-foto-v1";

function baca(): Partial<Record<PhotoKey, string>> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function resolve(): Record<PhotoKey, string> {
  const s = baca();
  return {
    profil: s.profil || ASSET.profil || FALLBACK.profil,
    hero: s.hero || ASSET.hero || FALLBACK.hero,
    kegiatan: s.kegiatan || ASSET.kegiatan || FALLBACK.kegiatan,
  };
}

let state = resolve();
const listeners = new Set<() => void>();

function emit() {
  state = resolve();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => void listeners.delete(l);
}

export function usePhotos() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state
  );
}

export function isKustom(k: PhotoKey) {
  return !!baca()[k];
}

export function sumberFoto(k: PhotoKey): "kustom" | "aset" | "contoh" {
  if (baca()[k]) return "kustom";
  if (ASSET[k]) return "aset";
  return "contoh";
}

/* Buka jendela "Atur Foto" dari mana saja */
export const EVENT_BUKA_ATUR_FOTO = "buka-atur-foto";
export function bukaAturFoto() {
  window.dispatchEvent(new CustomEvent(EVENT_BUKA_ATUR_FOTO));
}

export function setPhoto(k: PhotoKey, dataUrl: string) {
  const s = baca();
  s[k] = dataUrl;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    alert("Ukuran foto terlalu besar untuk disimpan di browser. Gunakan foto beresolusi lebih kecil.");
    return;
  }
  emit();
}

export function resetPhoto(k: PhotoKey) {
  const s = baca();
  delete s[k];
  localStorage.setItem(KEY, JSON.stringify(s));
  emit();
}

/* Ubah File menjadi data URL yang sudah diperkecil (hemat ruang penyimpanan) */
export function fileKeDataUrl(file: File, maxW: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca berkas"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Berkas bukan gambar yang valid"));
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        const ctx = c.getContext("2d");
        if (!ctx) return reject(new Error("Canvas tidak didukung"));
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
