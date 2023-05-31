import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, {  } from "react";
import SigninComponent from './Components/Authentication/Signin';
import SignupComponent from './Components/Authentication/Signup';
import BlogComponent from "./Components/Blogs/Blog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import { About } from "./Components/About";
import { Home } from "./Components/Home";


function App() {

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/signin" element={<SigninComponent />} />
          <Route path="/blogs" element={<BlogComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
