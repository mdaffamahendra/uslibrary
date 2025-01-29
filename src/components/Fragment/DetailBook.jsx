import React, { useEffect, useState } from "react";
import { fetchDetailBook } from "../../services/books-api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { borrowBook, resetMessage } from "../../redux/slice/PustakawanSlice";
import useLogin from "../../hooks/useLogin";
const MySwal = withReactContent(Swal);

const DetailBook = () => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const [loading, setLoading] = useState(true);
  const message = useSelector((state) => state.pustakawan.message);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pustakawanLogin = useLogin();
  const { idPustakawan } = pustakawanLogin;
  const allPustakawan = useSelector((state) => state.pustakawan.data);
  const bookBorrowed =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.borrowedBooks || [];
  const isBorrowed = bookBorrowed.find((item) => item.id === bookId);

  const handleBorrow = () => {
    dispatch(borrowBook({ idPustakawan, book }));
  };

  const handleNavigation = () => {
    navigate("/peminjaman");
  };

  useEffect(() => {
    const getDetailBook = async () => {
      try {
        const data = await fetchDetailBook(bookId);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil detail buku.");
        setLoading(false);
      }
    };

    getDetailBook();
  }, [bookId]);

  useEffect(() => {
    if (message) {
      if (message === "Buku berhasil dipinjam") {
        MySwal.fire({
          title: "Buku Berhasil Dipinjam!",
          text: "Silakan ambil buku di loket dengan membawa bukti peminjaman.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(resetMessage()); // Reset message setelah alert
        });
      } else if (message === "Buku sudah dipinjam oleh Anda") {
        MySwal.fire({
          title: "Peminjaman Gagal!",
          text: "Anda sudah meminjam buku ini sebelumnya.",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(resetMessage()); // Reset message setelah alert
        });
      }
    }
  }, [message, dispatch]);

  if (loading) return <span className="loading loading-bars loading-lg text-blue-500 mx-auto"></span>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex-1 p-12 w-full h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto rounded">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            className="w-32 h-48 lg:w-48 lg:h-72 object-cover rounded-lg shadow-lg"
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{book.volumeInfo.title}</h1>
            <p className="text-sm text-gray-500">
              <strong>Penulis:</strong> {book.volumeInfo.authors.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Penerbit:</strong> {book.volumeInfo.publisher}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Tanggal Terbit:</strong> {book.volumeInfo.publishedDate}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Jumlah Halaman:</strong> {book.volumeInfo.pageCount}{" "}
              Halaman
            </p>
            <p className="text-sm text-gray-500">
              <strong>Kategori:</strong> {book.volumeInfo.categories.join(", ")}
            </p>
            {book.saleInfo.buyLink && (
              <p className="text-sm text-gray-500">
                <strong>Pembelian Buku:</strong> Anda bisa membeli buku lewat
                Google Play Book
              </p>
            )}
            <div className="flex justify-start items-center gap-5">
              <button
                className={`mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer ${
                  isBorrowed
                    ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                    : ""
                }`}
                onClick={isBorrowed ? null : handleBorrow}
                disabled={isBorrowed}
              >
                Pinjam Buku
              </button>
              {book.saleInfo.buyLink && (
                <a
                  href={book.saleInfo.buyLink}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Beli Buku
                </a>
              )}
            </div>
            {isBorrowed && (
              <p>
                Ingin kembalikan buku?{" "}
                <Link
                  onClick={handleNavigation}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Menuju halaman peminjaman
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Deskripsi</h2>
          <p
            className="mt-4 text-sm lg:text-md text-gray-700"
            dangerouslySetInnerHTML={{
              __html: `${book.volumeInfo.description || "Tidak ada deskripsi"}`,
            }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Informasi ISBN</h2>
          <ul className="mt-4 list-disc pl-6 text-gray-700">
            {book.volumeInfo.industryIdentifiers.map((identifier, index) => (
              <li key={index}>
                <strong>{identifier.type}:</strong> {identifier.identifier}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DetailBook;
