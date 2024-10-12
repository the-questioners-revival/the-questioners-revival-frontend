import { GITHUB_KEY } from '../helpers/configuration';

async function fetchGitHubContributions() {
  const username = 'joesepherus'; // Replace with your GitHub username
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1); // One year ago
  const until = new Date(); // Current date

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${since.toISOString()}", to: "${until.toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_KEY}`, // Replace with your token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching contributions: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('data: ', data);
  return {
    res: {
      data: data.data.user.contributionsCollection.contributionCalendar.weeks,
    },
  };
}

export default {
  fetchGitHubContributions,
};
