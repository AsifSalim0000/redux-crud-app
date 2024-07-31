// screens/NotFoundScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Back to Home</Link>
    </div>
  );
};

export default NotFoundScreen;
