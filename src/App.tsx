import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Search from "./components/Search";
import Match from "./components/Match";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
