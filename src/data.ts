export const profil = {
  nama: "Khairina Altaf Salsabila",
  nim: "95202589O",
  prodi: "Matematika",
  sekolah: "SMA Negeri 3 Salatiga",
  mapel: "Matematika",
  kelas: "XI 9",
  // Foto diatur pada src/photos.ts (otomatis membaca src/assets/foto-profil.* & foto-beranda.*)
  tentang:
    "Saya merupakan calon guru yang memiliki komitmen untuk menciptakan pembelajaran yang aktif, kreatif, dan bermakna. Melalui kegiatan praktik mengajar mandiri ini saya berusaha mengembangkan kemampuan pedagogik, profesional, sosial, dan kepribadian sebagai seorang pendidik.",
  // Video YouTube praktik mengajar (otomatis diputar di halaman Video Mengajar)
  videoEmbed: "https://www.youtube.com/embed/ayyCbdhYGRY",
};

/* ================== TAUTAN BERKAS ================== */
export const link = {
  rpp: "https://drive.google.com/file/d/14UP1Czn00gxLnQTS4BxpO_dYyy0Uui9x/view?usp=sharing",
  lkpd: "https://drive.google.com/file/d/1dSpCp8sGASFWPw_-OG0Q043JLrGnU4r_/view?usp=drive_link",
  ppt: "https://drive.google.com/file/d/1dSpCp8sGASFWPw_-OG0Q043JLrGnU4r_/view?usp=drive_link",
  hasilSiswa: "https://drive.google.com/file/d/14R6JIBmJb1Tyiy4ayi5Tx6gfmRVHeWsM/view?usp=drive_link",
  folderInstrumen: "https://drive.google.com/drive/folders/1i7XTL_oBGFzg4NrTKUmu7mqfaGzVJnaU?usp=drive_link",
  video: "https://youtu.be/ayyCbdhYGRY",
  // Tautan LiveWorksheet pertemuan 3 -> isi di sini bila sudah ada (mis. https://www.liveworksheets.com/...)
  liveworksheet: "",
};

/* ============ TAUTAN GOOGLE DRIVE / YOUTUBE ============
   Ganti nilai `url` di bawah ini dengan tautan Google Drive / YouTube milik Anda. */
export type Tautan = {
  title: string;
  desc: string;
  platform: "drive" | "youtube";
  url: string;
};

const DRIVE = "https://drive.google.com/";
const YT = link.video;

export const tautanPerencanaan: Tautan[] = [
  { title: "RPP / Modul Ajar", desc: "Contoh RPP kelas XI 9 (bukti analisis perencanaan pembelajaran)", platform: "drive", url: link.rpp },
  { title: "e-LKPD (Liveworksheet)", desc: "e-LKPD materi Operasi Fungsi Aljabar", platform: "drive", url: link.lkpd },
  { title: "Bahan Ajar / PPT", desc: "Slide bahan ajar Matematika yang digunakan di kelas", platform: "drive", url: link.ppt },
  { title: "Hasil Pengerjaan Siswa", desc: "Dokumentasi hasil pekerjaan peserta didik", platform: "drive", url: link.hasilSiswa },
];

export const tautanMateri: Tautan[] = [
  { title: "Bahan Ajar / PPT", desc: "Bahan ajar materi Matematika (PDF / slide)", platform: "drive", url: link.ppt },
  { title: "e-LKPD", desc: "Lembar kerja peserta didik materi terkait", platform: "drive", url: link.lkpd },
];

/* Media pembelajaran dikelompokkan per pertemuan.
   Pertemuan 3 hanya menggunakan PPT dan LiveWorksheet (tanpa poster/media visual). */
export const mediaPertemuan: { pertemuan: string; catatan: string; items: Tautan[] }[] = [
  {
    pertemuan: "Operasi Fungsi Aljabar (Pertemuan 3)",
    catatan:
      "Media yang digunakan: PPT dan e-LKPD berbasis Liveworksheet sebagai digitalisasi LKPD (tidak menggunakan poster/media visual). Tujuannya agar peserta didik mengerjakan latihan secara interaktif dengan umpan balik otomatis.",
    items: [
      { title: "PPT (Bahan Ajar)", desc: "Slide presentasi materi Operasi Fungsi Aljabar", platform: "drive", url: link.ppt },
      { title: "e-LKPD Liveworksheet", desc: "LKPD digital interaktif — tangkapan layar/tautan", platform: "drive", url: link.liveworksheet },
    ],
  },
  {
    pertemuan: "Sudut Pusat & Sudut Keliling",
    catatan:
      "Media sederhana (manipulatif) untuk membuktikan teorema hubungan sudut pusat dan sudut keliling secara visual — peserta didik mengamati dan membuktikan sendiri, bukan menerima rumus jadi.",
    items: [{ title: "Foto Media Pembuktian Teorema", desc: "Dokumentasi media sederhana sudut pusat–sudut keliling", platform: "drive", url: "" }],
  },
];

