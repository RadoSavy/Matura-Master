import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthChange } from '../services/firebase';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.spinner}></div>
          <p>Зареждане...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  content: {
    textAlign: 'center'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #ddd',
    borderTop: '4px solid #4a90d9',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  }
};

export default ProtectedRoute;
