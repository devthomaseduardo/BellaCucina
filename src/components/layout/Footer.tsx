import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  restaurantName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const Footer = ({
  restaurantName = "Bella Cucina",
  address = "123 Main Street, City, State 12345",
  phone = "(555) 123-4567",
  email = "info@restaurant.com",
}: FooterProps) => {
  return (
    <footer className="w-full bg-slate-900 px-4 py-12 text-white md:px-8 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Restaurant Info */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-50">{restaurantName}</h3>
            <p className="mb-2 text-zinc-400">{address}</p>
            <p className="mb-2 text-zinc-400">{phone}</p>
            <p className="text-zinc-400">{email}</p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-50">Hours</h3>
            <p className="mb-2 text-zinc-400">
              Monday - Thursday: 11:00 AM - 10:00 PM
            </p>
            <p className="mb-2 text-zinc-400">
              Friday - Saturday: 11:00 AM - 11:00 PM
            </p>
            <p className="text-zinc-400">Sunday: 12:00 PM - 9:00 PM</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-50">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-50">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
              >
                <Twitter size={24} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-l-md border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                />
                <button
                  type="button"
                  className="rounded-r-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {restaurantName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
