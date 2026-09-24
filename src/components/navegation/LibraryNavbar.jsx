import SearchBar from '../search/SearchBar';
import { Heart, ShoppingCart } from 'lucide-react';

import './LibraryNavbar.css'

const LibraryNavbar = () => {
  return (
    <nav className="library-navbar">

      <div className='navbar-top'>

          <div className='logo'>
             PACIFIC0
          </div>

         <SearchBar />

         <div className="navbar-actions">
            <button type="button" aria-label="Favoritos">
             <Heart />
            </button>

           <button type="button" aria-label="Carrito">
             <ShoppingCart />
           </button>
        </div>

      </div>

      <section className='library-categories'>
        <ul>
          <li><a href="#">Humanidades</a></li>
          <li><a href="#">Derecho</a></li>
          <li><a href="#">Arte</a></li>
          <li><a href="#">Ciencias</a></li>
          <li><a href="#">Literatura</a></li>
          <li><a href="#">Cocina</a></li>
          <li><a href="#">Comics</a></li>
        </ul>
      </section>
    </nav>
  );
}

export default LibraryNavbar;
