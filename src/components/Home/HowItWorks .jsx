import { motion } from 'framer-motion'
import {
  FaBook,
  FaCartShopping,
  FaStore,
  FaTruckFast,
  FaFaceSmile,
} from 'react-icons/fa6'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 15 },
  },
}

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaBook />,
      title: 'Choose Book',
      text: 'Browse hand-picked collections from trusted librarians.',
      color: 'from-pink-500/30 to-purple-500/30',
    },
    {
      icon: <FaCartShopping />,
      title: 'Place Order',
      text: 'Confirm your order in seconds with a smooth checkout.',
      color: 'from-sky-500/30 to-cyan-500/30',
    },
    {
      icon: <FaStore />,
      title: 'Librarian Confirms',
      text: 'Your book is packed with love and attention.',
      color: 'from-amber-500/30 to-orange-500/30',
    },
    {
      icon: <FaTruckFast />,
      title: 'Fast Delivery',
      text: 'Swift and secure shipping to your doorstep.',
      color: 'from-emerald-500/30 to-teal-500/30',
    },
    {
      icon: <FaFaceSmile />,
      title: 'Enjoy Reading',
      text: 'Open your book and lose yourself in stories.',
      color: 'from-indigo-500/30 to-blue-500/30',
    },
  ]

  return (
    <section className="relative py-28 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-(--secondary) opacity-20 blur-[160px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-(--primary) opacity-20 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <span className="inline-block mb-6 px-8 py-3 rounded-full text-xl sm:text-2xl font-bold bg-(--secondary)/25 shadow-lg">
            How It Works 🚀📦
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Your Reading Journey,
            <br />
            <span className="text-(--primary)">Beautifully Simplified</span>
          </h2>
          <p className="opacity-70 mt-6 text-base sm:text-lg">
            A magical 5-step flow designed for book lovers who value elegance
            and ease.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                rotate: index % 2 === 0 ? -1 : 1,
                scale: 1.05,
              }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${step.color}`}
              />

              <div className="relative z-10 h-full text-center p-7 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-(--primary) text-white flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-(--primary)/10 flex items-center justify-center text-(--primary) text-2xl"
                >
                  {step.icon}
                </motion.div>

                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="opacity-70 text-sm leading-relaxed">{step.text}</p>
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
                'linear-gradient(to right, var(--primary), var(--secondary))',
            }}
          >
            📚 Every Order is a Story Beginning
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
