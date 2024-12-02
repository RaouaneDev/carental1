import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './pages/Admin';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import Vehicles from './pages/Vehicles';
import Navbar from './components/Navbar';
import AuthModal from './components/auth/AuthModal';
import Footer from './components/Footer';

interface CarDetails {
  name: string;
  price: string;
  image: string;
  specs: {
    year: string;
    transmission: string;
    fuel: string;
    seats: string;
  };
}

interface ReservationForm {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  firstName: string;
  email: string;
  phone: string;
  message?: string;
}

const MainPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarDetails | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    startDate: '',
    endDate: '',
    startTime: '06:00',
    endTime: '06:00',
    firstName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'signin' | 'signup'>('signin');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showCarDetails = (car: CarDetails) => {
    setSelectedCar(car);
    window.scrollTo(0, 0);
  };

  const closeCarDetails = () => {
    setSelectedCar(null);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réservation soumise:', reservationForm);
    setShowThankYouModal(true);
    
    // Fermer le modal et retourner à l'accueil après 3 secondes
    setTimeout(() => {
      setShowThankYouModal(false);
      setIsReservationModalOpen(false);
      // Réinitialiser le formulaire
      setReservationForm({
        startDate: '',
        endDate: '',
        startTime: '06:00',
        endTime: '06:00',
        firstName: '',
        email: '',
        phone: '',
        message: '',
      });
      // Scroll vers le haut de la page en douceur
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    setIsReservationModalOpen(false);
    // Réinitialiser le formulaire
    setReservationForm({
      startDate: '',
      endDate: '',
      startTime: '06:00',
      endTime: '06:00',
      firstName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Pour les champs d'heure, ajouter automatiquement ":00"
    let finalValue = value;
    if ((name === 'startTime' || name === 'endTime') && value.length === 2) {
      finalValue = `${value}:00`;
    }
    
    setReservationForm(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const calculateTotalPrice = () => {
    if (!selectedCar || !reservationForm.startDate || !reservationForm.endDate) {
      return 0;
    }

    const start = new Date(reservationForm.startDate);
    const end = new Date(reservationForm.endDate);
    
    // Calcul de la différence en jours
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Si c'est le même jour, on compte 1 jour
    const numberOfDays = diffDays === 0 ? 1 : diffDays;
    
    return parseInt(selectedCar.price.replace('€/jour', '')) * numberOfDays;
  };

  const handleReturnHome = () => {
    setShowThankYouModal(false);
    setIsReservationModalOpen(false);
    // Réinitialiser le formulaire
    setReservationForm({
      startDate: '',
      endDate: '',
      startTime: '06:00',
      endTime: '06:00',
      firstName: '',
      email: '',
      phone: '',
      message: '',
    });
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Fermer le menu mobile si ouvert
    setIsMenuOpen(false);
  };

  // Données des voitures
  const cars: CarDetails[] = [
    {
      name: "Mercedes Classe C",
      price: "150€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Diesel",
        seats: "5",
      }
    },
    {
      name: "BMW Série 5",
      price: "180€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Essence",
        seats: "5",
      }
    },
    {
      name: "Audi A6",
      price: "170€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Hybride",
        seats: "5",
      }
    },
    {
      name: "Range Rover Sport",
      price: "250€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Diesel",
        seats: "7",
      }
    },
    {
      name: "Porsche Cayenne",
      price: "280€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Essence",
        seats: "5",
      }
    },
    {
      name: "Tesla Model S",
      price: "200€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Électrique",
        seats: "5",
      }
    },
    {
      name: "Volkswagen Golf 8",
      price: "90€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Essence",
        seats: "5",
      }
    },
    {
      name: "Mercedes GLE Coupé",
      price: "260€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Hybride",
        seats: "5",
      }
    },
    {
      name: "Audi e-tron GT",
      price: "290€/jour",
      image: "bg-gray-800",
      specs: {
        year: "2024",
        transmission: "Automatique",
        fuel: "Électrique",
        seats: "4",
      }
    }
  ];

  return (
    <div className="min-h-screen bg-primary-black flex flex-col">
      <Navbar />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 text-white z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => scrollToSection('accueil')} 
              className="text-2xl font-bold text-primary-yellow hover:text-yellow-500 transition-colors"
            >
              CarRental
            </button>
            
            {/* Menu mobile */}
            <div className="flex items-center space-x-4 md:hidden">
              <a href="#" className="text-white hover:text-primary-yellow transition-colors">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </a>
              <button
                className="text-white"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="hover:text-primary-yellow transition-colors"
              >
                Accueil
              </button>
              <Link to="/vehicles" className="hover:text-primary-yellow transition-colors">
                Véhicules
              </Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="hover:text-primary-yellow transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-primary-yellow transition-colors"
              >
                Contact
              </button>
              <a href="#" className="flex items-center space-x-2 text-white hover:text-primary-yellow transition-colors">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
                <span>Connexion</span>
              </a>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('accueil')}
                  className="hover:text-primary-yellow transition-colors"
                >
                  Accueil
                </button>
                <Link to="/vehicles" className="hover:text-primary-yellow transition-colors">
                  Véhicules
                </Link>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary-yellow transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary-yellow transition-colors"
                >
                  Contact
                </button>
                <a href="#" className="flex items-center space-x-2 text-white hover:text-primary-yellow transition-colors">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <span>Connexion</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Section Accueil */}
      <section id="accueil" className="min-h-screen pt-20 flex items-center bg-black">
        {/* Contenu de l'accueil */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary-yellow mb-4">
              Location de Voitures Premium
            </h2>
            <p className="text-gray-300 text-xl mb-8">
              Découvrez notre sélection de véhicules haut de gamme
            </p>
            <Link to="/vehicles" className="bg-primary-yellow text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors">
              Tous nos véhicules
            </Link>
          </div>
        </div>
      </section>

      {/* Section Véhicules */}
      <section id="vehicules" className="py-16 bg-black">
        <div className="container mx-auto px-4" id="vehicles-section">
          <h3 className="text-2xl font-bold text-primary-yellow mb-8">Notre Flotte Complète</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, index) => (
              <div key={index} className="bg-black p-6 rounded-lg">
                <div className={`${car.image} h-48 rounded-lg mb-4`}></div>
                <h4 className="text-primary-yellow text-xl font-bold mb-2">{car.name}</h4>
                <p className="text-gray-400 mb-4">À partir de {car.price}</p>
                <button 
                  onClick={() => showCarDetails(car)}
                  className="w-full bg-primary-yellow text-black py-2 rounded font-bold hover:bg-yellow-600 transition-colors"
                >
                  Voir les détails
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-yellow mb-12 text-center">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Location 24/7</h3>
              </div>
              <p className="text-gray-400">
                Service de location disponible 24h/24 et 7j/7. Réservez à tout moment selon vos besoins.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Assistance</h3>
              </div>
              <p className="text-gray-400">
                Une équipe dédiée à votre service pour vous assister en cas de besoin pendant votre location.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Assurance</h3>
              </div>
              <p className="text-gray-400">
                Tous nos véhicules sont assurés tous risques pour votre sécurité et votre tranquillité.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Service Express</h3>
              </div>
              <p className="text-gray-400">
                Livraison et récupération rapide de votre véhicule à l'adresse de votre choix.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Paiement Flexible</h3>
              </div>
              <p className="text-gray-400">
                Plusieurs options de paiement disponibles pour votre confort : CB, PayPal, virement.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-bold text-white ml-3">Agences</h3>
              </div>
              <p className="text-gray-400">
                Un réseau d'agences dans toute la France pour vous servir au plus proche de chez vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-yellow mb-12 text-center">
            Contactez-nous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Nos coordonnées</h3>
              
              {/* Adresse */}
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-primary-yellow mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold">Adresse</h4>
                  <p className="text-gray-400">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-primary-yellow mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold">Téléphone</h4>
                  <p className="text-gray-400">+33 (0)1 23 45 67 89</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-primary-yellow mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold">Email</h4>
                  <p className="text-gray-400">contact@carrental.fr</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-primary-yellow mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold">Horaires d'ouverture</h4>
                  <p className="text-gray-400">
                    Lundi - Vendredi : 6h - 00h<br />
                    Samedi - Dimanche : 8h - 22h
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-primary-yellow mb-2" htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-yellow mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-yellow mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-yellow text-black font-bold py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {selectedCar ? (
        // Page de détails de la voiture
        <div className="container mx-auto px-4 py-16">
          <button 
            onClick={closeCarDetails}
            className="text-primary-yellow hover:text-yellow-600 transition-colors mb-8 flex items-center"
          >
            <svg 
              className="w-6 h-6 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux véhicules
          </button>

          <div className="bg-black rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image de la voiture */}
              <div className={`${selectedCar.image} h-64 lg:h-96 rounded-lg`}></div>

              {/* Informations de la voiture */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary-yellow">{selectedCar.name}</h2>
                <p className="text-2xl text-white">À partir de {selectedCar.price}</p>

                {/* Spécifications */}
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div className="space-y-2">
                    <p className="text-gray-400">Année</p>
                    <p>{selectedCar.specs.year}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Transmission</p>
                    <p>{selectedCar.specs.transmission}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Carburant</p>
                    <p>{selectedCar.specs.fuel}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Places</p>
                    <p>{selectedCar.specs.seats}</p>
                  </div>
                </div>

                {/* Bouton de réservation */}
                <button 
                  onClick={() => setIsReservationModalOpen(true)}
                  className="w-full bg-primary-yellow text-black py-4 rounded-lg font-bold hover:bg-yellow-600 transition-colors mt-8"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>

            {/* Section des caractéristiques supplémentaires */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-primary-yellow mb-6">Équipements inclus</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Climatisation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>GPS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bluetooth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sièges chauffants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Page d'accueil
        <div className="relative h-screen flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img
              src="/hero-car.jpg"
              alt="Luxury car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-6">Location de Voitures de Luxe</h1>
            <p className="text-xl mb-8">Découvrez notre collection exclusive de véhicules</p>
            <div className="space-x-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-primary-yellow text-black rounded-full hover:bg-yellow-600 transition-colors font-semibold text-lg"
              >
                Créer un compte
              </button>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setInitialAuthView('signin');
                }}
                className="px-8 py-3 border-2 border-primary-yellow text-primary-yellow rounded-full hover:bg-primary-yellow hover:text-black transition-colors font-semibold text-lg"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de réservation */}
      {isReservationModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-primary-black border-2 border-primary-yellow rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary-yellow">
                Réserver {selectedCar.name}
              </h3>
              <button 
                onClick={() => setIsReservationModalOpen(false)}
                className="text-gray-400 hover:text-primary-yellow"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleReservationSubmit} className="space-y-4">
              {/* Début de la réservation */}
              <div className="space-y-4">
                <h4 className="text-primary-yellow font-semibold">Début de la réservation</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary-yellow mb-2" htmlFor="startDate">
                      Date de début*
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={reservationForm.startDate}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none [&::-webkit-calendar-picker-indicator]:bg-white [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-primary-yellow mb-2" htmlFor="startTime">
                      Heure de début*
                    </label>
                    <select
                      id="startTime"
                      name="startTime"
                      required
                      value={reservationForm.startTime.split(':')[0]}
                      onChange={(e) => handleInputChange({
                        target: {
                          name: 'startTime',
                          value: e.target.value
                        }
                      } as React.ChangeEvent<HTMLInputElement>)}
                      className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: 19 }, (_, i) => i + 6).map(hour => (
                        <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {hour}h
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Fin de la réservation */}
              <div className="space-y-4">
                <h4 className="text-primary-yellow font-semibold">Fin de la réservation</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary-yellow mb-2" htmlFor="endDate">
                      Date de fin*
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      required
                      min={reservationForm.startDate || new Date().toISOString().split('T')[0]}
                      value={reservationForm.endDate}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none [&::-webkit-calendar-picker-indicator]:bg-white [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-primary-yellow mb-2" htmlFor="endTime">
                      Heure de fin*
                    </label>
                    <select
                      id="endTime"
                      name="endTime"
                      required
                      value={reservationForm.endTime.split(':')[0]}
                      onChange={(e) => handleInputChange({
                        target: {
                          name: 'endTime',
                          value: e.target.value
                        }
                      } as React.ChangeEvent<HTMLInputElement>)}
                      className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: 19 }, (_, i) => i + 6).map(hour => (
                        <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {hour}h
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Résumé de la réservation */}
              {reservationForm.startDate && reservationForm.endDate && selectedCar && (
                <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
                  <h4 className="text-primary-yellow font-semibold mb-3">Résumé de la réservation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Véhicule</span>
                      <span className="text-white font-medium">{selectedCar.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prix par jour</span>
                      <span className="text-white font-medium">{selectedCar.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Nombre de jours</span>
                      <span className="text-white font-medium">
                        {Math.ceil(Math.abs(new Date(reservationForm.endDate).getTime() - new Date(reservationForm.startDate).getTime()) / (1000 * 60 * 60 * 24)) || 1}
                      </span>
                    </div>
                    <div className="h-px bg-gray-800 my-2"></div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-primary-yellow font-semibold">Total</span>
                      <span className="text-primary-yellow font-bold">{calculateTotalPrice()}€</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-primary-yellow mb-2" htmlFor="firstName">
                  Prénom*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={reservationForm.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                  placeholder="Votre prénom"
                />
              </div>

              <div>
                <label className="block text-primary-yellow mb-2" htmlFor="email">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={reservationForm.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-primary-yellow mb-2" htmlFor="phone">
                  Téléphone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  value={reservationForm.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none"
                  placeholder="0612345678"
                />
              </div>

              <div>
                <label className="block text-primary-yellow mb-2" htmlFor="message">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={reservationForm.message}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded focus:border-primary-yellow focus:outline-none resize-none"
                  placeholder="Informations supplémentaires..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsReservationModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-yellow text-black font-bold rounded hover:bg-yellow-600 transition-colors"
                >
                  Réserver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de remerciement */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-green-100 border-2 border-green-600 rounded-lg p-8 max-w-md w-full text-center relative">
            {/* Bouton de fermeture */}
            <button
              onClick={handleCloseThankYouModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-4">
              <svg 
                className="w-16 h-16 text-green-600 mx-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Merci {reservationForm.firstName} !
            </h3>
            <p className="text-green-700 mb-2">
              Votre réservation a été enregistrée avec succès.
            </p>
            <p className="text-green-600 text-sm">
              Vous allez recevoir un email de confirmation à l'adresse {reservationForm.email}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Vehicles />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
