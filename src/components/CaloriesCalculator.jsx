import React from 'react';

export default function CaloriesCalculator() {
  return (
    <div style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 16,
      background: '#fafafa',
      boxShadow: '0 2px 12px rgba(164,154,214,0.08)',
      padding: '18px 12px',
      marginTop: 24
    }}>
      <div style={{width: '100%'}}>
        <div style={{margin: '0 0 0 0', padding: '0 6px'}}>
          <div style={{fontSize: '1.05rem', color: '#23243a', marginBottom: 8, textAlign: 'center'}}>Расчёт калорий</div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}>
            <span style={{width: '33%', textAlign: 'left'}}>Завтрак</span>
            <span style={{color: '#c6e84e', fontSize: '1.2em', width: '33%', textAlign: 'center'}}>★</span>
            <span style={{width: '33%', textAlign: 'right'}}>(0%)</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}>
            <span style={{width: '33%', textAlign: 'left'}}>Обед</span>
            <span style={{color: '#c6e84e', fontSize: '1.2em', width: '33%', textAlign: 'center'}}>★</span>
            <span style={{width: '33%', textAlign: 'right'}}>(0%)</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}>
            <span style={{width: '33%', textAlign: 'left'}}>Ужин</span>
            <span style={{color: '#c6e84e', fontSize: '1.2em', width: '33%', textAlign: 'center'}}>★</span>
            <span style={{width: '33%', textAlign: 'right'}}>(0%)</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 4}}>
            <span style={{width: '33%', textAlign: 'left'}}>Перекус</span>
            <span style={{color: '#c6e84e', fontSize: '1.2em', width: '33%', textAlign: 'center'}}>★</span>
            <span style={{width: '33%', textAlign: 'right'}}>(0%)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 