import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUpPage from "./pages/signUp.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import SignInPage from "./pages/signIn.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import DetailPage from "./pages/DetailPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import LibrarySearchPage from "./pages/LibrarySearchPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BorrowedPage from "./pages/BorrowedPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import EventPage from "./pages/EventPage.jsx";
import ProfilePage from "./pages/ProfilPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/library",
    element: <LibraryPage />,
  },
  {
    path: "/library/search",
    element: <LibrarySearchPage />,
  },
  {
    path: "/library/detail-book/:bookId",
    element: <DetailPage />,
  },
  {
    path: "/library/peminjaman",
    element: <BorrowedPage />
  },
  {
    path: "/library/event",
    element: <EventPage />
  },
  {
    path: "/library/service",
    element: <ServicePage />
  },
  {
    path: "/library/profil",
    element: <ProfilePage />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
