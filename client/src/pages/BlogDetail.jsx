import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/blog-detail.css';
import Footer from '../components/Footer';
import { getApiUrl } from '../config/api';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';
import RichText from '../components/RichText';
import BlockRenderer from '../components/BlockRenderer';
import TableOfContents from '../components/TableOfContents';

const BlogDetail = () => {
  const { slug } = useParams();
  const { content } = useContent('blogsPage');
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  // Meta title/description are plain text (never HTML — see server.js's
  // sanitizePlainText), so they can go straight into document.title and a
  // <meta name="description"> tag without RichText. Falls back to the
  // post's title/excerpt when left blank in the admin panel, and restores
  // whatever was there before on unmount (SPA navigation away from this page).
  useEffect(() => {
    if (!blog) return;
    const prevTitle = document.title;
    document.title = blog.metaTitle || stripHtml(blog.title);

    let metaDescTag = document.querySelector('meta[name="description"]');
    const wasCreated = !metaDescTag;
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    const prevContent = metaDescTag.getAttribute('content');
    metaDescTag.setAttribute('content', blog.metaDescription || stripHtml(blog.excerpt));

    return () => {
      document.title = prevTitle;
      if (wasCreated) {
        metaDescTag.remove();
      } else {
        metaDescTag.setAttribute('content', prevContent || '');
      }
    };
  }, [blog]);

  const loadBlog = async () => {
    setLoading(true);
    setError(null);
    try {
      // First, get all blogs to find the one with matching slug
      const response = await fetch(getApiUrl('api/blogs'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blogs = await response.json();
      const foundBlog = blogs.find(b => b.slug === slug);

      if (foundBlog) {
        setBlog(foundBlog);
        const others = blogs.filter(b => b.slug !== slug);
        const sameCategory = others.filter(b => b.category === foundBlog.category);
        const picks = (sameCategory.length > 0 ? sameCategory : others).slice(0, 2);
        setRelatedBlogs(picks);
      } else {
        setError('Blog not found');
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-not-found">
          <h1>Loading...</h1>
          <p>Please wait while we load the blog post.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-page">
        <div className="blog-not-found">
          <h1>Blog Post Not Found</h1>
          <p>{error || "The blog post you're looking for doesn't exist."}</p>
          <Link to="/blogs" className="back-to-blogs">Back to Blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      {/* Blog Header */}
      <section className="blog-header">
        <div className="blog-header-container">
          <div className="blog-breadcrumb">
            <Link to="/blogs" className="breadcrumb-link">Blogs</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{stripHtml(blog.title)}</span>
          </div>

          <div className="blog-meta">
            <span className="blog-category">{blog.category}</span>
            <span className="blog-date">{blog.date}</span>
            <span className="blog-read-time">{blog.readTime}</span>
          </div>

          <RichText html={blog.title} as="h1" className="blog-title" />
          {blog.subtitle && <RichText html={blog.subtitle} as="p" className="blog-subtitle" />}
          <RichText html={blog.excerpt} as="p" className="blog-excerpt" />

          <div className="blog-author-info">
            <div className="author-details">
              <span className="author-label">By</span>
              <span className="author-name">{stripHtml(blog.author)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Image */}
      {blog.image && (
        <section className="blog-image-section">
          <div className="blog-image-container">
            <img
              src={blog.image}
              alt={stripHtml(blog.title)}
              className={`blog-featured-image${blog.imageFit === 'contain' ? ' fit-contain' : ''}`}
            />
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="blog-content-section">
        <div className="blog-content-container">
          <div className="blog-content">
            {blog.contentBlocks && blog.contentBlocks.length > 0 ? (
              <BlockRenderer blocks={blog.contentBlocks} />
            ) : (
              <RichText html={blog.content} />
            )}
          </div>

          <div className="blog-sidebar">
            <TableOfContents blocks={blog.contentBlocks} />

            {/* Social Share */}
            <div className="blog-share">
              <h3>Share this article</h3>
              <div className="share-buttons">
                <button className="share-button twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(stripHtml(blog.title))}&url=${encodeURIComponent(window.location.href)}`)}>
                  <i className="fab fa-twitter"></i>
                  Twitter
                </button>
                <button className="share-button linkedin" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}>
                  <i className="fab fa-linkedin"></i>
                  LinkedIn
                </button>
                <button className="share-button facebook" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}>
                  <i className="fab fa-facebook"></i>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {blog.faq && blog.faq.length > 0 && (
        <section className="blog-faq-section">
          <div className="blog-faq-container">
            <h2 className="blog-faq-title">Frequently Asked Questions</h2>
            <div className="blog-faq-list">
              {blog.faq.map((item, index) => (
                <div
                  className={`blog-faq-item${openFaqIndex === index ? ' active' : ''}`}
                  key={index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <div className="blog-faq-question">
                    <h4><RichText html={item.question} as="span" /></h4>
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="blog-faq-answer">
                    <RichText html={item.answer} as="p" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="blog-cta-section">
        <div className="blog-cta-container">
          <h2>{content?.detailCta?.title}</h2>
          <p>{content?.detailCta?.description}</p>
          <div className="cta-buttons">
            <button
              className="cta-button primary"
              onClick={() => window.open(content?.detailCta?.whatsappLink, '_blank')}
            >
              {content?.detailCta?.primaryButton}
            </button>
            <button
              className="cta-button secondary"
              onClick={() => window.location.href = '/contact'}
            >
              {content?.detailCta?.secondaryButton}
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="related-posts-section">
          <div className="related-posts-container">
            <h2>Related Articles</h2>
            <div className="related-posts-grid">
              {relatedBlogs.map((related) => (
                <Link key={related.id} to={`/blog/${related.slug}`} className="related-post-card">
                  <div className="related-post-image">
                    <img src={related.image || '/images/default-blog.jpg'} alt={stripHtml(related.title)} />
                  </div>
                  <div className="related-post-content">
                    <span className="related-post-category">{related.category}</span>
                    <RichText html={related.title} as="h3" />
                    <RichText html={related.excerpt} as="p" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
