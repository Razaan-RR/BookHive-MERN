import { FaBookOpen, FaTruckFast, FaStar, FaShieldHeart } from 'react-icons/fa6'

const WhyChooseBookHive = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-(--secondary) opacity-20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-(--primary) opacity-20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block mb-6 px-6 py-2 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25 text-(--text) shadow-sm">
            Why BookHive 🐝📖
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
            More Than a Bookstore.
            <br />
            <span className="text-(--primary)">A Home for Readers.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-(--primary)/10 flex items-center justify-center text-(--primary) text-xl">
                <FaBookOpen />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Curated by Book Lovers
                </h3>
                <p className="opacity-70 leading-relaxed">
                  Every book on BookHive is hand-picked by passionate library
                  owners who care about quality, not quantity.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-(--secondary)/20 flex items-center justify-center text-yellow-600 text-xl">
                <FaStar />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Honest Prices, Real Value
                </h3>
                <p className="opacity-70 leading-relaxed">
                  No inflated costs. No hidden fees. Just fair pricing that
                  respects both readers and sellers.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-(--primary)/10 flex items-center justify-center text-(--primary) text-xl">
                <FaTruckFast />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Fast & Reliable Delivery
                </h3>
                <p className="opacity-70 leading-relaxed">
                  Carefully packed books delivered safely to your doorstep —
                  because stories deserve care.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-(--secondary)/20 flex items-center justify-center text-yellow-600 text-xl">
                <FaShieldHeart />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Trusted & Community-Driven
                </h3>
                <p className="opacity-70 leading-relaxed">
                  BookHive supports independent libraries and builds a trusted
                  reading community, not just transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] p-10 bg-linear-to-br from-(--primary) to-blue-700 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Built for Readers Who Care 📚
              </h3>
              <p className="opacity-90 leading-relaxed mb-6">
                Whether you love rare finds, new releases, or timeless classics
                — BookHive connects you with books that matter.
              </p>

              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-full bg-white/20 text-sm">
                  Handpicked Books
                </span>
                <span className="px-4 py-2 rounded-full bg-white/20 text-sm">
                  Independent Sellers
                </span>
                <span className="px-4 py-2 rounded-full bg-white/20 text-sm">
                  Reader-First Platform
                </span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-(--secondary) flex items-center justify-center text-2xl shadow-xl">
              📖
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseBookHive
