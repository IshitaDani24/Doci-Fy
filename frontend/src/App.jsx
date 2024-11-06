import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages";
import NoPage from "./pages/noPage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CreateDocs from "./pages/CreateDocs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/createDocs/:docsId"
          element={<ProtectedRoute element={<CreateDocs />} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
