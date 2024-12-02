import React, { useState } from 'react';
import VehicleManagement from '../components/admin/VehicleManagement';

interface AdminCredentials {
  username: string;
  password: string;
}

type ActiveView = 'dashboard' | 'vehicles' | 'bookings' | 'clients';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [credentials, setCredentials] = useState<AdminCredentials>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Identifiants temporaires (à remplacer par une vraie authentification)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case 'vehicles':
        return <VehicleManagement />;
      case 'dashboard':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-8">Tableau de bord</h1>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm">Total Véhicules</h3>
                <p className="text-2xl font-bold text-primary-yellow">12</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm">Réservations en cours</h3>
                <p className="text-2xl font-bold text-primary-yellow">8</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm">Clients actifs</h3>
                <p className="text-2xl font-bold text-primary-yellow">45</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm">Revenus du mois</h3>
                <p className="text-2xl font-bold text-primary-yellow">15 890 €</p>
              </div>
            </div>

            {/* Recent bookings */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Réservations récentes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Véhicule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date début
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date fin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        Jean Dupont
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        Mercedes Classe A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        15/03/2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        20/03/2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          En cours
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Gestion des Réservations</h2>
          <p className="text-gray-400">Fonctionnalité en cours de développement...</p>
        </div>;
      case 'clients':
        return <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Gestion des Clients</h2>
          <p className="text-gray-400">Fonctionnalité en cours de développement...</p>
        </div>;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-primary-yellow">
              Administration CarRental
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Connectez-vous pour accéder au panneau d'administration
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Nom d'utilisateur
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow focus:z-10 sm:text-sm"
                  placeholder="Nom d'utilisateur"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-primary-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-primary-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary-yellow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen p-4">
          <div className="text-primary-yellow text-xl font-bold mb-8">
            Dashboard Admin
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-gray-800 text-primary-yellow'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveView('vehicles')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeView === 'vehicles'
                  ? 'bg-gray-800 text-primary-yellow'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Véhicules
            </button>
            <button
              onClick={() => setActiveView('bookings')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeView === 'bookings'
                  ? 'bg-gray-800 text-primary-yellow'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Réservations
            </button>
            <button
              onClick={() => setActiveView('clients')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeView === 'clients'
                  ? 'bg-gray-800 text-primary-yellow'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Clients
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800 rounded transition-colors"
            >
              Déconnexion
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
