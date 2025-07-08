'use client';

import { useState, FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaHeadset, FaCreditCard, FaUserCog } from 'react-icons/fa';

// Type Definitions for stricter type-checking
interface Faq {
  question: string;
  answer: string;
}

interface FaqCategory {
  category: string;
  icon: FC<any>; // Using FC<any> for React Icons
  questions: Faq[];
}

interface FaqItemProps {
  faq: Faq;
  isOpen: boolean;
  onClick: () => void;
}

// Data for the FAQ section
const faqs: FaqCategory[] = [
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
    icon: FaCreditCard,
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
    icon: FaUserCog,
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

// Accordion Item Component
const FaqItem: FC<FaqItemProps> = ({ faq, isOpen, onClick }) => {
  const accordionVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      marginTop: '1rem',
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div 
        onClick={onClick}
        className="flex justify-between items-center cursor-pointer py-5"
      >
        <h3 className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-dark'}`}>
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          <FaChevronDown />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
           //@ts-expect-error
            variants={accordionVariants}
            className="overflow-hidden"
          >
            <p className="text-medium pb-5 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<string | null>('0-0');

  const handleItemClick = (id: string) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-orange-400 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-orange-100">
              Find answers to the most common questions about our platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sticky Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-dark mb-6">Categories</h2>
              <ul className="space-y-2">
                {faqs.map((category, index) => (
                  <li key={index}>
                    <a 
                      href={`#category-${index}`} 
                      className="flex items-center p-3 rounded-lg text-medium hover:bg-white hover:text-primary transition-all duration-200"
                    >
                      <category.icon className="mr-3 text-lg" />
                      <span className="font-medium">{category.category}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* FAQ Accordions */}
          <main className="lg:col-span-9">
            {faqs.map((category, catIndex) => (
              <motion.section 
                key={catIndex}
                id={`category-${catIndex}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center mb-6">
                  <category.icon className="text-primary mr-4 text-3xl" />
                  <h2 className="text-3xl font-bold text-dark">
                    {category.category}
                  </h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                  {category.questions.map((faq, index) => (
                    <FaqItem
                      key={index}
                      faq={faq}
                      isOpen={activeIndex === `${catIndex}-${index}`}
                      onClick={() => handleItemClick(`${catIndex}-${index}`)}
                    />
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Contact Support Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-dark to-gray-700 text-white rounded-xl p-8 text-center shadow-lg flex flex-col items-center"
            >
              <FaHeadset className="text-5xl text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
              <p className="mb-6 max-w-xl mx-auto text-gray-300">
                If you can't find the answer you're looking for, our support team is always ready to assist you.
              </p>
              <button className="bg-primary text-white font-bold hover:bg-orange-600 transition-colors px-8 py-3 rounded-lg shadow-md">
                Contact Support
              </button>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
