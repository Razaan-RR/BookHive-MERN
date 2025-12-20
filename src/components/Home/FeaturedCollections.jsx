import { FaGem, FaFeather, FaFire, FaBookOpen } from 'react-icons/fa6'

const collections = [
  {
    title: 'Mystery Picks',
    desc: 'Unravel thrilling stories handpicked for mystery lovers.',
    icon: <FaBookOpen />,
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60',
  },
  {
    title: 'Bestsellers',
    desc: 'Explore the books everyone is talking about.',
    icon: <FaFire />,
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=60',
  },
  {
    title: 'Rare Finds',
    desc: 'Discover hidden gems for your personal library.',
    icon: <FaGem />,
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=60',
  },
  {
    title: 'Poetry',
    desc: 'Timeless works for the soul and mind.',
    icon: <FaFeather />,
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=60',
  },
]

const FeaturedCollections = () => {
  return (
    <section className="py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
      <div className="text-center mb-24">
        <span className="inline-block px-10 py-4 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25 shadow-sm">
          Featured Collections ✨📚
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {collections.map((col, i) => (
          <div
            key={i}
            className="relative group min-h-[320px] sm:min-h-[380px] flex items-end"
          >
            <img
              src={col.img}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem] transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 rounded-[3rem] bg-black/35 backdrop-blur-[3px]" />

            <div className="relative z-10 p-8 sm:p-10 max-w-md space-y-4">
              <div className="flex items-center gap-4 text-(--secondary) text-3xl">
                {col.icon}
              </div>

              <h3 className="inline-block px-5 py-3 rounded-2xl text-xl sm:text-3xl font-extrabold bg-(--bg)/90 text-(--text)">
                {col.title}
              </h3>

              <p className="inline-block px-5 py-4 rounded-2xl bg-(--card-bg)/90 text-sm sm:text-base leading-relaxed text-(--text)">
                {col.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCollections
