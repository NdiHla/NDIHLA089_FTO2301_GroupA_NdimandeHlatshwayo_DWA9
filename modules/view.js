// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { BOOKS_PER_PAGE } from './config.js'
import { authors } from './data.js'

/**
 * An object literal containing references to all DOM nodes that may need 
 * to be targeted using query selectors during operation of the app. This ensures
 * that all HTML elements can be easily referenced from a single data structure.
 * The properties headerButtons, search, settings and list refer to the section
 * of the document the elements are found in, while the properties nested below these
 * refer to the elements themselves. Elements are accessed using selectors for their data
 * attributes
 * 
 * @type {Object}
 */
export const html = {
    headerButtons: {
        search: document.querySelector('[data-header-search]'), 
        settings: document.querySelector('[data-header-settings]'),
    },
    search: {
        overlay: document.querySelector('[data-search-overlay]'),
        cancel: document.querySelector('[data-search-cancel]'),
        form: document.querySelector('[data-search-form]'),
        title: document.querySelector('[data-search-title]'),
        genres: document.querySelector('[data-search-genres]'), 
        authors: document.querySelector('[data-search-authors]'),
    },
    settings: {
      overlay: document.querySelector('[data-settings-overlay]'),
      cancel: document.querySelector('[data-settings-cancel]'),
      form: document.querySelector('[data-settings-form]'),
      theme: document.querySelector('[data-settings-theme]'),
    },
    list: {
        button: document.querySelector('[data-list-button]'),
        items: document.querySelector('[data-list-items]'),
        close: document.querySelector('[data-list-close]'),
        message: document.querySelector('[data-list-message]'),
        active: {
          preview: document.querySelector('[data-list-active]'),
          blur: document.querySelector('[data-list-blur]'),
          image: document.querySelector('[data-list-image]'),
          title: document.querySelector('[data-list-title]'),
          subtitle: document.querySelector('[data-list-subtitle]'),
          description: document.querySelector('[data-list-description]'),
        }
    }
  }

/** 
 * Function that generates an HTML document fragment containing the list of book previews
 * and adds them to main list area of the app. The previews give an image of the book
 * cover, as well as the book title and author name. Appropriate CSS classes and data
 * attributes are simultaneously applied.
 * @param {Array} matches - contains data of books to be added to the list as per current
 * array of matches stored in the {@link state} object.
 * @param {number} page - page number of books to be displayed as per current state in
 * {@link state} object
 */
export const createPreviewsList = (matches, page) => {
    const fragment = document.createDocumentFragment()
    const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    
    for (const { author, id, image, title } of matches.slice(range[0], range[1])) {
        const element = document.createElement('button')
        // @ts-ignore
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        fragment.appendChild(element)
    }
    html.list.items.appendChild(fragment)
}

/**
 * Function that is used to populate the dropdown list options in the search menu
 * according to the content of a specified source object, in this case either
 * {@link genres} or {@link authors}. Although originally written for the authors and
 * genres dropdowns, could also be used for other search menu options introduced in
 * future.
 * @param {object} source - object from which options are generated
 * @param {'Genres' | 'Authors'} label - name of dropdown menu
 * @param {HTMLElement} node - reference to DOM node at which dropdown HTML will be appended
 */
export const createDropdownList = (source, label, node) => {
    const dropdownList = document.createDocumentFragment()

    const firstDropdownElement = document.createElement('option')
    firstDropdownElement.value = 'any'
    firstDropdownElement.innerText = `All ${label}`
    dropdownList.appendChild(firstDropdownElement)

    for (const [id, name] of Object.entries(source)) {
        const dropdownElement = document.createElement('option')
        dropdownElement.value = id
        dropdownElement.textContent = name
        dropdownList.appendChild(dropdownElement)
    }
    node.appendChild(dropdownList)
}

/**
 * Function that calculates the remaining number of matches not shown on the current page
 * and updates the text of the Show More button accordingly.
 * @param {Array} matches - contains current books that match most recent search filters
 * @param {number} page - indicates current page number
 */
export const updateShowMoreButton = (matches, page) => {
    const remaining = matches.length - (page * BOOKS_PER_PAGE)
    const hasRemaining = remaining > 0
    html.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${hasRemaining === true ? remaining : 0})</span
    `
    if (hasRemaining === false) {
    html.list.button.disabled = true
    }
}