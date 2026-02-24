import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Release {
  id: number;
  name: string;
  colorway: string;
  price: number;
  releaseDate: string;
  status: 'upcoming' | 'released' | 'sold-out';
  image: string;
  style: string;
}

const releases: Release[] = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG',
    colorway: 'Chicago Lost & Found',
    price: 180,
    releaseDate: '2024-11-19',
    status: 'released',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80',
    style: 'DZ5485-612',
  },
  {
    id: 2,
    name: 'Air Jordan 4 Retro',
    colorway: 'Bred Reimagined',
    price: 215,
    releaseDate: '2024-02-17',
    status: 'sold-out',
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&q=80',
    style: 'FV5029-006',
  },
  {
    id: 3,
    name: 'Air Jordan 11 Retro',
    colorway: 'Gratitude',
    price: 230,
    releaseDate: '2024-12-09',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    style: 'CT8012-170',
  },
  {
    id: 4,
    name: 'Air Jordan 3 Retro',
    colorway: 'White Cement Reimagined',
    price: 200,
    releaseDate: '2024-03-08',
    status: 'sold-out',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80',
    style: 'DN3707-100',
  },
  {
    id: 5,
    name: 'Air Jordan 1 Low OG',
    colorway: 'Black Toe',
    price: 140,
    releaseDate: '2025-01-15',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    style: 'CZ0790-106',
  },
  {
    id: 6,
    name: 'Air Jordan 5 Retro',
    colorway: 'Olive',
    price: 210,
    releaseDate: '2024-03-02',
    status: 'released',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&q=80',
    style: 'DD0587-308',
  },
];

type FilterType = 'all' | 'upcoming' | 'released' | 'sold-out';

