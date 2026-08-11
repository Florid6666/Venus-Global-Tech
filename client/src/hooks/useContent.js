import { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';
import defaultContent from '../data/defaultContent.json';

export const useContent = (section = null) => {
  const fallback = section ? defaultContent[section] || null : defaultContent;
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const url = section
          ? getApiUrl(`api/content/${section}`)
          : getApiUrl('api/content');
        console.log('[useContent] Fetching from URL:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch content, status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[useContent] Successfully fetched data:', data);
        setContent(data);
        setError(null);
      } catch (err) {
        console.warn('[useContent] Error fetching content, using fallback:', err);
        setError(err.message);
        if (fallback) {
          setContent(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content: content || fallback, loading: false, error };
};



