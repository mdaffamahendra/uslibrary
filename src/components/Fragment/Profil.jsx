import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import CardBookBorrowed from "./CardBookBorrowed";
import CardEvent from "./CardEvent";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const pustakawanLogin = useLogin();
  const { idPustakawan } = pustakawanLogin;
  const allPustakawan = useSelector((state) => state.pustakawan.data) || [];
  const books =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.borrowedBooks || [];
  const events =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.eventParticipations || [];

  const pustakawan = allPustakawan.find(
    (user) => user.idPustakawan === idPustakawan
  );
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex-1 p-6 w-full h-screen overflow-y-auto">
        {pustakawanLogin ? (
          <>
            {/* Tampilan profil ketika sudah login */}
            <div className="flex items-center space-x-4 mb-8 p-8 bg-blue-600 rounded-lg shadow-md">
              <div>
                <h2 className="text-3xl font-semibold text-white">{pustakawan.username}</h2>
                <p className="text-lg text-gray-600 text-white">{pustakawan.email}</p>
                <p className="text-lg text-gray-600 text-white">ID Anggota: {pustakawan.idPustakawan}</p>
              </div>
            </div>

            <div className="mb-4 p-8">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Peminjaman Buku" {...a11yProps(0)} />
                <Tab label="Kehadiran Event" {...a11yProps(1)} />
              </Tabs>
            </div>

            <TabPanel value={tabValue} index={0}>
              <div className="space-y-4">
                {books.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                      <CardBookBorrowed book={book} key={book.id}>
                        <CardBookBorrowed.HeaderCard book={book} />
                        <CardBookBorrowed.BodyCard book={book} />
                        <CardBookBorrowed.FooterCard
                          book={book}
                          type={"profile"}
                        />
                      </CardBookBorrowed>
                    ))}
                  </div>
                ) : (
                  <div>Anda belum meminjam buku</div>
                )}
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <div className="space-y-4">
                {events.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                      <CardEvent event={event} key={event.id}>
                        <CardEvent.HeaderCard event={event} />
                        <CardEvent.BodyCard event={event} />
                        <CardEvent.FooterCard
                          event={event}
                          type={"profile"}
                        />
                      </CardEvent>
                    ))}
                  </div>
                ) : (
                  <div>Anda belum mengikuti event</div>
                )}
              </div>
            </TabPanel>
          </>
        ) : (
          // Tampilan jika pengguna belum login
          <div className="flex items-center justify-center text-center space-y-6 flex-col">
            <span className="text-lg font-medium text-gray-600">
              Anda belum masuk
            </span>
            <Link
              to="/sign-in"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Masuk untuk melihat profil
            </Link>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Profile;
