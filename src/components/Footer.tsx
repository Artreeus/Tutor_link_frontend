import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';

// Type for the SocialIcon props
interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
}

// Type for the FooterLink props
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const Footer = () => {
  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6636] opacity-3 rounded-full transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6610] opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-5">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tutor<span className="text-[#FF6636]">Link</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Connecting passionate learners with exceptional tutors worldwide. 
                Transform your learning journey with personalized education.
              </p>
              
              {/* CTA Section */}
              <div className="bg-gradient-to-r from-[#FF6636] to-[#ff4d1a] p-6 rounded-2xl text-white">
                <h3 className="text-xl font-semibold mb-2">Ready to start learning?</h3>
                <p className="text-orange-100 mb-4">Join thousands of students already improving their skills.</p>
                <button className="bg-white text-[#FF6636] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                  Get Started <FaArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Services Column */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 relative">
                  Services
                  <div className="absolute -bottom-2 left-0 w-8 h-1 bg-[#FF6636] rounded-full"></div>
                </h3>
                <ul className="space-y-4">
                  <FooterLink href="/tutors">Find a Tutor</FooterLink>
                  <FooterLink href="/register?role=tutor">Become a Tutor</FooterLink>
                  <FooterLink href="/subjects">Browse Subjects</FooterLink>
                  <FooterLink href="/how-it-works">How It Works</FooterLink>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 relative">
                  Company
                  <div className="absolute -bottom-2 left-0 w-8 h-1 bg-[#FF6636] rounded-full"></div>
                </h3>
                <ul className="space-y-4">
                  <FooterLink href="/about">About Us</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/blog">Blog</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                </ul>
              </div>

              {/* Connect Column */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 relative">
                  Connect
                  <div className="absolute -bottom-2 left-0 w-8 h-1 bg-[#FF6636] rounded-full"></div>
                </h3>
                
                {/* Social Icons */}
                <div className="flex space-x-3 mb-6">
                  <SocialIcon href="#" icon={<FaFacebook size={18} />} />
                  <SocialIcon href="#" icon={<FaTwitter size={18} />} />
                  <SocialIcon href="#" icon={<FaInstagram size={18} />} />
                  <SocialIcon href="#" icon={<FaLinkedin size={18} />} />
                </div>
                
                {/* Newsletter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Stay Updated</h4>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF6636] focus:outline-none transition-colors"
                    />
                    <button className="w-full bg-[#FF6636] text-white px-4 py-3 rounded-xl hover:bg-[#e55a2e] transition-colors font-medium">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} TutorLink. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              <Link href="/terms" className="text-gray-600 hover:text-[#FF6636] transition-colors">
                Terms of Use
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-[#FF6636] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-[#FF6636] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
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
        className="text-gray-600 hover:text-[#FF6636] transition-colors font-medium hover:translate-x-1 transform duration-200 inline-block"
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
      className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#FF6636] hover:text-white transition-all duration-300 transform hover:scale-110"
    >
      {icon}
    </a>
  );
};

export default Footer;