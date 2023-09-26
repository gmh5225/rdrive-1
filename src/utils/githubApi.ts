import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN as string;

// Function to fetch GitHub user data with caching
export async function fetchGitHubUser(username: string) {
  // Check if the user data is already in the cache
  const cachedUserData = sessionStorage.getItem(`githubUser_${username}`);
  
  if (cachedUserData) {
    return JSON.parse(cachedUserData);
  } else {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${ACCESS_TOKEN}`,
        },
      });
      
      const userData = response.data;
      
      // Store the fetched data in the cache
      sessionStorage.setItem(`githubUser_${username}`, JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      throw error;
    }
  }
}
