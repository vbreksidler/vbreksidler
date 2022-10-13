/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';
import BotaoVerdeEscuro
  from '../../componentes/Buttons/BotaoVerdeEscuro/BotaoVerdeEscuro';
import { CartContext } from '../../contexts/CartContext';
import styles from './styles.module.scss';

function Products() {
  const [products, setProducts] = React.useState([]);
  const { setCart, setTotalPrice } = useContext(CartContext);
  const [input, setInput] = React.useState({});
  const [checkoutDisable, setCheckoutDisable] = React.useState(true);
  const navigate = useNavigate();
  const getProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    return setInput({ ...input, [name]: +value });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    const productsWithQuantity = products.map((product) => {
      const quantity = input[product.id] || 0;
      return { ...product, quantity };
    });
    const totalPrice = productsWithQuantity
      .reduce((acc, { price, quantity }) => acc + (+price * quantity), 0);
    if (totalPrice > 0) setCheckoutDisable(false);
  }, [input, products]);

  const changeProductsQuantity = (type, product) => {
    if (input[product.id] === 0 && type === 'decrement') {
      return null;
    }
    if (!input[product.id] && type === 'increment') {
      return setInput({ ...input, [product.id]: 1 });
    }
    if (type === 'increment') {
      return setInput({ ...input, [product.id]: input[product.id] + 1 });
    }
    return setInput({ ...input, [product.id]: input[product.id] - 1 });
  };

  const getTotalPrice = () => {
    const productsWithQuantity = products.map((product) => {
      const quantity = input[product.id] || 0;
      return { ...product, quantity };
    });
    const totalPrice = productsWithQuantity
      .reduce((acc, { price, quantity }) => acc + (+price * quantity), 0);
    return totalPrice;
  };

  const handleSetCart = () => {
    const productsWithQuantity = products.map((product) => {
      const quantity = input[product.id] || 0;
      return { ...product, quantity };
    });
    const itemsInCart = productsWithQuantity
      .filter(({ quantity }) => quantity !== 0);
    setCart(itemsInCart);
    setTotalPrice(getTotalPrice());
    navigate('/customer/checkout');
  };

  return (
    <div className={ styles.container }>
      {products.map?.((product, index) => (
        <div
          className={ styles.cardContainer }
          key={ index }
        >
          <p
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            { product.name }
          </p>
          <span
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            R$
            { product.price.replace('.', ',') }
          </span>
          <img
            src={ product.urlImage }
            alt={ product.name }
            width="100px"
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          />
          <div className={ styles.QuantityButtonContainer }>
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onClick={ () => changeProductsQuantity('decrement', product) }
            >
              -
            </button>
            <input
              type="text"
              className="inputQuantity"
              name={ product.id }
              defaultValue={ 0 }
              value={ input[product.id] }
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ (e) => handleInput(e) }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              onClick={ () => changeProductsQuantity('increment', product) }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <BotaoVerdeEscuro
        click={ handleSetCart }
        placeholder={ getTotalPrice() }
        isDisabled={ checkoutDisable }
      />
    </div>
  );
}

export default Products;
