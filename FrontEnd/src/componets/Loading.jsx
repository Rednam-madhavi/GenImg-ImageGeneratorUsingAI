import React from 'react';
import loadingGif from '../assets/loader.gif';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={loadingGif} alt="Loading..."/>
    </div>
  );
};

export default Loading;