import Link from 'next/link';
import Image from 'next/image';

export default function PokemonCard({ url, name }) {
  const pokemonId = url.split('/').filter(Boolean).pop();

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div
      key={name}
      className="bg-white shadow-lg rounded-lg p-4 w-40 text-center hover:shadow-xl transition-shadow"
    >
      <Image
        src={imageUrl}
        alt={name}
        width={80}
        height={80}
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold mt-2">{name.toUpperCase()}</h3>
      <Link href={`/${name}`}>
        <div className="mt-3 text-blue-500 flex items-center justify-center gap-1 cursor-pointer">
          Details <span className="text-xl">→</span>
        </div>
      </Link>
    </div>
  );
}
