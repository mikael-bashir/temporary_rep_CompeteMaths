import React from 'react';

const UserGuide = () => {
  return (
    <div className="aboutContainer">
      <h1>User Guide for Competemath</h1>
      <h2>List of Contents</h2>
      <ol>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#navigating-the-interface">Navigating the Interface</a></li>
        <li><a href="#using-the-app">Using the App</a></li>
        <li><a href="#support-and-feedback">Support and Feedback</a></li>
        <li><a href="#faqs">FAQs</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ol>

      <section id="introduction">
        <h2>1. Introduction</h2>
        <h3>Overview of Competemath</h3>
        <p>
          Compete Math is a competitive mathematics web application designed to challenge users with a variety of math problems while fostering a community of learners. Users can solve problems, and compete on global leaderboards.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li>Global and Problem-Specific Leaderboards: Track your performance and see how you stack up against others.</li>
          <li>Dynamic Feedback: Get immediate feedback on your submissions.</li>
        </ul>
      </section>

      <section id="getting-started">
        <h2>2. Getting Started</h2>
        <h3>System Requirements</h3>
        <p>A modern web browser (Chrome, Firefox, Safari, or Edge) and an internet connection.</p>
        
        <h3>How to Access Competemath</h3>
        <p>Visit <a href="#">Competemath Website</a> to access the application.</p>

        <h3>Creating an Account</h3>
        <ol>
          <li>Click on the "Register" button.</li>
          <li>Fill in your details (username, password).</li>
        </ol>
      </section>

      <section id="navigating-the-interface">
        <h2>3. Navigating the Interface</h2>
        <h3>Dashboard Overview</h3>
        <p>Upon logging in, you can access the problems from the archives</p>

        <h3>Menu Navigation</h3>
        <p>The navigation menu at the top provides access to:</p>
        <ul>
          <li><strong>About:</strong> Return to about page.</li>
          <li><strong>Archives:</strong> Browse and solve problems.</li>
          <li><strong>Register:</strong> Opens the register form.</li>
          <li><strong>Login:</strong> Opens the login form.</li>
          <li><strong>Global:</strong> View global and problem-specific leaderboards.</li>
          <li><strong>News:</strong> View updates from admin, and release notes.</li>
          <li><strong>Logout:</strong> Appears when logged in, will log you out on click.</li>
        </ul>

        <h3>Understanding the Leaderboard</h3>
        <p>The leaderboard showcases the top performers (top 100) globally and in specific problems. The results are from the beginning of the first release, but this is likely subject to change.</p>
      </section>

      <section id="using-the-app">
        <h2>4. Using the App</h2>
        <h3>Solving Problems</h3>
        <h4>Accessing Problems</h4>

        <h4>Submitting Answers</h4>
        <ol>
          <li>Select a problem to begin solving.</li>
          <li>Enter your answer in the provided input box.</li>
          <li>Click "Submit" to check your answer.</li>
        </ol>

        <h4>Viewing Feedback</h4>
        <p>After submission, you will receive instant feedback indicating whether your answer was correct or incorrect</p>

        <h4>Brute Force detection</h4>
        <p>Please do not spam answers, otherwise your account may be rate limited for a day. You should wait 15s before trying a different answer.</p>

      </section>

      <section id="support-and-feedback">
        <h2>5. Support and Feedback</h2>
        <h3>Contacting Support</h3>
        <p>If you encounter issues, reach out via the "Support" section, where you can submit a request.</p>

        <h3>Providing Feedback</h3>
        <p>We welcome your thoughts! Use the feedback form in the app to share your suggestions.</p>

        <h3>Reporting Issues</h3>
        <p>For bugs or technical problems, please report them through the "Report Issue" feature.</p>
      </section>

      <section id="faqs">
        <h2>6. FAQs</h2>
        <h3>Common Questions</h3>
        <ul>
          <li><strong>How do I reset my password?</strong> In this early stage there isn't a way to do this. The coming releases will introduce a forgot password option.</li>
        </ul>
        <ul>
          <li><strong>I can't see myself in the leaderboard?</strong> This is because our systems update the global leaderboard every 6 hours, starting at midnight. For now, you should still be able to see yourself in problem specific leaderboards, immediately.</li>
        </ul>

        <h3>Troubleshooting Tips</h3>
        <p>Clear your browser cache if you encounter loading issues. Ensure your internet connection is stable.</p>
      </section>

      <section id="conclusion">
        <h2>7. Conclusion</h2>
        <h3>Final Thoughts</h3>
        <p>Thank you for using Compete Math! We hope you enjoy challenging yourself and engaging with our community. Remember, practice makes perfect!</p>

        <h3>Encouragement to Engage</h3>
        <p>Join our community today and start solving problems!</p>
      </section>
    </div>
  );
};

export default UserGuide;
