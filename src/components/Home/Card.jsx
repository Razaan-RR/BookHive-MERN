import { Link } from 'react-router-dom'
import { FaBookOpen, FaTag } from 'react-icons/fa6'

const Card = ({ book }) => {
  const { _id, name, image, author, price } = book || {}

  return (
    <Link
      to={`/book/${_id}`}
      className="group relative block rounded-2xl overflow-hidden bg-(--card-bg) shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-(--primary)/10 via-transparent to-(--secondary)/10 opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      <div className="relative p-5 space-y-4">
        <h3 className="text-lg font-extrabold leading-tight group-hover:text-(--secondary) transition">
          {' '}
          {name}{' '}
        </h3>

        <div className="flex items-center gap-2 text-sm opacity-80">
          <FaBookOpen className="text-(--primary)" />
          <span className="bg-(--secondary)/20 px-2 py-0.5 rounded-md">
            {author}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-(--primary)/10 text-(--primary) font-bold text-sm">
            <FaTag /> <span>BDT {price}</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-(--secondary)/20 flex items-center justify-center group-hover:bg-(--secondary) transition">
            <span className="text-sm font-bold text-(--secondary) group-hover:text-white transition">
              →
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-(--secondary)/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
    </Link>
  )
}

export default Card
