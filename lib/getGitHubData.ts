import { requestGraphql } from './requestGraphQL';
import { meta } from './constants';
import { stripTypenames } from './utils';

/**
 * @returns {Promise<Object>} User data
 * @description Returns user data
 * */
export async function getUsersRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${meta.accounts.github.username}/repos`
    ).then(async (r) => await r.json());
    return res;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @returns {Promise<Object>} Popular repos
 * @description Returns popular repos
 * */
export async function getPopular() {}
