import { createSlice } from "@reduxjs/toolkit";

const PustakawanSlice = createSlice({
    name: "pustakawan",
    initialState: {
        data: JSON.parse(localStorage.getItem("pustakawan")) || [],
        status: true,
        message: null,
    },
    reducers: {
        signUpPustakawan: (state, action) => {
            state.data.push(action.payload);
            localStorage.setItem("pustakawan", JSON.stringify(state.data));
        },
        borrowBook: (state, action) => {
            const { idPustakawan, book } = action.payload;
            const pustakawan = state.data.find(user => user.idPustakawan === idPustakawan);

            if (pustakawan) {
                const isBookBorrowed = pustakawan.borrowedBooks.find(b => b.id === book.id);

                if (isBookBorrowed) {
                    state.status = false;
                    state.message = "Buku sudah dipinjam oleh Anda";
                } else {
                    pustakawan.borrowedBooks.push(book);
                    state.status = true;
                    state.message = "Buku berhasil dipinjam";
                    localStorage.setItem("pustakawan", JSON.stringify(state.data));
                }
            } else {
                state.status = false;
                state.message = "Pustakawan tidak ditemukan";
            }
        },
        unBorrowBook: (state, action) => {
            const { idPustakawan, book } = action.payload;
            const pustakawan = state.data.find(user => user.idPustakawan === idPustakawan);

            if (pustakawan) {
                const updatedBooks = pustakawan.borrowedBooks.filter(b => b.id !== book.id);

                pustakawan.borrowedBooks = updatedBooks;
                state.status = true;
                state.message = "Buku berhasil dikembalikan";
                localStorage.setItem("pustakawan", JSON.stringify(state.data));
            } else {
                state.status = false;
                state.message = "Pustakawan tidak ditemukan";
            }
        },
        resetMessage: (state) => {
            state.message = null; // Reset message
        },
        joinEvents: (state, action) => {
            const { idPustakawan, event } = action.payload;

            const pustakawan = state.data.find(user => user.idPustakawan === idPustakawan);
            if(pustakawan){
                const isEventExist = pustakawan.eventParticipations.find(e => e.id === event.id);

                if (isEventExist) {
                    state.status = false;
                    state.message = "Anda sudah mengikuti event ini";
                } else {
                    pustakawan.eventParticipations.push(event);
                    state.status = true;
                    state.message = "Anda berhasil daftar ke event!";
                    localStorage.setItem("pustakawan", JSON.stringify(state.data));
                }
            } else {
                state.status = false;
                state.message = "Pustakawan tidak ditemukan";
            }
        } 
    },
});

export const { signUpPustakawan, borrowBook, unBorrowBook, resetMessage, joinEvents } = PustakawanSlice.actions;
export default PustakawanSlice.reducer;
