import React, { useState } from 'react';
import './MoodPicker.css';

const moods = [
  { label: 'Хорошее', color: '#4caf50', emoji: '😃' },
  { label: 'Нейтральное', color: '#ffd600', emoji: '😐' },
  { label: 'Плохое', color: '#f44336', emoji: '😞' },
];

export default function MoodPicker({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="mood-picker-wrapper">
      <div
        className="stat-circle mood-emoji"
        style={{ background: moods[value].color, fontSize: 28, cursor: 'pointer' }}
        onClick={() => setShowPicker((v) => !v)}
        title={moods[value].label}
      >
        {moods[value].emoji}
      </div>
      {showPicker && (
        <div className="mood-picker-vertical">
          {moods.map((m, idx) => (
            <div
              key={m.label}
              className="mood-option"
              style={{ background: m.color, color: '#fff', fontSize: 28, border: value === idx ? '2px solid #333' : 'none' }}
              onClick={() => { onChange(idx); setShowPicker(false); }}
              title={m.label}
            >
              {m.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 