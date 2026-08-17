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
    const matchesSearch = stripHtml(blog.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stripHtml(blog.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridBlogs = selectedCategory === 'All' && !searchTerm ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <div className="blogs-page">
      {/* Page Header Hero */}
      <section className="about-hero-section" style={{ backgroundImage: "url('/images/team/software_engineering.jpg')" }}>
        <div className="about-hero-bg-overlay"></div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Blogs & Insights</h1>
            <div className="about-hero-breadcrumb">
              <Link to="/" className="breadcrumb-item breadcrumb-link">Home</Link>
              <span className="breadcrumb-arrow">→</span>
              <span className="breadcrumb-item breadcrumb-current">Blogs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="blogs-main-section">
        <div className="blogs-main-container-stacked">

          {/* 1. TOP FEATURED BANNER CARD (Matches Reference Image) */}
          {featuredBlog && selectedCategory === 'All' && !searchTerm && (
            <div className="blog-top-featured-card">
              <div className="featured-card-content">
                <div className="featured-header-badge">Featured Article</div>
                <Link to={`/blog/${featuredBlog.slug}`} className="featured-title-link">
                  <RichText html={featuredBlog.title} as="h2" className="featured-card-title" />
                </Link>
                {featuredBlog.subtitle && (
                  <RichText html={featuredBlog.subtitle} as="p" className="featured-card-subtitle" />
                )}
                <RichText html={featuredBlog.excerpt} as="p" className="featured-card-excerpt" />

                <div className="featured-card-footer">
                  <div className="featured-author-box">
                    <div className="author-avatar-circle">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="author-info">
                      <span className="author-name">{stripHtml(featuredBlog.author || 'Venus Tech Team')}</span>
                      <span className="author-role">Author / Tech Specialist</span>
                    </div>
                  </div>

                  <Link to={`/blog/${featuredBlog.slug}`} className="featured-read-btn">
                    Read Full Article <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 2. MIDDLE CATEGORY FILTER & HEADER BAR (Matches Reference Image) */}
          <div className="blogs-filter-bar">
            <div className="filter-bar-header">
              <h3 className="latest-articles-heading">
                Latest Articles <span className="articles-count">({filteredBlogs.length} Posts)</span>
              </h3>

              <div className="search-box-pill">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="category-pills-row">
              {categoriesList.map(category => (
                <button
                  key={category}
                  className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 2-COLUMN STACKED BLOG GRID (Matches Reference Image) */}
          {loading ? (
            <div className="no-blogs">
              <p>Loading blogs...</p>
            </div>
          ) : gridBlogs.length > 0 ? (
            <div className="blogs-two-column-grid">
              {gridBlogs.map(blog => (
                <Link key={blog.id || blog._id || blog.slug} to={`/blog/${blog.slug}`} className="two-col-card-link">
                  <article className="two-col-blog-card">
                    <div className="two-col-image-wrap">
                      <img
                        src={blog.image || '/images/default-blog.jpg'}
                        alt={stripHtml(blog.title)}
                      />
                      {blog.category && (
                        <div className="top-left-category-pill">
                          {blog.category}
                        </div>
                      )}
                    </div>

                    <div className="two-col-card-body">
                      <div className="two-col-meta">
                        <span className="meta-item">
                          <i className="far fa-calendar-alt meta-icon"></i>
                          {blog.date}
                        </span>
                        <span className="meta-dot">•</span>
                        <span className="meta-item">
                          <i className="far fa-clock meta-icon"></i>
                          {blog.readTime || '5 min read'}
                        </span>
                      </div>

                      <RichText html={blog.title} as="h3" className="two-col-title" />
                      <RichText html={blog.excerpt} as="p" className="two-col-excerpt" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-blogs">
              <p>No blog posts found matching your criteria.</p>
            </div>
          )}

        </div>
      </section>

      {/* Home Page CTA Section */}
      <CtaBannerV2 content={home?.ctaBanner} />

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default Blogs;
