import { useEffect, useState } from 'react'

const categories = [
  {
    name: 'Fiction',
    icon: '📖',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Science',
    icon: '🔬',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'History',
    icon: '🏛️',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Biographies',
    icon: '👤',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Fantasy',
    icon: '🧙‍♂️',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'CookBooks',
    icon: '🥘',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60',
  },
]

export default function FeaturedCategories() {
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => (prev >= categories.length * 220 ? 0 : prev + 0.5))
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="text-center">
        <span className="inline-block mb-10 px-8 py-3 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25 text-(--text) shadow-sm">
          All of our Categories 📚🪵
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-6 whitespace-nowrap"
          style={{
            transform: `translateX(-${scrollX}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative w-52 h-64 rounded-3xl overflow-hidden shadow-lg cursor-pointer shrink-0 transform transition-transform hover:scale-105"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--primary)/70 to-(--secondary)/30 flex flex-col justify-end p-4 rounded-3xl">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
