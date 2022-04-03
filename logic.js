const host = document.querySelector('#container')
const els = host.children
const sizeSlider = document.querySelector('#array-size')

let arraySize = sizeSlider.value
const PADDING = 4
const EL_MIN_HEIGHT = 20
const EL_MIN_WIDTH = 4
const SHOW_LABEL = true
const SHOW_LABEL_WIDTH = 40

window.addEventListener('load', (e) => {
  resetArray()
})

window.addEventListener('resize', () =>{
  resetArray()
})

sizeSlider.addEventListener('input', (e) => {
  arraySize = e.target.value
  resetArray()
})

const resetArray = () => {
  host.innerHTML = ''
  generateArray()
}

const generateArray = () => {
  const elWidth = (host.clientWidth - PADDING) / arraySize
  const elMaxHeight = host.clientHeight - PADDING * 2
  for (let i = 0; i < arraySize; i++) {
    const el = document.createElement('div')
    const width = Math.max(EL_MIN_WIDTH, (elWidth - PADDING))
    const height = EL_MIN_HEIGHT + Math.floor(Math.random() * (elMaxHeight - EL_MIN_HEIGHT))
    const left = ((elWidth) * i + 8)
    setBarStyle(el, width, height, left)
    // el.style.backgroundColor = 'rgba(255,220,40,' + Number.parseInt(el.style.height) / (elMaxHeight - EL_MIN_HEIGHT) + ')'
    host.append(el)
  }
}

const sort = () => {
  const elMaxHeight = host.clientHeight - PADDING * 2
  let length = els.length
  for (let i = 0; i < length - 1; i++) {
    const elOne = els[i];
    const elTwo = els[i + 1];
    setTimeout(() => {
      if (Number.parseInt(elOne.style.height) > Number.parseInt(elTwo.style.height)) {
        const tempHeight = Number.parseInt(elOne.style.height)
        setBarHeight(elOne, Number.parseInt(elTwo.style.height))
        setBarHeight(elTwo, tempHeight)
      }
    }, 40 * i);
  }
}

const quickSort = () => {
  // quickSortNodesRecursive(els, 0, els.length - 1)
  const heights = Array.from(els).map(el => Number.parseInt(el.style.height))
  console.log(heights)
  quickSortRecursive(heights, 0, heights.length - 1)
  console.log(heights)
  animateHeights(els, heights)
}

const animateHeights = (nodes, heights) => {
  for (let i = 0; i < nodes.length; i++) {
    const bar = nodes[i];
    setTimeout(() => {
      setBarHeight(bar, heights[i])
    }, 40 * i);
  }
}

const setBarHeight = (bar, height) => {
  bar.style.height = height + 'px'
  if (SHOW_LABEL && Number.parseInt(bar.style.width) > SHOW_LABEL_WIDTH) {
    bar.textContent = height
  }
}

const setBarStyle = (bar, width, height, left) => {
  bar.style.width = width + 'px'
  bar.style.height = height + 'px'
  bar.style.left = left + 'px'
  bar.classList.add('bar')
  if (SHOW_LABEL && Number.parseInt(bar.style.width)   > SHOW_LABEL_WIDTH) {
    bar.textContent = height
  }
}

const quickSortRecursive = (arr, lo, hi) => {
  if (lo >= hi || lo < 0) return

  let index = partition(arr, lo, hi)
  quickSortRecursive(arr, lo, index - 1)
  quickSortRecursive(arr, index + 1, hi)
}

const partition = (arr, lo, hi) => {

  let pivot = arr[hi]
  let index = lo - 1

  for (let i = lo; i < hi; i++) {
    if (arr[i] <= pivot) {
      index = index + 1
      let temp = arr[i]
      arr[i] = arr[index]
      arr[index] = temp
    }

  }
  index = index + 1
  let temp = arr[hi]
  arr[hi] = arr[index]
  arr[index] = temp

  return index
}

const quickSortNodesRecursive = (arr, lo, hi) => {
  if (lo >= hi || lo < 0) return

  let index = partitionNodes(arr, lo, hi)
  quickSortNodesRecursive(arr, lo, index - 1)
  quickSortNodesRecursive(arr, index + 1, hi)
}

const partitionNodes = (arr, lo, hi) => {

  let pivot = Number.parseInt(arr[hi].style.height)
  let index = lo - 1

  for (let i = lo; i < hi; i++) {
    if (Number.parseInt(arr[i].style.height) <= pivot) {
      index = index + 1
      let temp = Number.parseInt(arr[i].style.height)
      arr[i].style.height = Number.parseInt(arr[index].style.height) + 'px'
      arr[index].style.height = temp + 'px'
    }

  }
  index = index + 1
  let temp = Number.parseInt(arr[hi].style.height)
  arr[hi].style.height = Number.parseInt(arr[index].style.height) + 'px'
  arr[index].style.height = temp + 'px'

  return index
}
