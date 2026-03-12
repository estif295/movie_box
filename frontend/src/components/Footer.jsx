import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaLanguage,
  FaHeart 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    browse: [
      { name: 'Home', path: '/' },
      { name: 'Movies', path: '/movies' },
      { name: 'Categories', path: '/categories' },
      { name: 'New Releases', path: '/new-releases' },
      { name: 'Popular', path: '/popular' },
    ],
    help: [
      { name: 'Help Center', path: '/help' },
      { name: 'Account Settings', path: '/account' },
      { name: 'Payment Methods', path: '/payment' },
      { name: 'Gift Cards', path: '/gift-cards' },
      { name: 'Contact Us', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Use', path: '/terms' },
      { name: 'Cookie Preferences', path: '/cookies' },
      { name: 'Corporate Information', path: '/corporate' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
  ];

  const appLinks = [
    { icon: FaApple, name: 'App Store', url: '#' },
    { icon: FaGooglePlay, name: 'Google Play', url: '#' },
  ];

  return (
    <footer className="bg-moviebox-dark border-t border-gray-800 mt-auto">
      {/* Main Footer */}
      <div className="container-padding py-12">
        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link to="/" className="text-3xl font-bold text-netflix-red hover:text-red-600 transition-colors mb-4 md:mb-0">
            MovieBox
          </Link>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-moviebox-gray hover:bg-netflix-red p-3 rounded-full text-gray-400 hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Browse Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Browse</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language & App Downloads */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Get the App</h3>
            
            {/* Language Selector */}
            <button className="flex items-center space-x-2 bg-moviebox-gray hover:bg-moviebox-light text-white px-4 py-2 rounded-md mb-4 transition-colors duration-300 w-full">
              <FaLanguage />
              <span>English</span>
            </button>

            {/* App Downloads */}
            <div className="space-y-2">
              {appLinks.map((app) => (
                <a
                  key={app.name}
                  href={app.url}
                  className="flex items-center space-x-3 bg-moviebox-gray hover:bg-moviebox-light text-white px-4 py-2 rounded-md transition-colors duration-300 w-full"
                >
                  <app.icon size={20} />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-400">Download on</span>
                    <span className="text-sm font-semibold">{app.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on new movies and offers</p>
            </div>
            
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-moviebox-gray text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
              />
              <button
                type="submit"
                className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2 rounded-r-md transition-colors duration-300 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Additional Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              &copy; {currentYear} MovieBox. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Made with love */}
          <div className="flex justify-center items-center mt-4 text-xs text-gray-500">
            <span>Made with</span>
            <FaHeart className="text-netflix-red mx-1 animate-pulse" size={12} />
            <span>by MovieBox Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;