import { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import LibraryPage from "./library";
import Books from "./books";
import HomePage from "./home";
import ContactPage from "./contact";
import LoginPage from "./login-page";
import RegisterPage from "./register-page";
import BookPage from "./book-page";



function App() {

  return (
    <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          </Routes>
    </>

  );
}

export default App;
