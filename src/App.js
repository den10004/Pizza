import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import { Home } from "./Pages/Home";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";
import { Routes, Route } from "react-router-dom";

export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
