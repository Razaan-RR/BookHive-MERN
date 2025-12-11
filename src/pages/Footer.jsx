import React from 'react'
import logo from '../assets/logo.png'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { SiX } from 'react-icons/si'

function Footer() {
  return (
    <footer className="bg-bg text-text shadow-inner mt-12">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <span
              className="font-extrabold text-2xl tracking-wider drop-shadow-lg"
              style={{
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BookHive
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Delivering knowledge and stories worldwide. Join us and explore the world of books.
          </p>
          <div className="flex items-center gap-4 mt-4 text-primary hover:text-secondary transition-colors text-xl">
            <a href="#"><SiX /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div>
          <h6 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
            Quick Links
          </h6>
          <ul className="flex flex-col gap-2 text-text-secondary">
            <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Books</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Dashboard</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
            Contact
          </h6>
          <ul className="flex flex-col gap-2 text-text-secondary">
            <li>Email: support@bookhive.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Book Street, City, Country</li>
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
            Legal
          </h6>
          <ul className="flex flex-col gap-2 text-text-secondary">
            <li><a href="#" className="hover:text-secondary transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-sm text-text-secondary">
        &copy; {new Date().getFullYear()} BookHive. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
