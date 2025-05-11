import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

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
    <div className="basket-container">
      <h1>Twój koszyk</h1>
      {basket.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <>
          <table className="basket-table">
            <thead>
              <tr>
                <th>Tytuł filmu</th>
                <th>Cena</th>
                <th>Usuń z koszyka</th>
              </tr>
            </thead>
            <tbody>
              {basket.map(film => (
                <tr key={film.id}>
                  <td>{film.title}</td>
                  <td>{film.price.toFixed(2)} PLN</td>
                  <td>
                    <button 
                      onClick={async () => {
                        await axios.delete(`http://localhost:8080/api/basket/delete/${film.id}`, {
                          withCredentials: true
                        });
                        getBasket();
                      }}
                      className="remove-btn"
                      title="Usuń z koszyka"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Suma:</strong></td>
                <td className="total-amount">
                  <strong>{basket.reduce((sum, film) => sum + film.price, 0).toFixed(2)} PLN</strong>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}

export default Basket;