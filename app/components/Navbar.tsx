import { NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  function getNavLinkClass({ isActive }: { isActive: boolean }): string {
    return isActive ? "text-blue-500 font-bold" : "text-gray-700";
  }
  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="z-50 shadow bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <NavLink to="/" className="flex items-center">
          <Globe className="text-blue-700 mr-2" size={40} />
          <span className="text-3xl font-bold text-blue-700">
            Country<span className="text-orange-700">Explorer</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <NavLink to="/" className={getNavLinkClass} end>
            <span>Home</span>
          </NavLink>
          <NavLink to="/countries" className={getNavLinkClass}>
            <span>Countries</span>
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            <span>About</span>
          </NavLink>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-8 py-4 space-y-3 text-lg">
          <NavLink to="/" className={getNavLinkClass} end onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/countries" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
            Countries
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
            About
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
