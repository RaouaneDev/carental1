export interface Vehicle {
  id: number;
  name: string;
  price: number;
  priceString: string;
  image: string;
  description?: string;
  specs: {
    year: number;
    transmission: string;
    fuel: string;
    seats: number;
  };
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Mercedes Classe C",
    price: 150,
    priceString: "150€ / jour",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Diesel",
      seats: 5
    }
  },
  {
    id: 2,
    name: "BMW Série 5",
    price: 180,
    priceString: "180€ / jour",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Essence",
      seats: 5
    }
  },
  {
    id: 3,
    name: "Audi A6",
    price: 170,
    priceString: "170€ / jour",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Hybride",
      seats: 5
    }
  },
  {
    id: 4,
    name: "Tesla Model 3",
    price: 200,
    priceString: "200€ / jour",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Électrique",
      seats: 5
    }
  },
  {
    id: 5,
    name: "Range Rover Sport",
    price: 250,
    priceString: "250€ / jour",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Diesel",
      seats: 7
    }
  },
  {
    id: 6,
    name: "Porsche 911",
    price: 300,
    priceString: "300€ / jour",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    specs: {
      year: 2023,
      transmission: "Automatique",
      fuel: "Essence",
      seats: 2
    }
  }
];
