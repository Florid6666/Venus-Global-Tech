import React from 'react';

const getEmbedUrl = (url) => {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
};

// Renders a YouTube/Vimeo link as a responsive iframe embed, or a direct
// video file URL (e.g. .mp4) as a native <video> player.
const VideoEmbed = ({ url }) => {
  if (!url) return null;
  const embedUrl = getEmbedUrl(url);

  if (embedUrl) {
    return (
      <div className="video-embed">
        <iframe
          src={embedUrl}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-embed">
      <video src={url} controls />
    </div>
  );
};

export default VideoEmbed;
