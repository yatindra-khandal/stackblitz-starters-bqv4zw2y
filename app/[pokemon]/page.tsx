import Image from "next/image";
import Link from "next/link";
import { getPokemonDetails } from "../../lib/pokemon";

export default async function PokemonDetail({
  params,
}: {
  params: { pokemon: string };
}) {
  const pokemon = await getPokemonDetails(params.pokemon);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <nav className="mb-4 text-blue-500">
        <Link href="/">Home</Link> →{" "}
        <span className="font-bold">{pokemon.name.toUpperCase()}</span>
      </nav>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={200}
          height={200}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">
          {pokemon.name.toUpperCase()}
        </h1>
        <p className="mt-2">
          Height: {pokemon.height / 10}m | Weight: {pokemon.weight / 10}kg
        </p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Types</h2>
          <div className="flex justify-center gap-2 mt-2">
            {pokemon.types.map((typeObj: any) => (
              <span
                key={typeObj.type.name}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {typeObj.type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
