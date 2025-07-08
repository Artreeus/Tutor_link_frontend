'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaLock, FaUserCheck, FaChalkboardTeacher, 
  FaBookOpen, FaGraduationCap, FaAward, FaComments, FaUniversity 
} from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
        <div className="flex items-center justify-center bg-white p-8 md:p-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Learn with expert anytime anywhere
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to help people find the best course online and learn with expert anytime, anywhere.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by subject, grade or name..." 
                  className="w-full pl-4 pr-16 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#4f46e5] transition-all"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#4f46e5] text-white p-2 rounded transition-colors">
                  <FaSearch className="text-xl" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register?role=student" className="btn bg-[#4f46e5] text-white px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                  Sign Up as Student
                </Link>
                <Link href="/register?role=tutor" className="btn bg-gray-100 text-gray-800 hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                  Register as Tutor
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            alt="Learning Environment" 
            fill
            style={{ 
              objectFit: 'cover', 
              filter: 'brightness(0.9)' 
            }}
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Why Choose TutorLink?
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <FaSearch />, 
                title: "Find Tutors Fast", 
                description: "Search and filter through our extensive tutor database to find the perfect match for your needs.",
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                icon: <FaLock />, 
                title: "Secure Payments", 
                description: "Our platform ensures secure and hassle-free payment processing for all tutoring sessions.",
                image: "https://plus.unsplash.com/premium_photo-1668383778557-d71c562fdb4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                icon: <FaUserCheck />, 
                title: "Verified Profiles", 
                description: "All tutors on our platform undergo a verification process to ensure quality education.",
                image: "https://plus.unsplash.com/premium_photo-1667520168395-c1f60f1d6996?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body items-center text-center p-6">
                  <div className="text-[#4f46e5] text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            How TutorLink Works
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <FaChalkboardTeacher />, 
                title: "Find Your Tutor", 
                description: "Browse through our extensive list of qualified tutors and find the perfect match for your learning needs.",
                image: "https://images.unsplash.com/photo-1660128359946-5d09e282a8a7?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                icon: <FaBookOpen />, 
                title: "Book a Session", 
                description: "Schedule a session at a time that works best for you. Choose between online or in-person tutoring.",
                image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              { 
                icon: <FaGraduationCap />, 
                title: "Learn & Grow", 
                description: "Engage in personalized learning sessions and track your progress with our comprehensive tools.",
                image: "https://images.unsplash.com/photo-1660351174962-e2a1fbb9af09?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card bg-gray-50 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body items-center text-center p-6">
                  <div className="text-[#4f46e5] text-4xl mb-4">{step.icon}</div>
                  <h3 className="card-title text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Success Stories
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <FaAward />, 
                title: "Academic Improvement", 
                description: "90% of our students show significant grade improvement within 3 months.",
                image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              },
              { 
                icon: <FaComments />, 
                title: "Student Satisfaction", 
                description: "4.8/5 average rating from thousands of satisfied students and parents.",
                image: "https://images.unsplash.com/photo-1706690163950-169c4abce307?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                icon: <FaUniversity />, 
                title: "Expert Tutors", 
                description: "Our tutors come from top universities with proven teaching expertise.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              }
            ].map((story, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={story.image} 
                    alt={story.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body items-center text-center p-6">
                  <div className="text-[#4f46e5] text-4xl mb-4">{story.icon}</div>
                  <h3 className="card-title text-xl font-semibold mb-3">{story.title}</h3>
                  <p className="text-gray-600 text-center">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Student Testimonials
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { 
                quote: "TutorLink helped me find the perfect math tutor for my daughter. Her grades have improved significantly!", 
                name: "Sarah Johnson",
                image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                quote: "As a tutor on TutorLink, I've been able to connect with students who truly benefit from my teaching style.", 
                name: "Professor Mark Williams",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="card bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 w-24 h-24 rounded-full overflow-hidden shadow-md">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={96} 
                    height={96} 
                    className="object-cover"
                  />
                </div>
                <p className="italic text-gray-700 mb-4 text-lg">"{testimonial.quote}"</p>
                <h3 className="font-bold text-[#4f46e5]">- {testimonial.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

  

      
    </>
  );
}