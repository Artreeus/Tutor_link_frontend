'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaLock, FaUserCheck, FaChalkboardTeacher, 
  FaBookOpen, FaGraduationCap, FaAward, FaComments, FaUniversity,
  FaStar, FaArrowRight, FaPlay, FaCheckCircle
} from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <FaStar className="mr-2" />
                #1 Tutoring Platform
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Learn with
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> expert</span>
                <br />
                anytime anywhere
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Transform your learning journey with personalized tutoring sessions from world-class educators. Start your path to excellence today.
              </p>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-white rounded-xl shadow-2xl p-2">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Search by subject, grade or name..." 
                      className="flex-1 px-6 py-4 text-lg border-0 focus:outline-none focus:ring-0 bg-transparent"
                    />
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <FaSearch className="text-xl" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register?role=student" className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center">
                  <span className="relative z-10 flex items-center">
                    Sign Up as Student
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link href="/register?role=tutor" className="group bg-white text-gray-800 hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl flex items-center justify-center">
                  <FaPlay className="mr-2" />
                  Register as Tutor
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  10,000+ Students
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  500+ Expert Tutors
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  4.9★ Rating
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Learning Environment" 
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Why Choose 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> TutorLink</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of personalized learning with our cutting-edge platform designed for success.
            </p>
          </motion.div>

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
                title: "AI-Powered Matching", 
                description: "Our advanced algorithm matches you with the perfect tutor based on your learning style, goals, and schedule preferences.",
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: <FaLock />, 
                title: "Bank-Grade Security", 
                description: "Your data and payments are protected with enterprise-level encryption and security protocols trusted by millions.",
                image: "https://plus.unsplash.com/premium_photo-1668383778557-d71c562fdb4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-emerald-500 to-teal-500"
              },
              { 
                icon: <FaUserCheck />, 
                title: "Elite Verification", 
                description: "Every tutor undergoes rigorous background checks, skill assessments, and continuous performance monitoring.",
                image: "https://plus.unsplash.com/premium_photo-1667520168395-c1f60f1d6996?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur"></div>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}></div>
                    <Image 
                      src={feature.image} 
                      alt={feature.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white text-2xl mb-6 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TutorLink</span> 
              Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just three simple steps and transform your learning experience forever.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                step: "01",
                icon: <FaChalkboardTeacher />, 
                title: "Discover Your Perfect Tutor", 
                description: "Use our intelligent matching system to find tutors who align with your learning style, goals, and schedule preferences.",
                image: "https://images.unsplash.com/photo-1660128359946-5d09e282a8a7?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-violet-500 to-purple-500"
              },
              { 
                step: "02",
                icon: <FaBookOpen />, 
                title: "Book Your Session", 
                description: "Schedule sessions that fit your lifestyle with flexible timing, location options, and instant booking confirmation.",
                image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                gradient: "from-blue-500 to-indigo-500"
              },
              { 
                step: "03",
                icon: <FaGraduationCap />, 
                title: "Achieve Your Goals", 
                description: "Engage in personalized learning experiences with progress tracking, performance analytics, and continuous improvement.",
                image: "https://images.unsplash.com/photo-1660351174962-e2a1fbb9af09?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-emerald-500 to-green-500"
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-6 right-6 z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20`}></div>
                    <Image 
                      src={step.image} 
                      alt={step.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-2xl mb-6 shadow-lg`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Success</span> 
              Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students who have transformed their academic journey with TutorLink.
            </p>
          </motion.div>

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
                title: "Academic Excellence", 
                stat: "95%",
                description: "of students achieve their target grades within 6 months of joining our platform.",
                image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
                gradient: "from-yellow-500 to-orange-500"
              },
              { 
                icon: <FaComments />, 
                title: "Student Satisfaction", 
                stat: "4.9/5",
                description: "average rating from over 50,000 completed tutoring sessions across all subjects.",
                image: "https://images.unsplash.com/photo-1706690163950-169c4abce307?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-green-500 to-emerald-500"
              },
              { 
                icon: <FaUniversity />, 
                title: "Elite Educators", 
                stat: "500+",
                description: "world-class tutors from top universities with proven track records of student success.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((story, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-20`}></div>
                    <Image 
                      src={story.image} 
                      alt={story.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${story.gradient} text-white text-2xl mb-6 shadow-lg`}>
                      {story.icon}
                    </div>
                    <div className={`text-5xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent mb-2`}>
                      {story.stat}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{story.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Our 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</span> 
              Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real students who have transformed their learning journey with TutorLink.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { 
                quote: "TutorLink completely transformed my daughter's relationship with mathematics. The personalized approach and expert guidance helped her not just improve grades, but actually love learning!", 
                name: "Sarah Johnson",
                role: "Parent",
                rating: 5,
                subject: "Mathematics",
                image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              { 
                quote: "As an educator, I'm impressed by TutorLink's platform. It connects me with motivated students and provides excellent tools for tracking progress and delivering results.", 
                name: "Professor Mark Williams",
                role: "Physics Tutor",
                rating: 5,
                subject: "Physics",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -5 }}
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
                  <div className="absolute top-6 right-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-lg" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          width={64} 
                          height={64} 
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{testimonial.role}</span>
                      </div>
                      <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {testimonial.subject}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 text-lg leading-relaxed italic mt-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}