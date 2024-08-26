import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
import data from "../db.json";  // Importing the pets data

function App() {
  const [pets, setPets] = useState(data.pets);  // Initializing pets from db.json
  const [filters, setFilters] = useState({ type: "all" });

  // Filter pets based on selected type
  const fetchPets = () => {
    if (filters.type === "all") {
      setPets(data.pets);
    } else {
      const filteredPets = data.pets.filter(pet => pet.type === filters.type);
      setPets(filteredPets);
    }
  };

  // Handle changing the filter type
  const handleChangeType = (type) => {
    setFilters({ ...filters, type });
  };

  // Handle adoption of a pet
  const handleAdoptPet = (id) => {
    const updatedPets = pets.map(pet =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={fetchPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
