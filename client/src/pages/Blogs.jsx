import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/blogs.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import { getApiUrl } from '../config/api';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';
import RichText from '../components/RichText';

const Blogs = () => {
  const { content } = useContent('blogsPage');
  const { content: home } = useContent('home');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('api/blogs'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      // Keep empty array on error - user will see "No blogs found"
    } finally {
      setLoading(false);
    }
  };

  const categories = content?.categories || ['All'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = stripHtml(blog.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stripHtml(blog.excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero-section">
        <div className="blogs-hero-container">
          <h1 className="blogs-hero-title">{content?.hero?.title}</h1>
          <p className="blogs-hero-description">
            {content?.hero?.description}
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blogs-filter-section">
        <div className="blogs-filter-container">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="all-blogs-section">
        <div className="all-blogs-container">
          <h2 className="section-title">Our Blog Posts</h2>
          {loading ? (
            <div className="no-blogs">
              <p>Loading blogs...</p>
            </div>
          ) : (
            <>
              <div className="blogs-grid">
                {filteredBlogs.map(blog => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`} className="blog-card-link">
                    <article className="blog-card">
                      <div className="blog-image">
                        <img src={blog.image || '/images/default-blog.jpg'} alt={stripHtml(blog.title)} />
                        {blog.featured && <div className="featured-badge">Featured</div>}
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span className="blog-category">{blog.category}</span>
                          <span className="blog-date">{blog.date}</span>
                        </div>
                        <RichText html={blog.title} as="h3" className="blog-title" />
                        {blog.subtitle && <RichText html={blog.subtitle} as="p" className="blog-subtitle" />}
                        <RichText html={blog.excerpt} as="p" className="blog-excerpt" />
                        <div className="blog-author">By {stripHtml(blog.author)}</div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              
              {filteredBlogs.length === 0 && (
                <div className="no-blogs">
                  <p>No blog posts found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blogs-cta-section">
        <div className="blogs-cta-container">
          <h2>{content?.cta?.title}</h2>
          <p>{content?.cta?.description}</p>
          <div className="cta-buttons">
            <button
              className="cta-button primary"
              onClick={() => window.open(content?.cta?.whatsappLink, '_blank')}
            >
              {content?.cta?.primaryButton}
            </button>
            <button
              className="cta-button secondary"
              onClick={() => window.location.href = '/contact'}
            >
              {content?.cta?.secondaryButton}
            </button>
          </div>
        </div>
      </section>

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default Blogs;
