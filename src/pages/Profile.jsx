import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import BottomNav from '../components/BottomNav';
import './Profile.css';

const genders = ['Мужской', 'Женский'];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  
  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}

  const handleEdit = () => {
    setEditData(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editData.name || !editData.gender || !editData.height || !editData.weight) return;
    sessionStorage.setItem('userProfile', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  return (
    <div className="profile-page-container">
      <div className="profile-stars-bg">
        {/* Здесь можно добавить svg или div со звёздами, как на макете */}
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`star star-${i}`}>★</span>
        ))}
      </div>
      <div className="profile-avatar-block">
        <img src={avatar} alt="avatar" className="profile-avatar" />
      </div>
      
      {!isEditing ? (
        <>
          <div className="profile-info-block">
            <div className="profile-info-item">{user.name || 'имя'}</div>
            <div className="profile-info-item">{user.gender || 'пол'}</div>
            <div className="profile-info-item">{user.height || 'рост'}</div>
            <div className="profile-info-item">{user.weight || 'вес'}</div>
          </div>
          <button className="profile-edit-btn" onClick={handleEdit}>
            Редактировать
          </button>
        </>
      ) : (
        <div className="profile-edit-form">
          <div className="profile-edit-field">
            <input
              type="text"
              value={editData.name || ''}
              onChange={e => setEditData({...editData, name: e.target.value})}
              placeholder="имя"
            />
          </div>
          <div className="profile-edit-field">
            <select
              value={editData.gender || ''}
              onChange={e => setEditData({...editData, gender: e.target.value})}
            >
              {genders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="profile-edit-field">
            <input
              type="number"
              value={editData.height || ''}
              onChange={e => setEditData({...editData, height: e.target.value})}
              placeholder="рост"
            />
          </div>
          <div className="profile-edit-field">
            <input
              type="number"
              value={editData.weight || ''}
              onChange={e => setEditData({...editData, weight: e.target.value})}
              placeholder="вес"
            />
          </div>
          <div className="profile-edit-buttons">
            <button className="profile-cancel-btn" onClick={handleCancel}>
              Отмена
            </button>
            <button className="profile-save-btn" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
}

export default Profile; 