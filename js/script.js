
console.log("welcome to spotify");

let songIndex=0;
let audioElement= new Audio('songs/2.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems =Array.from( document.getElementsByClassName("songItem"));
let songInfoName=document.getElementById('songInfoName');
let leftSong=document.getElementById('leftSong');
let rightSong=document.getElementById('rightSong');
let currentSongIndex=0;
let songs = [
    {songName: "Do Pal Ruka Lyrics in Hindi from Veer Zaara movie.", filePath: "songs/1.mp3" , coverPath: "img/cover1.jpg" },
    {songName: "টাপুর টুপুর বৃষ্টি নুপুর,  জল ছবিরই গায়  তুই যে আমার একলা আকাশ মেঠো সুর", filePath: "songs/2.mp3" , coverPath: "img/cover2.jpg" },
    {songName: "Naam Na Jana Pakhi Lyrics (নাম না জানা পাখি) Arijit Singh", filePath: "songs/3.mp3" , coverPath: "img/cover3.jpg" },
    {songName: "Radha Lyrics (রাধা) Asur", filePath: "songs/4.mp3" , coverPath: "img/cover4.jpg" },
    {songName: "Har Ghadi Badal Rahi Hai Roop Zindagi / हर घडी बदल रही है रूप ", filePath: "songs/5.mp3" , coverPath: "img/cover5.jpg" },
    {songName: "Jhiri Jhiri Swapna Jhore Lyrics (ঝিরি ঝিরি স্বপ্ন ঝরে)", filePath: "songs/6.mp3" , coverPath: "img/cover6.jpg" }
]
//trimming song names
songs.forEach((ele)=>{
    if(ele.songName.length>20) ele.songName=ele.songName.substring(0,20);
})
//for playing 1st time
audioElement= new Audio(songs[currentSongIndex].filePath);
songInfoName.innerText=songs[currentSongIndex].songName;

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

//audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    var currentSongItem=document.getElementById(currentSongIndex);
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        //handle song item in list
        currentSongItem.classList.remove('fa-circle-play');
        currentSongItem.classList.add('fa-circle-pause');

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        //handle song item in list
        currentSongItem.classList.add('fa-circle-play');
        currentSongItem.classList.remove('fa-circle-pause');
    }
    updateProgressBar();
})
//listen events
myProgressBar.addEventListener('input',()=>{
    audioElement.pause();
    audioElement.currentTime=parseInt((myProgressBar.value/100) * audioElement.duration);
    audioElement.play();
})

function updateProgressBar(){
    audioElement.addEventListener('timeupdate',()=>{
        //update seekbar when it is not active
            console.log(audioElement.currentTime);
            progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
            myProgressBar.value=progress;
    })
}
/*
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration /100;
    audioElement.play();
})*/

const makeAllPlays =()=>{
    let ele=document.getElementById(currentSongIndex);
    ele.classList.remove('fa-circle-pause');
    ele.classList.add('fa-circle-play');
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        if(i==currentSongIndex)
        {
            if(audioElement.paused)
            {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity=1;

            }
            else
            {
                e.target.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                audioElement.pause();
                masterPlay.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                gif.style.opacity=0;

            }
            updateProgressBar();
            
        }
        else
        {
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.pause();
            audioElement=new Audio(songs[i].filePath);
            

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
            songInfoName.innerText=songs[i].songName;
            currentSongIndex=i;
            audioElement.play();
            updateProgressBar();
        }
        
    })
})
//if song compleated then play next song
audioElement.onended=function(){
    songForward();
}

//handle left right button
leftSong.addEventListener("click",()=>{
    songBackward();
})
rightSong.addEventListener("click",()=>{
    songForward();
})
function songBackward()
{
    if(currentSongIndex<=0)
    {
        alert("no song before this");
    }
    else
    {
            makeAllPlays();
            audioElement.pause();
            currentSongIndex--;
            let ele=document.getElementById(currentSongIndex);
            ele.classList.remove('fa-circle-play');
            ele.classList.add('fa-circle-pause');
            audioElement=new Audio(songs[currentSongIndex].filePath);
            audioElement.currentTime=0;
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
            songInfoName.innerText=songs[currentSongIndex].songName;
            myProgressBar.value=0;
            updateProgressBar();
        

    }

}
function songForward()
{
    if(currentSongIndex>=songs.length-1)
    {
        alert("no song after this");
    }
    else
    {
            makeAllPlays();
            audioElement.pause();
            currentSongIndex++;
            let ele=document.getElementById(currentSongIndex);
            ele.classList.remove('fa-circle-play');
            ele.classList.add('fa-circle-pause');
            audioElement=new Audio(songs[currentSongIndex].filePath);
            //audioElement.currentTime=0;
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
            songInfoName.innerText=songs[currentSongIndex].songName;
            myProgressBar.value=0;
            updateProgressBar();
    }

}

