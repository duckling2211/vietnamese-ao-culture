import Link from 'next/link';

export default function HomePage() {
  const navCards = [
    { title: 'Interactive Map', desc: 'Explore cultural heritage regions', link: '/map', bg: 'bg-amber-100' },
    { title: 'Dress-Up Studio', desc: 'AI-powered outfit styling engine', link: '/studio', bg: 'bg-emerald-100' },
    { title: 'Costume Info', desc: 'Look up and learn about Vietnamese costume culture', link: '/categories', bg: 'bg-blue-100' },
    { title: 'My Account', desc: 'View saved outfits and profile', link: '/account', bg: 'bg-purple-100' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl font-bold mb-6 text-emerald-800 dark:text-emerald-400">
          Cultural Heritage & Dress-Up Studio
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300">
          Dive into the rich tapestry of traditional clothing. Explore geographical heritage, 
          learn about local attire, and use our advanced styling engine to build 
          culturally accurate outfits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {navCards.map((card) => (
          <Link href={card.link} key={card.title}>
            <div className={`p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-stone-200 dark:border-stone-700 ${card.bg} dark:bg-opacity-10`}>
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-stone-700 dark:text-stone-400">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}