// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { books } from './data.js'

/**
 * @typedef {Object} StateObject
 * @property {number} page - current page number of results being displayed in the app,
 * default value is 1
 * @property {Array} matches - an array containing current books that match most recent
 * search results, default value is entire {@link books} object
 */

/**
 * An object literal containing the current state of variables used to determine what is
 * shown on the app's interface
 *
 * @type {StateObject}
 */
export const state = {
    page: 1,
    matches: books,
}