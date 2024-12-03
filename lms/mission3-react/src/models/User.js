class User {
    constructor(data) {
        this.avatar_url = data.avatar_url;
        this.public_repos = data.public_repos;
        this.public_gists = data.public_gists;
        this.followers = data.followers;
        this.following = data.following;
        this.repos_url = data.repos_url;
        this.html_url = data.html_url;
        this.company = data.company;
        this.blog = data.blog;
        this.location = data.location;
        this.created_at = data.created_at;
    }

    static async fetchUser(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            return new User(data);
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
}

export default User; 
