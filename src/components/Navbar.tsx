import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black fixed w-full top-0 z-50">
      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="text-xl font-bold text-primary-yellow">
            CarRental
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black py-4 px-6 flex flex-col space-y-4 border-t border-gray-800">
            <Link 
              to="/" 
              className="text-white hover:text-primary-yellow text-center"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/vehicles" 
              className="text-white hover:text-primary-yellow text-center"
              onClick={() => setIsOpen(false)}
            >
              Véhicules
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-primary-yellow text-center"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-primary-yellow text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-primary-yellow text-center"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-yellow">
            CarRental
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary-yellow">
              Accueil
            </Link>
            <Link to="/vehicles" className="text-white hover:text-primary-yellow">
              Véhicules
            </Link>
            <Link to="/services" className="text-white hover:text-primary-yellow">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-primary-yellow">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-primary-yellow px-4 py-2 rounded-md border border-primary-yellow hover:bg-primary-yellow hover:text-black transition-colors"
              >
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="text-black bg-primary-yellow hover:bg-yellow-600 px-4 py-2 rounded-md transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
