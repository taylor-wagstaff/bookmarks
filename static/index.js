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

// move away mouse img
// Chat-gpt
var img = document.getElementById('my-image')
var bodyRect = document.body.getBoundingClientRect()
var elemRect = img.getBoundingClientRect()
var offsetX = elemRect.left - bodyRect.left
var offsetY = elemRect.top - bodyRect.top

// Set the initial position of the image to the center of the window
var centerX = window.innerWidth / 2 - img.offsetWidth / 2
var centerY = window.innerHeight / 2 - img.offsetHeight / 2
img.style.left = centerX + 'px'
img.style.top = centerY + 'px'

document.addEventListener('mousemove', function (event) {
  var mouseX = event.clientX - offsetX
  var mouseY = event.clientY - offsetY
  var distX = mouseX - (img.offsetLeft + img.offsetWidth / 2)
  var distY = mouseY - (img.offsetTop + img.offsetHeight / 2)
  var dist = Math.sqrt(distX * distX + distY * distY)
  var maxDist = 100 // adjust this value to change the maximum distance

  if (dist < maxDist) {
    var newX = img.offsetLeft - (distX / dist) * (maxDist - dist)
    var newY = img.offsetTop - (distY / dist) * (maxDist - dist)

    // Make sure the image stays within the boundaries of the window
    newX = Math.max(0, Math.min(newX, window.innerWidth - img.offsetWidth))
    newY = Math.max(0, Math.min(newY, window.innerHeight - img.offsetHeight))

    img.style.left = newX + 'px'
    img.style.top = newY + 'px'
  }
})

img.addEventListener('mousedown', function (event) {
  event.preventDefault()
})
