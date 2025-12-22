
# BookHive – A Book Courier App

## Project Name

**BookHive**

## Purpose

BookHive is a full-stack book courier application that allows users to browse, order, and review books from multiple librarians, with seamless delivery, role-based management, and secure payments.

## Live URL

https://sage-bubblegum-e870ed.netlify.app/

## Key Features

* **Wishlist & Reviews:** Users can add books to a wishlist and leave ratings/reviews.
* **Search & Sort:** Search books by name and sort by price.
* **JWT Protected Routes:** Only authenticated users can access protected routes.
* **Animated & Responsive UI:** Engaging banners, cards, and dashboards.
* Users can pay for their orders online.
* Orders track both **order status** (`pending → shipped → delivered`) and **payment status** (`unpaid → paid`).

### Role-Based Features

**User**

* Browse all books and view book details.
* Place orders with delivery info.
* Cancel pending orders.
* View invoices, order status, profile, and wishlist.

**Librarian**

* Add, edit, publish/unpublish books.
* View own books and manage orders.
* Update order status (pending → shipped → delivered).

**Admin**

* Manage all users (make admin/librarian).
* Manage all books (publish/unpublish, delete).
* Full visibility on all orders and system-wide management.

## NPM Packages Used

* `react`, `react-dom` – Frontend library
* `react-router-dom` – Routing
* `axios` – API requests
* `firebase` – Authentication & storage
* `react-query` – Data fetching & caching
* `react-icons` – Icons
* `tailwindcss` – Styling
* `react-hook-form` – Forms & validation

---