const host = document.querySelector('#container')
const ARRAY_SIZE = 10
const PADDING = 8
const EL_MIN_HEIGHT = 20

window.addEventListener('load', (e) => {
  resetArray()
})

const resetArray = () => {
  host.innerHTML = ''
  generateArray()
}

const generateArray = () => {
  const elWidth = (host.clientWidth - PADDING) / ARRAY_SIZE
  const elMaxHeight = host.clientHeight - PADDING * 2
  for (let i = 0; i < ARRAY_SIZE; i++) {
    const el = document.createElement('div')
    el.style.width = (elWidth - 8) + 'px'
    el.style.height = EL_MIN_HEIGHT + Math.floor(Math.random() * (elMaxHeight - EL_MIN_HEIGHT)) + 'px'
    el.style.left = ((elWidth) * i + 8) + 'px'
    host.append(el)
  }
}