export const tautanVideo: Tautan[] = [
  { title: "Video Praktik Mengajar Mandiri", desc: '"Pelaksanaan Praktik Mengajar Mandiri"', platform: "youtube", url: YT },
];

export const tautanNonmengajar: Tautan[] = [
  { title: "Piket 5S", desc: "Senyum, Salam, Sapa, Sopan, Santun — menyambut peserta didik di gerbang sekolah", platform: "drive", url: DRIVE },
  { title: "Kegiatan Perpustakaan", desc: "Membantu pengelolaan dan pelayanan perpustakaan sekolah", platform: "drive", url: DRIVE },
  { title: "Long March SMANTISA", desc: "Mendampingi kegiatan Long March SMA Negeri 3 Salatiga", platform: "drive", url: DRIVE },
  { title: "Orientasi Siswa Baru", desc: "Membantu pelaksanaan kegiatan orientasi peserta didik baru", platform: "drive", url: DRIVE },
];

export const tautanPenilaian: Tautan[] = [
  {
    title: "Folder Instrumen Penilaian (Lengkap)",
    desc: "Berisi instrumen sikap, pengetahuan, dan keterampilan dalam satu folder Google Drive",
    platform: "drive",
    url: link.folderInstrumen,
  },
];

export const tautanRefleksi: Tautan[] = [
  { title: "Dokumen Refleksi Diri", desc: "Catatan refleksi lengkap praktik mengajar mandiri", platform: "drive", url: DRIVE },
  { title: "Jurnal Harian Mengajar", desc: "Catatan harian selama praktik mengajar", platform: "drive", url: DRIVE },
  { title: "Bukti Dukungan / Validasi", desc: "Lembar pengesahan dan bukti pendukung", platform: "drive", url: DRIVE },
];

export type PageId =
  | "beranda"
  | "profil"
  | "perencanaan"
  | "materi"
  | "media"
  | "video"
  | "nonmengajar"
  | "penilaian"
  | "refleksi";

export const menu: { id: PageId; icon: string; label: string }[] = [
  { id: "beranda", icon: "🏠", label: "Beranda" },
  { id: "profil", icon: "👤", label: "Profil Guru" },
  { id: "perencanaan", icon: "📋", label: "Perencanaan Pembelajaran" },
  { id: "materi", icon: "📚", label: "Analisis Materi" },
  { id: "media", icon: "🎨", label: "Media Pembelajaran" },
  { id: "video", icon: "🎥", label: "Video Mengajar" },
  { id: "nonmengajar", icon: "🤝", label: "Kegiatan Nonmengajar" },
  { id: "penilaian", icon: "📝", label: "Instrumen Penilaian" },
  { id: "refleksi", icon: "💭", label: "Refleksi Diri" },
];

export const timeline = [
  { title: "Persiapan", desc: "Observasi sekolah, koordinasi dengan guru pamong, dan analisis kebutuhan peserta didik.", icon: "🔍" },
  { title: "Penyusunan Modul", desc: "Merancang modul ajar, RPP, LKPD, bahan ajar, dan media pembelajaran.", icon: "📝" },
  { title: "Pelaksanaan Mengajar", desc: "Melaksanakan praktik mengajar mandiri di kelas dengan pembelajaran berpusat pada siswa.", icon: "🎓" },
  { title: "Evaluasi", desc: "Menilai ketercapaian tujuan pembelajaran melalui instrumen sikap, pengetahuan, dan keterampilan.", icon: "📊" },
  { title: "Refleksi", desc: "Merefleksikan pengalaman, mengidentifikasi kekurangan, dan menyusun rencana perbaikan.", icon: "💡" },
];

export const statistik = [
  { icon: "📋", value: "4", label: "Perangkat Pembelajaran", to: "perencanaan" as PageId },
  { icon: "🎥", value: "1", label: "Video Praktik", to: "video" as PageId },
  { icon: "📸", value: "4", label: "Kegiatan Nonmengajar", to: "nonmengajar" as PageId },
  { icon: "📝", value: "1", label: "Folder Instrumen", to: "penilaian" as PageId },
  { icon: "💡", value: "1", label: "Refleksi Profesional", to: "refleksi" as PageId },
];
