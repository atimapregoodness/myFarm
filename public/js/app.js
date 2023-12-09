// const viewBtn = document.querySelector('#viewBtn')

// const info = document.querySelector('#info')

// viewBtn.addEventListener('click', () => {
//       info.classList.toggle('show')
      
// })

const promptMsg = document.querySelector('.promptMsg')
const promptDelete = document.querySelector('#promptDelete')
const declineBtn = document.querySelector('#declineBtn')

promptDelete.addEventListener('click', () => {
      promptMsg.classList = 'promptShow'
})

declineBtn.addEventListener('click', () => {
      promptMsg.classList = 'promptMsg'
})