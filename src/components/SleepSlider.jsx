import React, { useState } from 'react';

export default function SleepSlider({ initialMinutes = 0, onSave, onClose }) {
  const [minutes, setMinutes] = useState(initialMinutes);

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 18, padding: 24, minWidth: 260, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}>
        <div style={{ fontSize: '1.1rem', marginBottom: 18, textAlign: 'center' }}>
          Количество сна: <b>{hours}</b> ч <b>{mins.toString().padStart(2, '0')}</b> мин
        </div>
        <input
          type="range"
          min={0}
          max={720}
          step={10}
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginTop: 8 }}>
          <span>0 ч</span>
          <span>12 ч</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{ padding: '6px 18px', borderRadius: 8, border: 'none', background: '#eee', cursor: 'pointer' }}>Отмена</button>
          <button onClick={() => onSave(minutes)} style={{ padding: '6px 18px', borderRadius: 8, border: 'none', background: '#6a5acd', color: '#fff', cursor: 'pointer' }}>Сохранить</button>
        </div>
      </div>
    </div>
  );
} 