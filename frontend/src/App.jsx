import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Films from './pages/Films';
import Basket from './pages/Basket';
import FilmDetails from './pages/FilmDetails';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Filmy</Link> 
        <Link to="/basket">Koszyk</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Films />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/film/:id" element={<FilmDetails />} />
      </Routes>
    </Router>
  );
}

export default App;