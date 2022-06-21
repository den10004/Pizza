import React from "react";
import "./App.css";
import "./scss/app.scss";

import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { NotFoundBlock } from "./components/NotFoundBlock/index";
import FullPizza from "./pages/FullPizza";
import { Cart } from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
