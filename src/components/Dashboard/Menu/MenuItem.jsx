import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address, icon: Icon, isCollapsed }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `
        group relative flex items-center rounded-xl overflow-hidden
        ${isCollapsed ? 'justify-center px-2' : 'px-4'}
        py-2 my-1
        transition-all duration-300 ease-out

        ${isActive
          ? 'text-[var(--primary)] font-semibold bg-white/60 backdrop-blur-md shadow-lg'
          : 'text-gray-600 hover:text-[var(--primary)]'}
        `
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`
              absolute left-0 top-0 h-full w-1 rounded-r-full
              bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]
              transition-opacity duration-300
              ${isActive ? 'opacity-100' : 'opacity-0'}
            `}
          />

          <span className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-0 group-hover:opacity-100 transition" />

          <div
            className={`
              relative z-10 flex items-center justify-center
              w-9 h-9 rounded-lg
              transition-all duration-300
              group-hover:scale-110
              ${isActive
                ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-md'
                : 'bg-transparent'}
            `}
          >
            <Icon className="w-5 h-5" />
          </div>

          {!isCollapsed && (
            <span className="relative z-10 ml-4 tracking-wide">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default MenuItem
