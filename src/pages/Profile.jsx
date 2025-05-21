import React from 'react';
import avatar from '../assets/avatar.png';
import './Profile.css';

function Profile() {
  let user = {};
  try {
    user = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  } catch {}

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
      <div className="profile-info-block">
        <div className="profile-info-item">{user.name || 'имя'}</div>
        <div className="profile-info-item">{user.gender || 'пол'}</div>
        <div className="profile-info-item">{user.height || 'рост'}</div>
        <div className="profile-info-item">{user.weight || 'вес'}</div>
      </div>
    </div>
  );
}

export default Profile; 