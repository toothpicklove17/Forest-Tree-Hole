import React from 'react';
import { Animal } from '../types';
import { ANIMAL_CHOICES } from '../constants';

interface AnimalSelectorProps {
  selectedAnimal: Animal;
  onSelectAnimal: (animal: Animal) => void;
}

const AnimalSelector: React.FC<AnimalSelectorProps> = ({ selectedAnimal, onSelectAnimal }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-forest-text mb-2">選擇你的小動物身份</label>
      <div className="flex flex-wrap gap-2 p-2 bg-forest-bg rounded-lg">
        {ANIMAL_CHOICES.map((animal) => (
          <button
            key={animal.name}
            type="button"
            onClick={() => onSelectAnimal(animal)}
            className={`px-3 py-1.5 rounded-md transition text-sm font-medium ${
              selectedAnimal.name === animal.name
                ? 'bg-forest-accent text-white shadow-lg'
                : 'bg-forest-tag text-forest-text hover:bg-forest-accent/50'
            }`}
          >
            {animal.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimalSelector;
