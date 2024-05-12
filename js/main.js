import { getAlbumById } from './module/spotify.js'; 

async function loadAlbums() {
    const albumSection = document.getElementById("albumSection");
    const albumIds = ["7AJPV0L05IyIBid97AvwVD", "4Hjqdhj5rh816i1dfcUEaM", "4yP0hdKOZPNshxUOjY0cZj", "4G2rJNhsKOE6iHgtUqZ0Ye"]; 
    
    for (const albumId of albumIds) {
        const albumData = await getAlbumById(albumId);
        if (albumData) {
            const card = createAlbumCard(albumData);
            albumSection.querySelector(".cardsbox").appendChild(card); 
        } else {
            console.error(`No se pudo obtener el álbum con el ID: ${albumId}`);
        }
    }
}

loadAlbums();

function createAlbumCard(albumData) {
    let parseAge = albumData.release_date.split("-");

    const card = document.createElement("div");
    card.classList.add("card");
    
    const img = document.createElement("img");
    img.src = albumData.images[0].url;
    img.alt = albumData.name;
    card.appendChild(img);
    
    const name = document.createElement("p");
    name.classList.add("sname");
    name.textContent = albumData.name;
    card.appendChild(name);
    
    const artist = document.createElement("p");
    artist.classList.add("autor__age");
    artist.textContent = `${albumData.artists[0].name} ${parseAge[0]}`;
    card.appendChild(artist);

    card.dataset.albumId = albumData.id;

    card.addEventListener("click", () => handleAlbumClick(card.dataset.albumId));
    
    return card;
}

async function handleAlbumClick(albumId) {
    const albumFrame = document.getElementById("albumFrame");
    albumFrame.setAttribute("uri", `spotify:album:${albumId}`);

    const albumData = await getAlbumById(albumId);
    if (albumData && albumData.tracks && albumData.tracks.items.length > 0) {
        const tracksContainer = document.querySelector(".tracks__container");
        tracksContainer.innerHTML = ""; 
        const albumImage = albumData.images[0].url; 
        const dataRelease=albumData.parseAge
        for (const track of albumData.tracks.items) { 
            const trackCard = createTrackCard(track, albumImage,dataRelease); 
            tracksContainer.appendChild(trackCard);
        }
    } else {
        console.error(`No se pudo obtener la lista de canciones del álbum con el ID: ${albumId}`);
    }
}

function createTrackCard(track, albumImage,dataRelease) {
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
