'use client';

import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Tutoring',
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
          question: 'Can I request a different tutor if Im not satisfied?',
          answer: 'Yes, if you"re not satisfied with your current tutor, you can stop booking sessions with them and find a different tutor. We recommend providing feedback to help tutors improve their services.'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          question: 'How do payments work?',
          answer: 'Payments are processed securely through our platform. You"ll pay for sessions when you book them, and tutors receive payment after the session is completed. We accept major credit cards and PayPal.'
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
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Register" button on our homepage. You"ll need to provide your name, email, password, and choose whether you want to register as a student or tutor.'
        },
        {
          question: 'Can I change my account type after registering?',
          answer: 'If you want to change from a student to a tutor account or vice versa, please contact our support team. They"ll help you with the transition process.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. We"ll send you an email with instructions to create a new password.'
        }
      ]
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">{category.category}</h2>
              <div className="space-y-4 mt-4">
                {category.questions.map((faq, i) => {
                  const currentIndex = questionIndex;
                  questionIndex++;
                  return (
                    <div key={i} className="collapse collapse-arrow bg-base-200">
                      <input 
                        type="radio" 
                        name="faq-accordion" 
                        checked={activeIndex === currentIndex}
                        onChange={() => toggleQuestion(currentIndex)} 
                      />
                      <div className="collapse-title font-medium">
                        {faq.question}
                      </div>
                      <div className="collapse-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-base-100 shadow-xl rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
        <p className="mb-4">Contact our support team and we'll get back to you as soon as possible.</p>
        <button className="btn btn-primary">Contact Support</button>
      </div>
    </div>
  );
}