import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InfiniteScroll from './Components/InfiniteScroll';
import Pagination from './Components/Pagination';
import Grid from './Components/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Kitty Media</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Infinite Scroll</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pagination">Pagination</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grid">Grid</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<InfiniteScroll />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/grid" element={<Grid />} />
      </Routes>
    </Router>
  );
}

export default App;
