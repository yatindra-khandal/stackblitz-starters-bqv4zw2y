'use client';
import React, { useState } from 'react';
import { use } from 'react';
import PokemonCard from '../PokemonCard';

type Props = {
  typesPromise: Promise<{ name: string }[]>;
  pokemonListPromise: Promise<{ name: string; url: string }[]>;
};

export default function PokemonSearch({
  typesPromise,
  pokemonListPromise,
}: Props) {
  const types = use(typesPromise);
  const pokemonList = use(pokemonListPromise);

  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          className="border p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </div>
    </div>
  );
}
