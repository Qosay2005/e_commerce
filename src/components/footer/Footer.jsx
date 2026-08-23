import React from 'react'
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' },
]

const socialLinks = [
  {
    href: 'https://www.facebook.com',
    icon: Facebook,
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com',
    icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'https://www.twitter.com',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'https://www.linkedin.com',
    icon: LinkedIn,
    label: 'LinkedIn',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#091E27]">
            Hexora Tech
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            Modern learning, premium products, and a seamless shopping
            experience for every learner.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quick Links
          </h4>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-[#091E27]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </h4>

          <div className="space-y-2 text-sm text-slate-600">
            <p>qlalwheq123@gmail.com</p>
            <p>+972568673682</p>
            <p>Palestine_Jenin</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Follow Us
          </h4>

          <div className="flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-[#eef7fb] p-2 text-[#091E27] transition-colors hover:bg-[#091E27] hover:text-white"
              >
                <Icon fontSize="small" />
              </a>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            © 2026 Exclusive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}