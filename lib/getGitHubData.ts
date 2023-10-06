import { requestGraphql } from './requestGraphQL';

/**
 * @returns {Promise<Object>} User data
 * @description Returns user data
 * */
export async function getUserData() {
  const { data } = await requestGraphql(
    `
  query($username: String!) {
    user(login: $username) {
     repositories(
       isFork: false
       isLocked: false
       privacy: PUBLIC
       last: 100
       orderBy: {field: STARGAZERS, direction: DESC}
       ownerAffiliations: OWNER
     ) {
       totalCount
       totalDiskUsage
       edges {
         node {
           ... on Repository {
             id
             stargazerCount
             forkCount
           }
         }
       }
     }
     ... on User {
       followers {
         totalCount
       }
       starredRepositories {
         totalCount
       }
     }
   }
 }
    `,
    // TODO: Fix hardcoded values
    {
      username: 'polooner',
    }
  );

  const { user } = data;
  const { followers, starredRepositories, repositories } = user;
  const stars = repositories.edges.reduce(
    (sum, { node }) => sum + node.stargazerCount,
    0
  );
  const forks = repositories.edges.reduce(
    (sum, { node }) => sum + node.forkCount,
    0
  );
  console.log(data);

  return {
    userFollowers: followers.totalCount,
    userStarredRepos: starredRepositories.totalCount,
    userStars: stars,
    userForks: forks,
    userPublicRepositoriesCount: repositories.totalCount,
    userPublicRepositoriesDiskUsage: repositories.totalDiskUsage,
  };
}
