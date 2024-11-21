import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown.js'; // If in the same directory


const LeaderboardSelector = ({ className, setSelectedProblem }) => {

  const [problemOptions, setProblemOptions] = useState([]);   
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/ProblemNumbers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response

        // Transform the data into the format expected by Dropdown
        const options = data.map(problem => ({
          value: problem.problem_number, // Unique problem number ID
          label: problem.problem_name, // Name of the problem as seen in archives
        }));
        setProblemOptions([{ value: null, label: "Global Leaderboard" }, ...options]);
        console.log(options);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setError(error.message); // Optional: set error message to state
      }
    };
    fetchProblems();
  }, []);
                                              

  // Fetch leaderboard data for the selected problem
  const handleOptionSelect = async (selectedOption) => {
    console.log(selectedOption.value);
    setSelectedProblem(selectedOption.value);
  };

  return (
    <div className={className}>
      <h2>Select a Leaderboard</h2>
      {error ? (
        <p>Error: {error}</p> // Display error if fetch fails
      ) : (
        <Dropdown
          options={problemOptions}
          placeholder="Select a problem..."
          className="Dropdown"
          onSelect={handleOptionSelect}
        />
      )}
    </div>
  );
};

export default LeaderboardSelector;
