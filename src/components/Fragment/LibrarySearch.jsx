import React, { useState, useEffect } from "react";
import Button from "../Element/Button";
import CardBook from "./CardBook";
import { fetchBooks } from "../../services/books-api";
import { useNavigate, useSearchParams } from "react-router-dom";

const LibrarySearch = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const queryFromURL = searchParams.get("q");
    if (queryFromURL) {
      setQuery(queryFromURL); 
      setSearchQuery(queryFromURL); 
    }
  }, [searchParams]);

  useEffect(() => {
    const searchBooks = async () => {
      if (searchQuery) {
        setLoading(true); 
        try {
          const results = await fetchBooks(searchQuery);
          setBooks(results); 
          setError(null); 
        } catch (error) {
          setError("Error fetching search results."); 
        } finally {
          setLoading(false); 
        }
      }
    };

    searchBooks();
  }, [searchQuery]); 

  // Ketika tombol search ditekan
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`); // Ubah URL
      setSearchQuery(query); // Tetapkan query ke searchQuery untuk fetch data
    }
  };

  return (
    <main className="flex-1 flex flex-col p-12 w-full h-screen overflow-y-auto">
      <header className="mb-4 flex flex-col lg:flex-row justify-between items-center w-full">
        <h1 className="text-2xl font-semibold text-blue-700 text-center lg:text-left lg:mb-0 mb-4">
          Hasil Pencarian "{searchQuery}"
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            value={query} // Tampilkan nilai query di input
            onChange={(e) => setQuery(e.target.value)} // Update query saat input berubah
            placeholder="Enter book title"
            className="p-2 border border-gray-300 rounded mr-2 bg-white"
          />
          <Button
            onClick={handleSearch} // Panggil handleSearch saat tombol diklik
            className={"bg-blue-500 text-white px-4 py-2 rounded"}
          >
            Search
          </Button>
        </div>
      </header>

      {loading && <span className="loading loading-bars loading-lg text-blue-500 mx-auto mb-12"></span>} {/* Tampilkan loading jika sedang loading */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Tampilkan error jika ada */}
      <div className="flex flex-wrap gap-2">
        {books.length === 0 ? (
          <div className="w-full text-center p-4 text-gray-600">
            <p>Loading...</p> {/* Pesan jika tidak ada hasil */}
          </div>
        ) : (
          books.map((book) => (
            <CardBook book={book} key={book.id}>
              <CardBook.HeaderCard book={book} />
              <CardBook.BodyCard book={book} />
              <CardBook.FooterCard book={book} />
            </CardBook>
          ))
        )}
      </div>
    </main>
  );
};

export default LibrarySearch;
