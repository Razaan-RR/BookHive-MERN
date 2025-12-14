import { Link, useRouteError } from 'react-router-dom'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) px-4">
      <div className="card max-w-lg w-full text-center animate-fadeInUp">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-500">
            <FaExclamationTriangle size={28} />
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-2">
          {error?.status || 404}
        </h1>

        <h2 className="text-xl mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-sm opacity-80 mb-6">
          {error?.statusText ||
            error?.message ||
            'The page you are looking for does not exist or was moved.'}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="btn bg-(--primary) text-(--text)"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
