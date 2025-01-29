import React, { useEffect, useState } from "react";
import CardBookBorrowed from "./CardBookBorrowed";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../redux/slice/PustakawanSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../Element/Button";
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const BorrowedBooks = () => {
  const pustakawanLogin = useLogin();
  const message = useSelector((state) => state.pustakawan.message);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [bookFilter, setBookFilter] = useState([]);
  const allPustakawan = useSelector((state) => state.pustakawan.data);

  const books =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.borrowedBooks || [];

  useEffect(() => {
    if(books.length > 0) {
      setBookFilter(books);
    }
  }, [books]);

  useEffect(() => {
    if (message === "Terimakasih sudah mengembalikan buku") {
      MySwal.fire({
        title: "Buku Berhasil Dikembalikan!",
        text: "Terima kasih sudah mengembalikan buku ini.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setBookFilter(books); // Reset filter setelah buku dikembalikan
        setQuery("");
        dispatch(resetMessage());
      });
    }
  }, [message, dispatch]); // Tidak perlu memasukkan `books` dalam dependency array

  const handleSearch = () => {
    const searchValue = query.trim().toLowerCase();
    if (searchValue) {
      const filtered = books.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(searchValue)
      );
      setBookFilter(filtered);
    } else {
      setBookFilter(books);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setBookFilter(books);
    } else {
      const filtered = books.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(value.toLowerCase())
      );
      setBookFilter(filtered);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-12 w-full h-screen overflow-y-auto">
      {pustakawanLogin ? (
        <>
          <div className="mb-4 flex flex-col lg:flex-row justify-between items-center w-full mb-24">
            <header className="text-blue-500 py-4 px-6 w-full lg:w-auto">
            <h1 className="text-2xl font-semibold text-blue-500 text-center">
              Buku Pinjaman Anda
            </h1>
            </header>
            <div className="flex items-center w-full lg:w-auto rounded-lg p-2">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter book title"
                className="p-2 border border-gray-300 rounded mr-2 flex-grow w-full lg:w-auto"
              />
              <Button
                onClick={handleSearch}
                className={"bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"}
              >
                Search
              </Button>
            </div>
          </div>


          {bookFilter.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bookFilter.map((book) => (
                <CardBookBorrowed book={book} key={book.id}>
                  <CardBookBorrowed.HeaderCard book={book} />
                  <CardBookBorrowed.BodyCard book={book} />
                  <CardBookBorrowed.FooterCard book={book} />
                </CardBookBorrowed>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="text-center">Tidak ada buku yang dicari</div>
          ) : (
            <div className="text-center">Anda belum meminjam buku</div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center text-center space-y-6 flex-col">
          <span className="text-lg font-medium text-gray-600">
            Anda belum masuk.
          </span>
          <Link
            to="/sign-in"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Silahkan masuk
          </Link>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