function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredReleases = releases.filter(
    (release) => filter === 'all' || release.status === filter
  );

  const getStatusColor = (status: Release['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-[#CE1126]';
      case 'released':
        return 'bg-emerald-500';
      case 'sold-out':
        return 'bg-zinc-600';
    }
  };

  const getStatusText = (status: Release['status']) => {
    switch (status) {
      case 'upcoming':
        return 'DROPPING SOON';
      case 'released':
        return 'AVAILABLE NOW';
      case 'sold-out':
        return 'SOLD OUT';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal accent lines */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-10">
        <div className="absolute top-20 right-[-100px] w-[800px] h-[3px] bg-[#CE1126] rotate-[-35deg]" />
        <div className="absolute top-32 right-[-100px] w-[600px] h-[1px] bg-[#CE1126] rotate-[-35deg]" />
        <div className="absolute top-44 right-[-100px] w-[400px] h-[2px] bg-[#CE1126] rotate-[-35deg]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#CE1126] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="font-oswald text-xs md:text-sm tracking-[0.3em] text-zinc-500">
                AUTHENTICATED DROPS
              </span>
            </div>
            <h1 className="font-oswald text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              JORDAN<span className="text-[#CE1126]">_</span>DROPS
            </h1>
            <p className="font-barlow text-zinc-400 mt-2 text-sm md:text-base">
              Track the latest Air Jordan releases. Never miss a drop.
            </p>
          </div>
          <div className="font-oswald text-right hidden md:block">
            <div className="text-5xl lg:text-6xl font-bold text-zinc-800">23</div>
            <div className="text-xs tracking-[0.2em] text-zinc-600">LEGACY</div>
          </div>
        </motion.div>
      </header>

      {/* Filter tabs */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 px-4 md:px-8 lg:px-16 py-4 md:py-6 border-y border-zinc-800"
      >
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {(['all', 'upcoming', 'released', 'sold-out'] as FilterType[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-oswald text-xs md:text-sm tracking-wider px-4 md:px-6 py-2 md:py-3 transition-all duration-300 whitespace-nowrap min-h-[44px] ${
                  filter === f
                    ? 'bg-[#CE1126] text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                }}
              >
                {f.toUpperCase().replace('-', ' ')}
              </button>
            )
          )}
        </div>
      </motion.nav>

      {/* Releases grid */}
      <main className="relative z-10 px-4 md:px-8 lg:px-16 py-6 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {filteredReleases.map((release, index) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(release.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 overflow-hidden cursor-pointer"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-[24px] h-[24px] bg-[#CE1126] z-10" />
                <div className="absolute bottom-0 left-0 w-[24px] h-[24px] bg-zinc-700/50" />

                {/* Image container */}
                <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <motion.img
                    src={release.image}
                    alt={release.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === release.id ? 1.1 : 1,
                      rotate: hoveredId === release.id ? -2 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Diagonal overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent"
                    style={{
                      clipPath: 'polygon(0 50%, 0 100%, 100% 100%)',
                    }}
                  />
                  {/* Status badge */}
                  <div
                    className={`absolute top-3 md:top-4 left-3 md:left-4 ${getStatusColor(
                      release.status
                    )} px-3 py-1`}
                    style={{
                      clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                    }}
                  >
                    <span className="font-oswald text-[10px] md:text-xs tracking-wider text-white">
                      {getStatusText(release.status)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start gap-3 mb-2 md:mb-3">
                    <h2 className="font-oswald text-lg md:text-xl font-bold leading-tight">
                      {release.name}
                    </h2>
                    <span className="font-oswald text-xl md:text-2xl font-bold text-[#CE1126] whitespace-nowrap">
                      ${release.price}
                    </span>
                  </div>
                  <p className="font-barlow text-zinc-400 text-sm md:text-base mb-3 md:mb-4">
                    {release.colorway}
                  </p>
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="font-barlow text-zinc-500">
                      {formatDate(release.releaseDate)}
                    </span>
                    <span className="font-mono text-zinc-600 text-[10px] md:text-xs">
                      {release.style}
                    </span>
                  </div>

                  {/* Hover action */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredId === release.id ? 1 : 0,
                      y: hoveredId === release.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <button
                      className="w-full bg-[#CE1126] hover:bg-red-700 transition-colors font-oswald tracking-wider py-3 text-sm min-h-[44px]"
                      style={{
                        clipPath:
                          'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                      }}
                    >
                      {release.status === 'upcoming'
                        ? 'SET REMINDER'
                        : release.status === 'released'
                        ? 'SHOP NOW'
                        : 'NOTIFY ME'}
                    </button>
                  </motion.div>
                </div>

                {/* Diagonal line decoration */}
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#CE1126]/50 to-[#CE1126] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredReleases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="font-oswald text-4xl md:text-6xl text-zinc-800 mb-4">NO DROPS</div>
            <p className="font-barlow text-zinc-500">
              No releases match this filter. Check back soon.
            </p>
          </motion.div>
        )}
      </main>

      {/* Stats bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-4 md:px-8 lg:px-16 py-6 md:py-8 border-t border-zinc-800 bg-zinc-900/30"
      >
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl">
          <div>
            <div className="font-oswald text-2xl md:text-4xl font-bold text-[#CE1126]">
              {releases.filter((r) => r.status === 'upcoming').length}
            </div>
            <div className="font-barlow text-[10px] md:text-xs text-zinc-500 tracking-wider">
              UPCOMING
            </div>
          </div>
          <div>
            <div className="font-oswald text-2xl md:text-4xl font-bold text-emerald-500">
              {releases.filter((r) => r.status === 'released').length}
            </div>
            <div className="font-barlow text-[10px] md:text-xs text-zinc-500 tracking-wider">
              AVAILABLE
            </div>
          </div>
          <div>
            <div className="font-oswald text-2xl md:text-4xl font-bold text-zinc-500">
              {releases.filter((r) => r.status === 'sold-out').length}
            </div>
            <div className="font-barlow text-[10px] md:text-xs text-zinc-500 tracking-wider">
              SOLD OUT
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 px-4 md:px-8 lg:px-16 py-6 border-t border-zinc-800/50">
        <p className="font-barlow text-[11px] md:text-xs text-zinc-600 text-center">
          Requested by @justin · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;