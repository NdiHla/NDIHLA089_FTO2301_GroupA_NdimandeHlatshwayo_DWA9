// @ts-check
/* eslint-disable import/extensions */

import { html } from './view.js'
import { THEMES } from './config.js'

/**
 * Event handler that opens Settings overlay on click of the Settings button
 */
export const handleSettingsOpen = () => {
    html.settings.overlay.open = true 
}

/**
 * Event handler that closes Settings overlay on click of the Cancel button
 */
export const handleSettingsCancel = () => {
    html.settings.overlay.open = false
}

/**
 * Event handler that fires when the Save button in the Settings overlay is clicked. The
 * theme that the user has selected is applied using the colors saved in the
 * {@link THEMES} object.
*/
export const handleSettingsSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    // @ts-ignore
    document.documentElement.style.setProperty('--color-dark', THEMES[theme].dark)
    // @ts-ignore
    document.documentElement.style.setProperty('--color-light', THEMES[theme].light)
    
    html.settings.overlay.open = false
}