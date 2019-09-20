const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const btnStart = document.querySelector('.start-game')
const score = document.querySelector('.score')

let lastHole = null
let isPlaying = false
let counter = 0

// console.log({holes, moles})

const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

// console.log(randomTime(200, 1000))

const randomHole = holes => {
    let id = Math.floor(Math.random() * holes.length)
    const hole = holes[id];
    
    
    if(hole == lastHole) {
        return randomHole(holes)
    }
    
    lastHole = hole
    return hole
}
const showMole = () => {
    const time = randomTime(200, 1000)
    const hole = randomHole(holes)

    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up')
        if(isPlaying) showMole()
    }, time)
}

btnStart.addEventListener('click', () => {
    counter=0
    score.innerText = counter
    if (!isPlaying) {
        isPlaying = !isPlaying
        showMole()  

        setTimeout(()=>{
            isPlaying = !isPlaying
        }, 10000)
    }
})

function bonk(e){

    console.log(e)

    if (!e.isTrusted) return

    counter++
    this.parentNode.classList.remove('up')

    score.innerText = counter
}

moles.forEach((mole, index)=>{
    // console.log({mole, index})
    mole.addEventListener('click', bonk)
})

