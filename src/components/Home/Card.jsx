import { Link } from 'react-router-dom'

const Card = ({ book }) => {
  const { _id, name, image, author, price, status } = book || {}

  return (
    <Link
      to={`/book/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-4 rounded-xl bg-(--card-bg) hover:shadow-2xl transition"
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="aspect-3/4 w-full relative overflow-hidden rounded-lg border-2 border-(--secondary)">
          <img
            src={image}
            alt={name}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>

        <div className="font-bold text-lg">{name}</div>

        <div className="text-sm opacity-80">By {author}</div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold">৳ {price}</span>
          <span className="px-3 py-1 text-xs rounded-full bg-(--primary)/10 text-(--primary) font-semibold">
            {status}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Card
