import { requestGraphql } from './requestGraphQL';

/**
 * @returns {Promise<Array>} Total years of contributions
 * @description Returns total years of contributions
 * */
export async function getTotalYears() {
  const { data } = await requestGraphql(
    `
       query($username: String!) {
    user(login: $username) {
         contributionsCollection {
           contributionYears
         }
       }
     }
   `,
    {
      username: 'wojda',
    }
  );
  return data.user.contributionsCollection.contributionYears;
}

/**
 * @param {number} year Year to get contributions for
 * @returns {Promise<number>} Total contributions for year
 * @description Returns total contributions for year
 * */
export async function getTotalContributionsForYear(year) {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const { data } = await requestGraphql(
    `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`,
    {
      username: 'polooner',
      from: from,
      to: to,
    }
  );

  return data.user.contributionsCollection.contributionCalendar
    .totalContributions;
}

/**
 * @returns {Promise<Object>} Total contributions for years
 * @description Returns total contributions for years
 * */
export async function getTotalContributionsForYears() {
  const results = Array();
  let total = 0;
  const years = await getTotalYears();
  const since = years[years.length - 1];
  const to = 0;
  for (const year of years) {
    const totalContributions = await getTotalContributionsForYear(year);
    results.push({ year, totalContributions });
    total += totalContributions;
  }
  return { results, total, dates: { since, to } };
}
