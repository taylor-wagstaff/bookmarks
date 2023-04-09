let url_list = []

const button = document.getElementById('run-button')
button.addEventListener('click', () => {
  fetch('/run_code', { method: 'POST' })
    .then((response) => response.text())
    .then((text) => {
      // Remove spaces between letters
      const formattedText = text.replace(/\s/g, '')
      document.getElementById('link').innerHTML = formattedText
      document.getElementById('link').href = formattedText
    })
    .catch((error) => console.error(error))
})

function fetchText() {
  const fetchResponse = fetch('/run_all', { method: 'POST' })
    .then((response) => response.text())
    .then((text) => {
      const href_links = document.getElementById('link_all')
      const lines = text.split('\n')
      url_list.push(lines)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        const link = document.createElement('a')
        link.href = line
        link.innerText = line
        href_links.appendChild(link)
        href_links.appendChild(document.createElement('br'))
      }
    })
    .catch((error) => console.error(error))
}

// https://flexiple.com/javascript/javascript-clock/
// how to make a javascript clock.
function currentTime() {
  let date = new Date()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  let session = 'AM'

  if (hh > 12) {
    session = 'PM'
  }

  hh = hh < 10 ? '0' + hh : hh
  mm = mm < 10 ? '0' + mm : mm
  ss = ss < 10 ? '0' + ss : ss

  let time = hh + ':' + mm + ':' + ss + ' ' + session

  document.getElementById('clock').innerText = time
  var t = setTimeout(function () {
    currentTime()
  }, 1000)
}

currentTime()

// Search bookmarks..
// How To: Build A Simple Search Bar in JavaScript by Adriana DiPietro
// https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf

// I havent actually seen this done in vinilla js, only react.

const searchInput = document.querySelector('.input')
searchInput.addEventListener('input', (e) => {
  let value = e.target.value

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase()

    fetch('/run_all', { method: 'POST' })
      .then((response) => response.text())
      .then((text) => {
        // here I used ai, got really confused, realised it was a string,
        // so needed to split to turn into an array, then i could filter
        const urls = text.split('\n').map((url) => url.trim())
        const filteredUrls = urls.filter((url) => {
          return url.includes(value)
        })
        setList(filteredUrls)
      })
  } else {
    clearList()
  }
})

const clearButton = document.getElementById('clear')

clearButton.addEventListener('click', () => {
  clearList()
})

function clearList() {
  // looping through each child of the search results list and remove each child
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

function noResults() {
  // create an element for the error; a list item ("li")
  const error = document.createElement('li')
  // adding a class name of "error-message" to our error element
  error.classList.add('error-message')

  // creating text for our element
  const text = document.createTextNode('No results found. Sorry!')
  // appending the text to our element
  error.appendChild(text)
  // appending the error to our list element
  list.appendChild(error)
}

// creating and declaring a function called "setList"
// setList takes in a param of "results"
function setList(results) {
  clearList()
  for (const x of results) {
    const resultItem = document.createElement('a')
    resultItem.classList.add('result-item')
    const text = document.createTextNode(x)
    resultItem.appendChild(text)
    resultItem.href = x
    const listItem = document.createElement('li')
    listItem.appendChild(resultItem)
    list.appendChild(listItem)
  }

  if (results.length === 0) {
    noResults()
  }
}
