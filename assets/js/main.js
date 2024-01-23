const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio = $('#audio__elem');
const randomList = $(".random__list");
const otherList = $(".other__list");
const currentSongBlock = $(".current-song");

const randomAmount = 6;




var app = {
    randomPlayList: [],
    otherPlayList: [],
    currentSong: null,

    songs:[
        {
            'id': 10,
            'name': 'sadhj',
            'artists': ['MCK', 'Lope Pham']
        },
        {
            'id': 2,
            'name': 'snids',
            'artists': ['MCK', 'Lope Pham']
        },
        {
            'id': 3,
            'name': 'eqwr',
            'artists': ['MCK', 'WXRDIE', '']
        },
        {
            'id': 4,
            'name': 'erw',
            'artists': ['MCK', 'tlinh']
        },
        {
            'id': 5,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh']
        },
        {
            'id': 6,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh']
        },
        {
            'id': 7,
            'name': 'song 1',
            'artists': ['MCK', 'tlinh']
        },
        {
            'id': 8,
            'name': 'song 1',
            'artists': ['MCK', 'tlinhdsai sadih sdih']
        },
        {
            'id': 9,
            'name': 'song 1',
            'artists': ['MCK', 'Obito']
        },
        {
            'id': 10,
            'name': 'song 1',
            'artists': ['Wean', 'Naomi']
        }
    ],
    

    progressInput: function(item) {
        let sliderValue = item.value;
        item.style.background = `linear-gradient(to right, var(--color-theme) ${sliderValue}%, #ccc ${sliderValue}%)`;
    },

    loadSongs: function(){
        //Random 6 songs
        let count = 0;
        while(count < 6){
            let index = Math.floor(Math.random() * (this.songs.length - 1));
            let song = this.songs[index];
            if(!this.randomPlayList.includes(song)){
                this.randomPlayList.push(song);
                randomList.innerHTML += this.createRandomSong(song);
                count++;
            }   
        }
        this.currentSong = this.randomPlayList[0];
        this.updateCurrentSong()

        // Songs left
        for(let song of this.songs){
            if(!this.randomPlayList.includes(song)){
                this.otherPlayList.push((song));
                otherList.innerHTML += this.createOtherSong(song);
            }
        }
        
    },

    createRandomSong(song){
        return `<div class="col l-6">
        <div class="random-song__wrap">
            <div class="random-song__info">
                <div style="background-image: url('./assets/images/99.jpg');" class="random-song__avt"></div>
                <span class="random-song__name">${song.name}</span>
            </div>
            <i class="btn btn--medium btn--theme btn__play fa-solid fa-circle-play hide"></i>
            <i class="btn btn--medium btn--theme btn__pause fa-solid fa-circle-pause hide"></i>
        </div> 
    </div>`;
    },

    createOtherSong(song){
        return `<div class="col l-3">
        <div class="other-song__wrap">
            <div style="background-image: url('./assets/images/99.jpg');" class="other-song__avt"></div>
            <p class="other-song__name">${song.name}</p>
            <p class="other-song__artists">${song.artists.join(', ')}</p>
            <i class="btn btn--big btn--theme btn__play fa-solid fa-circle-play hide"></i>
            <i class="btn btn--big btn--theme btn__pause fa-solid fa-circle-pause hide"></i>
        </div>
        
    </div>`;
    },
    updateCurrentSong(){
        currentSongBlock.querySelector('.current-song__name').innerText = this.currentSong.name;
        currentSongBlock.querySelector('.current-song__artists').innerText = this.currentSong.artists.join(', ')
    },


    start: function(){
        this.loadSongs();
    }
}

app.start();