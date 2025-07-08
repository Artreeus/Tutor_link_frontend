'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import Image from 'next/image';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample categories
  const categories = [
    'all',
    'study-tips',
    'education-news',
    'platform-updates',
    'tutoring-techniques'
  ];

  useEffect(() => {
    // This is mock data - in a real application, this would be fetched from an API
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // For demo purposes, we're simulating an API call with a timeout
        setTimeout(() => {
          const mockPosts: BlogPost[] = [
            {
              id: 1,
              title: '10 Effective Study Techniques for Better Learning',
              excerpt: 'Discover research-backed study methods that can help you learn more effectively and retain information longer.',
              date: '2025-02-15',
              author: 'Dr. Emily Chen',
              category: 'study-tips',
              imageUrl: 'https://picsum.photos/600/400?random=1'
            },
            {
              id: 2,
              title: 'How to Prepare for College Entrance Exams',
              excerpt: 'A comprehensive guide to preparing for SAT, ACT, and other college entrance examinations.',
              date: '2025-02-10',
              author: 'Marcus Williams',
              category: 'study-tips',
              imageUrl: 'https://picsum.photos/600/400?random=2'
              },
            {
              id: 3,
              title: 'New Features Coming to TutorLink in 2025',
              excerpt: 'Exciting platform updates including video sessions, interactive whiteboards, and more.',
              date: '2025-02-05',
              author: 'Sarah Thompson',
              category: 'platform-updates',
              imageUrl: 'https://picsum.photos/600/400?random=3'
            },
            {
              id: 4,
              title: 'Digital Education Trends for 2025',
              excerpt: 'Explore the latest trends in online education and how they"re shaping the future of learning.',
              date: '2025-01-28',
              author: 'Dr. James Wilson',
              category: 'education-news',
              imageUrl: 'https://picsum.photos/600/400?random=4'
            },
            {
              id: 5,
              title: 'Building Connection in Online Tutoring Sessions',
              excerpt: 'Tips for tutors on creating engaging and personalized online learning experiences.',
              date: '2025-01-22',
              author: 'Lisa Rodriguez',
              category: 'tutoring-techniques',
            imageUrl: 'https://picsum.photos/600/400?random=5'
            },
            {
              id: 6,
              title: 'Student Success Stories: From Struggling to Excelling',
              excerpt: 'Real stories of students who improved their academic performance with the help of TutorLink tutors.',
              date: '2025-01-15',
              author: 'Michael Chang',
              category: 'platform-updates',
              imageUrl: 'https://picsum.photos/600/400?random=6'
            }
          ];
          
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">TutorLink Blog</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Categories</h2>
              <ul className="menu bg-base-100 w-full p-0">
                {categories.map((category) => (
                  <li key={category}>
                    <a 
                      className={activeCategory === category ? 'active' : ''}
                      onClick={() => setActiveCategory(category)}
                    >
                      {formatCategoryName(category)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h2 className="card-title">Subscribe</h2>
              <p className="text-sm mb-4">Stay updated with our latest articles and news.</p>
              <div className="form-control">
                <div className="input-group">
                  <input type="email" placeholder="Your email" className="input input-bordered w-full" />
                  <button className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="card bg-base-100 shadow-xl overflow-hidden">
                  <figure>
                    <Image src={post.imageUrl} alt={post.title} 
                    width={500}
                    height={500}
                    className=" object-cover" />
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-between items-center mb-2">
                      <span className="badge badge-primary">{formatCategoryName(post.category)}</span>
                      <div className="flex items-center text-sm opacity-70">
                        <FaCalendarAlt className="mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <h2 className="card-title">{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm">
                        <FaUser className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={``} className="btn btn-sm btn-primary">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg">No posts found in this category.</p>
              <button 
                className="btn btn-primary mt-4" 
                onClick={() => setActiveCategory('all')}
              >
                View All Posts
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}