function Cart() {
    const cartItems = [
            { title: 'Book 1', author: 'Author 1' },
            { title: 'Book 2', author: 'Author 2' },
          ];
    return (
        <div>
            <h1>Cart is Empty</h1>
            {cartItems.map((item, index) => (
        <cartItems key={index} item={item} />
      ))}
        </div>
    )
}
export default Cart;
// import React from 'react';
// import CartItem from '../components/CartItem';

// function CartPage() {
//   const cartItems = [
//     { title: 'Book 1', author: 'Author 1' },
//     { title: 'Book 2', author: 'Author 2' },
//   ];

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.map((item, index) => (
//         <CartItem key={index} item={item} />
//       ))}
//     </div>
//   );
// }

// export default CartPage;
