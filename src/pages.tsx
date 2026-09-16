import {
  profil,
  timeline,
  statistik,
  tautanPerencanaan,
  tautanMateri,
  mediaPertemuan,
  tautanVideo,
  tautanNonmengajar,
  tautanPenilaian,
  tautanRefleksi,
  type PageId,
} from "./data";
import {
  PageHeader,
  Section,
  Card,
  Quote,
  Table,
  List,
  LinkGrid,
  LinkNote,
  Gallery,
  YouTubeButton,
} from "./components/ui";
import { usePhotos, sumberFoto, bukaAturFoto, type PhotoKey } from "./photos";

/* Penanda saat foto masih memakai foto contoh (stok) — klik untuk membuka jendela unggah */
function TandaFotoContoh({ k, className = "" }: { k: PhotoKey; className?: string }) {
  usePhotos(); // agar ikut diperbarui saat foto diganti
  if (sumberFoto(k) !== "contoh") return null;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        bukaAturFoto();
      }}
      className={`absolute z-10 flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg transition hover:bg-amber-300 ${className}`}
      title="Foto ini masih contoh. Klik untuk mengunggah foto Anda."
    >
      ⚠️ Foto contoh — klik untuk ganti
    </button>
  );
}

/* ---------------- BERANDA ---------------- */
export function Beranda({ go }: { go: (p: PageId) => void }) {
  const photos = usePhotos();
  return (
    <>
      <div className="relative flex min-h-[92vh] items-center overflow-hidden text-white">
        <img src={photos.hero} alt="Bersama peserta didik" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-indigo-950/82 to-indigo-900/55" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50/95 to-transparent" />
        <TandaFotoContoh k="hero" className="right-4 top-20" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            ✨ Selamat Datang di E-Portfolio Saya
          </span>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button onClick={() => sumberFoto("profil") === "contoh" && bukaAturFoto()} className="relative shrink-0" title="Foto profil">
              <img
                src={photos.profil}
                alt={profil.nama}
                className="h-24 w-24 rounded-2xl border-4 border-white/80 object-cover shadow-2xl sm:h-28 sm:w-28"
              />
              {sumberFoto("profil") === "contoh" && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow">
                  ⚠️ contoh
                </span>
              )}
            </button>
            <div>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">{profil.nama}</h1>
              <p className="mt-2 text-lg font-semibold text-sky-200">Mahasiswa Praktik Mengajar Mandiri</p>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-blue-100">
            <p>🎓 Program Studi: {profil.prodi}</p>
            <p>🏫 Sekolah: {profil.sekolah}</p>
          </div>
          <p className="mt-8 max-w-2xl border-l-4 border-amber-400 pl-4 text-lg italic text-blue-50">
            "Guru yang baik bukan hanya mengajar ilmu, tetapi menginspirasi peserta didik untuk terus belajar."
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => go("profil")} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold shadow-lg shadow-blue-900/40 transition hover:bg-blue-500">
              🟦 Mulai Portfolio
            </button>
            <button onClick={() => go("video")} className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-500">
              🟩 Lihat Praktik Mengajar
            </button>
            <button onClick={() => go("refleksi")} className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-900/40 transition hover:bg-amber-400">
              🟨 Refleksi Saya
            </button>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <Section className="relative z-10 -mt-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {statistik.map((s) => (
            <button
              key={s.label}
              onClick={() => go(s.to)}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-lg transition hover:-translate-y-1 hover:border-indigo-300"
            >
              <div className="text-4xl">{s.icon}</div>
              <div className="mt-2 text-3xl font-extrabold text-indigo-700">{s.value}</div>
              <div className="text-sm font-medium text-slate-600">{s.label}</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section title="Timeline Praktik Mengajar Mandiri">
        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-1 rounded bg-gradient-to-b from-indigo-500 via-sky-400 to-emerald-400 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={t.title} className={`relative flex items-center md:justify-between ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-xl shadow md:left-1/2">
                  {t.icon}
                </div>
                <div className="ml-16 w-full md:ml-0 md:w-[45%]">
                  <Card className="hover:shadow-md">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-500">Tahap {i + 1}</div>
                    <h3 className="mt-1 text-lg font-bold text-slate-800">{t.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
                  </Card>
                </div>
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Akses cepat tautan */}
      <Section title="Akses Cepat Dokumen & Video">
        <LinkNote>
          Seluruh berkas portfolio (modul, video praktik, dokumentasi kegiatan, instrumen evaluasi, dan refleksi) diakses melalui tautan Google Drive dan YouTube.
        </LinkNote>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="flex flex-col items-start gap-3">
            <div className="text-3xl">📋</div>
            <div className="font-bold text-slate-800">RPP & Perangkat Ajar</div>
            <p className="text-sm text-slate-500">RPP, e-LKPD, bahan ajar/PPT, dan hasil pengerjaan siswa.</p>
            <button onClick={() => go("perencanaan")} className="mt-auto text-sm font-semibold text-blue-600 hover:underline">
              Buka tautan →
            </button>
          </Card>
          <Card className="flex flex-col items-start gap-3">
            <div className="text-3xl">🎥</div>
            <div className="font-bold text-slate-800">Video Praktik Mengajar</div>
            <p className="text-sm text-slate-500">Tonton langsung melalui tautan YouTube.</p>
            <button onClick={() => go("video")} className="mt-auto text-sm font-semibold text-blue-600 hover:underline">
              Buka tautan →
            </button>
          </Card>
          <Card className="flex flex-col items-start gap-3">
            <div className="text-3xl">📸</div>
            <div className="font-bold text-slate-800">Dokumentasi Kegiatan</div>
            <p className="text-sm text-slate-500">Piket 5S, perpustakaan, Long March SMANTISA, dan orientasi siswa baru.</p>
            <button onClick={() => go("nonmengajar")} className="mt-auto text-sm font-semibold text-blue-600 hover:underline">
              Buka tautan →
            </button>
          </Card>
        </div>
      </Section>
    </>
  );
}

/* ---------------- PROFIL ---------------- */
export function Profil() {
  const photos = usePhotos();
  const rows = [
    ["Nama", profil.nama],
    ["NIM/NIP", profil.nim],
    ["Program Studi", profil.prodi],
    ["Sekolah Praktik", profil.sekolah],
    ["Mata Pelajaran", profil.mapel],
    ["Kelas Mengajar", profil.kelas],
  ];
  return (
    <>
      <PageHeader icon="👤" title="Profil Guru" subtitle="Biodata dan gambaran diri sebagai calon pendidik profesional." />
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl ring-1 ring-slate-200">
              <img src={photos.profil} alt={`Foto profil ${profil.nama}`} className="aspect-[3/4] w-full object-cover" />
              <TandaFotoContoh k="profil" className="bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
            </div>
            <div className="mt-4 text-center">
              <div className="text-xl font-bold text-slate-800">{profil.nama}</div>
              <div className="text-sm text-indigo-600">Mahasiswa Praktik Mengajar Mandiri</div>
            </div>
          </div>
          <div className="space-y-8 md:col-span-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-800">Biodata</h2>
              <Table head={["Informasi", "Keterangan"]} rows={rows} />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-800">Tentang Saya</h2>
              <Quote>{profil.tentang}</Quote>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Pedagogik", "Profesional", "Sosial", "Kepribadian"].map((k) => (
                <div key={k} className="rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 p-4 text-center text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  Kompetensi
                  <br />
                  {k}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------------- PERENCANAAN ---------------- */
export function Perencanaan() {
  return (
    <>
      <PageHeader icon="📋" title="Perencanaan Pembelajaran" subtitle="Rancangan pembelajaran kelas XI 9 selama tiga siklus PPL Mandiri beserta analisisnya." />
      <Section title="Dokumen Perangkat Pembelajaran">
        <LinkNote>
          Lampiran bukti analisis: RPP/Modul Ajar (mis. RPP P1, P3, P8, dan pertemuan sudut pusat–sudut keliling), e-LKPD, bahan ajar, serta hasil pengerjaan siswa. Klik
          kartu untuk membuka berkas di Google Drive.
        </LinkNote>
        <LinkGrid items={tautanPerencanaan} />
      </Section>
      <Section title="Cakupan Materi yang Dirancang">
        <Card>
          <p className="text-slate-600">
            Selama tiga siklus PPL Mandiri, saya menyusun rancangan pembelajaran (RPP/Modul Ajar) untuk kelas <b>XI 9</b> yang mencakup:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Relasi dan Fungsi",
              "Fungsi",
              "Operasi Fungsi Aljabar",
              "Komposisi Fungsi",
              "Review Komposisi Fungsi",
              "Komposisi 3 Fungsi",
              "Fungsi Invers",
              "Invers Komposisi Fungsi",
              "2× Ulangan Harian",
              "Remedial & Pengayaan",
            ].map((m) => (
              <span key={m} className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                {m}
              </span>
            ))}
          </div>
        </Card>
      </Section>
      <Section title="Analisis Produk Rancangan Pembelajaran">
        <div className="space-y-6">
          <Card>
            <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">1 · Pertemuan Awal</div>
            <h3 className="text-lg font-bold text-slate-800">Pola Konvensional</h3>
            <p className="mt-2 text-slate-600">
              Pada rancangan pertemuan-pertemuan awal, saya masih menyusun pembelajaran dengan pola yang relatif konvensional: penjelasan konsep oleh guru, dilanjutkan
              latihan soal secara individual. Tujuan pembelajaran pada tahap ini difokuskan pada pemahaman definisi relasi, fungsi, dan representasinya (diagram panah,
              himpunan pasangan berurutan, grafik).
            </p>
          </Card>
          <Card>
            <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">2 · Pergeseran Pendekatan</div>
            <h3 className="text-lg font-bold text-slate-800">Menuju Pembelajaran Mendalam (PM)</h3>
            <p className="mt-2 text-slate-600">
              Memasuki pertemuan-pertemuan berikutnya, rancangan pembelajaran saya mulai bergeser ke arah yang lebih kontekstual dan berpusat pada peserta didik, sejalan
              dengan prinsip <b>Pembelajaran Mendalam (PM)</b>. Salah satu contohnya adalah rancangan pada materi sudut pusat dan sudut keliling, di mana saya secara sengaja
              merancang kegiatan <b>pembuktian teorema menggunakan media sederhana</b>, alih-alih hanya menyampaikan rumus secara langsung. Perubahan pendekatan ini merupakan
              hasil refleksi dari pengalaman mengajar sebelumnya, di mana saya menyadari bahwa keterlibatan aktif peserta didik jauh lebih efektif dibanding metode ceramah.
            </p>
          </Card>
          <Card>
            <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">3 · Revisi Berbasis Pengalaman</div>
            <h3 className="text-lg font-bold text-slate-800">Penyesuaian e-LKPD</h3>
            <p className="mt-2 text-slate-600">
              Saya juga melakukan revisi pada rancangan setelah pengalaman penerapan e-LKPD berbasis Liveworksheet pada materi Operasi Fungsi Aljabar yang kurang optimal.
              Pada rancangan pertemuan-pertemuan selanjutnya, saya menyesuaikan format LKPD agar lebih ramah digunakan melalui perangkat HP, atau kembali menggunakan LKPD
              cetak untuk memastikan seluruh peserta didik dapat mengerjakan tanpa kendala teknis.
            </p>
          </Card>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-200 bg-emerald-50/50">
            <h3 className="mb-3 text-lg font-bold text-emerald-800">💪 Kekuatan Rancangan</h3>
            <List
              icon="✅"
              items={[
                "Keberlanjutan antarmateri: dari Fungsi hingga Invers Komposisi Fungsi yang saling berkaitan",
                "Adanya siklus evaluasi–remedial–pengayaan yang terstruktur",
              ]}
            />
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <h3 className="mb-3 text-lg font-bold text-amber-800">⚠ Kekurangan Rancangan</h3>
            <List
              icon="⚠"
              color="text-amber-600"
              items={["Pada beberapa rancangan awal, alokasi waktu antartahapan kegiatan pembelajaran masih kurang presisi sehingga di lapangan sering meleset dari rencana"]}
            />
          </Card>
        </div>
      </Section>
    </>
  );
}

/* ---------------- MATERI ---------------- */
export function Materi() {
  return (
    <>
      <PageHeader icon="📚" title="Analisis Materi Pembelajaran" subtitle="Telaah materi topik Fungsi (Fase F) yang diajarkan di kelas XI 9." />
      <Section title="Identitas Materi">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Topik / Alur Materi</div>
            <div className="mt-1 text-lg font-semibold text-slate-800">Fungsi (Capaian Pembelajaran Fase F)</div>
            <p className="mt-2 text-sm text-slate-600">
              Relasi & Fungsi → Operasi Aljabar pada Fungsi → Komposisi Fungsi (termasuk komposisi tiga fungsi) → Fungsi Invers → Invers dari Komposisi Fungsi
            </p>
          </Card>
          <Card>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Kelas</div>
            <div className="mt-1 text-lg font-semibold text-slate-800">XI 9 — SMA Negeri 3 Salatiga</div>
            <p className="mt-2 text-sm text-slate-600">Mata pelajaran Matematika, tiga siklus PPL Mandiri</p>
          </Card>
        </div>
        <div className="mt-4">
          <LinkGrid items={tautanMateri} />
        </div>
      </Section>
      <Section title="Analisis Materi">
        <Quote>
          Materi pembelajaran yang saya susun untuk kelas XI 9 mengikuti alur capaian pembelajaran Fase F pada topik Fungsi, dimulai dari konsep dasar relasi dan fungsi,
          dilanjutkan operasi aljabar pada fungsi, komposisi fungsi (termasuk komposisi tiga fungsi), hingga fungsi invers dan invers dari komposisi fungsi.
        </Quote>
        <div className="mt-6 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-slate-800">📶 Penyusunan Bertahap dan Berjenjang</h3>
            <p className="mt-2 text-slate-600">
              Misalnya pada materi <b>Operasi Fungsi Aljabar</b>, saya memulai dari operasi penjumlahan dan pengurangan fungsi yang relatif sederhana, sebelum masuk ke
              perkalian dan pembagian fungsi yang menuntut pemahaman domain fungsi lebih matang. Pola berjenjang serupa saya terapkan pada materi <b>Komposisi Fungsi</b>,
              di mana komposisi dua fungsi diajarkan lebih dahulu sebagai dasar sebelum masuk ke komposisi tiga fungsi.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-800">🎯 Penyesuaian Berdasarkan Hasil Evaluasi</h3>
            <p className="mt-2 text-slate-600">
              Setelah Ulangan Harian pertama, materi pada sesi Remedial dan Pengayaan saya susun dengan dua tingkatan: <b>soal-soal dasar</b> untuk peserta didik yang
              mengikuti remedial, dan <b>soal-soal aplikatif/pengembangan</b> untuk peserta didik yang mengikuti pengayaan. Pola ini saya ulang kembali setelah Ulangan
              Harian kedua.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-800">👁️ Pengaitan dengan Konteks Visual dan Konkret</h3>
            <p className="mt-2 text-slate-600">
              Pada materi <b>sudut pusat dan sudut keliling</b>, saya berupaya mengaitkan materi dengan konteks visual dan konkret, bukan sekadar rumus dan pembuktian
              aljabar, sehingga peserta didik dapat memahami <i>mengapa</i> teorema tersebut berlaku, bukan hanya menghafalkannya.
            </p>
          </Card>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-200 bg-emerald-50/50">
            <h3 className="mb-4 text-lg font-bold text-emerald-800">Efektivitas</h3>
            <List
              icon="✅"
              items={[
                "Penyusunan materi bertahap dan berjenjang sesuai alur CP Fase F",
                "Disesuaikan dengan hasil evaluasi (remedial dan pengayaan dua tingkatan)",
                "Membantu peserta didik memahami konsep secara berkelanjutan",
              ]}
            />
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <h3 className="mb-4 text-lg font-bold text-amber-800">Catatan Perbaikan</h3>
            <List
              icon="⚠"
              color="text-amber-600"
              items={["Masih perlu mengevaluasi kecukupan porsi latihan soal pada materi yang tergolong abstrak, seperti fungsi invers"]}
            />
          </Card>
        </div>
      </Section>
    </>
  );
}

/* ---------------- MEDIA ---------------- */
export function Media() {
  return (
    <>
      <PageHeader icon="🎨" title="Media Pembelajaran" subtitle="Media yang digunakan pada setiap pertemuan untuk memperjelas materi dan meningkatkan motivasi belajar." />
      <Section title="Media per Pertemuan">
        <LinkNote>
          Media pembelajaran dikelompokkan berdasarkan pertemuan. Klik kartu untuk membuka berkas di Google Drive atau tautan media digital.
        </LinkNote>
        <div className="space-y-8">
          {mediaPertemuan.map((p) => (
            <div key={p.pertemuan} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-1 text-sm font-bold text-white">{p.pertemuan}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{p.items.length} media digunakan</span>
              </div>
              <p className="mb-5 text-sm text-slate-600">{p.catatan}</p>
              <Gallery
                items={p.items.map((it) => ({
                  title: it.title,
                  emoji: it.title.toLowerCase().includes("ppt") ? "📊" : it.title.toLowerCase().includes("live") ? "💻" : "📄",
                  color: it.title.toLowerCase().includes("ppt")
                    ? "from-orange-100 to-amber-200"
                    : it.title.toLowerCase().includes("live")
                    ? "from-violet-100 to-purple-200"
                    : "from-sky-100 to-blue-200",
                  url: it.url,
                }))}
              />
              <div className="mt-6">
                <LinkGrid items={p.items} />
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
            ℹ️ Media disesuaikan dengan karakteristik materi: media digital (PPT + e-LKPD Liveworksheet) pada Operasi Fungsi Aljabar, dan media sederhana manipulatif pada
            pembuktian teorema sudut pusat–sudut keliling.
          </div>
        </div>
      </Section>
      <Section title="Analisis Media Pembelajaran">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4 font-bold text-white">💻 e-LKPD Liveworksheet — Operasi Fungsi Aljabar</div>
            <div className="space-y-3 p-5 text-slate-600">
              <p>
                e-LKPD berbasis Liveworksheet saya terapkan dengan tujuan agar peserta didik dapat mengerjakan latihan secara <b>interaktif</b> dan mendapatkan{" "}
                <b>umpan balik otomatis</b>.
              </p>
              <p>
                Dalam pelaksanaannya muncul kendala teknis: karena sebagian besar peserta didik mengakses LKPD melalui HP, <b>tampilan soal menjadi kurang jelas</b> dan
                beberapa <b>hasil pengerjaan tidak tersimpan</b> dengan baik, sehingga sebagian peserta didik kesulitan menyelesaikan LKPD tepat waktu.
              </p>
              <p className="rounded-xl bg-violet-50 p-3 text-sm">
                💡 <b>Pelajaran:</b> media digital perlu diuji coba terlebih dahulu dan mempertimbangkan perangkat yang benar-benar digunakan peserta didik — bukan
                mengasumsikan seluruh siswa memiliki akses laptop.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4 font-bold text-white">📐 Media Sederhana — Sudut Pusat & Sudut Keliling</div>
            <div className="space-y-3 p-5 text-slate-600">
              <p>
                Pada materi sudut pusat dan sudut keliling, saya menggunakan media sederhana untuk <b>membuktikan teorema secara visual dan manipulatif</b>.
              </p>
              <p>
                Media ini memungkinkan peserta didik <b>mengamati dan membuktikan sendiri</b> hubungan antara sudut pusat dan sudut keliling, alih-alih hanya menerima rumus
                jadi.
              </p>
              <p className="rounded-xl bg-emerald-50 p-3 text-sm">
                ⭐ <b>Hasil:</b> keterlibatan dan antusiasme peserta didik meningkat signifikan dibanding pembelajaran yang bersifat konvensional.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Pelajaran yang Ditarik">
        <Quote>
          Media pembelajaran yang efektif tidak selalu harus berbasis digital atau canggih; media sederhana yang dirancang dengan tepat justru dapat memberikan dampak yang
          lebih besar terhadap pemahaman dan keterlibatan peserta didik. Ke depan, saya berencana lebih selektif dalam memilih media digital dan lebih sering menghadirkan
          media visual/konkret dalam pembelajaran matematika.
        </Quote>
        <div className="mt-6">
          <LinkNote>
            Bukti pendukung: foto/tangkapan layar e-LKPD Liveworksheet dan foto media sudut pusat–sudut keliling (lihat kartu tautan di bagian atas halaman ini).
          </LinkNote>
        </div>
      </Section>
    </>
  );
}

/* ---------------- VIDEO ---------------- */
export function Video() {
  const yt = tautanVideo[0];
  return (
    <>
      <PageHeader
        icon="🎥"
        title="Video Praktik Mengajar"
        subtitle="Dokumentasi video praktik mengajar mandiri dari beberapa pertemuan sepanjang siklus 1 hingga 3."
      />
      <Section>
        <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
          {profil.videoEmbed ? (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={profil.videoEmbed}
                title="Pelaksanaan Praktik Mengajar Mandiri"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-center">
              <a
                href={yt.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-24 w-24 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-900/50 transition hover:scale-110"
                aria-label="Tonton video"
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-10 w-10 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </a>
              <div>
                <div className="text-xl font-bold text-white">🎬 Pelaksanaan Praktik Mengajar Mandiri</div>
                <div className="mt-1 text-sm text-slate-400">Klik tombol putar untuk menonton video melalui tautan YouTube</div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <YouTubeButton url={yt.url} />
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 text-white">
            <div>
              <div className="text-lg font-bold">🎬 {yt.title}</div>
              <div className="truncate text-sm text-slate-400">{yt.url}</div>
            </div>
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">YouTube / Google Drive</span>
          </div>
        </div>
      </Section>
      <Section title="Tautan Video & Berkas Pendukung">
        <LinkGrid items={tautanVideo} />
      </Section>
      <Section title="Analisis Video — Dua Pertemuan Sorotan">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4 font-bold text-white">🎬 Pertemuan Operasi Fungsi Aljabar</div>
            <div className="space-y-3 p-5 text-slate-600">
              <p>
                Pada video ini terlihat peserta didik mengalami <b>kebingungan saat mengakses dan mengerjakan e-LKPD melalui HP</b> mereka. Video ini menjadi bahan evaluasi
                diri yang penting.
              </p>
              <p>
                Alokasi waktu untuk mengatasi kendala teknis di tengah pembelajaran cukup banyak <b>menyita waktu inti pembelajaran</b>.
              </p>
              <p className="rounded-xl bg-violet-50 p-3 text-sm">
                💡 <b>Tindak lanjut:</b> menyiapkan rencana cadangan (misalnya LKPD cetak) apabila media digital bermasalah.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4 font-bold text-white">🎬 Pertemuan Sudut Pusat – Sudut Keliling</div>
            <div className="space-y-3 p-5 text-slate-600">
              <p>
                Terlihat peserta didik <b>antusias mencoba media pembuktian secara langsung</b>, aktif bertanya, dan saling berdiskusi dalam kelompok kecil.
              </p>
              <p>
                Video ini menjadi <b>bukti konkret keberhasilan</b> strategi pembelajaran berbasis media manipulatif.
              </p>
              <p className="rounded-xl bg-emerald-50 p-3 text-sm">
                ⭐ Salah satu pengalaman mengajar yang <b>paling saya banggakan</b> sejauh ini.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Refleksi dari Dokumentasi Video">
        <Quote>
          Dari dokumentasi video ini saya dapat melihat perkembangan gaya mengajar saya: dari yang cenderung berpusat pada guru di pertemuan-pertemuan awal, menjadi lebih
          berpusat pada peserta didik pada pertemuan-pertemuan berikutnya. Area yang masih perlu saya kembangkan adalah manajemen waktu, khususnya saat terjadi kendala
          teknis di tengah pembelajaran.
        </Quote>
      </Section>
    </>
  );
}

/* ---------------- NONMENGAJAR ---------------- */
export function Nonmengajar() {
  const photos = usePhotos();
  return (
    <>
      <PageHeader icon="🤝" title="Kegiatan Nonmengajar" subtitle="Dokumentasi keterlibatan dalam kegiatan sekolah di luar pembelajaran kelas." />
      <Section>
        <figure className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img src={photos.kegiatan} alt="Kebersamaan dengan peserta didik" className="max-h-[460px] w-full object-cover" />
          <TandaFotoContoh k="kegiatan" className="right-3 top-3" />
          <figcaption className="px-5 py-4 text-sm text-slate-600">
            📷 Kebersamaan bersama peserta didik {profil.sekolah} — membangun kedekatan dan hubungan sosial yang positif dengan warga sekolah.
          </figcaption>
        </figure>
      </Section>
      <Section title="📸 Dokumentasi Kegiatan (Tautan)">
        <LinkNote>Seluruh dokumentasi kegiatan dapat dilihat melalui tautan Google Drive berikut.</LinkNote>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { title: "Piket 5S", emoji: "🤝", color: "from-sky-100 to-blue-200", desc: "Senyum, Salam, Sapa, Sopan, Santun" },
            { title: "Kegiatan Perpustakaan", emoji: "📚", color: "from-amber-100 to-orange-200", desc: "Pengelolaan & pelayanan perpustakaan" },
            { title: "Long March SMANTISA", emoji: "🚶", color: "from-emerald-100 to-teal-200", desc: "Pendampingan Long March sekolah" },
            { title: "Orientasi Siswa Baru", emoji: "🎉", color: "from-pink-100 to-rose-200", desc: "Pendampingan orientasi peserta didik baru" },
          ].map((g, i) => (
            <a
              key={g.title}
              href={tautanNonmengajar[i].url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${g.color} text-5xl`}>
                <span className="transition group-hover:scale-110">{g.emoji}</span>
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-xs font-bold text-white backdrop-blur">↗</span>
              </div>
              <div className="p-3 text-center">
                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">{g.title}</div>
                <div className="mt-0.5 text-[11px] text-slate-400">{g.desc}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <LinkGrid items={tautanNonmengajar} />
        </div>
      </Section>
      <Section title="Analisis Kegiatan Non-Mengajar">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: "🤝",
              t: "Piket 5S",
              c: "from-sky-500 to-blue-600",
              d: "Piket 5S (Senyum, Sapa, Salam, Sopan, Santun) di pagi hari, di mana saya turut menyambut peserta didik yang datang ke sekolah. Kegiatan ini melatih kedisiplinan waktu dan membangun kedekatan personal dengan peserta didik sejak awal hari.",
            },
            {
              icon: "📚",
              t: "Kegiatan Perpustakaan",
              c: "from-amber-500 to-orange-600",
              d: "Membantu kegiatan di perpustakaan, seperti menata dan mendata buku. Melalui kegiatan ini saya belajar bagaimana pengelolaan sumber belajar di sekolah dilakukan, sekaligus memahami peran guru dalam mendukung fasilitas belajar peserta didik di luar kelas.",
            },
            {
              icon: "🚶",
              t: "Long March SMANTISA",
              c: "from-emerald-500 to-teal-600",
              d: "Kegiatan kepramukaan tahunan untuk penerimaan anggota baru Ambalan Kamajaya-Kamaratih. Dalam kegiatan ini saya terlibat mendampingi peserta didik, yang memberi saya pengalaman langsung dalam pembinaan karakter dan kegiatan kokurikuler di luar konteks akademik matematika.",
            },
            {
              icon: "🎉",
              t: "Orientasi Siswa Baru",
              c: "from-pink-500 to-rose-600",
              d: "Turut membantu proses pengenalan lingkungan sekolah kepada peserta didik baru. Kegiatan ini melatih kemampuan komunikasi saya dengan peserta didik yang belum saya kenal sebelumnya.",
            },
          ].map((k) => (
            <div key={k.t} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className={`flex items-center gap-2 bg-gradient-to-r ${k.c} px-5 py-3.5 font-bold text-white`}>
                <span className="text-xl">{k.icon}</span> {k.t}
              </div>
              <p className="p-5 text-slate-600">{k.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Quote>
            Keempat kegiatan ini memperluas pemahaman saya bahwa peran seorang guru tidak terbatas pada penyampaian materi di dalam kelas, tetapi juga mencakup pembinaan
            karakter, pengelolaan fasilitas belajar, dan keterlibatan dalam kehidupan sekolah secara menyeluruh.
          </Quote>
        </div>
      </Section>
    </>
  );
}

/* ---------------- PENILAIAN ---------------- */
export function Penilaian() {
  return (
    <>
      <PageHeader icon="📝" title="Instrumen Penilaian" subtitle="Instrumen formatif dan sumatif kelas XI 9 beserta analisis hasilnya." />
      <Section title="Berkas Instrumen (Tautan)">
        <LinkNote>
          Seluruh instrumen penilaian tersimpan dalam <b>satu folder Google Drive</b>: kisi-kisi soal, lembar soal UH, dan rubrik penilaian. Ringkasan statistik hasil UH
          (persentase tuntas/tidak tuntas) disajikan tanpa menampilkan data individual peserta didik.
        </LinkNote>
        <LinkGrid items={tautanPenilaian} />
      </Section>
      <Section title="Jenis Instrumen yang Dirancang">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-sky-200 bg-sky-50/50">
            <h3 className="mb-4 text-lg font-bold text-sky-800">📋 Instrumen Formatif</h3>
            <List icon="•" color="text-sky-600" items={["LKPD pada setiap pertemuan", "Latihan soal di setiap pertemuan"]} />
          </Card>
          <Card className="border-violet-200 bg-violet-50/50">
            <h3 className="mb-4 text-lg font-bold text-violet-800">🧾 Instrumen Sumatif — 2× Ulangan Harian</h3>
            <List
              icon="•"
              color="text-violet-600"
              items={["UH 1: materi Fungsi hingga Komposisi Fungsi", "UH 2: materi Komposisi 3 Fungsi hingga Invers Komposisi Fungsi"]}
            />
          </Card>
        </div>
      </Section>
      <Section title="Desain Instrumen Ulangan Harian">
        <Table
          head={["Aspek Desain", "Penjelasan"]}
          rows={[
            ["Bentuk soal", "Uraian — menuntut peserta didik menunjukkan proses penyelesaian, bukan hanya jawaban akhir"],
            ["Tujuan", "Menilai pemahaman konsep secara lebih mendalam"],
            ["Kisi-kisi", "Disusun berdasarkan tujuan pembelajaran pada setiap RPP"],
            ["Tingkat kesulitan", "Tersebar dari pemahaman dasar hingga aplikasi"],
          ]}
        />
      </Section>
      <Section title="Tindak Lanjut Hasil Penilaian">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-amber-200 bg-amber-50/50">
            <h3 className="mb-3 text-lg font-bold text-amber-800">🔁 Kelompok Remedial</h3>
            <p className="text-slate-700">
              Berdasarkan hasil UH pertama, sebagian peserta didik memerlukan penguatan konsep dasar fungsi dan komposisi fungsi. Kelompok remedial mendapatkan{" "}
              <b>pendampingan lebih intensif pada konsep dasar</b>.
            </p>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <h3 className="mb-3 text-lg font-bold text-emerald-800">🚀 Kelompok Pengayaan</h3>
            <p className="text-slate-700">
              Kelompok pengayaan mengerjakan <b>soal-soal aplikatif yang lebih menantang</b>. Pola pembagian dua kelompok ini saya terapkan kembali setelah UH kedua.
            </p>
          </Card>
        </div>
      </Section>
      <Section title="Analisis dan Temuan">
        <Quote>
          Dari hasil kedua UH, peserta didik umumnya lebih menguasai materi yang disampaikan dengan bantuan media visual/konkret (seperti pendekatan pada sudut pusat–sudut
          keliling) dibandingkan materi yang hanya disampaikan secara prosedural. Temuan ini menjadi salah satu dasar bagi saya untuk terus mengembangkan instrumen penilaian
          yang juga mengukur pemahaman konseptual, tidak hanya kemampuan prosedural/hitung.
        </Quote>
      </Section>
    </>
  );
}

/* ---------------- REFLEKSI ---------------- */
export function Refleksi() {
  return (
    <>
      <PageHeader icon="💭" title="Refleksi Diri" subtitle="Refleksi perjalanan PPL Mandiri di SMA Negeri 3 Salatiga, kelas XI 9." />
      <Section title="Konteks dan Pengalaman">
        <Quote>
          Praktik Pengalaman Lapangan Mandiri ini saya jalani di SMA Negeri 3 Salatiga, sekolah yang sama dengan tempat saya PPL Terbimbing pada semester sebelumnya.
          Kelanjutan di sekolah yang sama membuat saya tidak perlu lagi menjalani tahap orientasi dan observasi, dan memberi saya kesempatan untuk membandingkan langsung
          perkembangan kemampuan mengajar saya dari semester ke semester.
        </Quote>
        <Card className="mt-6">
          <p className="text-slate-600">
            Mengampu mata pelajaran <b>Matematika di kelas XI 9</b> menjadi ruang bagi saya untuk menerapkan secara utuh apa yang saya pelajari tentang{" "}
            <b>Pembelajaran Mendalam</b>, <b>asesmen</b>, dan <b>pendekatan sosial-emosional</b>, tanpa pendampingan penuh seperti sebelumnya.
          </p>
        </Card>
      </Section>
      <Section title="Dokumen Refleksi (Tautan)">
        <LinkNote>Baca dokumen refleksi lengkap melalui tautan Google Drive berikut.</LinkNote>
        <LinkGrid items={tautanRefleksi} />
      </Section>
      <Section title="Tantangan dan Momen Berharga">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-4 font-bold text-white">⚡ Tantangan Terbesar</div>
            <p className="p-5 text-slate-600">
              Menerapkan e-LKPD berbasis Liveworksheet pada materi Operasi Fungsi Aljabar. Kendala teknis — tampilan yang kurang jelas di HP dan hasil pengerjaan yang tidak
              tersimpan — membuat saya menyadari bahwa keputusan memilih media pembelajaran perlu dipikirkan lebih matang, termasuk mempertimbangkan perangkat yang
              benar-benar dimiliki dan digunakan peserta didik sehari-hari.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4 font-bold text-white">🌟 Momen Penguat</div>
            <p className="p-5 text-slate-600">
              Mengajarkan materi sudut pusat dan sudut keliling menggunakan media sederhana untuk membuktikan teorema memperkuat pemahaman saya tentang konsep Pembelajaran
              Mendalam: keterlibatan aktif dan pengalaman konkret peserta didik jauh lebih bermakna dibanding penyampaian rumus secara langsung.
            </p>
          </div>
        </div>
        <Card className="mt-6">
          <p className="text-slate-600">
            Keterlibatan saya dalam kegiatan non-mengajar — <b>piket 5S</b>, <b>kegiatan perpustakaan</b>, <b>Long March SMANTISA</b>, dan <b>orientasi siswa baru</b> —
            juga memperluas pemahaman saya bahwa peran guru tidak terbatas pada kegiatan akademik di dalam kelas.
          </p>
        </Card>
      </Section>
      <Section title="Perubahan Cara Pandang & Rencana ke Depan">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-indigo-200 bg-indigo-50/50">
            <h3 className="mb-3 text-lg font-bold text-indigo-800">🔄 Perubahan yang Saya Alami</h3>
            <List
              icon="✔"
              items={[
                "Lebih selektif dan berhati-hati dalam memilih media digital",
                "Lebih sering menghadirkan media visual atau konkret dalam pembelajaran matematika",
                "Gaya mengajar bergeser dari berpusat pada guru menjadi berpusat pada peserta didik",
              ]}
            />
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <h3 className="mb-3 text-lg font-bold text-emerald-800">🚀 Rencana Siklus Terakhir PPL Mandiri</h3>
            <List
              icon="🎯"
              items={[
                "Lebih konsisten menerapkan pembelajaran yang bermakna",
                "Lebih aktif berdiskusi dengan guru pamong dan teman sejawat setelah setiap sesi mengajar",
                "Menjadikan refleksi berkelanjutan sebagai kebiasaan profesional",
              ]}
            />
          </Card>
        </div>
      </Section>
      <Section>
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 to-sky-600 p-10 text-center text-white shadow-xl">
          <div className="text-4xl">🌱</div>
          <p className="mx-auto mt-4 max-w-2xl text-lg italic">"Membangun Pembelajaran Bermakna melalui Inovasi dan Refleksi Guru"</p>
          <p className="mt-2 text-sm text-blue-100">— {profil.nama}</p>
        </div>
      </Section>
    </>
  );
}
