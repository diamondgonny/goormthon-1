import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search for:", username);
    // 여기에 API 호출 로직
  };

  return (
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
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150"
          alt="User Profile"
          className="profile-image"
        />
        <h2>Username</h2>
        <p>Public Repos: 53 | Followers: 1174</p>
        <a href="#" className="button">
          View Profile
        </a>
      </div>

      <section className="repos">
        <h3>Latest Repos</h3>
        <ul>
          <li>
            <a href="#" className="repo-link">
              Repo 1
            </a>
          </li>
          <li>
            <a href="#" className="repo-link">
              Repo 2
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
