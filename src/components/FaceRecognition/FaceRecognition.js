import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputimage'
          src={imageUrl}
          alt=''
          width='500px'
          height='auto'
        />
        {box.length >= 1 &&
          <p> 🧠 Smart Brain has detected {box.length} faces in your image </p>
        }
        {box.length >= 1 && box.map((outline, index) => (
          <div className='bounding-box' key={index} style={{top: outline.topRow, right: outline.rightCol, bottom: outline.bottomRow, left: outline.leftCol}}/> 
        ))}

      </div>
    </div>
  );
};

export default FaceRecognition;
