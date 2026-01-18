import { motion } from 'framer-motion'
import { FaQuoteLeft, FaHeart } from 'react-icons/fa6'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 25 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
}

const MeetLibrarians = () => {
  const librarians = [
    {
      name: 'Ayesha Rahman',
      role: 'Mystery & Thriller Curator',
      quote: 'Every book hides a world waiting to be discovered.',
      color: 'from-rose-500/30 to-pink-500/30',
      emoji: '🕵️‍♀️',
    },
    {
      name: 'Tanvir Hasan',
      role: 'Self-Help & Growth Mentor',
      quote: 'The right book at the right time can change your life.',
      color: 'from-sky-500/30 to-cyan-500/30',
      emoji: '🌱',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Poetry & Classics Keeper',
      quote: 'Poetry is the language of the soul, bound in pages.',
      color: 'from-amber-500/30 to-orange-500/30',
      emoji: '🪶',
    },
  ]

  return (
    <section className="relative py-28 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-(--primary) opacity-20 blur-[160px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-(--secondary) opacity-20 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <span className="inline-block mb-6 px-8 py-3 rounded-full text-xl sm:text-2xl font-bold bg-(--secondary)/25 shadow-lg">
            Meet Our Librarians 🧑‍🏫📚
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            The Souls Behind
            <br />
            <span className="text-(--primary)">BookHive</span>
          </h2>
          <p className="opacity-70 mt-6 text-base sm:text-lg">
            Real people. Real passion. Every book here is chosen with love.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {librarians.map((lib, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                rotate: index % 2 === 0 ? -1.5 : 1.5,
                scale: 1.04,
              }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 rounded-[2.8rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${lib.color}`}
              />

              <div className="relative z-10 p-8 rounded-[2.8rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-2xl bg-(--primary) text-white flex items-center justify-center text-xl shadow-xl"
                >
                  {lib.emoji}
                </motion.div>

                <FaQuoteLeft className="text-(--primary) text-2xl mb-4 opacity-80" />

                <p className="italic opacity-80 mb-6 leading-relaxed">
                  “{lib.quote}”
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{lib.name}</h4>
                    <p className="text-sm opacity-60">{lib.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-(--secondary)/20 flex items-center justify-center text-(--secondary)">
                    <FaHeart />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div
            className="inline-block px-10 py-5 rounded-full text-white shadow-2xl"
            style={{
              background:
                'linear-gradient(to right, var(--secondary), var(--primary))',
            }}
          >
            🐝 Curated by Humans. Powered by Passion.
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetLibrarians
