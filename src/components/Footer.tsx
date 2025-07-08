import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Type for the SocialIcon props
interface SocialIconProps {
  href: string; // href should be a string
  icon: React.ReactNode; // icon can be any valid React node (e.g., SVG, FontAwesome icon, etc.)
}


// Type for the FooterLink props
interface FooterLinkProps {
  href: string; // href should be a string
  children: React.ReactNode; // children can be any valid React node (e.g., string, JSX, etc.)
}

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <FooterLink href="/tutors">Find a Tutor</FooterLink>
              <FooterLink href="/register?role=tutor">Become a Tutor</FooterLink>
              <FooterLink href="/subjects">Browse Subjects</FooterLink>
              <FooterLink href="/how-it-works">How It Works</FooterLink>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/terms">Terms of Use</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>

          {/* Social & Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect With Us</h3>
            
            <div className="flex space-x-4 mb-6">
              <SocialIcon href="#" icon={<FaFacebook />} />
              <SocialIcon href="#" icon={<FaTwitter />} />
              <SocialIcon href="#" icon={<FaInstagram />} />
              <SocialIcon href="#" icon={<FaLinkedin />} />
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subscribe to our newsletter</h4>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section with Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TutorLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Footer Links
const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-600 hover:text-indigo-600 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
// Helper Component for Social Icons
const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      className="text-gray-500 hover:text-indigo-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
    >
      {icon}
    </a>
  );
};

export default Footer;