import './Nav.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Nav() {
  return (
    <div className='nav'>
        
        {/* Logo */}
        <div className="nav__header">
          <img src="./images/criticfusion-low-resolution-logo-color-on-transparent-background.png" alt="logo" />
        </div>

        {/* Search Bar */}
        <div className="nav__search"> 
          <div className="mb-3">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1" />

        
              <button
                className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                type="button"
                id="button-addon1"
                data-te-ripple-init
                data-te-ripple-color="light">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className='nav__links'>
          <a href="/movies">Movies</a>
          <a href="/tv">TV</a>
          <a href="/games">Games</a>
          <a href="/deals">Deals</a>
        </div>

        {/* Additional Links */}
        <div className='nav__login'>
          <a href="/login">Login</a>
          <a href="/cart">
            <ShoppingBagIcon />
          </a>
        </div>
    </div>
  )
}

export default Nav;
