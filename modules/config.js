// @ts-check

/**
 * Global constant containing the set number of books to be displayed on a single page of
 * the app
 * 
 * @type {number}
 */
export const BOOKS_PER_PAGE = 36

/**
 * @typedef {Object} ThemesObject
 * @property {Object} day - contains color settings for the day theme
 * @property {string} day.dark - contains RGB value for the CSS --color-dark variable in
 * the day theme
 * @property {string} day.light - contains RGB value for the CSS --color-light variable in
 * the day theme
 * @property {Object} night - contains color settings for the night theme
 * @property {string} night.dark - contains RGB value for the CSS --color-dark variable in
 * the night theme
 * @property {string} night.light - contains RGB value for the CSS --color-light variable in
 * the night theme
 */

/**
 * Global constant containing RGB color codes to be applied using CSS color variables for
 * each of the available themes (day/night)
 *
 * @type {ThemesObject}
 */
export const THEMES = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}