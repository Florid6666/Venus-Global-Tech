import { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

export const useContent = (section = null) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const url = section
          ? getApiUrl(`api/content/${section}`)
          : getApiUrl('api/content');
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content, loading, error };
};



