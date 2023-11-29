import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  // Current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        {/* Links relevant to a newspaper website */}
        <a href="/about" className="link link-hover">
          About The Daily Nexus
        </a>
        <a href="/contact" className="link link-hover">
          Contact Us
        </a>
        <a href="/editorial-policy" className="link link-hover">
          Editorial Policy
        </a>
        <a href="/subscription" className="link link-hover">
          Subscriptions
        </a>
        <a href="/archives" className="link link-hover">
          Archives
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
        <FaFacebook className="text-2xl" />
        <FaGoogle className="text-2xl" />
        <FaTwitter className="text-2xl" />
        <FaInstagram className="text-2xl" />
        </div>
      </nav>
      <aside>
        {/* Updated copyright notice */}
        <p>© {currentYear} The Daily Nexus. All rights reserved.</p>
        <p>Providing Quality News Since 1950.</p>
      </aside>
    </footer>
  );
};

export default Footer;
