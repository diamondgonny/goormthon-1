import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1>GitHub Finder</h1>
      </nav>
      <div className="container">
        <header className="header">
          <h1>Search GitHub Users</h1>
          <p>Enter a username to fetch a user profile and repos</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </header>

        {userData && (
          <div className="profile-card">
            <img
              src={userData.avatar_url}
              alt="User Profile"
              className="profile-image"
            />
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
              <p>Member Since: {new Date(userData.created_at).toISOString()}</p>
            </div>
            <a href={userData.html_url} className="button" target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        )}

        {repos.length > 0 && (
          <section className="repos">
            <h3>Latest Repos</h3>
            <ul>
              {repos.map(repo => (
                <li key={repo.id}>
                  <div className="repo-info">
                    <a href={repo.html_url} className="repo-link" target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                    <div className="repo-stats">
                      <span>Stars: {repo.stargazers_count}</span>
                      <span>Watchers: {repo.watchers_count}</span>
                      <span>Forks: {repo.forks_count}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export default App;
