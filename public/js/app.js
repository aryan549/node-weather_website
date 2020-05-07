console.log('clint side script is loaded')

// Note: fetach is the client side js method which will not work on server side node js

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
// # is used to select the controls using their id attribute and
// (.) used to select controls using their class attribute

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // this is used to preventing refresh of the page for everytime

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location
    message1.textContent = 'loading...'
    message2.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                message1.textContent = data.error
            } else {
                // console.log(data.forecast)
                // console.log(data.location)
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })


})