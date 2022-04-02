const host = document.querySelector('#container')
const els = host.children
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
    // el.style.backgroundColor = 'rgba(255,220,40,' + Number.parseInt(el.style.height) / (elMaxHeight - EL_MIN_HEIGHT) + ')'
    el.classList.add('bar')
    el.textContent = Number.parseInt(el.style.height)
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
        elOne.style.height = Number.parseInt(elTwo.style.height) + 'px'
        elOne.style.backgroundColor = 'rgba(255,220,40,' + Number.parseInt(elTwo.style.height) / (elMaxHeight - EL_MIN_HEIGHT) + ')'
        elOne.textContent = Number.parseInt(elTwo.style.height)
        elTwo.style.height = tempHeight + 'px'
        elTwo.style.backgroundColor = 'rgba(255,220,40,' + tempHeight / (elMaxHeight - EL_MIN_HEIGHT) + ')'
        elTwo.textContent = tempHeight
      }
    }, 20 * i);
  }
}

// procedure bubbleSort(A : list of sortable items)
//     n := length(A)
//     repeat
//         swapped := false
//         for i := 1 to n - 1 inclusive do
//             if A[i - 1] > A[i] then
//                 swap(A[i - 1], A[i])
//                 swapped := true
//             end if
//         end for
//         n := n - 1
//     until not swapped
// end procedure

const quickSort = () => {
  quickSortRecursive(els, 0, els.length - 1)
}

const quickSortRecursive = (arr, lo, hi) => {
  if (lo >= hi || lo < 0) return

  let index = partition(arr, lo, hi)
  quickSortRecursive(arr, lo, index - 1)
  quickSortRecursive(arr, index + 1, hi)
}

const partition = (arr, lo, hi) => {

  let pivot = Number.parseInt(arr[hi].style.height)
  let index = lo - 1

  for (let i = lo; i < hi - 1; i++) {
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


// // Sorts a (portion of an) array, divides it into partitions, then sorts those
// algorithm quicksort(A, lo, hi) is 
//   // Ensure indices are in correct order
//   if lo >= hi || lo < 0 then 
//     return
    
//   // Partition array and get the pivot index
//   p := partition(A, lo, hi) 
      
//   // Sort the two partitions
//   quicksort(A, lo, p - 1) // Left side of pivot
//   quicksort(A, p + 1, hi) // Right side of pivot

// // Divides array into two partitions
// algorithm partition(A, lo, hi) is 
//   pivot := A[hi] // Choose the last element as the pivot

//   // Temporary pivot index
//   i := lo - 1

//   for j := lo to hi - 1 do 
//     // If the current element is less than or equal to the pivot
//     if A[j] <= pivot then 
//       // Move the temporary pivot index forward
//       i := i + 1

//       // Swap the current element with the element at the temporary pivot index
//       swap A[i] with A[j]
//   // Move the pivot element to the correct pivot position (between the smaller and larger elements)
//   i := i + 1
//   swap A[i] with A[hi]
//   return i // the pivot index