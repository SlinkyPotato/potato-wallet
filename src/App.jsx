/*global chrome*/

import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState('');

  return (
    <div className="App">
      <AppHeader />
    </div>
  );
}

function AppHeader() {
  const [url, setUrl] = useState('');
  const [responseFromContent, setResponseFromContent] = useState('');

  // Using available browser api which is chrome extension api
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };



    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    });
  });

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>URL:</p>
      <button onClick={askUrlPermission}>Give access</button>
      <p>{url}</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function askUrlPermission() {
  console.log("is it working???");

  chrome.permissions.request({
    permissions: ['tabs']
  }, function(isAllowed) {
    if (isAllowed) {
      // do something allowed
    } else {
      // do something not allowed
    }
  })
}

export default App;
