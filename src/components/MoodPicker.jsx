import React, { useState } from 'react';
import './MoodPicker.css';

const moods = [
  { label: 'Плохое', color: '#f44336', emoji: '😞' },
  { label: 'Нейтральное', color: '#ffd600', emoji: '😐' },
  { label: 'Хорошее', color: '#4caf50', emoji: '😃' },
];

const defaultMood = { label: 'Выбрать', color: '#bdbdbd', emoji: '❔' };

export default function MoodPicker({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const hasValue = value !== undefined && value !== null && value >= 0 && value < moods.length;
  const mood = hasValue ? moods[value] : defaultMood;

  return (
    <div className="mood-picker-wrapper">
      <div
        className="stat-circle mood-emoji"
        style={{ background: '#fff', border: `4px solid ${mood.color}`, width: 48, height: 48, fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
        onClick={() => setShowPicker((v) => !v)}
        title={mood.label}
      >
        <span style={{
          background: hasValue ? mood.color : '#bdbdbd',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#23243a',
          fontSize: 28,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>{mood.emoji}</span>
      </div>
      {showPicker && (
        <div className="mood-picker-horizontal">
          {moods.map((m, idx) => (
            <div
              key={m.label}
              className="mood-option"
              style={{ background: m.color, color: '#fff', fontSize: 28, border: value === idx ? '2px solid #333' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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