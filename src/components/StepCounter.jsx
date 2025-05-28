import React, { useState } from 'react';
import './StepCounter.css';

export default function StepCounter({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || 0);

  const handleCircleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setInputValue(val);
  };

  const handleInputBlur = () => {
    setEditing(false);
    onChange && onChange(Number(inputValue) || 0);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange && onChange(Number(inputValue) || 0);
    }
  };

  return (
    <div className="step-counter-wrapper">
      {editing ? (
        <input
          className="step-input"
          type="text"
          value={inputValue}
          autoFocus
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <div className="stat-circle step-circle" onClick={handleCircleClick} title="Изменить количество шагов">
          {value || 0}
        </div>
      )}
    </div>
  );
} 