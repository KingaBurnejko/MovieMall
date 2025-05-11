import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import './../styles/Films.css';

function Films() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchFilms = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:8080/api/films/${selectedCategory}`
        : `http://localhost:8080/api/films`;
      const response = await axios.get(url);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addToBasket = async (movieId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/basket/add/${movieId}`,
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      alert(response.data);
    } catch (error) {
      alert('Error while adding to basket');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [selectedCategory]);

  return (
    <div className="films-container">
      <h1>Katalog filmów</h1>

      <div className="filter-section">
        <label htmlFor="category">Filtruj kategorię: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Wszystkie</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table className="movies-table">
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Kategoria</th>
            <th>Cena</th>
            <th>Dodaj do koszyka</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Link to={`/film/${movie.id}`}>{movie.title}</Link>
              </td>
              <td>{movie.category}</td>
              <td>{movie.price.toFixed(2)} PLN</td>
              <td>
                <button 
                  onClick={() => addToBasket(movie.id)}
                  className="add-to-basket-btn"
                  title="Dodaj do koszyka"
                >
                  <FaShoppingCart /> {/* Ikona koszyka */}
                  {/* Lub strzałka: <FaArrowRight /> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Films;