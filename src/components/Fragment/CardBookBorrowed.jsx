import { useDispatch, useSelector } from "react-redux";
import { resetMessage, unBorrowBook } from "../../redux/slice/PustakawanSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const MySwal = withReactContent(Swal);

const CardBookBorrowed = ({ book, children }) => {
    return (
        <div className="max-w-xs mx-auto bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden p-3 m-3 flex justify-around flex-col">
            {children}
        </div>
    );
};

const HeaderCard = ({ book }) => {
    return (
        <img
            src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/100"}
            alt={book.volumeInfo.title}
            className="w-32 h-48 object-cover p-3"
        />
    );
};

const BodyCard = ({ book }) => {
    return (
        <div className="p-3">
            <h3 className="text-md font-semibold text-gray-800">{book.volumeInfo.title || "No Title"}</h3>
            <p className="text-xs text-gray-600 mt-1">
                <strong>Authors:</strong> {book.volumeInfo.authors?.join(", ") || "Unknown Authors"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
                <strong>Publisher:</strong> {book.volumeInfo.publisher || "Unknown Publisher"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
                <strong>Description:</strong> {book.volumeInfo.description
                    ? book.volumeInfo.description.split(" ").slice(0, 10).join(" ") + "..."
                    : "No description available"}
            </p>
        </div>
    );
};

const FooterCard = ({ book, type = "" }) => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.pustakawan.message); 
    const navigate = useNavigate();
    const pustakawanLogin = useLogin();
    const {idPustakawan} = pustakawanLogin;

    const handleUnborrow = () => {
        dispatch(unBorrowBook({idPustakawan, book}));
    };

    const handleDetail = () => {
        navigate(`/library/detail-book/${book.id}`);
    };

    useEffect(() => {
        if (message) {
            if (message === "Buku berhasil dikembalikan") {
                MySwal.fire({
                    title: "Buku Berhasil Dikembalikan!",
                    text: "Terima kasih telah mengembalikan buku ini.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    dispatch(resetMessage()); // Reset message setelah alert
                });
            } else if (message === "Gagal mengembalikan buku") {
                MySwal.fire({
                    title: "Pengembalian Gagal!",
                    text: "Terjadi kesalahan saat mencoba mengembalikan buku.",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(() => {
                    dispatch(resetMessage()); // Reset message setelah alert
                });
            }
        }
    }, [message, dispatch]);

    return type === "profile" ? (
        <div></div>
    ) : (
        <div className="p-3">
            <div className="flex justify-center items-center mt-3 gap-2">
                <button
                    type="button"
                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                    onClick={handleDetail}
                >
                    Detail
                </button>
                <button
                    type="button"
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                    onClick={handleUnborrow}
                >
                    Kembalikan
                </button>
            </div>
        </div>
    );
    
};

CardBookBorrowed.HeaderCard = HeaderCard;
CardBookBorrowed.BodyCard = BodyCard;
CardBookBorrowed.FooterCard = FooterCard;
export default CardBookBorrowed;
