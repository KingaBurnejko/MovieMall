import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Films from './pages/Films';
import Basket from './pages/Basket';
import FilmDetails from './pages/FilmDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/" className="app-name">MovieMall</Link>
          <div className="nav-links">
            <Link to="/">Katalog filmów</Link>
            <Link to="/basket">Koszyk</Link>
          </div>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path="/" element={<Films />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/film/:id" element={<FilmDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;