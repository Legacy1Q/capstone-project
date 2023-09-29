import Button from 'react-bootstrap/Button';
import './Cart.css';


function Cart() {
  return (
    <div className='cart'>
      <h1>Cart</h1>

      <div className="cart__container">
          <h2>Your Cart is Empty</h2>
          <div className="cart__buttons">
            <a href="/">
                <Button variant="outline-secondary">See Whats Poppin</Button>{' '}
            </a>
            <a href="/login">
                <Button variant="outline-light">Sign In</Button>{' '}
            </a>
          </div>
      </div>
    </div>
  )
}

export default Cart;
