const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

let i = 0

// Musics
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnigh, Dico Queen',
        artist: 'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

let playing = false

playBtn.addEventListener('click', playSong )
// play and pause function
function playSong(){
    if(playing == false){
    music.play()
    playing = true;
    // isplayng will change the icon
    isPlaying()
    }else{
        music.pause()
        playing = false
        isPlaying()
    }
}

// will check and trade the icon depending if the song is pause ou runing
function isPlaying(){
    if(playing ==true){
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        // will change the tittle play to tittle pause
        playBtn.setAttribute('title', 'Pause')
    }else{
        playBtn.classList.add('fa-play')
        playBtn.classList.remove('fa-pause')
        playBtn.setAttribute('title', 'Play')
    }
}

//  Update Music DOM
function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}



// event listners for buttons
nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)



function nextSong(){
    i++
    if(i > songs.length -1){
        i = 0
        loadSong(songs[i])

        // make that when you go to next the playing be false so the fa icon will be the play one
        playing = false
        isPlaying()
    }else{
        loadSong(songs[i])
        playing = false
        isPlaying()
    
    }
}

function prevSong(){
    if(i <=0){
        i = 0
    }else{
    i--
    loadSong(songs[i])
    playing = false
    isPlaying()
    }
}

//changing the mouse hover if the i = 0 so cant prev
function prevBtnBlocked(){
    if(i == 0){
        prevBtn.style.cursor='not-allowed'
        prevBtn.style.hover = ''
    }else{
        prevBtn.style.cursor='pointer'
    }
}

setInterval(prevBtnBlocked,30)

// on load - select first song
loadSong(songs[i])


// progress bar timeupdate run 4 times in a second
// https://www.w3schools.com/tags/ref_av_dom.asp
music.addEventListener('timeupdate', updateProgressBar)

// updating progressbar & time https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
function updateProgressBar(event){
    if(isPlaying){
        const {duration, currentTime} = event.srcElement;
        // update progress bar width
        const progressPercent = (currentTime/duration) *100
        progress.style.width = `${progressPercent}%`

        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds <10){
            durationSeconds =`0${durationSeconds}`
        }
        

        // delay switching duration element to avoid Nan
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime%60)
        if(currentSeconds <10){
            currentSeconds =`0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// click in the bar to change music time
progressContainer.addEventListener('click', setProgressBar)

function setProgressBar(event){
    // client width take the with of the bar
    const width = this.clientWidth
    
    // offsetX is where we click in the clientWidth bar
    const clickX = event.offsetX
    const{duration} = music
    music.currentTime = (clickX/width) * duration
}

// making go to next music when end the song
music.addEventListener('ended', nextSong)