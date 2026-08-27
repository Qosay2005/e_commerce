import React from 'react'
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const quickLinks = [
    { to: '/', label: t('footer.home') },
    { to: '/contact', label: t('footer.contact') },
    { to: '/cart', label: t('footer.cart') },
    { to: '/profile', label: t('footer.profile') },
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

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 dark:border-zinc-700 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#091E27] dark:text-white">
            {t('navbar.brand')}
          </h3>

          <p className="text-sm leading-6 text-slate-600 dark:text-zinc-300">
            {t('footer.description')}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
            {t('footer.quickLinks')}
          </h4>

          <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-zinc-300">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-[#091E27] dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
            {t('footer.contact')}
          </h4>

          <div className="space-y-2 text-sm text-slate-600 dark:text-zinc-300">
            <p>{t('footer.email')}</p>
            <p>{t('footer.phone')}</p>
            <p>{t('footer.address')}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
            {t('footer.followUs')}
          </h4>

          <div className="flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-[#eef7fb] p-2 text-[#091E27] transition-colors hover:bg-[#091E27] hover:text-white dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-[#DB4444]"
              >
                <Icon fontSize="small" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
