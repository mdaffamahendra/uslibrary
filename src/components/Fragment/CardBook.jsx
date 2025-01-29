import { useDispatch, useSelector } from "react-redux";
import { borrowBook, resetMessage } from "../../redux/slice/PustakawanSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const MySwal = withReactContent(Swal);

const CardBook = ({ book, children, className = "" }) => {
  return (
    <div
      className={`min-w-[300px] max-w-md h-[450px] bg-white border border-gray-300 rounded-lg overflow-hidden p-4 m-4 flex flex-col ${className} shadow-lg`}
    >
      {children}
    </div>
  );
};

const HeaderCard = ({ book }) => {
  return (
    <img
      src={
        book.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/100"
      }
      alt={book.volumeInfo.title}
      className="w-32 h-48 object-cover p-3"
    />
  );
};

const BodyCard = ({ book }) => {
  return (
    <div className="p-3">
      <h3 className="md:text-md text-sm font-semibold text-gray-800">
        {book.volumeInfo.title || "No Title"}
      </h3>
      <p className="text-xs text-gray-600 mt-1">
        <strong>Authors:</strong>{" "}
        {book.volumeInfo.authors?.join(", ") || "Unknown Authors"}
      </p>
      <p className="text-xs text-gray-600 mt-1">
        <strong>Publisher:</strong>{" "}
        {book.volumeInfo.publisher || "Unknown Publisher"}
      </p>
      <p className="text-xs text-gray-600 mt-1">
        <strong>Description:</strong>{" "}
        {book.volumeInfo.description
          ? book.volumeInfo.description.split(" ").slice(0, 10).join(" ") +
            "..."
          : "No description available"}
      </p>
    </div>
  );
};

const FooterCard = ({ book }) => {
  const pustakawanLogin = useLogin();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.pustakawan.message);
  const navigate = useNavigate();
  const allPustakawan = useSelector((state) => state.pustakawan.data);
  const bookBorrowed =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.borrowedBooks || [];
  const isBorrowed = bookBorrowed.find((item) => item.id === book.id);
  const { idPustakawan } = pustakawanLogin;

  const handleBorrow = () => {
    if (!pustakawanLogin) {
      alert("Maaf, anda harus masuk terlebih dahulu");
      navigate("/sign-in");
    } else if (isBorrowed) {
      alert("Anda sudah meminjam buku ini sebelumnya");
    } else {
      dispatch(borrowBook({ idPustakawan, book }));
    }
  };

  const handleDetail = () => {
    if (!pustakawanLogin) {
      alert("Maaf, anda harus masuk terlebih dahulu");
      navigate("/sign-in");
    } else {
      navigate(`/detail-book/${book.id}`);
    }
  };

  useEffect(() => {
    if (message) {
      if (message === "Buku berhasil dipinjam") {
        MySwal.fire({
          title: "Buku Berhasil Dipinjam!",
          text: "Untuk pengambilan buku, pastikan Anda sudah melakukan peminjaman melalui sistem. Setelah itu, datanglah ke loket pengambilan buku di perpustakaan dengan membawa bukti peminjaman, seperti kartu anggota, kode peminjaman, atau bukti digital lainnya. Petugas akan memverifikasi data Anda. Setelah verifikasi selesai, buku yang Anda pinjam akan diserahkan.",
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

  return (
    <div className="p-3">
      <div className="flex justify-center items-center mt-3 gap-2">
        <button
          type="button"
          className="bg-blue-500 text-white text-xs px-3 py-2 rounded hover:bg-blue-600 w-full"
          onClick={handleDetail}
        >
          Detail
        </button>
        {/* <button
          type="button"
          className={`bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 ${
            isBorrowed ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
          }`}
          onClick={handleBorrow}
          disabled={isBorrowed}
        >
          {isBorrowed && pustakawanLogin ? "Sudah Dipinjam" : "Pinjam"}
        </button> */}
      </div>
    </div>
  );
};

CardBook.HeaderCard = HeaderCard;
CardBook.BodyCard = BodyCard;
CardBook.FooterCard = FooterCard;
export default CardBook;
