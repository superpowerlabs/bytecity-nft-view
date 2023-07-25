import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import lazy from "./LazyComponent";
// import Home from "../views/Home";
import Attr from "../views/Attr";


const routes = () => {
  return (
      <Routes>
        <Route path="/" index element={<Attr />} />
        <Route path="/" element={<Attr />}>
          <Route
            path=":type/:chain/:id"
            element={<Attr />}
          ></Route>
        </Route>
        <Route path="*" element={ <Navigate to='/' />} />
      </Routes>
    );
  };

export default routes;
