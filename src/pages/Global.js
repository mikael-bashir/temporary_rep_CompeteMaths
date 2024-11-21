import React, { useState, useEffect } from 'react';
import { tokenValid, useGlobalState } from '../hooks/GlobalStateContext.js';
import LeaderboardSelector from '../components/LeaderboardSelector.js';

const GlobalLeaderboard = () => { 
    const [players, setPlayers] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null); // Track the selected problem
    const [loading, setLoading] = useState(false);

    // Define the handleProblemSelect function
    const handleProblemSelect = (problem) => {
        setSelectedProblem(problem); // Update the selected problem state
    };

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true); // Indicate loading
        
            try {
                let url = selectedProblem   
                ? `/top-players-specific-problem/${selectedProblem}` // Fetch problem-specific leaderboard
                : '/top-Players'; // Fetch global leaderboard
        
                const response = await fetch(url);
                const result = await response.json();
        
                if (result.success) {
                    setPlayers(result.topPlayers);
                    console.log(result.topPlayers);
                } else {
                 console.error('Error fetching leaderboard:', result.message);
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false); // End loading
            }
        };
    
        fetchLeaderboardData();
    }, [selectedProblem]); // Re-fetch whenever a new problem is selected

    
    return (
        <div className="container">
            <div className="LeaderboardHeader">
                <h1 className="title">Vanguard</h1>
                <LeaderboardSelector onChange={handleProblemSelect} className="LeaderboardSelector" setSelectedProblem={setSelectedProblem}/>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="problem-list">
                    <li className="header">
                        <span className="id">Rank</span>
                        <div className="user">
                            <span className="problem-name">Username</span>
                        </div>
                        {selectedProblem ? (
                            <span className="answer-time">Answer Time</span> // Column for answer time
                        ) : (
                            <span className="questions-answered">Questions Answered</span> // Default column for global leaderboard
                        )}
                    </li>
                    {/* Conditionally render either global leaderboard or problem leaderboard */}
                    {selectedProblem ? (
                        players.map((player, index) => (
                            <li key={player.username} className="player-entry">
                                {/* Rank */}
                                <span className="id">{index + 1}</span>

                                {/* User Info */}
                                <div className="user">
                                    <span className="problem-name">{player.username}</span>
                                    {/* Badge 
                                    <img 
                                        className="badge" 
                                        src="/images/badges/badge_of_knowledge.png" 
                                        alt="Badge" 
                                    /> 
                                    */}
                                </div>

                                {/* Questions Answered */}
                                <span className="answer-time">{player.firstanswertime}</span> {/* Display answer time */}
                            </li>
                        ))
                    ) : (
                        players.map((player, index) => (
                            <li key={player.username} className="player-entry">
                                {/* Rank */}
                                <span className="id">{index + 1}</span>

                                {/* User Info */}
                                <div className="user">
                                    <span className="problem-name">{player.username}</span>
                                    {/* Badge (if needed, otherwise remove) 
                                    <img 
                                        className="badge" 
                                        src="/images/badges/badge_of_knowledge.png" 
                                        alt="Badge" 
                                    /> 
                                    */}
                                </div>

                                {/* Questions Answered */}
                                <span className="questions-answered">{player.questionsAnswered}</span>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default GlobalLeaderboard;
