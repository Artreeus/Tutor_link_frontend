import Link from 'next/link';
import { FaSearch, FaLock, FaUserCheck } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">TutorLink</h1>
            <p className="py-6">Find & Connect with the Best Tutors for your educational journey</p>
            
            <div className="form-control mb-6">
              <div className="input-group">
                <input type="text" placeholder="Search by subject, grade or name..." className="input input-bordered w-full" />
                <button className="btn btn-square btn-primary">
                  <FaSearch />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Link href="/register?role=student" className="btn btn-primary">Sign Up as Student</Link>
              <Link href="/register?role=tutor" className="btn btn-secondary">Register as Tutor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose TutorLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaSearch className="text-4xl text-primary mb-4" />
                <h3 className="card-title">Find Tutors Fast</h3>
                <p>Search and filter through our extensive tutor database to find the perfect match for your needs.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaLock className="text-4xl text-primary mb-4" />
                <h3 className="card-title">Secure Payments</h3>
                <p>Our platform ensures secure and hassle-free payment processing for all tutoring sessions.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaUserCheck className="text-4xl text-primary mb-4" />
                <h3 className="card-title">Verified Profiles</h3>
                <p>All tutors on our platform undergo a verification process to ensure quality education.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Student Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="italic">"TutorLink helped me find the perfect math tutor for my daughter. Her grades have improved significantly!"</p>
                <h3 className="font-bold mt-4">- Sarah Johnson</h3>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="italic">"As a tutor on TutorLink, I've been able to connect with students who truly benefit from my teaching style."</p>
                <h3 className="font-bold mt-4">- Professor Mark Williams</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}