
const getEvents = () => {
  const events = [
    {
      id: 1,
      title: "Hari Membaca Nasional",
      date: "2025-02-15",
      description: "Bergabunglah dalam perayaan Hari Membaca Nasional dengan diskusi buku dan kegiatan membaca bersama.",
    },
    {
      id: 2,
      title: "Lomba Membaca Cepat",
      date: "2025-03-10",
      description: "Tunjukkan kemampuan membaca cepat Anda dan menangkan hadiah menarik!",
    },
    {
      id: 3,
      title: "Meet and Greet Penulis Terkenal",
      date: "2025-04-05",
      description: "Kesempatan bertemu dan berdiskusi langsung dengan Tere Liye, penulis terkenal Indonesia.",
    },
    {
      id: 4,
      title: "Workshop Menulis Cerpen",
      date: "2025-05-20",
      description: "Belajar teknik menulis cerpen dengan bimbingan penulis profesional.",
    },
    {
      id: 5,
      title: "Diskusi Buku Bulanan",
      date: "2025-06-15",
      description: "Diskusikan buku pilihan setiap bulan bersama komunitas pecinta buku.",
    },
    {
      id: 6,
      title: "Pelatihan Literasi Digital",
      date: "2025-07-05",
      description: "Tingkatkan kemampuan Anda dalam memanfaatkan sumber daya digital di perpustakaan.",
    },
    {
      id: 7,
      title: "Pameran Buku Langka",
      date: "2025-08-10",
      description: "Lihat koleksi buku langka yang jarang ditemukan di tempat lain.",
    },
    {
      id: 8,
      title: "Lomba Resensi Buku",
      date: "2025-09-15",
      description: "Tulis resensi buku terbaik dan menangkan hadiah menarik.",
    },
    {
      id: 9,
      title: "Malam Puisi dan Sastra",
      date: "2025-10-05",
      description: "Bacakan puisi atau karya sastra favorit Anda di malam penuh keindahan bahasa.",
    },
    {
      id: 10,
      title: "Seminar Pendidikan",
      date: "2025-11-20",
      description: "Seminar dengan pembicara ahli membahas peran perpustakaan dalam pendidikan.",
    },
    {
      id: 11,
      title: "Lomba Cerita Bergambar Anak",
      date: "2025-12-10",
      description: "Ajang bagi anak-anak untuk membuat cerita bergambar yang kreatif.",
    },
    {
      id: 12,
      title: "Hari Keluarga di Perpustakaan",
      date: "2026-01-15",
      description: "Acara khusus untuk keluarga dengan berbagai aktivitas menarik.",
    },
    {
      id: 13,
      title: "Kelas Belajar Bahasa Asing",
      date: "2026-02-10",
      description: "Belajar dasar-dasar bahasa asing populer secara gratis.",
    },
    {
      id: 14,
      title: "Pelatihan Pemrograman Dasar",
      date: "2026-03-05",
      description: "Kuasai dasar-dasar pemrograman dalam pelatihan intensif ini.",
    },
    {
      id: 15,
      title: "Lomba Menyusun Puzzle Buku",
      date: "2026-04-15",
      description: "Tantang kemampuan Anda menyusun puzzle dengan tema buku.",
    },
    {
      id: 16,
      title: "Bedah Buku Bestseller",
      date: "2026-05-10",
      description: "Diskusi mendalam tentang buku bestseller terbaru.",
    },
    {
      id: 17,
      title: "Festival Film Adaptasi Buku",
      date: "2026-06-20",
      description: "Tonton film adaptasi buku favorit dan diskusikan bersama.",
    },
    {
      id: 18,
      title: "Perpustakaan Keliling",
      date: "2026-07-10",
      description: "Layanan perpustakaan bergerak untuk menjangkau komunitas lokal.",
    },
  ];
  

      localStorage.setItem("events", JSON.stringify(events));

      return events;
};



getEvents();
export default getEvents;