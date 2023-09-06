import './Nav.css';

function Nav() {
  return (
    <div className='nav'>
        <div className="nav__header">
          <h1>CriticFusion</h1>
          <img src="" alt="" />
        </div>
        <div className="nav__navbar">
          <a href="/"></a>
          <a href="/movies"></a>
          <a href="/tv"></a>
          <a href="/games"></a>
          <a href="/deals"></a>
        </div>
        <div className="nav__right">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
    </div>
  )
}

export default Nav;
