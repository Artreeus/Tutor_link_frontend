'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaHeadset } from 'react-icons/fa';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Tutoring',
      icon: FaQuestionCircle,
      questions: [
        {
          question: 'How do I find a tutor?',
          answer: 'You can find tutors by using the search function on our homepage or browsing through our tutor listings. You can filter tutors by subject, rating, price, and availability to find the perfect match for your needs.'
        },
        {
          question: 'How are tutors verified?',
          answer: 'All tutors on our platform undergo a verification process that includes identity verification, educational background checks, and a review of their teaching experience. We also collect and display student reviews to help you make informed decisions.'
        },
        {
          question: 'Can I request a different tutor if I\'m not satisfied?',
          answer: 'Yes, if you\'re not satisfied with your current tutor, you can stop booking sessions with them and find a different tutor. We recommend providing feedback to help tutors improve their services.'
        }
      ]
    },
    {
      category: 'Payments',
      icon: FaHeadset,
      questions: [
        {
          question: 'How do payments work?',
          answer: 'Payments are processed securely through our platform. You\'ll pay for sessions when you book them, and tutors receive payment after the session is completed. We accept major credit cards and PayPal.'
        },
        {
          question: 'What happens if I need to cancel a session?',
          answer: 'If you need to cancel a session, please do so at least 24 hours in advance. Cancellations made with less than 24 hours notice may still be charged. You can cancel a session through your dashboard.'
        },
        {
          question: 'How much do tutors charge?',
          answer: 'Tutor rates vary based on subject, experience, and qualifications. Tutors set their own hourly rates, which are clearly displayed on their profiles. You can filter tutors by price range to find options that fit your budget.'
        }
      ]
    },
    {
      category: 'Account Management',
      icon: FaQuestionCircle,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Register" button on our homepage. You\'ll need to provide your name, email, password, and choose whether you want to register as a student or tutor.'
        },
        {
          question: 'Can I change my account type after registering?',
          answer: 'If you want to change from a student to a tutor account or vice versa, please contact our support team. They\'ll help you with the transition process.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. We\'ll send you an email with instructions to create a new password.'
        }
      ]
    }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const accordionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-gray-50 min-h-screen"
    >
      {/* Hero Section */}
      <div className="bg-[#4f46e5] text-white py-16 text-center">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 flex justify-center items-center"
        >
          <FaQuestionCircle className="mr-4" /> Frequently Asked Questions
        </motion.h1>
        <p className="text-xl max-w-2xl mx-auto">
          Find answers to the most common questions about TutorLink
        </p>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {faqs.map((category, catIndex) => (
          <motion.div 
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIndex * 0.2 }}
            viewport={{ once: true }}
            className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gray-100 p-6 flex items-center">
              <category.icon className="text-[#4f46e5] mr-4 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-800">
                {category.category}
              </h2>
            </div>
            <div className="p-6">
              {category.questions.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b last:border-b-0 border-gray-200 py-4"
                >
                  <div 
                    onClick={() => setActiveIndex(
                      activeIndex === `${catIndex}-${index}` 
                      ? null 
                      : `${catIndex}-${index}`
                    )}
                    className="flex justify-between items-center cursor-pointer hover:text-[#4f46e5] transition-colors"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <motion.div
                      animate={{ 
                        rotate: activeIndex === `${catIndex}-${index}` ? 180 : 0 
                      }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeIndex === `${catIndex}-${index}` && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={accordionVariants}
                        className="mt-4 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Contact Support Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#4f46e5] text-white rounded-xl p-8 text-center shadow-lg"
        >
          <FaHeadset className="text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
          <p className="mb-6 max-w-xl mx-auto">
            If you can't find the answer you're looking for, our support team is always ready to assist you.
          </p>
          <button className="btn bg-white text-[#4f46e5] hover:bg-gray-100 px-8 py-3 rounded-lg">
            Contact Support
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}