import React, { useState } from 'react';

const MEALS = [
  { key: 'breakfast', label: 'Завтрак' },
  { key: 'lunch', label: 'Обед' },
  { key: 'dinner', label: 'Ужин' },
  { key: 'snack', label: 'Перекус' },
];

function getCaloriesNorm() {
  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}
  const { gender, height, weight } = user;
  // Формула Миффлина-Сан Жеора, возраст по умолчанию 30
  const age = 30;
  if (gender && height && weight) {
    if (gender === 'Мужской') {
      return Math.round(10 * Number(weight) + 6.25 * Number(height) - 5 * age + 5);
    } else {
      return Math.round(10 * Number(weight) + 6.25 * Number(height) - 5 * age - 161);
    }
  }
  return 2000;
}

export default function CaloriesCalculator() {
  const [calories, setCalories] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snack: '',
  });
  const norm = getCaloriesNorm();
  const total =
    (parseInt(calories.breakfast) || 0) +
    (parseInt(calories.lunch) || 0) +
    (parseInt(calories.dinner) || 0) +
    (parseInt(calories.snack) || 0);
  const percent = Math.round((total / norm) * 100);

  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}
  const noUserData = !(user.gender && user.height && user.weight);

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
          {noUserData && (
            <div style={{color: '#f44336', fontSize: '0.97rem', textAlign: 'center', marginBottom: 8}}>
              Заполните профиль (пол, рост, вес) для точного расчёта нормы! Сейчас используется 2000 ккал.
            </div>
          )}
          {MEALS.map(meal => (
            <div key={meal.key} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.05rem', color: '#444', marginBottom: 8}}>
              <span style={{width: '33%', textAlign: 'left'}}>{meal.label}</span>
              <input
                type="number"
                min="0"
                value={calories[meal.key]}
                onChange={e => setCalories({...calories, [meal.key]: e.target.value.replace(/^0+(?!$)/, '')})}
                placeholder="0"
                style={{
                  width: 70,
                  border: '1px solid #c6e84e',
                  borderRadius: 12,
                  padding: '6px 8px',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  color: '#23243a',
                  background: '#fff',
                  outline: 'none',
                  boxShadow: '0 1px 4px #c6e84e22',
                  MozAppearance: 'textfield',
                }}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <span style={{width: '33%', textAlign: 'right', color: '#c6e84e', fontWeight: 600}}>
                {calories[meal.key] ? Math.round((parseInt(calories[meal.key]) / norm) * 100) : 0}%
              </span>
            </div>
          ))}
          <div style={{marginTop: 16, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#23243a'}}>
            Итого: <span style={{color: '#6a5acd'}}>{total}</span> ккал
          </div>
          <div style={{marginTop: 4, textAlign: 'center', fontSize: '1rem', color: percent > 100 ? '#f44336' : '#c6e84e'}}>
            {percent}% от дневной нормы ({norm} ккал)
          </div>
        </div>
      </div>
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
} 