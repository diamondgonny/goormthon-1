import React from 'react';
import './Profile.css';

const Profile = ({ userData }) => {
  if (!userData) return null;

  return (
    <div className="profile-card">
      <div className="profile-content">
        <div className="profile-image-container">
          <img
            src={userData.avatar_url}
            alt="User Profile"
            className="profile-image"
          />
          <a href={userData.html_url} className="button" target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
        <div className="profile-info">
          <div className="stats">
            <span className="stat-item">Public Repos: {userData.public_repos}</span>
            <span className="stat-item">Public Gists: {userData.public_gists}</span>
            <span className="stat-item">Followers: {userData.followers}</span>
            <span className="stat-item">Following: {userData.following}</span>
          </div>
          <div className="user-info">
            <p>Company: {userData.company || 'null'}</p>
            <p>Website/Blog: {userData.blog || 'null'}</p>
            <p>Location: {userData.location || 'null'}</p>
            <p>Member Since: {new Date(userData.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
