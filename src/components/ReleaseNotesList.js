import React, { useState, useEffect } from 'react';

const ReleaseNotesList = () => {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReleaseNotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/get/release-notes?page=${currentPage}&limit=10`);
        const data = await response.json();  // Parse the response as JSON
        setReleaseNotes(prev => [...prev, ...data.releaseNotes]); // Append new release notes to the list
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch release notes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReleaseNotes();
  }, [currentPage]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages, loading]);

  return (
    <div>
      <h1>Release Notes</h1>
      <div className="ReleaseNotes" >
        {releaseNotes.map((note) => (
          <div key={note.version} className="release-note">
            <h2>Version: {note.version} - {new Date(note.release_date).toLocaleDateString()}</h2>
            <h3>Features</h3>
            <ul>
              {note.features && note.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
            </ul>
            <h3>Improvements</h3>
            <ul>
              {note.improvements && note.improvements.map((improvement, idx) => <li key={idx}>{improvement}</li>)}
            </ul>
            <h3>Bug Fixes</h3>
            <ul>
              {note.bug_fixes && note.bug_fixes.map((bug, idx) => <li key={idx}>{bug}</li>)}
            </ul>
            <h3>Known Issues</h3>
            <ul>
              {note.known_issues && note.known_issues.map((issue, idx) => <li key={idx}>{issue}</li>)}
            </ul>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ReleaseNotesList;
