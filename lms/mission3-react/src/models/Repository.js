class Repository {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.html_url = data.html_url;
        this.stargazers_count = data.stargazers_count;
        this.watchers_count = data.watchers_count;
        this.forks_count = data.forks_count;
    }

    static async fetchRepositories(reposUrl) {
        try {
            const response = await fetch(reposUrl);
            const data = await response.json();
            return data.map(repo => new Repository(repo));
        } catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    }
}

export default Repository; 
