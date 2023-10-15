import React, { useState,useEffect } from 'react';
import './YoutubePage.css'; // Add a CSS file for styling

function YoutubePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBHMQTh8ZzZM4jbo28EdM1UGg9Py2wsZ7k&type=video,channel&q=${searchTerm}`
      );
      console.log(response);
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  useEffect(() => {
    setSelectedVideo(null); // Set selected video to null on component mount
  }, []);

  return (
    <div className="youtube-page">
      <h1>Youtube Page</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for channels or videos"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="video-container">
        {selectedVideo && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube Video"
            allowFullScreen
          />
        )}
      </div>
      <div className="results-container">
        {searchResults.map((item) => (
          <div
            className="result-item"
            key={item.id.videoId || item.id.channelId}
            onClick={() =>
              item.id.kind === 'youtube#video' && playVideo(item.id.videoId)
            }
          >
            {item.id.kind === 'youtube#video' && item.snippet.thumbnails && (
              <div className="video-thumbnail">
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubePage;
