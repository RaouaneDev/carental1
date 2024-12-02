import React, { useState } from 'react';
import ReservationModal from '../components/ReservationModal';
import { Vehicle, vehicles } from '../data/vehicles';

const Vehicles: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReservation = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="pt-20 px-4 pb-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-primary-yellow mb-12 text-center">
          Nos Véhicules
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h2>
                <p className="text-primary-yellow text-xl mb-4">{vehicle.priceString}</p>
                
                <div className="space-y-2 mb-6">
                  <p className="text-gray-300">
                    <span className="font-semibold">Année:</span> {vehicle.specs.year}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Transmission:</span>{' '}
                    {vehicle.specs.transmission}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Carburant:</span>{' '}
                    {vehicle.specs.fuel}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Places:</span>{' '}
                    {vehicle.specs.seats}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleReservation(vehicle)}
                    className="w-full bg-primary-yellow text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVehicle && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          car={selectedVehicle}
        />
      )}
    </div>
  );
};

export default Vehicles;
