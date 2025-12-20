import { FaQuoteLeft } from 'react-icons/fa6'
import { motion } from 'framer-motion'
console.log(motion)

const testimonials = [
  {
    name: 'Ayesha Rahman',
    role: 'Avid Reader',
    quote:
      'BookHive feels like a quiet corner of the internet made just for readers. I’ve discovered books here I’d never find elsewhere.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60',
  },
  {
    name: 'Tanvir Hasan',
    role: 'Literature Student',
    quote:
      'The curated collections are what won me over. Every recommendation feels thoughtful, not random.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=60',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Poetry Lover',
    quote:
      'BookHive is not just a bookstore — it’s a community. The experience feels calm, warm, and personal.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60',
  },
]

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-10 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-(--bg) to-transparent z-10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-(--secondary)/20 blur-[200px] rounded-full" />

      <div className="text-center mb-28 relative z-20">
        <span className="inline-block px-10 py-4 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25">
          Reader Stories 💬
        </span>
      </div>

      <div className="relative z-20 space-y-24 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-(--secondary)/30 blur-2xl scale-110" />
              <img
                src={t.img}
                alt={t.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>

            <div className="relative max-w-xl">
              <FaQuoteLeft className="text-(--secondary) text-4xl mb-6 opacity-70" />
              <p className="text-xl leading-relaxed mb-6">{t.quote}</p>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-(--secondary)/60" />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <span className="text-sm opacity-70">{t.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
