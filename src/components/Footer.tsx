import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <Link href="/tutors" className="link link-hover">Find a Tutor</Link>
        <Link href="/register?role=tutor" className="link link-hover">Become a Tutor</Link>
        <Link href="/subjects" className="link link-hover">Browse Subjects</Link>
        <Link href="/how-it-works" className="link link-hover">How It Works</Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link href="/about" className="link link-hover">About Us</Link>
        <Link href="/contact" className="link link-hover">Contact</Link>
        <Link href="/blog" className="link link-hover">Blog</Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link href="/terms" className="link link-hover">Terms of Use</Link>
        <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
        <Link href="/cookies" className="link link-hover">Cookie Policy</Link>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a className="btn btn-ghost btn-circle"><FaFacebook size={20} /></a>
          <a className="btn btn-ghost btn-circle"><FaTwitter size={20} /></a>
          <a className="btn btn-ghost btn-circle"><FaInstagram size={20} /></a>
          <a className="btn btn-ghost btn-circle"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;