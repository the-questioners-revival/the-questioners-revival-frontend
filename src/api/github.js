import { GITHUB_KEY } from '../helpers/configuration';

async function fetchGitHubContributions({from, to}) {
  const username = 'joesepherus'; // Replace with your GitHub username

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${from.toISOString()}", to: "${to.toISOString()}") {
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

  let data = await response.json();
  let weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;

  const copy = structuredClone(weeks);
  const res = {data:[...copy]};
  return {res:res}
}

export default {
  fetchGitHubContributions,
};
