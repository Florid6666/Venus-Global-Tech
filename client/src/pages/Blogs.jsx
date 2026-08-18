import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/aboutus.css';
import '../components/blogs.css';
import CtaBannerV2 from '../components/homev2/CtaBannerV2';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import { getApiUrl } from '../config/api';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';
import RichText from '../components/RichText';

import defaultBlogs from '../data/defaultBlogs.json';

const Blogs = () => {
  const { content } = useContent('blogsPage');
  const { content: home } = useContent('home');
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
      if (Array.isArray(data) && data.length > 0) {
        setBlogs(data);
      } else {
        setBlogs(defaultBlogs);
      }
    } catch (error) {
      console.error('Failed to load blogs, falling back to default blogs:', error);
      setBlogs(defaultBlogs);
    } finally {
      setLoading(false);
    }
  };

  const DEFAULT_CATEGORIES = [
    'All',
    'AI & Technology',
    'Software & Data',
    'Cloud Transformation',
    'Automation & Security',
    'Digital Reach',
    'Trade & Strategy'
  ];

  const categoriesList = (content?.categories && content.categories.length > 0)
    ? Array.from(new Set(['All', ...content.categories]))
    : DEFAULT_CATEGORIES;

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = stripHtml(blog.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stripHtml(blog.excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: "url('/images/team/software_engineering.jpg')" }}>
        <div className="about-hero-bg-overlay"></div>
        
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Blogs</h1>
            
            <div className="about-hero-breadcrumb">
              <Link to="/" className="breadcrumb-item breadcrumb-link">Home</Link>
              <span className="breadcrumb-arrow">→</span>
              <span className="breadcrumb-item breadcrumb-current">Blogs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Main Layout: Left Content + Right Sidebar */}
      <section className="blogs-main-section">
        <div className="blogs-main-container">
          
          {/* LEFT COLUMN: BIG HERO BLOG AT TOP + 2-COLUMN STACK BELOW */}
          <div className="blogs-content-left">
            {loading ? (
              <div className="no-blogs">
                <p>Loading blogs...</p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <>
                {/* 1. First Blog: Big Featured Hero Card at Top */}
                {filteredBlogs[0] && (
                  <article className="blog-featured-hero-card">
                    <Link to={`/blog/${filteredBlogs[0].slug}`} className="featured-hero-link">
                      <div className="featured-hero-image-wrap">
                        <img 
                          src={filteredBlogs[0].image || '/images/default-blog.jpg'} 
                          alt={stripHtml(filteredBlogs[0].title)} 
                        />
                        {filteredBlogs[0].featured && <span className="featured-pill-badge">Featured</span>}
                      </div>
                      <div className="featured-hero-body">
                        <div className="blog-meta-row">
                          <span className="blog-category-badge">{filteredBlogs[0].category}</span>
                          <span className="blog-date-text">{filteredBlogs[0].date}</span>
                          {filteredBlogs[0].readTime && (
                            <span className="blog-read-time">{filteredBlogs[0].readTime}</span>
                          )}
                        </div>
                        <RichText html={filteredBlogs[0].title} as="h2" className="featured-hero-title" />
                        {filteredBlogs[0].subtitle && (
                          <RichText html={filteredBlogs[0].subtitle} as="p" className="featured-hero-subtitle" />
                        )}
                        <RichText html={filteredBlogs[0].excerpt} as="p" className="featured-hero-excerpt" />
                        <div className="featured-hero-footer">
                          <span className="blog-author-name">By {stripHtml(filteredBlogs[0].author || 'Venus Tech Team')}</span>
                          <span className="read-more-btn">Read Article &rarr;</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )}

                {/* 2. Remaining Blogs: Stacked in 2 Columns below the big blog */}
                {filteredBlogs.length > 1 && (
                  <div className="blogs-remaining-grid">
                    {filteredBlogs.slice(1).map(blog => (
                      <Link key={blog.id || blog._id || blog.slug} to={`/blog/${blog.slug}`} className="blog-card-link">
                        <article className="blog-card">
                          <div className="blog-image">
                            <img 
                              src={blog.image || '/images/default-blog.jpg'} 
                              alt={stripHtml(blog.title)} 
                            />
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
                            <div className="blog-author">By {stripHtml(blog.author || 'Venus Tech Team')}</div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-blogs">
                <p>No blog posts found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="blogs-sidebar-right">
            {/* Search Widget */}
            <div className="sidebar-widget search-widget">
              <div className="sidebar-search-input-wrap">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-input-actions">
                  <i className="fas fa-search search-icon"></i>
                  <button 
                    type="button"
                    className={`mobile-category-toggle-btn ${isCategoryOpen ? 'active' : ''}`}
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    aria-label="Toggle Category Filter"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Widget */}
            <div className={`sidebar-widget categories-widget ${isCategoryOpen ? 'mobile-open' : ''}`}>
              <h3 className="widget-title">
                Categories
                <span className="widget-title-underline"></span>
              </h3>
              <div className="categories-list">
                {categoriesList.map(category => (
                  <button
                    key={category}
                    className={`category-item-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryOpen(false);
                    }}
                  >
                    <span className="category-name">{category}</span>
                    <i className="fas fa-chevron-right arrow-icon"></i>
                  </button>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* Exact Home Page CTA Section */}
      <CtaBannerV2 content={home?.ctaBanner} />

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default Blogs;
