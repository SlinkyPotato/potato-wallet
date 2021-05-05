/*global chrome*/

import React, {useState, useEffect} from 'react';
import intro1 from './intro1.png';
import intro2 from './intro2.png';
import intro3 from './intro3.png';

export default function Intro(props) {
    const [url, setUrl] = useState('');

  // Using available browser api which is chrome extension api
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    });
  });

  return (
    <div id="carouselExampleIndicators" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={intro1} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={intro2} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={intro3} className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )

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
    });
  }
  
}