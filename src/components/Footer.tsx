import React, { useState } from 'react';
import UnderConstructionToast from './UnderConstructionToast';

const Footer: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Nos Services */}
            <div id="services" className="col-span-2">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4">Nos Services</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Location courte durée</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Location longue durée</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Service VIP</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Assurance tous risques</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Assistance 24/7</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Livraison à domicile</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div id="contact">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>+33 1 23 45 67 89</p>
                <p>contact@carrental.com</p>
                <p>123 Avenue des Champs-Élysées, Paris</p>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="text-xl font-semibold text-primary-yellow mb-4">Horaires</h3>
              <div className="space-y-2 text-gray-300">
                <p>Lundi - Vendredi : 9h - 19h</p>
                <p>Samedi : 10h - 18h</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </div>

          {/* Copyright et Administration */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="flex justify-between items-center">
              <p>&copy; {new Date().getFullYear()} CarRental. Tous droits réservés.</p>
              <button
                onClick={handleAdminClick}
                className="text-gray-400 hover:text-primary-yellow transition-colors text-sm"
              >
                Administration
              </button>
            </div>
          </div>
        </div>
      </footer>

      <UnderConstructionToast
        message="Cette fonctionnalité est en cours de développement"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Footer;
