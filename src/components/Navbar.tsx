import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UnderConstructionToast from './UnderConstructionToast';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnderConstruction = () => {
    setIsOpen(false);
    setShowToast(true);
  };

  return (
    <>
      <nav className="bg-black fixed w-full top-0 z-50">
        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <div className="flex justify-between items-center p-4">
            <Link to="/" className="text-xl font-bold text-primary-yellow" onClick={scrollToTop}>
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
                onClick={scrollToTop}
              >
                Accueil
              </Link>
              <button
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-primary-yellow text-center"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-primary-yellow text-center"
              >
                Contact
              </button>
              <button
                onClick={handleUnderConstruction}
                className="text-white hover:text-primary-yellow text-center"
              >
                Mes Réservations
              </button>
              <button
                onClick={handleUnderConstruction}
                className="text-white hover:text-primary-yellow text-center"
              >
                Mon Profil
              </button>
              <Link 
                to="/login" 
                className="text-white hover:text-primary-yellow text-center"
                onClick={scrollToTop}
              >
                Connexion
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-primary-yellow" onClick={scrollToTop}>
            CarRental
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/"
              className="text-white hover:text-primary-yellow transition-colors"
              onClick={scrollToTop}
            >
              Accueil
            </Link>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-primary-yellow transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-primary-yellow transition-colors"
            >
              Contact
            </button>
            <button
              onClick={handleUnderConstruction}
              className="text-white hover:text-primary-yellow transition-colors"
            >
              Mes Réservations
            </button>
            <button
              onClick={handleUnderConstruction}
              className="text-white hover:text-primary-yellow transition-colors"
            >
              Mon Profil
            </button>
            <Link 
              to="/login" 
              className="bg-primary-yellow text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
              onClick={scrollToTop}
            >
              Connexion
            </Link>
          </div>
        </div>
      </nav>
      
      <UnderConstructionToast
        message="Cette fonctionnalité est en cours de développement"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Navbar;
