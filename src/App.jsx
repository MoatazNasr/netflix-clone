import { BrowserRouter, Route, Routes } from "react-router-dom";
import './GlobalStyles.css';
import Home from './pages/home/Home';
import MovieVid from './pages/movie/MovieVid'
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/movievideo:id" element={<MovieVid />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
