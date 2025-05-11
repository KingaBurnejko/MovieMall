import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!film) return <div>Film not found</div>;

  return (
    <div>
      <h1>{film.title}</h1>
      <p>Kategoria: {film.category}</p>
      <p>Rok produkcji: {film.production_year}</p>
      <p>Opis: {film.details}</p>
      <p>Cena: {film.price} PLN</p>
    </div>
  );
}

export default FilmDetails;
