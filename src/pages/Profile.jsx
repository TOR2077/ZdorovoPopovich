import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarDefault from '../assets/avatar.png';
import BottomNav from '../components/BottomNav';
import './Profile.css';

const genders = ['Мужской', 'Женский'];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();
  
  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}

  const handleEdit = () => {
    setEditData(user);
    setAvatarPreview(user.avatar || null);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editData.name || !editData.gender || !editData.height || !editData.weight) return;
    const userToSave = { ...editData, avatar: avatarPreview };
    sessionStorage.setItem('userProfile', JSON.stringify(userToSave));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
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
        <img src={isEditing ? (avatarPreview || avatarDefault) : (user.avatar || avatarDefault)} alt="avatar" className="profile-avatar" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            style={{ marginTop: 12 }}
            onChange={handleAvatarChange}
          />
        )}
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