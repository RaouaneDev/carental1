import React, { useState } from 'react';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  description: string;
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Mercedes Classe A',
      category: 'Berline',
      price: 150,
      image: '/mercedes-a.jpg',
      available: true,
      description: 'Berline compacte, parfaite pour la ville'
    },
    {
      id: '2',
      name: 'BMW X5',
      category: 'SUV',
      price: 200,
      image: '/bmw-x5.jpg',
      available: true,
      description: 'SUV luxueux et spacieux'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    name: '',
    category: '',
    price: 0,
    image: '',
    available: true,
    description: ''
  });

  const handleAddVehicle = () => {
    if (newVehicle.name && newVehicle.category && newVehicle.price) {
      const vehicle: Vehicle = {
        id: Date.now().toString(),
        name: newVehicle.name,
        category: newVehicle.category,
        price: newVehicle.price,
        image: newVehicle.image || '/default-car.jpg',
        available: newVehicle.available || true,
        description: newVehicle.description || ''
      };
      setVehicles([...vehicles, vehicle]);
      setShowAddModal(false);
      setNewVehicle({
        name: '',
        category: '',
        price: 0,
        image: '',
        available: true,
        description: ''
      });
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle);
    setShowAddModal(true);
  };

  const handleUpdateVehicle = () => {
    if (editingVehicle && newVehicle.name && newVehicle.category && newVehicle.price) {
      const updatedVehicles = vehicles.map(v => 
        v.id === editingVehicle.id ? { ...newVehicle, id: editingVehicle.id } as Vehicle : v
      );
      setVehicles(updatedVehicles);
      setShowAddModal(false);
      setEditingVehicle(null);
      setNewVehicle({
        name: '',
        category: '',
        price: 0,
        image: '',
        available: true,
        description: ''
      });
    }
  };

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestion des Véhicules</h2>
        <button
          onClick={() => {
            setEditingVehicle(null);
            setNewVehicle({
              name: '',
              category: '',
              price: 0,
              image: '',
              available: true,
              description: ''
            });
            setShowAddModal(true);
          }}
          className="bg-primary-yellow text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Ajouter un véhicule
        </button>
      </div>

      {/* Liste des véhicules */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Véhicule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Prix/Jour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-car.jpg';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{vehicle.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{vehicle.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{vehicle.price}€</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {vehicle.available ? 'Disponible' : 'Indisponible'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="text-primary-yellow hover:text-yellow-600 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Ajout/Modification */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Nom du véhicule
                </label>
                <input
                  type="text"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-yellow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Catégorie
                </label>
                <select
                  value={newVehicle.category}
                  onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value })}
                  className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-yellow"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Berline">Berline</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupé">Coupé</option>
                  <option value="Cabriolet">Cabriolet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Prix par jour (€)
                </label>
                <input
                  type="number"
                  value={newVehicle.price}
                  onChange={(e) => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })}
                  className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-yellow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  URL de l'image
                </label>
                <input
                  type="text"
                  value={newVehicle.image}
                  onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })}
                  className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-yellow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={newVehicle.description}
                  onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                  className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-yellow"
                  rows={3}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newVehicle.available}
                  onChange={(e) => setNewVehicle({ ...newVehicle, available: e.target.checked })}
                  className="h-4 w-4 text-primary-yellow focus:ring-primary-yellow border-gray-600 rounded"
                />
                <label className="ml-2 block text-sm text-gray-400">
                  Disponible
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-600 rounded text-gray-400 hover:bg-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                className="px-4 py-2 bg-primary-yellow text-black rounded hover:bg-yellow-600 transition-colors"
              >
                {editingVehicle ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
