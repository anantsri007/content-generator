import React from 'react';

const BestTimeCard = ({ bestPostTime }) => (
  <div style={{
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1rem',
    background: '#fafbfc',
    marginTop: '1rem',
    textAlign: 'center'
  }}>
    <h4>Best Time to Post</h4>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>
      {bestPostTime}
    </p>
  </div>
);

export default BestTimeCard;
