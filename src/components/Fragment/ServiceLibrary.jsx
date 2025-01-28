import React from "react";

const ServiceLibrary = () => {
  return (
<div className="flex-1 p-6 w-full h-screen overflow-y-auto">
  <header className="bg-blue-600 text-white py-10 text-center shadow-md rounded-lg">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
      Layanan Perpustakaan
    </h1>
    <p className="text-sm sm:text-base lg:text-lg mt-2">
      Informasi tentang layanan dan fasilitas yang tersedia di perpustakaan kami.
    </p>
  </header>

  <main className="container mx-auto py-10 px-6 lg:px-16">
    <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-2">
        Layanan Utama
      </h2>
      <ul className="list-disc list-inside mt-4 text-sm sm:text-base lg:text-lg text-gray-700 space-y-2">
        <li>Peminjaman dan pengembalian buku.</li>
        <li>Layanan referensi untuk membantu pencarian sumber informasi.</li>
        <li>Akses ke koleksi digital seperti e-book dan jurnal online.</li>
        <li>Konsultasi penelitian dan literasi informasi.</li>
      </ul>
    </section>

    <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-2">
        Fasilitas Perpustakaan
      </h2>
      <ul className="list-disc list-inside mt-4 text-sm sm:text-base lg:text-lg text-gray-700 space-y-2">
        <li>Ruang baca yang nyaman dengan akses Wi-Fi gratis.</li>
        <li>Komputer untuk pencarian katalog dan penggunaan internet.</li>
        <li>Ruang diskusi kelompok.</li>
        <li>Area khusus untuk membaca anak-anak.</li>
        <li>Loker penyimpanan barang.</li>
      </ul>
    </section>

    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-2">
        Jam Operasional
      </h2>
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">
        Perpustakaan kami buka setiap hari:
      </p>
      <ul className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 space-y-2">
        <li>
          <span className="font-semibold">Senin - Jumat:</span> 08.00 - 17.00
        </li>
        <li>
          <span className="font-semibold">Sabtu:</span> 08.00 - 12.00
        </li>
        <li>
          <span className="font-semibold">Minggu & Hari Libur Nasional:</span> Tutup
        </li>
      </ul>
    </section>
  </main>
</div>

  );
};

export default ServiceLibrary;
