import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({ total, spent, size = 250 }) => {
  const remaining = total - spent;
  const percentage = total > 0 ? ((remaining / total) * 100) : 0;
  
  // Responsive size adjustment
  const getResponsiveSize = () => {
    if (window.innerWidth <= 360) return 160;
    if (window.innerWidth <= 480) return 180;
    if (window.innerWidth <= 600) return 200;
    if (window.innerWidth <= 768) return 220;
    return size;
  };
  
  const responsiveSize = typeof window !== 'undefined' ? getResponsiveSize() : size;
  
  // Calculate stroke dash offset for the circle
  const radius = responsiveSize * 0.34; // 34% of size for proper proportions
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on remaining percentage
  const getColor = () => {
    if (percentage >= 70) return '#4caf50'; // Green
    if (percentage >= 40) return '#ff9800'; // Orange
    if (percentage >= 20) return '#ff5722'; // Orange-Red
    return '#f44336'; // Red
  };
  
  // Responsive font sizes
  const percentageFontSize = responsiveSize * 0.144; // ~36px for 250px
  const amountFontSize = responsiveSize * 0.096; // ~24px for 250px
  const labelFontSize = responsiveSize * 0.056; // ~14px for 250px
  
  return (
    <div className="circular-progress-container">
      <svg width={responsiveSize} height={responsiveSize} className="circular-progress">
        {/* Background circle */}
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={responsiveSize * 0.06} // 6% of size
        />
        
        {/* Progress circle */}
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={responsiveSize * 0.06}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring"
          transform={`rotate(-90 ${responsiveSize / 2} ${responsiveSize / 2})`}
        />
      </svg>
      
      <div className="circular-progress-text">
        <div className="percentage" style={{ fontSize: `${percentageFontSize}px` }}>
          {Math.round(percentage)}
        </div>
        <div className="remaining-amount" style={{ fontSize: `${amountFontSize}px` }}>
          ${remaining.toFixed(2)}
        </div>
        <div className="remaining-label" style={{ fontSize: `${labelFontSize}px` }}>
          remaining
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
