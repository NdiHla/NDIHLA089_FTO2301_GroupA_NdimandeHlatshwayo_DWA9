// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { state } from './state.js'
import { createPreviewsList, updateShowMoreButton } from './view.js'

/** Event handler fired by clicking Show More button. Increments the page count by 1, and
 *  then runs the {@link createPreviewsList} function to generate the previews for this
 *  page. The value in the Show More button is updated using the
 *  {@link updateShowMoreButton} function.
 */
export const handleShowMore = () => {
    state.page += 1
    createPreviewsList(state.matches, state.page)
    updateShowMoreButton(state.matches, state.page)
}