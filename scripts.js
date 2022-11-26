/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */
const bookmarks = [{"id":"N5POThxNOpcsgxzB","label":"Sites","bookmarks":[{"id":"LnUln294GKASKvhx","label":"Typer","url":"https://monkeytype.com/"},{"id":"a2nL67QQMXQvsHCx","label":"Themes","url":"https://rosepinetheme.com/palette"},{"id":"eftYDNzaLvRuHXRH","label":"Reddit","url":"https://www.reddit.com/"},{"id":"AQMw44Oj3BAqfB2s","label":"Hoogle","url":"https://hoogle.haskell.org/"}]},{"id":"oirfdD0qTSkk271t","label":"Git","bookmarks":[{"id":"IuAIqbv9j7zURfOB","label":"git/main","url":"https://github.com/Uwo-ua"},{"id":"Vv6p2lhkA14YaFw6","label":"git/htyper","url":"https://github.com/Simon-Hostettler/htyper"},{"id":"B7Li9W3YFQH8CDeB","label":"git/nvimlsp","url":"https://github.com/Uwo-ua/nvim-lspconfig"},{"id":"k6W7uspbweMSp9B4","label":"git/doomemacs","url":"https://github.com/doomemacs/doomemacs"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
