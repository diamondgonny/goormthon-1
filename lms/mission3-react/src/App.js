import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/search-bar/SearchBar";
import Profile from "./components/profile/Profile";
import RepoList from "./components/repo-list/RepoList";
import User from "./models/User";
import Repository from "./models/Repository";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const user = await User.fetchUser(username);
      setUserData(user);

      if (user) {
        const repositories = await Repository.fetchRepositories(user.repos_url);
        setRepos(repositories);
      }
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
      <Navbar />
      <div className="container">
        <SearchBar
          username={username}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <Profile userData={userData} />
        <RepoList repos={repos} />
      </div>
    </>
  );
}

export default App;
