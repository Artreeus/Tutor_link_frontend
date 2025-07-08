// @ts-nocheck

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    FaLightbulb, FaUsers, FaAward, FaHandshake, FaRocket, FaGraduationCap, FaHeart, FaCheck
} from 'react-icons/fa';
import { FC, ReactNode } from 'react';
import Link from 'next/link';

// Animation Variants
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
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Type Definitions
interface TeamMemberProps {
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

interface ValueCardProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}

// Timeline Item Component
const TimelineItem: FC<TimelineItemProps> = ({ year, title, description, isLast = false }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
        {year}
      </div>
      {!isLast && <div className="w-px h-full bg-gray-300"></div>}
    </div>
    <div className={`pb-12 ${isLast ? '' : 'border-l-0'}`}>
      <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
      <p className="text-medium leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function About() {
  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-light min-h-screen"
    >
      {/* Hero Section */}
       <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FF6636 0%, #005A9C 100%)',
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-blob"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white bg-opacity-10 rounded-full animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
          >
            About TutorLink
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed"
          >
            Connecting passionate educators with eager learners to transform education one connection at a time
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center items-center space-x-8 text-sm"
          >
            <div className="flex items-center space-x-2">
              <FaUsers className="text-2xl" />
              <span>10,000+ Tutors</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="text-2xl" />
              <span>50,000+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-2xl" />
              <span>4.8/5 Rating</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={cardVariants}>
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-xl mr-4">
                <FaLightbulb className="text-3xl text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-dark">Our Mission</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-medium leading-relaxed">
                At TutorLink, we're revolutionizing education by creating a seamless platform that connects passionate tutors with eager learners. Our mission is to break down educational barriers and provide personalized learning experiences that transform academic journeys.
              </p>
              <p className="text-lg text-medium leading-relaxed">
                We believe that every student deserves access to high-quality, individualized education that adapts to their unique learning style and pace.
              </p>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="relative">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary to-orange-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <Image 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Mission" 
                width={600}
                height={400}
                className="relative rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark">Our Core Values</h2>
            <p className="text-lg text-medium max-w-2xl mx-auto mt-4">The principles that guide our every decision.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaGraduationCap, title: "Student-Centric", description: "Our primary focus is the success and growth of our students. Every feature is designed to enhance their learning experience." },
              { icon: FaUsers, title: "Empowerment", description: "We empower tutors with the tools they need to succeed and students with the knowledge to achieve their dreams." },
              { icon: FaHandshake, title: "Integrity & Trust", description: "We build trust through transparency, security, and a commitment to academic honesty." },
            ].map((value: ValueCardProps, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="text-center p-8 rounded-2xl bg-light hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                  <value.icon className="text-3xl text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">{value.title}</h3>
                <p className="text-medium">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">Our Journey</h2>
          <p className="text-lg text-medium max-w-2xl mx-auto mt-4">A brief history of our milestones and growth.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <TimelineItem 
            year="'21"
            title="The Spark of an Idea"
            description="TutorLink was founded with a simple mission: to make quality education accessible to everyone, everywhere."
          />
          <TimelineItem 
            year="'22"
            title="Platform Launch & First 1,000 Users"
            description="We officially launched our platform, welcoming our first wave of pioneering tutors and students."
          />
          <TimelineItem 
            year="'23"
            title="Expanding Horizons"
            description="Introduced advanced features like AI-powered matching and expanded our subject offerings to over 50 disciplines."
          />
          <TimelineItem 
            year="'24"
            title="Community of 50,000+"
            description="Celebrated a major milestone, having successfully connected over 50,000 students with expert tutors."
            isLast
          />
        </div>
      </motion.section>
      
      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark">Our Passionate Team</h2>
            <p className="text-lg text-medium max-w-2xl mx-auto mt-4">
              Meet the visionaries behind TutorLink who are dedicated to transforming education.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Davis", role: "Founder & CEO", initials: "JD", gradient: "from-primary to-orange-500" },
              { name: "Sarah Wong", role: "CTO", initials: "SW", gradient: "from-accent to-sky-500" },
              { name: "Michael Johnson", role: "Head of Education", initials: "MJ", gradient: "from-emerald-500 to-green-500" }
            ].map((member: TeamMemberProps, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-2xl bg-light hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br ${member.gradient} mb-6 shadow-lg`}>
                  <span className="text-4xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-2xl font-bold text-dark mb-1">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="bg-light py-20"
      >
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-br from-dark to-gray-800 rounded-2xl p-12 text-center text-white overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-16 -left-10 w-52 h-52 bg-accent/20 rounded-full"></div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
              className="relative z-10"
            >
              <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
                Whether you're a student ready to excel or a tutor eager to share your knowledge, your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register?role=student">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
                  >
                    Become a Student
                  </motion.div>
                </Link>
                <Link href="/register?role=tutor">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
                  >
                    Become a Tutor
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
