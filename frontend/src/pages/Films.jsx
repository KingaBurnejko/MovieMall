import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Films() {

  const [filmy, setFilmy] = useState([]);

const dodajDoKoszyka = async (filmId) => {
    const response = await axios.post(
      `http://localhost:8080/api/basket/add/${filmId}`,
      {},
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    alert(response.data);
};

  useEffect(() => {
    axios.get('http://localhost:8080/api/films')
      .then(response => setFilmy(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Katalog filmów</h1>
      {filmy.map(film => (
        <div key={film.id}>
          <h3>
            <Link to={`/film/${film.id}`}>{film.title}</Link>
          </h3>
          <p>Kategoria: {film.category}</p>
          <button onClick={() => dodajDoKoszyka(film.id)}>Dodaj do koszyka</button>
          
        </div>
      ))}
    </div>
  );
}

export default Films;