import {
    BOOKS_PER_PAGE,
    authors,
    genres,
    books,
    html,
    RGBValues,
  } from "./modules/data.js";
  import {
    createDropdownMenuPopulator,
    setThemeColors,
    createPreviewFragment,
    displayBooks,
    bookFiltering,
  } from "./modules/helpers.js";
  import "./components/book-preview.js"
  
  // Data
  
  /**
   * The variable will be used to store matches of
   * current filter settings from the books object.
   * @type {Array}
   */
  let matches = books;
  
  /**
   * This variable will be used to as the current page of
   * books being display and will increment by 1.
   * @type {number}
   */
  let page = 1;
  
  let startIndex = (page - 1) * BOOKS_PER_PAGE;
  let endIndex = BOOKS_PER_PAGE;
  
  /**
   * range variable will be used to extract a certain number of books that
   * will be displayed on webpage using array slice method
   */
  let range = [startIndex, endIndex];
  
  // Error Checking
  if (!books && !Array.isArray(books)) {
    throw new Error("Source required");
  }
  
  if (!range && range.length < 2) {
    throw new Error("Range must be an array with two numbers");
  }
  
  /**
   * This function is used to populate the drop down lists of
   * genres and authors.
   * @type {function }
   */
  
  const genreMenu = createDropdownMenuPopulator()
  genreMenu(genres, "Genres", html.search.genre)
  const authorMenu = createDropdownMenuPopulator()
  authorMenu(authors, "Authors", html.search.author)
  /**
   * This will check for a preference of dark in the css . 
   * If there is then the theme settings will updated using the {@link setThemeColors} function
   * */
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    html.settings.theme.value = "night";
    setThemeColors("night");
  } else {
    html.settings.theme.value = "day";
    setThemeColors("day");
  }
  
  // EVENT HANDLERS
  
  /**
   * This event handler will fire when the user changes value of dropdown in settings and clicks on the "Save" button.
   * It can toggle between a light mode and dark mode so that a user can use the app comfortably at night.
   * @param {Event} event
   */
  
  const toggleLightAndDarkModeHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
  
    document.documentElement.style.setProperty('--color-dark', RGBValues[theme].dark);
    document.documentElement.style.setProperty('--color-light', RGBValues[theme].light);
    html.settings.overlay.open = false;
  };
  
  html.list.item.appendChild(createPreviewFragment(matches, range));
  displayBooks(matches, page);
  
  /**
   * This handler will fire when a user clicks on the "Show More" button.
   * The page number will increase by 1 and new book items will be appended to the webpage.
   * The new book items will now be able to be clicked on to view the book overlay
   * and the "show more" button showing the number of items left will be updated
   */
  const showMoreBooksHandler = () => {
    page = page + 1;
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];
  
    html.list.item.appendChild(createPreviewFragment(matches, range));
    
  
    displayBooks(matches, page);
  };
  
  /**
   * This event handler will fire when a user clicks on the "search button".
   * The form overlay will appear allowing user to filter books by genre, author or title
   */
  const openSearchOverlayHandler = () => {
    html.search.overlay.open = true;
    html.search.title.focus();
  };
  /**
   * This event handler will fire when a user clicks on the "cancel" button in the search overlay
   */
  const closeSearchOverlayHandler = () => {
    html.search.overlay.open = false;
  };
  
  /**
   * This event handler will fire when a user clicks on the "settings" button.
   * The form overlay will appear allowing the user to toggle between the dark and light mode
   */
  const openSettingsOverlayHandler = () => {
    html.settings.overlay.open = true;
  };
  
  /**
   * This event handler will fire when a user clicks on the "cancel" button in the settings overlay
   */
  const closeSettingsOverlayHandler = () => {
    html.settings.overlay.open = flase;
  };
  
  
  /**
   * This handler will fire when a user clicks on submit button of the search overlay.
   * When the user manipulates the input fields of Title, genre or author so that it can
   * be filtered to the books they desire, the filtered books will then be shown on the webpage
   * @param {Event} event
   */
  
  const filterSubmissionHandler = (event) => {
    html.search.overlay.open = false;
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const selectedGenre = filters.genre;
    const selectedAuthor = filters.author;
    const selectedTitle = filters.title;
  
  
    matches = bookFiltering(books, selectedTitle, selectedGenre, selectedAuthor)
  
  
    if (matches.length === 0) {
      html.list.message.style.display = "block";
    } else {
      html.list.message.style.display = "none";
    }
  
    page = 1;
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];
    html.list.button.disabled = false;
  
    html.list.item.innerHTML = "";
    html.list.item.appendChild(createPreviewFragment(matches, range));
    
  
    displayBooks(matches, page);
    html.search.form.reset();
  };
  
  
  
  
  // EVENT LISTENERS
  
  html.other.search.addEventListener("click", openSearchOverlayHandler);
  
  html.search.cancel.addEventListener("click", closeSearchOverlayHandler);
  
  html.other.settings.addEventListener("click", openSettingsOverlayHandler);
  
  html.settings.cancel.addEventListener("click", closeSettingsOverlayHandler);
  
  html.settings.form.addEventListener("submit", toggleLightAndDarkModeHandler);
  
  html.list.button.addEventListener("click", showMoreBooksHandler);
  
  html.search.form.addEventListener("submit", filterSubmissionHandler);
  
  