import React, { useState } from 'react';

function CounterProducts() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          if (quantity > 0) setQuantity(quantity - 1);
        } }
      >
        -
      </button>
      <p>{ quantity }</p>
      <button
        type="button"
        onClick={ () => setQuantity(quantity + 1) }
      >
        +
      </button>
      <p>{}</p>
    </div>
  );
}

export default CounterProducts;
