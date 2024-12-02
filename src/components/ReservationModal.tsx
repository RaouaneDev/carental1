import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import { Vehicle } from '../data/vehicles';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Vehicle;
}

interface ReservationForm {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  acceptTerms: boolean;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, car }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReservationForm>({
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '18:00',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    acceptTerms: true
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(`${formData.endDate}T${formData.endTime}`);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(car.price * diffDays);
    }
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime, car.price]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return formData.startDate !== '' && formData.endDate !== '';
      case 2:
        return formData.firstName !== '' && formData.lastName !== '' && formData.email !== '' && formData.phone !== '';
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (validateStep(step)) {
        setStep(step + 1);
      }
    } else {
      if (!formData.acceptTerms) {
        setShowTermsError(true);
        setTimeout(() => setShowTermsError(false), 3000);
        return;
      }
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 9000);
    }
  };

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  if (!isOpen) return null;

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md text-center space-y-6 animate-fade-in relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-20 h-20 bg-primary-yellow rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary-yellow">Merci pour votre réservation !</h2>
          <div className="space-y-2 text-gray-300">
            <p>Votre réservation pour {car.name} a été confirmée.</p>
            <p>Un email de confirmation a été envoyé à {formData.email}</p>
            <p className="text-sm">Référence de réservation : #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          <div className="pt-4">
            <p className="text-primary-yellow font-semibold">À bientôt !</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-yellow">Réservation - {car.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-primary-yellow text-black' : 'bg-gray-700 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-full h-1 ${
                  step > s ? 'bg-primary-yellow' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl text-white mb-4">Sélectionnez vos dates</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date de début</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Heure de début</label>
                  <select
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date de fin</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Heure de fin</label>
                  <select
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {totalPrice > 0 && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Prix total estimé</p>
                      <p className="text-sm text-gray-400">
                        {formData.startDate && formData.endDate && (
                          <>
                            Du {formatDate(formData.startDate)} à {formData.startTime}
                            <br />
                            Au {formatDate(formData.endDate)} à {formData.endTime}
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-2xl text-primary-yellow font-bold">{totalPrice}€</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl text-white mb-4">Vos informations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-md p-2"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl text-white mb-4">Récapitulatif de votre réservation</h3>
              
              <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={car.image} alt={car.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{car.name}</h4>
                    <p className="text-gray-400">{car.price}€/jour</p>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Date de début</p>
                      <p className="text-white">{formatDate(formData.startDate)} à {formData.startTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date de fin</p>
                      <p className="text-white">{formatDate(formData.endDate)} à {formData.endTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Client</p>
                      <p className="text-white">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Contact</p>
                      <p className="text-white">{formData.email}</p>
                      <p className="text-white">{formData.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-white">Prix total</p>
                    <p className="text-2xl font-bold text-primary-yellow">{totalPrice}€</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-yellow"
                    required
                  />
                  <label className="text-sm text-gray-300">
                    J'accepte les conditions générales de location
                  </label>
                </div>
                {showTermsError && (
                  <div className="text-red-500 text-sm animate-fade-in">
                    Veuillez accepter les conditions générales pour continuer
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!formData.acceptTerms}
                  className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
                    formData.acceptTerms 
                      ? 'bg-primary-yellow text-black hover:bg-yellow-600' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirmer et payer {totalPrice}€
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Retour
              </button>
            )}
            {step < 3 && (
              <button
                type="submit"
                className="px-6 py-2 bg-primary-yellow text-black rounded-md hover:bg-yellow-600 transition-colors ml-auto"
              >
                Suivant
              </button>
            )}
          </div>
        </form>
      </div>
      {showToast && (
        <Toast
          message="Réservation confirmée avec succès !"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ReservationModal;
