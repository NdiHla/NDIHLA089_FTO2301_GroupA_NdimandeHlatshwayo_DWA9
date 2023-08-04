// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { books } from './data.js'
import { state } from './state.js'
import { html, createPreviewsList, updateShowMoreButton } from './view.js'

/** 
 * Event handler that opens Search overlay on click of the Search button. Focus is set to
 * the title section of the menu so that the user can immediately start typing in the
 * form.
 */
export const handleSearchOpen = () => {
    html.search.overlay.open = true 
    html.search.title.focus()
}

/**
 * Event handler that closes Search overlay on click of the Cancel button. The form is
 * reset so any user input not subitted is cleared when the overlay is next opened.
 */
export const handleSearchCancel = () => {
    html.search.overlay.open = false
    html.search.form.reset()
}

/**
 * Function that compares a set of filters to the entire {@link books} object and returns
 * only books that match the defined filter terms
 * @param {Object} filters - Object containing search terms for for the title, genre, and
 * author categories, each stored in their own properties
 * @returns {Array} An array containing all books that match the search filters
 */
const applySearchFilters = (filters) => {
    const result = []
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }
    return result
}

/**
 * Function that checks if there are any matches for the current search filters and shows
 * a message to the user in the list area if there are none
 */
const checkForMatches = () => {
    if (state.matches.length < 1) {
        html.list.message.classList.add('list__message_show')
    } else {
        html.list.message.classList.remove('list__message_show')
    }
}

/** 
 * Event handler that fires when data in the Search Menu form is submitted. Form data is
 * extracted and {@link applySearchFilters} is used to update the matches array in the
 * {@link state} object accordingly. New list previews are then generated and added to the
 * main list area using {@link createPreviewsList}. The value in the Show More button is
 * also updated using the {@link updateShowMoreButton} function and the search form is
 * reset so user input is cleared when the Search Menu is next opened.
*/
export const handleSearchSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    state.matches = applySearchFilters(filters)
    state.page = 1;

    checkForMatches()

    html.list.button.disabled = false
    html.list.items.innerHTML = ''
    createPreviewsList(state.matches, state.page)

    updateShowMoreButton(state.matches, state.page)
    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
    html.search.form.reset()
}