import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import './../styles/FilmDetails.css';

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/film/${id}`)
      .then(response => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error with getting film details');
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  const addToBasket = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/basket/add/${id}`,
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      alert(response.data);
    } catch (error) {
      alert('Error while adding to basket');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!film) return <div>Film not found</div>;

  return (
    <div className="film-details">
      <h1>{film.title}</h1>
      <div className="film-info">
        <table className="film-details-table">
  <tbody>
    <tr>
      <td><strong>Kategoria</strong></td>
      <td>{film.category}</td>
    </tr>
    <tr>
      <td><strong>Opis</strong></td>
      <td>{film.details}</td>
    </tr>
    <tr>
      <td><strong>Rok produkcji</strong></td>
      <td>{film.production_year}</td>
    </tr>
    <tr>
      <td><strong>Cena</strong></td>
      <td>{film.price.toFixed(2)} PLN</td>
    </tr>
  </tbody>
</table>
        <button 
          onClick={addToBasket}
          className="add-to-basket-btn"
          title="Dodaj do koszyka"
        >
          <FaShoppingCart /> Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}

export default FilmDetails;