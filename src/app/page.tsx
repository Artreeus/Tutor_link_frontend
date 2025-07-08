'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, FC, ReactNode } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper/types';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

import { 
  FaSearch, FaLock, FaUserCheck, FaChalkboardTeacher, 
  FaBookOpen, FaGraduationCap, FaAward, FaComments, FaUniversity,
  FaStar, FaArrowRight, FaPlay, FaCheckCircle, FaChevronDown,
  FaCalculator, FaFlask, FaCode, FaGlobe, FaPencilAlt, FaMusic,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

// Animation variants for container elements to orchestrate children animations
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

// Animation variants for individual items within a container
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

// A continuous floating animation for decorative elements
const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Type definition for FAQ items
interface FaqItemProps {
  question: string;
  answer: string;
}

// Moved FaqItem outside the Home component to prevent re-declaration on every render.
const FaqItem: FC<FaqItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.div 
            layout 
            className="border-b border-gray-200 py-6 cursor-pointer"
            onClick={toggleOpen}
        >
            <motion.div layout className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-dark">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FaChevronDown className="text-primary" />
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 text-medium leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export default function Home() {
  // State and ref for custom Swiper controls
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const subjects: { name: string; icon: ReactNode; gradient: string }[] = [
      { name: 'Mathematics', icon: <FaCalculator />, gradient: 'from-blue-500 to-sky-500' },
      { name: 'Science', icon: <FaFlask />, gradient: 'from-emerald-500 to-green-500' },
      { name: 'Coding', icon: <FaCode />, gradient: 'from-slate-600 to-gray-700' },
      { name: 'Languages', icon: <FaGlobe />, gradient: 'from-violet-500 to-purple-500' },
      { name: 'Humanities', icon: <FaPencilAlt />, gradient: 'from-amber-500 to-yellow-500' },
      { name: 'Music & Arts', icon: <FaMusic />, gradient: 'from-pink-500 to-rose-500' },
  ];

  const faqData: FaqItemProps[] = [
      { question: "How does the tutor matching process work?", answer: "Our AI-powered system analyzes your learning style, academic goals, and subject requirements. It then compares this profile against our database of expert tutors to find the perfect match based on expertise, teaching style, and availability. You'll receive a shortlist of recommended tutors to choose from." },
      { question: "What qualifications do your tutors have?", answer: "Every tutor on TutorLink is highly qualified, typically holding advanced degrees from top universities. They undergo a rigorous vetting process that includes background checks, subject matter expertise tests, and a teaching demonstration to ensure they meet our high standards." },
      { question: "Can I try a session before committing?", answer: "Yes! We offer a discounted trial session with a tutor of your choice. This is a great way to experience our platform and ensure the tutor is the right fit for you before booking a full package." },
      { question: "What if I'm not satisfied with my tutor?", answer: "Your satisfaction is our priority. If you're not completely happy with your initial session, we offer a satisfaction guarantee. We will either credit your account for another trial session with a different tutor or provide a full refund for the session." },
  ];
  
  const testimonials = [
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
      },
      { 
        quote: "The flexibility to schedule sessions around my busy college life was a game-changer. My tutor for Computer Science was incredible and helped me ace my final exams.", 
        name: "Alex Chen",
        role: "University Student",
        rating: 5,
        subject: "Computer Science",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-light via-white to-orange-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-sky-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
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
                className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <FaStar className="mr-2" />
                #1 Tutoring Platform
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-dark leading-tight">
                Learn with
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> expert</span>
                <br />
                anytime anywhere
              </h1>
              
              <p className="text-xl text-medium max-w-lg leading-relaxed">
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 rounded-xl blur opacity-25"></div>
                <div className="relative bg-white rounded-xl shadow-2xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Search by subject, grade or name..." 
                      className="flex-1 px-4 sm:px-6 py-4 text-base sm:text-lg border-0 focus:outline-none focus:ring-0 bg-transparent text-dark"
                    />
                    <button className="bg-primary text-white px-6 sm:px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
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
                <Link href="/register?role=student" className="group relative overflow-hidden bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center">
                  <span className="relative z-10 flex items-center">
                    Sign Up as Student
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link href="/register?role=tutor" className="group bg-white text-dark hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-gray-200 hover:border-primary/50 hover:shadow-xl flex items-center justify-center">
                  <FaPlay className="mr-2" />
                  Register as Tutor
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-medium"
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
            className="relative hidden lg:block"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-dark">
              Why Choose 
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> TutorLink</span>?
            </h2>
            <p className="text-xl text-medium max-w-3xl mx-auto">
              Experience the future of personalized learning with our cutting-edge platform designed for success.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <FaSearch />, 
                title: "AI-Powered Matching", 
                description: "Our advanced algorithm matches you with the perfect tutor based on your learning style, goals, and schedule preferences.",
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-accent to-sky-500"
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
                gradient: "from-primary to-orange-500"
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
                    <h3 className="text-2xl font-bold mb-4 text-dark">{feature.title}</h3>
                    <p className="text-medium leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subjects We Cover Section */}
      <section className="py-24 bg-light">
          <div className="container mx-auto px-4">
              <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
              >
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-dark">
                      Subjects We 
                      <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> Cover</span>
                  </h2>
                  <p className="text-xl text-medium max-w-3xl mx-auto">
                      From core academics to creative arts, find expert tutors in any subject you need.
                  </p>
              </motion.div>
              <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                  {subjects.map((subject, index) => (
                      <motion.div 
                          key={index}
                          variants={itemVariants}
                          whileHover={{ y: -8, scale: 1.05 }}
                          className="group"
                      >
                          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full`}>
                              <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${subject.gradient} text-white text-4xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
                                  {subject.icon}
                              </div>
                              <h3 className="text-lg font-bold text-dark text-center">{subject.name}</h3>
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-dark">
              How 
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> TutorLink</span> 
              Works
            </h2>
            <p className="text-xl text-medium max-w-3xl mx-auto">
              Get started in just three simple steps and transform your learning experience forever.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                step: "01",
                icon: <FaChalkboardTeacher />, 
                title: "Discover Your Perfect Tutor", 
                description: "Use our intelligent matching system to find tutors who align with your learning style, goals, and schedule preferences.",
                image: "https://images.unsplash.com/photo-1660128359946-5d09e282a8a7?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                gradient: "from-primary to-orange-500"
              },
              { 
                step: "02",
                icon: <FaBookOpen />, 
                title: "Book Your Session", 
                description: "Schedule sessions that fit your lifestyle with flexible timing, location options, and instant booking confirmation.",
                image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                gradient: "from-accent to-sky-500"
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
                    <h3 className="text-2xl font-bold mb-4 text-dark">{step.title}</h3>
                    <p className="text-medium leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Custom Pagination */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50">
          <div className="container mx-auto px-4">
              <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
              >
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-dark">
                      What Our 
                      <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> Community</span> 
                      Says
                  </h2>
                  <p className="text-xl text-medium max-w-3xl mx-auto">
                      Real stories from real students who have transformed their learning journey with TutorLink.
                  </p>
              </motion.div>

              <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
              >
                  <Swiper
                      onSwiper={setSwiperInstance}
                      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                      }}
                      modules={[Autoplay]}
                      className="mySwiper"
                  >
                      {testimonials.map((testimonial, index) => (
                          <SwiperSlide key={index}>
                              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mx-auto max-w-2xl text-center">
                                  <div className="flex justify-center space-x-1 text-yellow-400 mb-6">
                                      {[...Array(testimonial.rating)].map((_, i) => (
                                          <FaStar key={i} size={24} />
                                      ))}
                                  </div>
                                  <blockquote className="text-dark text-xl md:text-2xl italic leading-relaxed font-medium mb-8">
                                      "{testimonial.quote}"
                                  </blockquote>
                                  <div className="flex items-center justify-center">
                                    <Image 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        width={64} 
                                        height={64} 
                                        className="object-cover rounded-full shadow-md"
                                    />
                                    <div className="ml-4 text-left">
                                        <h3 className="font-bold text-lg text-dark">{testimonial.name}</h3>
                                        <p className="text-medium">{testimonial.role}</p>
                                    </div>
                                  </div>
                              </div>
                          </SwiperSlide>
                      ))}
                  </Swiper>
                  
                  {/* Custom Navigation Arrows */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
                      <button 
                          onClick={() => swiperInstance?.slidePrev()}
                          className="bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-md transition"
                          aria-label="Previous testimonial"
                      >
                          <FaChevronLeft size={20} />
                      </button>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
                      <button 
                          onClick={() => swiperInstance?.slideNext()}
                          className="bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-md transition"
                          aria-label="Next testimonial"
                      >
                          <FaChevronRight size={20} />
                      </button>
                  </div>

                  {/* Custom Pagination Controls */}
                  <div className="mt-12 flex justify-center items-center space-x-2 md:space-x-4">
                      {testimonials.map((testimonial, index) => (
                          <button 
                              key={index}
                              onClick={() => swiperInstance?.slideToLoop(index)}
                              className="group flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300"
                              aria-label={`Go to testimonial from ${testimonial.name}`}
                          >
                              <Image 
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  width={40}
                                  height={40}
                                  className={`rounded-full transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-primary ring-offset-2' : 'grayscale group-hover:grayscale-0'}`}
                              />
                              <div className={`text-left overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-w-xs' : 'max-w-0'}`}>
                                  <h4 className={`font-bold text-sm whitespace-nowrap ${activeIndex === index ? 'text-dark' : 'text-medium'}`}>{testimonial.name}</h4>
                                  <p className="text-xs text-medium whitespace-nowrap">{testimonial.role}</p>
                              </div>
                          </button>
                      ))}
                  </div>
              </motion.div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-light">
          <div className="container mx-auto px-4">
              <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
              >
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-dark">
                      Frequently Asked
                      <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> Questions</span>
                  </h2>
                  <p className="text-xl text-medium max-w-3xl mx-auto">
                      Have questions? We've got answers. Here are some of the most common queries we receive.
                  </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                  {faqData.map((faq, index) => (
                      <FaqItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
              </div>
          </div>
      </section>
    </>
  );
}
