import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import lazy from "./LazyComponent";
// import Home from "../views/Home";
import Attr from "../views/Attr";


const routes = () => {
  return (
      <Routes>
        <Route exact path="/:type/:chain/:id" element={<Attr />} />
        <Route exact path="/" element={<Attr />} />
        <Route path="*" element={ <Navigate to='/' />} />
      </Routes>
    );
  };

export default routes;
