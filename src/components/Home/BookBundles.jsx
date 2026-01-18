import { motion } from 'framer-motion'
import { FaGift, FaTags, FaBookOpen, FaFire } from 'react-icons/fa6'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 14 },
  },
}

const BookBundles = () => {
  const bundles = [
    {
      title: 'Starter Reader Pack',
      desc: 'A gentle mix of fiction, self-help and inspiration for new readers.',
      icon: <FaBookOpen />,
      badge: 'Best for Beginners',
      gradient: 'from-indigo-500/30 to-purple-500/30',
    },
    {
      title: 'Mystery Lovers Bundle',
      desc: 'Dark plots, thrilling twists and unputdownable stories.',
      icon: <FaFire />,
      badge: 'Hot Pick',
      gradient: 'from-rose-500/30 to-pink-500/30',
    },
    {
      title: 'Self Growth Kit',
      desc: 'Books that sharpen your mindset and fuel motivation.',
      icon: <FaTags />,
      badge: 'Popular',
      gradient: 'from-emerald-500/30 to-teal-500/30',
    },
    {
      title: 'Gift Readers Box',
      desc: 'A beautiful bundle curated for gifting book lovers.',
      icon: <FaGift />,
      badge: 'Perfect Gift',
      gradient: 'from-amber-500/30 to-orange-500/30',
    },
  ]

  return (
    <section className="relative py-28 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-(--primary) opacity-20 blur-[150px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-(--secondary) opacity-20 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <span className="inline-block mb-6 px-8 py-3 rounded-full text-xl sm:text-2xl font-bold bg-(--secondary)/25 shadow-lg">
            Book Bundles & Deals 🎁📚
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            More Books,
            <br />
            <span className="text-(--primary)">More Value</span>
          </h2>
          <p className="opacity-70 mt-6 text-base sm:text-lg">
            Curated packs that save money and expand your reading horizon.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {bundles.map((bundle, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -12, scale: 1.04 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${bundle.gradient}`}
              />

              <div className="relative z-10 p-8 h-full rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between">
                <span className="absolute top-5 right-5 px-4 py-1 text-xs rounded-full bg-(--primary) text-white shadow-md">
                  {bundle.badge}
                </span>

                <motion.div
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-14 h-14 rounded-2xl bg-(--primary)/10 flex items-center justify-center text-(--primary) text-2xl mb-6"
                >
                  {bundle.icon}
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{bundle.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">
                    {bundle.desc}
                  </p>
                </div>

                <button
                  className="mt-6 w-full py-3 rounded-xl font-semibold text-white shadow-lg transition"
                  style={{
                    background:
                      'linear-gradient(to right, var(--primary), var(--secondary))',
                  }}
                >
                  Explore Bundle →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div
            className="inline-block px-12 py-5 rounded-full text-white shadow-2xl"
            style={{
              background:
                'linear-gradient(to right, var(--primary), var(--secondary))',
            }}
          >
            💝 Save More. Read More. Love More.
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BookBundles
