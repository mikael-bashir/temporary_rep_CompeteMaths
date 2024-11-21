import React, {useEffect} from 'react';
import { tokenValid, useGlobalState } from '../hooks/GlobalStateContext.js';
import { Link } from 'react-router-dom';
import ReleaseNotesList from '../components/ReleaseNotesList.js';

const News = () => {

  return (
    <div className="aboutContainer">
      <h1>Latest Updates</h1>
      <p>
        Please note that the app is still in early stages of development, and reporting of any bugs is greatly appreciated. We welcome any constructive feedback, be it what you liked or didn't like, and aim to incorporate community feedback into the app.
      </p>
      <ReleaseNotesList />
    </div>
  );
};

export default News;
