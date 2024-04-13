import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import City from "./Component/City/City";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:city/:id/:name" element={<City />} />
        <Route path="/:country/:city/:id/:name" element={<City />} />
      </Routes>
    </Router>
  );
};

export default App;
