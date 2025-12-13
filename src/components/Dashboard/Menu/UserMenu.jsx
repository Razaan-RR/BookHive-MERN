import React from 'react'
import MenuItem from './MenuItem'
import { AiOutlineBook } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'

const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={AiOutlineBook}
        label="My Orders"
        address="/dashboard/my-orders"
      />
      <MenuItem
        icon={MdFavorite}
        label="Wishlist"
        address="/dashboard/wishlist"
      />
      <MenuItem
        icon={MdFavorite}
        label="Invoices"
        address="/dashboard/invoices"
      />
    </>
  )
}

export default UserMenu
