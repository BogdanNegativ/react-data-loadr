// export const getUsers = (page, nat, results) => {
//   return fetch(`https://randomuser.me/api/?results=${results}&nat=${nat}&seed=abc&page=${page}`)
//     .then(response => response.json())
// }


// export const getUsers = (options) => {
//   const { results = 10, nat = 'ua', page } = options;
//   return fetch(`https://randomuser.me/api/?results=${results}&nat=${nat}&seed=abc&page=${page}`)
//     .then(response => response.json())
// }

import queryString from 'query-string';

/**
 * Get users from api
 * @param {object} options The object with http params
 * @param {number} options.results Requesting multiple users
 * @param {number} options.page The number of pagination
 * @param {string} options.seed 
 * @param {string} options.nat The nationality of users
 * @returns {Promise}
 */
export const getUsers = (options) => {
  const defaultOptions = {
    results: 10,
    page: 1,
    nat: 'ua'
  }
  const finallyOptions = {
    ...defaultOptions,
    ...options
  }

  console.log(queryString.stringify(finallyOptions));
  return fetch(`https://randomuser.me/api/?${queryString.stringify(finallyOptions)}`)
    .then(response => response.json())
}
