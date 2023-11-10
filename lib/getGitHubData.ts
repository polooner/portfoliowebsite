import { requestGraphql } from './requestGraphQL';
import { meta } from './constants';
import { stripTypenames } from './utils';

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
    {
      username: meta.accounts.github.username,
    }
  );
  console.log(data);
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

/**
 * @returns {Promise<Object>} Popular repos
 * @description Returns popular repos
 * */
export async function getPopular() {
  const { data } = await requestGraphql(
    `
  query($username: String!) {
    user(login: $username) {
       repositories(
         isFork: false
         isLocked: false
         privacy: PUBLIC
         first: 6
         orderBy: {field: STARGAZERS, direction: DESC}
         ownerAffiliations: OWNER
       ) {
         edges {
           node {
             ... on Repository {
               name
               url
               owner {
                 login
               }
               description
               isArchived
               forkCount
               id
               stargazerCount
               primaryLanguage {
                 name
                 color
               }
             }
           }
         }
       }
     }
   }
`,
    {
      username: meta.accounts.github.username,
    }
  );
  return stripTypenames(data.user);
}
