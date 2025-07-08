'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaUniversity, FaLightbulb, FaUsers, FaAward, FaHandshake 
} from 'react-icons/fa';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function About() {
  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-gray-50"
    >
      {/* Hero Section */}
      <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[500px] flex items-center justify-center text-white"
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-photo/about-us-information-service-sharing-join-concept_53876-124056.jpg?t=st=1741294006~exp=1741297606~hmac=b11c0cde93857cbb5e1fd644331f484d3f04cc89e6a27c81fc21b6f9999ec035&w=1380)', // Real-time background image from Unsplash
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      
    </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
        className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <FaLightbulb className="mr-4 text-[#4f46e5]" />
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            At TutorLink, we're revolutionizing education by creating a seamless platform that connects passionate tutors with eager learners. 
            Our mission is to break down educational barriers and provide personalized learning experiences that transform academic journeys.
          </p>
          <p className="text-gray-600">
            We believe that every student deserves access to high-quality, individualized education that adapts to their unique learning style.
          </p>
        </div>
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Mission" 
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 flex justify-center items-center">
            <FaUsers className="mr-4 text-[#4f46e5]" />
            Our Passionate Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Davis", role: "Founder & CEO", initials: "JD" },
              { name: "Sarah Wong", role: "CTO", initials: "SW" },
              { name: "Michael Johnson", role: "Lead Developer", initials: "MJ" }
            ].map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-gray-100 p-6 rounded-xl shadow-md"
              >
                <div className="avatar placeholder mb-4">
                  <div className="bg-[#4f46e5] text-white rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <span className="text-3xl">{member.initials}</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
        className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Impact" 
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <FaAward className="mr-4 text-[#4f46e5]" />
            Our Impact
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center">
              <span className="mr-3 text-[#4f46e5]">✓</span>
              90% of students report improved academic performance
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-[#4f46e5]">✓</span>
              Over 10,000 verified tutors across multiple disciplines
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-[#4f46e5]">✓</span>
              4.8/5 average rating from students and parents
            </li>
          </ul>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 flex justify-center items-center">
            <FaUniversity className="mr-4 text-[#4f46e5]" />
            Our Vision
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              We envision a world where quality education is accessible to everyone, regardless of geographical or economic barriers. 
              Our platform will continue to innovate, leveraging technology to create personalized, engaging learning experiences.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
        className="bg-[#4f46e5] text-white my-16 py-16 container mx-auto "
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 flex justify-center items-center">
            <FaHandshake className="mr-4" />
            Join Our Learning Community
          </h2>
          <p className="text-xl mb-8">
            Whether you're a student seeking knowledge or a tutor sharing expertise, TutorLink is your platform for growth.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/register?role=student" 
              className="btn bg-white text-[#4f46e5] hover:bg-gray-100 px-8 py-3 rounded-lg transition-colors"
            >
              Sign Up as Student
            </Link>
            <Link 
              href="/register?role=tutor" 
              className="btn border-2 border-white text- px-8 py-3 rounded-lg transition-colors"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}