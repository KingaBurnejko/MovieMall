import { useEffect, useState } from 'react';
import axios from 'axios';

function Basket() {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBasket = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/basket', {
        withCredentials: true
      });
      setBasket(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Twój koszyk</h1>
      {basket.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <>
          {basket.map(film => (
            <div key={film.id} className="film-w-koszyku">
              <h3>{film.title}</h3>
              <p>Cena: {film.price} PLN</p>
              <button 
                onClick={async () => {
                  await axios.delete(`http://localhost:8080/api/basket/delete/${film.id}`, {
                    withCredentials: true
                  });
                  getBasket();
                }}
              >
                Usuń
              </button>
            </div>
          ))}
          <h2>
            Suma: {basket.reduce((sum, film) => sum + film.price, 0)} PLN
          </h2>
        </>
      )}
    </div>
  );
}

export default Basket;