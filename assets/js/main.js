const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio = $('#audio__elem');
const randomList = $(".random__list");
const otherList = $(".other__list");
const currentSongBlock = $(".current-song");
const playbar = $('.playbar__nav')
const randomAmount = 6;

const playBtn = $('#play--main');
const pauseBtn = $('#pause--main');
const progress = $('.input__progress');
const volumeProgress = $('.volumne__amount');
const currentTime = $('.time--current');
const duration = $('.time--total');
const backBtn = $('#back');
const nextBtn = $('#next');
const volume = $('.volumne__amount');
const shuffle = $('#shuffle');
const loop = $('#loop');
const mute = $('#mute');
const unmute = $('#unmute');


var app = {
    randomPlayList: [],
    otherPlayList: [],
    currentSong: null,
    currentIndex: 0,
    isPlaying: false,
    currentPlayList: '',
    isShuffle: false,
    isLooped: false,
    volumeAmount: 1,

    songs:[
        {
            'id': 10,
            'name': 'Đánh đổi',
            'artists': ['Obito', 'MCK'],
            'audio-source': './assets/mp3/DanhDoi.mp3'
        },
        {
            'id': 2,
            'name': 'Anh Da On Hon',
            'artists': ['MCK'],
            'audio-source': './assets/mp3/AnhDaOnHon.mp3'
        },
        {
            'id': 3,
            'name': 'Buon Hay Vui',
            'artists': ['VSOUL', 'MCK', 'Obito', 'Ronboongz'],
            'audio-source': './assets/mp3/BuonHayVui.mp3'
        },
        {
            'id': 4,
            'name': 'Diu anh luon giu kin trong tym',
            'artists': ['MCK', 'tlinh'],
            'audio-source': './assets/mp3/AnhDaOnHon.mp3'
        },
        {
            'id': 5,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh'],
            'audio-source': './assets/mp3/AnhDaOnHon.mp3'
        },
        {
            'id': 6,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh'],
            'audio-source': './assets/mp3/AnhDaOnHon.mp3'
        },
        {
            'id': 7,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh'],
            'audio-source': './assets/mp3/AnhDaOnHon.mp3'
        },
        {
            'id': 8,
            'name': 'song 1',
            'artists': ['MCK', 'tlinhdsai sadih sdih'],
            'audio-source': './assets/mp3/DanhDoi.mp3'
        },
        {
            'id': 9,
            'name': 'song 1',
            'artists': ['MCK', 'Obito'],
            'audio-source': './assets/mp3/DanhDoi.mp3'
        },
        {
            'id': 10,
            'name': 'song 1',
            'artists': ['Wean', 'Naomi'],
            'audio-source': './assets/mp3/DanhDoi.mp3'
        }
    ],
    

    progressInput: function(item) {
        let sliderValue = item.value;
        item.style.background = `linear-gradient(to right, var(--color-theme) ${sliderValue}%, #4d4d4d ${sliderValue}%)`;
    },

    playSong: function(song, self){ 
        if(song == this.currentSong){
            return;
        }

         //Reset playing song
        let playingSong = $('.playing');
        if(playingSong){
            playingSong.classList.remove('playing');
        }   

        
        this.currentSong = song;
        this.isPlaying = true;

        playbar.classList.toggle('playing', this.isPlaying);
        self.querySelector('div').classList.toggle('playing', this.isPlaying);

        if(this.randomPlayList.includes(song)){
            this.currentPlayList = 'random';
            this.currentIndex = this.randomPlayList.indexOf(song);
        }
        else{
            this.currentPlayList = 'other';
            this.currentIndex = this.otherPlayList.indexOf(song);
        }

       
        this.updateCurrentSong();
        audio.src = song['audio-source'];
        audio.play();
    },
    loadSongs: function(){
        //Random 6 songs
        let count = 0;
        while(count < 6){
            let index = Math.floor(Math.random() * (this.songs.length - 1));
            let song = this.songs[index];
            if(!this.randomPlayList.includes(song)){
                this.randomPlayList.push(song);
                randomList.appendChild(this.createRandomSong(song));
                count++;
            }   
        }

        

        this.currentSong = this.randomPlayList[0];
        this.currentPlayList = 'random';
        this.currentIndex = 0;
        this.updateCurrentSong();
        audio.src = this.randomPlayList[0]['audio-source'];

        volume.style.background = `linear-gradient(to right, var(--color-theme) ${1000}%, #4d4d4d ${100}%)`;

        // Songs left
        for(let song of this.songs){
            if(!this.randomPlayList.includes(song)){
                this.otherPlayList.push((song));
                otherList.appendChild(this.createOtherSong(song))
            }
        }
    },

    createRandomSong: function(song){
        const _this = this;

        let element = document.createElement('div');
        element.classList.add('col', 'l-6');
        element.onclick = function(){ _this.playSong(song, element);};

        element.innerHTML += `
        <div class="random-song__wrap playable">
            <div class="random-song__info">
                <div style="background-image: url('./assets/images/99.jpg');" class="random-song__avt"></div>
                <span class="random-song__name">${song.name}</span>
            </div>
            <i class="btn btn--medium btn--theme btn__play fa-solid fa-circle-play hide"></i>
            <i class="btn btn--small btn--theme btn__pause fa-solid fa-chart-simple hide"></i>
        </div> 
    `;

        return element;
    },

    createOtherSong: function(song){
        const _this = this;

        let element = document.createElement('div');
        element.classList.add('col', 'l-3');
        element.onclick = function(){ _this.playSong(song, element);};

        element.innerHTML += `
        <div class="other-song__wrap playable">
            <div style="background-image: url('./assets/images/99.jpg');" class="other-song__avt"></div>
            <p class="other-song__name">${song.name}</p>
            <p class="other-song__artists">${song.artists.join(', ')}</p>
            <i class="btn btn--big btn--theme btn__play fa-solid fa-circle-play hide"></i>
            <i class="btn btn--medium btn--theme btn__pause fa-solid fa-chart-simple hide"></i>
        </div>    
    `   

        return element;
    //     return `<div class="col l-3">
    //     <div class="other-song__wrap playable" onclick="">
    //         <div style="background-image: url('./assets/images/99.jpg');" class="other-song__avt"></div>
    //         <p class="other-song__name">${song.name}</p>
    //         <p class="other-song__artists">${song.artists.join(', ')}</p>
    //         <i class="btn btn--big btn--theme btn__play fa-solid fa-circle-play hide"></i>
    //         <i class="btn btn--big btn--theme btn__pause fa-solid fa-circle-pause hide"></i>
    //     </div>
        
    // </div>`;
    },

    updateCurrentSong: function(){
        currentSongBlock.querySelector('.current-song__name').innerText = this.currentSong.name;
        currentSongBlock.querySelector('.current-song__artists').innerText = this.currentSong.artists.join(', ');
        $('.play-song__name').innerText = this.currentSong.name;
        $('.play-song__artists').innerText = this.currentSong.artists.join(', ');
    },

    handleEvents: function(){
        let _this = this;

        //Play
        playBtn.onclick = function(){
            _this.isPlaying = true;
            playbar.classList.toggle('playing');

            var elem;
            if(_this.currentPlayList == 'random'){
                elem = $$('.random-song__wrap')[_this.currentIndex];
               
            }
            else{
                elem = $$('.other-song__wrap')[_this.currentIndex];
            }
            if(!elem.classList.contains('playing')){
                elem.classList.add('playing');
            }
            audio.play()
        }

        //Pause
        pauseBtn.onclick = function(){
            this.isPlaying = false;
            playbar.classList.toggle('playing');
            audio.pause()
        }

        //Audio

        audio.ontimeupdate = function(){
            progress.value = Math.floor(audio.currentTime);
            progress.max = Math.floor(audio.duration);

            let secondCurrent = Math.floor(audio.currentTime) % 60;
            let minuteCurrent = Math.floor(Math.floor(audio.currentTime) / 60);
            let secondLeft = (Math.floor(audio.duration) - Math.floor(audio.currentTime)) % 60;
            let minuteLeft = Math.floor((Math.floor(audio.duration) - Math.floor(audio.currentTime)) / 60);

            let currentDuration, durationLeft;
            
            currentDuration = secondCurrent < 10 ? `${minuteCurrent}:0${secondCurrent}` : `${minuteCurrent}:${secondCurrent}`;
            durationLeft = secondLeft < 10 ? `-${minuteLeft}:0${secondLeft}` : `-${minuteLeft}:${secondLeft}`;

            currentTime.innerText = currentDuration;
            duration.innerText = durationLeft;
            progress.style.background = `linear-gradient(to right, var(--color-theme) ${progress.value / progress.max * 100}%, #4d4d4d ${progress.value / progress.max * 100}%)`;
        }

       

        audio.onended = function(){
            if(_this.isLooped){
                audio.currentTime = 0;
                _this.playByIndexChange(0, false);
                audio.play();
            }
            else{
                _this.playByIndexChange(1);
            }
        }

        //Back
        backBtn.onclick = function(){
           _this.playByIndexChange(-1);
        }

        //Next
        nextBtn.onclick = function(){
           _this.playByIndexChange(1);
        }

        // Shuffle
        shuffle.onclick = function(){
            _this.isShuffle = !_this.isShuffle;
            shuffle.classList.toggle('active');
        }

        // Loop
        loop.onclick = function(){
            loop.classList.toggle('active');
            _this.isLooped = !_this.isLooped;
        }

        progress.oninput = function(){
            let sliderValue = progress.value;
            progress.style.background = `linear-gradient(to right, var(--color-theme) ${sliderValue}%, #4d4d4d ${sliderValue}%)`;
            audio.currentTime = progress.value;
        }

        // progress.onchange = function(){
        //     audio.currentTime = progress.value;
        //     console.log(progress.value);
        // }

        volume.oninput = function(){
            let sliderValue = volume.value;
            volume.style.background = `linear-gradient(to right, var(--color-theme) ${sliderValue}%, #4d4d4d ${sliderValue}%)`;
        }

        mute.onclick = function(){
            audio.volume = 0;
            $('.playbar__volumne').classList.add('mute');
            volumeProgress.value = 0;
            volumeProgress.style.background = `linear-gradient(to right, var(--color-theme) ${0}%, #4d4d4d ${0}%)`;
        }

        unmute.onclick = function(){
            audio.volume = _this.volumeAmount;
            $('.playbar__volumne').classList.remove('mute');
            volumeProgress.value = _this.volumeAmount * 100;
            volumeProgress.style.background = `linear-gradient(to right, var(--color-theme) ${_this.volumeAmount * 100}%, #4d4d4d ${_this.volumeAmount * 100}%)`;
        }

        volumeProgress.onchange = function(){
           
            audio.volume = volumeProgress.value / 100;

            if(volumeProgress.value == 0){
                if(!$('.playbar__volumne').classList.contains('mute')){
                    $('.playbar__volumne').classList.add('mute');
                }
            }
            else{
                _this.volumeAmount = volumeProgress.value / 100;
                if($('.playbar__volumne').classList.contains('mute')){
                    $('.playbar__volumne').classList.remove('mute');
                }         
            }
        }
    },

    randomSong: function(){
        let oldIndex = this.currentIndex;
        while(this.currentIndex == oldIndex){
            if(this.currentPlayList == 'random'){
                this.currentIndex = Math.floor(Math.random() * (this.randomPlayList.length - 1));
            }
            else{
                this.currentIndex = Math.floor(Math.random() * (this.otherPlayList.length - 1));
            }
        }
    },
    playByIndexChange: function(change, useShuffle = true){
        if(this.isShuffle && useShuffle){
            this.randomSong();
        }
        else{
            this.currentIndex += change;
        }

        if(this.currentPlayList == 'random'){
            if(this.currentIndex >= this.randomPlayList.length){
                this.currentIndex = 0;
            }
            else if(this.currentIndex < 0){
                this.currentIndex = this.randomPlayList.length - 1;
            }
            this.playSong(this.randomPlayList[this.currentIndex], randomList.querySelectorAll('.l-6')[this.currentIndex]);
        }
        else{
            if(this.currentIndex >= this.otherPlayList.length){
                this.currentIndex = 0;
            }
            else if(this.currentIndex < 0){
                this.currentIndex = this.otherPlayList.length - 1;
            }
            this.playSong(this.otherPlayList[this.currentIndex], otherList.querySelectorAll('.l-3')[this.currentIndex]);
        }
    },
   

    start: function(){
        this.loadSongs();
        
        //Handle events
        this.handleEvents();
       
    }
}

app.start();