import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import api from '../../helpers/api';
import './AddressCheckout.css';

function AddressCheckout() {
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [vendedor, setVendedor] = useState({ all: [], select: '' });
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalPrice = cart
    .reduce((acc, cartx) => acc + Number(cartx.price) * Number(cartx.quantity), 0)
    .toFixed(2);

  const registerSale = async (pedido) => {
    const response = await api.post('/sales', pedido);
    return response.data;
  };

  const getSellers = async () => {
    const response = await api.get('/user/sellers');
    // console.log(response);
    return response.data;
  };

  useEffect(() => {
    const vendedores = async () => {
      const seller = await getSellers();
      setVendedor({ all: seller, select: seller[0].id });
    };
    vendedores();
  }, []);

  const getUserId = JSON.parse(localStorage.getItem('user'));

  const handleButtonSubmitOrder = async () => {
    const saleId = cart.map((prod) => ({ productId: prod.id, quantity: prod.quantity }));
    const { id } = await registerSale({
      userId: getUserId.id,
      sellerId: vendedor.select,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: saleId,
    });
    navigate(`/customer/orders/${id}`);
  };

  return (
    <>
      <h3 className="AddressTitle">Detalhes e Endereço para Entrega</h3>
      <div className="AddressComponent">
        <div className="AddressFlex">
          <div className="AddressContent">
            <p>Vendedor</p>
            <select
              data-testid="customer_checkout__select-seller"
              className="AddressInput"
            >
              {vendedor.all.length !== 0 && vendedor.all.map((vend, index) => (
                <option
                  key={ index }
                  value={ vend.name }
                >
                  {vend.name}
                </option>
              ))}
            </select>
          </div>
          <div className="AddressContent">
            <p>Endereço</p>
            <input
              type="text"
              name="addres"
              className="AddressInput"
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => { setAddress(target.value); } }
            />
          </div>
          <div className="AddressContent">
            <p>Número</p>
            <input
              data-testid="customer_checkout__input-address-number"
              type="number"
              className="AddressInput"
              name="addresNumber"
              onChange={ ({ target }) => { setAddressNumber(target.value); } }
            />
          </div>
        </div>
        <div className="AddressContent">
          <button
            data-testid="customer_checkout__button-submit-order"
            type="button"
            className="AddressButton"
            onClick={ handleButtonSubmitOrder }
          >
            <b>FINALIZAR PEDIDO</b>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddressCheckout;
