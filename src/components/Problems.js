import React, { useState, useRef, useEffect, Suspense, lazy, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { tokenValid, useGlobalState } from '../hooks/GlobalStateContext.js';
import MathComponent from '../utils/mathComponent.js';

// Define loadProblemComponent outside of the component and use useMemo to memoize it
const loadProblemComponent = async (problemId) => {
    console.log(`/problem/${problemId}`);
    const response = await fetch(`/problem/${problemId}`); // Use the problemId in the endpoint
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Assuming the response is JSON
    console.log(data);
    return data; // Assuming the JSON has a 'latex' field that contains the LaTeX string
};

const Problems = () => {
    const answerRef = useRef(null);
    const { token, setToken } = useGlobalState();
    const { problemId } = useParams(); // Extract problemId from the URL
    const [result, setResult] = useState('');
    const [answerDate, setAnswerDate] = useState('');
    const [submitBoxVisible, setSubmitBoxVisible] = useState(false);
    const [problemComponent, setProblemComponent] = useState('');
    const [resultContainerVisible, setResultContainerVisible] = useState(false);
    const [currentlySignedIn, setCurrentlySignedIn] = useState(false);
    const problemKey = `problemRate${problemId}`;
    let waitTime = localStorage.getItem(problemKey);
    const message = waitTime !== null ? `Last wait time was ${waitTime} seconds. Please ensure you waited this cooldown period` : '';

    const [rateLimitMessage, setRateLimitMessage] = useState(message);
    const [cooldown, setCooldown] = useState(0);

    // Memoize the ProblemComponent to prevent re-importing on every render
    // const ProblemComponent = useMemo(() => loadProblemComponent(problemId), [problemId]);
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const { latex, title } = await loadProblemComponent(problemId);
                console.log('the saved latex looks like:', latex);
                console.log('Response type:', typeof latex);
                // Explicitly convert latex to string
                const latexString = String(latex);
                console.log('Converted latex to string:', latexString);
                console.log('Response type:', typeof latex);
        
                setProblemComponent(latexString);  // Ensure it's a plain string
            } catch (error) {
                console.error("Error fetching problem data:", error);
            } 
        };
      
        fetchProblem();
    }, [problemId]);

    useEffect(() => {
        console.log(problemComponent);
    }, [problemComponent]);

    console.log("Problems component mounted. Current problemId:", problemId);

    useEffect(() => {
        // If timeLeft reaches 0, stop the timer
        if (cooldown <= 0) return;

        // Set up the timer
        const timer = setInterval(() => {
            setCooldown((prevTime) => prevTime - 1);
        }, 1000); // Update every second

        // Clean up the interval on component unmount
        return () => clearInterval(timer);
    }, [cooldown]);

    const isStrictlyNumeric = (value) => /^\d+$/.test(value);

    const submit = () => {
        const answer = answerRef.current.value;
        if (!tokenValid(token)) {
            alert("You need to be logged in to submit an answer.");
            return;
        }

        if (isStrictlyNumeric(answer)) {
            fetch('/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userAnswer: answer })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const now = new Date();
                    setResultContainerVisible(true);
                    setResult(`Submitted answer: ${answer}`);
                    setSubmitBoxVisible(false);
                    setAnswerDate(now.toString());
                } else {
                    if (data.rateLimit){
                        localStorage.setItem([problemKey], data.rateLimit);
                    }
                    setRateLimitMessage(`Too many attempts - Please wait ${localStorage.getItem(problemKey)} seconds. For more information see About page`);
                    setCooldown(Math.floor(localStorage.getItem(problemKey) * 1.05)); // Update cooldown if provided
                    console.log('Incorrect answer');
                }
                answerRef.current.value = ''; // Clear the answer after submission
            })
            .catch(error => {
                console.error('Error:', error);
                console.log("An error occurred");
            });
        } else {
            console.log("Please enter a valid value");
        }
    };

    const loadUserProgress = async () => {
        if (!token || !token.trim()) return; // Early return if no valid token

        console.log(`Fetching user progress with token: ${token}`);
        try {
            const referer = document.referrer;  // Get the current referer (previous page URL)
            const response = await fetch('/user-progress', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('checkpoint');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                console.log('fetch success', problemId);
                let progressFound = false;

                data.progress.forEach(progressItem => {
                    if (progressItem.question_id === parseInt(problemId, 10)) {
                        console.log(progressItem.question_id, problemId);
                        progressFound = true;
                        console.log('Found!')
                        setResultContainerVisible(true);
                        setResult(`Submitted answer: ${progressItem.answer}`);
                        setSubmitBoxVisible(false);
                        setAnswerDate(new Date(progressItem.updatedAt).toString());
                    }
                });

                if (!progressFound) {
                    setResultContainerVisible(false);
                    setSubmitBoxVisible(true);
                }
                console.log(resultContainerVisible);
                console.log(submitBoxVisible);
            } else {
                console.log("Failed to load user progress");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        console.log("Loading user progress for problemId:", problemId);
        loadUserProgress();
    }, [problemId, token]); // Add token as dependency to ensure proper updates

    return (
        <div>
            <div className="container" id="container">
                <Suspense fallback={<div>Loading problem...</div>}>
                    <MathComponent latex={problemComponent} inline={false} />
                </Suspense>
                <div className="submitBox" style={{ display: submitBoxVisible ? 'flex' : 'none' }}>
                    <input
                        type="text"
                        placeholder="Enter answer"
                        className="answerInput"
                        ref={answerRef}
                    />
                    <button className="answerSubmit" onClick={submit}>Submit</button>
                </div>
                <div className="resultContainer" style={{ display: resultContainerVisible ? 'flex' : 'none' }}>
                    <p id="result">{result}</p>
                    <p id="answerDate">{answerDate}</p>
                </div>
                {rateLimitMessage && (
                    <div className="rateLimitInfo">
                        <p>{rateLimitMessage}</p>
                        {cooldown > 0 && <p className="cooldownInfo">Cooldown remaining: {cooldown} seconds</p>}
                    </div>
                )}
            </div>     
        </div>
    );
};

export default Problems;
