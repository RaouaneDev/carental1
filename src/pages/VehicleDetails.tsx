import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReservationModal from '../components/ReservationModal';
import { vehicles } from '../data/vehicles';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  priceString: string;
  image: string;
  description?: string;
  specs: {
    year: string;
    transmission: string;
    fuel: string;
    seats: string;
  };
}

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicle = vehicles.find(v => v.id === Number(id));

  if (!vehicle) {
    return (
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary-yellow mb-6">
            Véhicule non trouvé
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-yellow text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
          >
            Retour aux véhicules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 pb-8">
      <div className="container mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-primary-yellow hover:text-yellow-600 mb-6 flex items-center"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux véhicules
        </button>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{vehicle.name}</h1>
              <p className="text-primary-yellow text-2xl mb-6">{vehicle.priceString}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Caractéristiques</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">Année</p>
                    <p className="text-white font-semibold">{vehicle.specs.year}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">Transmission</p>
                    <p className="text-white font-semibold">{vehicle.specs.transmission}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">Carburant</p>
                    <p className="text-white font-semibold">{vehicle.specs.fuel}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">Places</p>
                    <p className="text-white font-semibold">{vehicle.specs.seats}</p>
                  </div>
                </div>
              </div>

              {vehicle.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>
              )}

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary-yellow text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition-colors text-lg"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={vehicle}
      />
    </div>
  );
};

export default VehicleDetails;
