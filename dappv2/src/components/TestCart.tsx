import type { FC } from 'react';
import React, { useState } from 'react';

const TestCart: FC = () => {
  const [cart, setCart] = useState<string[]>([]);

  return (
    <div>
      <button
        onClick={() => {
          setCart([...cart, 'Item']);
        }}
      >
        Add Item
      </button>
      {cart.map((itm, indx) => {
        return (
          <div>
            <br />
            <button
              onClick={() => {
                const crt = [...cart];
                crt.splice(indx, 1);
                setCart([...crt]);
              }}
            >
              {itm}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TestCart;
