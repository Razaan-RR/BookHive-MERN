import { Link } from 'react-router-dom'
import { FaBookOpen, FaTag } from 'react-icons/fa6'

const Card = ({ book }) => {
  const { _id, name, image, author, price } = book || {}

  return (
    <Link
      to={`/book/${_id}`}
  className="overflow-hidden group relative block rounded-2xl bg-(--card-bg) shadow-lg hover:shadow-2xl transition-all duration-500 w-full max-w-xs sm:max-w-full mx-auto"
    >
      <div className="absolute inset-0 bg-linear-to-br from-(--primary)/10 via-transparent to-(--secondary)/10 opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative aspect-3/4 sm:aspect-3/4 md:aspect-4/5 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      <div className="relative p-4 sm:p-5 space-y-3 sm:space-y-4">
        <h3 className="text-md sm:text-lg font-extrabold leading-tight group-hover:text-(--secondary) transition truncate">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-xs sm:text-sm opacity-80 flex-wrap">
          <FaBookOpen className="text-(--primary)" />
          <span className="bg-(--secondary)/20 px-2 py-0.5 rounded-md truncate">
            {author}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 sm:mt-4">
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full bg-(--primary)/10 text-(--primary) font-bold text-xs sm:text-sm">
            <FaTag /> <span>BDT {price}</span>
          </div>

          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-(--secondary)/20 flex items-center justify-center group-hover:bg-(--secondary) transition">
            <span className="text-xs sm:text-sm font-bold text-(--secondary) group-hover:text-white transition">
              →
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-(--secondary)/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
    </Link>
  )
}

export default Card
