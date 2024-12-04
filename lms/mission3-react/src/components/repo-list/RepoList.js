import React from 'react';
import './RepoList.css';

const RepoList = ({ repos }) => {
  if (!repos.length) return null;

  return (
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
  );
};

export default RepoList; 
