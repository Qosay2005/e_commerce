import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Close,
  DarkMode,
  LightMode,
  Menu,
  PersonOutlineOutlined,
  Search,
} from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../hocks/authStore";
import useThemeStore from "../../hocks/useThemeStore";
import useCart from '../../hocks/useCart'
export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const [isOpen, setIsOpen] = useState(false);
  const isDark = mode === "dark";
  const isArabic = i18n.language?.startsWith("ar");

  const navLinks = [
    {
      to: "/",
      label: t("navbar.home"),
    },
    {
      to: "/contact",
      label: t("navbar.contact"),
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const toggleLanguage = () => {
    const nextLanguage = isArabic ? "en" : "ar";

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("appLang", nextLanguage);
  };

  const navLinkClass = isDark
    ? "text-sm font-medium text-slate-300 transition-colors hover:text-white"
    : "text-sm font-medium text-[#4B5966] transition-colors hover:text-[#091E27]";

  const mobileLinkClass = isDark
    ? "rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
    : "rounded-xl px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]";

  const iconButtonClass = isDark
    ? "flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800 hover:text-white"
    : "flex h-9 w-9 items-center justify-center rounded-full text-[#1B3A4B] transition hover:bg-[#F4F7F9] hover:text-[#091E27]";

  const navbarClass = isDark
    ? "border-b border-slate-800 bg-slate-950 px-4 py-4 sm:px-6 lg:px-10"
    : "border-b border-slate-100 bg-white px-4 py-4 sm:px-6 lg:px-10";

  const searchClass = isDark
    ? "flex w-52 items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3.5 py-2 lg:w-64"
    : "flex w-52 items-center gap-2 rounded-full border border-slate-200 bg-[#F5F5F5] px-3.5 py-2 lg:w-64";

  const searchInputClass = isDark
    ? "w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
    : "w-full bg-transparent text-sm text-[#1B3A4B] placeholder:text-slate-400 focus:outline-none";

  const searchIconClass = isDark ? "text-slate-500" : "text-slate-400";

  const languageButtonClass = isDark
    ? "rounded-full border border-slate-700 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-300 transition hover:bg-slate-800"
    : "rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#1B3A4B] transition hover:bg-[#F4F7F9]";

  const mobileMenuClass = isDark
    ? "mx-auto mt-4 flex max-w-7xl flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-lg md:hidden"
    : "mx-auto mt-4 flex max-w-7xl flex-col gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-lg md:hidden";

  const mobileSearchClass = isDark
    ? "mb-2 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3.5 py-2.5"
    : "mb-2 flex items-center gap-2 rounded-full border border-slate-200 bg-[#F5F5F5] px-3.5 py-2.5";

  const mobileMenuButtonClass = isDark
    ? "flex items-center justify-center rounded-full p-2 text-slate-200 transition hover:bg-slate-800 md:hidden"
    : "flex items-center justify-center rounded-full p-2 text-[#091E27] transition hover:bg-[#F4F7F9] md:hidden";

  const dividerClass = isDark
    ? "my-2 h-px bg-slate-800"
    : "my-2 h-px bg-slate-100";

  const mobileActionButtonClass = isDark
    ? "flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
    : "flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]";

  const mobileLanguageButtonClass = isDark
    ? "flex-1 rounded-xl border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
    : "flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]";

  const authButtonClass =
    "rounded-xl bg-[#091E27] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#0f2d3a]";
 const {data} = useCart();
 const cartItems = data?.items||[];
 const cartItemsCount = cartItems.reduce(
  (total,item)=>total + Number(item.count || 0),0
 )
  return (
    <nav className={navbarClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" onClick={closeMenu}>
          {t("navbar.brand")}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className={navLinkClass}
            >
              {t("navbar.logout")}
            </button>
          ) : (
            <Link to="/login" className={navLinkClass}>
              {t("navbar.login")}
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className={searchClass}>
            <input
              type="text"
              placeholder={t("navbar.search", "What are you looking for?")}
              className={searchInputClass}
              aria-label="Search"
            />

            <Search fontSize="small" className={searchIconClass} />
          </div>

          <button
            type="button"
            onClick={toggleMode}
            className={iconButtonClass}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <LightMode fontSize="small" />
            ) : (
              <DarkMode fontSize="small" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className={languageButtonClass}
            aria-label="Toggle language"
          >
            {isArabic ? "EN" : "AR"}
          </button>

          {token && (
            <Link
              to="/profile"
              className={iconButtonClass}
              aria-label="Profile"
            >
              <PersonOutlineOutlined fontSize="small" />
            </Link>
          )}

         <IconButton component={Link} to="/cart">
  <Badge
    badgeContent={cartItemsCount}
    color="error"
    showZero={false}
  >
    <ShoppingCartOutlined />
  </Badge>
</IconButton>
        </div>

        <button
          type="button"
          className={mobileMenuButtonClass}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className={mobileMenuClass}>
          <div className={mobileSearchClass}>
            <input
              type="text"
              placeholder={t("navbar.search", "What are you looking for?")}
              className={searchInputClass}
              aria-label="Search"
            />

            <Search fontSize="small" className={searchIconClass} />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/cart" onClick={closeMenu} className={mobileLinkClass}>
            {t("navbar.cart")}
          </Link>

          {token && (
            <Link to="/profile" onClick={closeMenu} className={mobileLinkClass}>
              {t("navbar.profile")}
            </Link>
          )}

          <div className={dividerClass} />

          <div className="flex items-center gap-2 px-1">
            <button
              type="button"
              onClick={toggleMode}
              className={mobileActionButtonClass}
            >
              {isDark ? (
                <LightMode fontSize="small" />
              ) : (
                <DarkMode fontSize="small" />
              )}

              {isDark ? t("common.lightMode") : t("common.darkMode")}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className={mobileLanguageButtonClass}
            >
              {isArabic ? t("common.english") : t("common.arabic")}
            </button>
          </div>

          <div className={dividerClass} />

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className={authButtonClass}
            >
              {t("navbar.logout")}
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu} className={authButtonClass}>
              {t("navbar.login")}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
