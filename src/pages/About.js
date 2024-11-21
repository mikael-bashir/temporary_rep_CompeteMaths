import React, {useEffect} from 'react';
import { tokenValid, useGlobalState } from '../hooks/GlobalStateContext.js';
import { Link } from 'react-router-dom';

const About = () => {

  return (
    <div className="aboutContainer">
      <h1>The purpose of Compete Math</h1>
      <p>
        The main reason Compete Math exists is to share some interesting problems I found during my studies of Mathematics. The sharing of creative solutions and competition to create more efficient algorithms is encouraged.
      </p>
      <p>
        The problems are intended to be solved with a machine, to prevent guessing the solution. Therefore, the crux of the problem can be solved with pen and paper, although some coding can help to see patterns and test hypotheses.
      </p>
      <p>
        The creation of Compete Math is inspired by <a id="ProjectEuler" href="https://projecteuler.net/" target="_blank" rel="noopener noreferrer">Project Euler</a>, but none of the problems are.
      </p>
      <h2>Who are the problems aimed at</h2>
      <p>
        No problem requires advanced theory, so a curious high-schooler, all the way to an expert, will find problems that are rewarding and challenging to them. So, there isn't a strict target audience, and all of the challenges can be solved with some creativity and investigation.
      </p>
      <p>
        It should be noted, these problems resemble closest, the theme of competition mathematics. Further, an efficient algorithm shouldn't take more than 1 second to run, and past the 1 minute mark is considered slow.
      </p>
      <p>
        The problems are in a rough ordering by difficulty level, so it is recommended to start with the first few problems. Whatever you do, the key is to have fun and do interesting maths!
      </p>
      <h5>I've been rate limited - what to do?</h5>
      <p>
        Don't worry - if our systems have detected unusual activity, then you can submit answers at the usual rate of 10 seconds per question, a day after the last offense. You can prevent unusual activity by doing minimal guessing, and submitting answers only when you are confident.
      </p>
      <h3>How to get started</h3>
      <p>
        Signing up is completely free for anyone - you can get started by clicking the <Link id="registerLink" to="/register">Register</Link> button in the navigation and creating an account. Then, you can <Link id="loginLink" to="/login">Login</Link> - that way, your progress will be saved and you can submit answers to questions.
      </p>
      <p>
        Feel free, however, to just view the problems instead - you can find them in <Link id="archivesLink" to="/archives">Archives</Link> in the navigation.
      </p>
      <p>
        If you want to share a problem, or have any feedback, feel free to drop a message to the email below.
      </p>
      <h4>Puzzling Mind: <a href="mailto:PuzzlingMinds@outlook.com">PuzzlingMinds@outlook.com</a></h4>
    </div>
  );
};

export default About;
