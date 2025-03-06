export default function About() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About TutorLink</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Our Mission</h2>
            <p className="mb-4">
              At TutorLink, our mission is to connect students with qualified tutors who can help them achieve academic success. 
              We believe that personalized education can transform lives, and we're committed to making quality tutoring accessible to all.
            </p>
            <p>
              By providing a platform that streamlines the process of finding and booking tutors, we aim to remove barriers to education 
              and create opportunities for both students seeking knowledge and educators sharing their expertise.
            </p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 mx-auto">
                    <span className="text-xl">JD</span>
                  </div>
                </div>
                <h3 className="font-bold">John Davis</h3>
                <p className="text-sm">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 mx-auto">
                    <span className="text-xl">SW</span>
                  </div>
                </div>
                <h3 className="font-bold">Sarah Wong</h3>
                <p className="text-sm">CTO</p>
              </div>
              <div className="text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 mx-auto">
                    <span className="text-xl">MJ</span>
                  </div>
                </div>
                <h3 className="font-bold">Michael Johnson</h3>
                <p className="text-sm">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Our Vision</h2>
            <p>
              We envision a future where anyone, anywhere can access personalized education from expert tutors. Our platform will continue to evolve with new features and improvements based on user feedback, always staying true to our core mission of connecting students with outstanding educators.
            </p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Success Stories</h2>
            <div className="mt-4 space-y-6">
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="italic mb-2">
                  "Thanks to my math tutor on TutorLink, I was able to improve my grades from a C to an A- in just one semester. The personalized attention made all the difference."
                </p>
                <p className="font-bold">- Alex, High School Student</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="italic mb-2">
                  "As a tutor on TutorLink, I've been able to connect with students from all over who need help with physics. The platform makes scheduling and payments simple so I can focus on teaching."
                </p>
                <p className="font-bold">- Dr. Miller, Physics Tutor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }