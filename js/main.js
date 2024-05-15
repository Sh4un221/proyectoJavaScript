import {
    getAlbumById,
    getTrackRecommendations
} from './module/spotify.js';

async function loadAlbums() {
    const albumSection = document.getElementById("albumSection");
    const albumIds = ["7AJPV0L05IyIBid97AvwVD", "4Hjqdhj5rh816i1dfcUEaM", "4yP0hdKOZPNshxUOjY0cZj", "4G2rJNhsKOE6iHgtUqZ0Ye", "0Lg1uZvI312TPqxNWShFXL", "0JzdeLGqbDXPBlDbV4Y0c3", "2Auw0pTT6EcQdvHNimhLQI"];


    const albumData = await getAlbumById(albumIds);
    if (albumData) {
        const card = createAlbumCard(albumData);
        albumSection.querySelector(".cardsbox").appendChild(card);
    } else {
        console.error(`No se pudo obtener el álbum con el ID: ${albumIds}`);
    }

}
async function putTrackRecommendation() {
    let trackData = await getTrackRecommendations()
    const tracksRecomendationContainer = document.querySelector(".track_recommendations_box");
    tracksRecomendationContainer.innerHTML = "";
    trackData.forEach(track => {
        let parseAge = track.album.release_date.split("-");
        const albumImage = track.album.images[0].url;
        const dataRelease = parseAge[0]
        const trackCard = createTrackCard(track, albumImage, dataRelease);
        tracksRecomendationContainer.appendChild(trackCard);
    });

   

}
await putTrackRecommendation()
loadAlbums();

function createAlbumCard(albumData) {
    const fragment = document.createDocumentFragment()
    albumData.forEach(album => {

        let parseAge = album.release_date.split("-");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = album.images[0].url;
        img.alt = album.name;
        card.appendChild(img);

        const name = document.createElement("p");
        name.classList.add("sname");
        name.textContent = album.name;
        card.appendChild(name);

        const artist = document.createElement("p");
        artist.classList.add("autor__age");
        artist.textContent = `${album.artists[0].name} ${parseAge[0]}`;
        card.appendChild(artist);

        card.dataset.albumId = album.id;

        card.addEventListener("click", () => handleAlbumClick(card.dataset.albumId));
        fragment.appendChild(card);

        async function handleAlbumClick(albumId) {
            const albumFrame = document.querySelector("my-frame");
            albumFrame.setAttribute("uri", `spotify:album:${albumId}`);


            if (albumData) {

                const tracksContainer = document.querySelector(".tracks__container");
                tracksContainer.innerHTML = "";
                const albumImage = album.images[0].url;
                const dataRelease = parseAge[0]
                for (const track of album.tracks.items) {
                    const trackCard = createTrackCard(track, albumImage, dataRelease);
                    tracksContainer.appendChild(trackCard);
                }
            }
            else {
                console.error(`No se pudo obtener la lista de canciones del álbum ${album.name}`);
            }

        }

    });


    return fragment;
}


function createTrackCard(track, albumImage, dataRelease) {
    const trackCard = document.createElement("div");
    trackCard.classList.add("track__card");

    const img = document.createElement("img");
    img.src = albumImage;
    img.alt = track.name;
    trackCard.appendChild(img);

    const info1 = document.createElement("div");
    info1.classList.add("info1");
    const trackName = document.createElement("p");
    trackName.classList.add("aname3");
    trackName.textContent = track.name;
    const trackArtists = document.createElement("p");
    trackArtists.classList.add("autor__age3");
    trackArtists.textContent = track.artists.map(artist => artist.name).join(", ");
    info1.appendChild(trackName);
    info1.appendChild(trackArtists);
    trackCard.appendChild(info1);

    const info2 = document.createElement("div");
    info2.classList.add("info2");
    const duration = document.createElement("p");
    duration.classList.add("time");
    duration.textContent = msToMinutesSeconds(track.duration_ms);
    const releaseYear = document.createElement("p");
    releaseYear.classList.add("year");
    releaseYear.textContent = dataRelease
    info2.appendChild(duration);
    info2.appendChild(releaseYear);
    trackCard.appendChild(info2);

    return trackCard;
}

function msToMinutesSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}
document.addEventListener("DOMContentLoaded", function () {
    const btnAlbumView = document.querySelector(".album__view");
    btnAlbumView.click();
});

class Myframe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const uri = this.getAttribute("uri");
        if (uri) {
            this.render(uri);
        }
    }

    render(uri) {
        const id = uri.split(":").pop();
        this.shadowRoot.innerHTML = `
            <iframe class="spotify-iframe" width="100%" height="99%" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        `;
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "uri") {
            this.render(newVal);
        }
    }
}

customElements.define("my-frame", Myframe);

document.addEventListener("DOMContentLoaded", function () {
    const btnAlbumView = document.querySelector(".album__view");
    const btnTrackView = document.querySelector(".track__view");
    const btnMediaView = document.querySelector(".media__view");

    const sectionAlbums = document.querySelector(".section__1");
    const sectionMedia = document.querySelector(".section__2");
    const sectionTrackList = document.querySelector(".section__3");

    btnAlbumView.addEventListener("click", function () {
        sectionAlbums.style.display = "flex";
        sectionMedia.style.display = "none";
        sectionTrackList.style.display = "none";
    });

    btnTrackView.addEventListener("click", function () {
        sectionAlbums.style.display = "none";
        sectionMedia.style.display = "none";
        sectionTrackList.style.display = "flex";
    });

    btnMediaView.addEventListener("click", function () {
        sectionAlbums.style.display = "none";
        sectionMedia.style.display = "flex";
        sectionTrackList.style.display = "none";
    });



});


function detectView() {

    const btnAlbumView = document.querySelector(".album__view");
    const btnTrackView = document.querySelector(".track__view");
    const btnMediaView = document.querySelector(".media__view");

    const sectionAlbums = document.querySelector(".section__1");
    const sectionMedia = document.querySelector(".section__2");
    const sectionTrackList = document.querySelector(".section__3");

    if (window.innerWidth <= 900) {

        console.log("Movile view");
        sectionAlbums.style.display = "flex";
        sectionMedia.style.display = "none";
        sectionTrackList.style.display = "none";

    }
    else {
        console.log("Desktop view");
        sectionAlbums.style.display = "flex";
        sectionMedia.style.display = "block";
        sectionTrackList.style.display = "flex";
    }
}

window.onresize = detectView;

function searchInAlbums(searchTerm) {
    const cards = document.querySelectorAll('.cardsbox .card');
    cards.forEach(card => {
        const name = card.querySelector('.sname').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchInTracks(searchTerm) {
    const tracks = document.querySelectorAll('.tracks__container .track__card');
    tracks.forEach(track => {
        const name = track.querySelector('.aname3').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            track.style.display = 'flex';
        } else {
            track.style.display = 'none';
        }
    });
}

document.querySelector('.section__1 .search-header__input').addEventListener('input', function (event) {
    searchInAlbums(event.target.value);
});

document.querySelector('.section__3 .search-header__input').addEventListener('input', function (event) {
    searchInTracks(event.target.value);
});
