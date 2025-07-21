const lyrics = document.querySelector(".lyrics-song");
const showMoreBtn = document.querySelector(".show-more");
let isExpanded = false;
var apiSongs = 'http://localhost:3000/songs';
var imageFirst  = document.querySelector('#main-image');
var nameSong = document.querySelector('#main-title');
var info_author = document.querySelector('#main-info-author');
var recommended = document.querySelector('#recommended-list');
var footer_author = document.querySelector('#footer-author');
var footer_title = document.querySelector('#footer-title');
var footer_image = document.querySelector('#footer-image');
var btnPlay = document.querySelector('.btn-toggle-play');
var audio = document.querySelector('#audio')
var btnPlayHeader = document.querySelector('.btn-header-play');

showMoreBtn.onclick = () => {
  isExpanded = !isExpanded;
  if (isExpanded) {
    lyrics.style.webkitLineClamp = "unset";
    lyrics.style.overflow = "visible";
    showMoreBtn.textContent = "Show less";
  } else {
    lyrics.style.webkitLineClamp = "6";
    lyrics.style.overflow = "hidden";
    showMoreBtn.textContent = "...Show more";
  }
};

///  lấy thông tin bài hát

app = {

songs : [],
currentIndex : 0 ,
isPlay : false ,
  // render 
renderApi : function()
{ 
  fetch(apiSongs)
    .then(function(response)
    {
      return response.json();
    })
    .then((data)=>
    {
      this.songs = data;
      this.renderFirstSong();
      this.renderRecommend();
      this.footerSong();
    })
   

},
// render bài hat đầu tiên lên đầu 
renderFirstSong : function()
{
   const song = this.songs[this.currentIndex];
  //  console.log(song);
  imageFirst.src = song.image;
  nameSong.innerHTML = song.name ;
  info_author.innerHTML = `
  <li>${song.name}</li>
  <li>${song.author}</li>
  `
  lyrics.innerHTML = song.lyrics;
  audio.src = song.audio;


},
renderRecommend: function () {
  const list = document.getElementById("recommended-list");
  const html = this.songs
    .map((song) => {
      return `
      <div class="song-rcm" >
      <div class="info-song-rcm">
        <div class="image-song-rcm">
          <img src="${song.image}" alt="" />
        </div>
        <div class="name-song-rcm">
          <h4>${song.name}</h4>
          <p>${song.author}</p>
        </div>
      </div>
      <div class="quantity"><p>25,000,000</p></div>
      <div class="time-song">4:22</div>
    </div>
      `
       
      ;
    })
    .join("");

  list.innerHTML = html;
},
footerSong : function()
{
  const song = this.songs[this.currentIndex];
  footer_author.innerHTML= song.author;
  footer_image.src = song.image;
  footer_title.innerHTML = song.name

},
// sự kiện các nút nhấn 

handleEvent : function()
{
  const _this = this;
  function togglePlay() {
    _this.isPlay = !_this.isPlay;

    if (_this.isPlay) {
      btnPlay.classList.add("active");
      btnPlayHeader.classList.add("active");
      audio.play();
    } else {
      btnPlay.classList.remove("active");
      btnPlayHeader.classList.remove("active");
      audio.pause();
    }
  }
  btnPlayHeader.onclick = togglePlay;
  btnPlay.onclick = togglePlay;
},
// lấy bài hát đầu tiên hiển thị lên 
defineProperties : function()
{
  Object.defineProperty(this,"currentSong",{
    get : function()
    {
      return this.songs[this.currentIndex];
    }
  })
},
start : function()
{
   this.renderApi();
   this.handleEvent();
}
  
}

app.start();