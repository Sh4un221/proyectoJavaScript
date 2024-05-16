import { getAlbumById } from "../helper.js";
import { createTrackCard } from "./trackLogic.js";

export function searchInAlbums(searchTerm) {
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

export function createAlbumCard(albumData) {
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

export async function loadAlbums() {
    const albumSection = document.getElementById("albumSection");
    const albumIds = ["7AJPV0L05IyIBid97AvwVD", "4Hjqdhj5rh816i1dfcUEaM", "4yP0hdKOZPNshxUOjY0cZj", "4G2rJNhsKOE6iHgtUqZ0Ye", "0Lg1uZvI312TPqxNWShFXL", "0JzdeLGqbDXPBlDbV4Y0c3", "2Auw0pTT6EcQdvHNimhLQI"];


    const albumData = await getAlbumById(albumIds);
    if (albumData) {
        const card = createAlbumCard(albumData);
        albumSection.querySelector(".cardsbox").appendChild(card);
    } else {
        console.error(`No se pudo obtener el álbum con el ID: ${albumIds}`);
    }

    if(window.innerWidth > 900){
        let firstAlbum = document.querySelectorAll('.card')[0];
        firstAlbum.click()
        console.log(firstAlbum);
    }


}