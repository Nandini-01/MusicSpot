console.log('hello')

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterplay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('song-item'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songname: "Salam-e-Ishq", filePath: "1.mp3", coverpath: "1.jpg" },
    { songname: "ABC", filePath: "2.mp3", coverpath: "2.jpg" },
    { songname: "DEF", filePath: "3.mp3", coverpath: "3.jpg" },
    { songname: "HIJ", filePath: "4.mp3", coverpath: "4.jpg" },
    { songname: "KLM", filePath: "5.mp3", coverpath: "5.jpg" },
    { songname: "NOP", filePath: "6.mp3", coverpath: "6.jpg" },
    { songname: "QRS", filePath: "7.mp3", coverpath: "7.jpg" },
    { songname: "UVW", filePath: "8.mp3", coverpath: "8.jpg" },
    { songname: "XYZ", filePath: "9.mp3", coverpath: "9.jpg" },
    { songname: "ABCDEFGH", filePath: "10.mp3", coverpath: "10.jpg" },
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;
})

// audioElement.play();

//Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause(); 
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    
    //Update myProgressBar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        // console.log(e.target);
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
