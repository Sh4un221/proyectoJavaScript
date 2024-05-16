import { msToMinutesSeconds } from "../helper.js";
import { getTrackRecommendations } from "../services/spotify.js";

export async function putTrackRecommendation() {
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

export function createTrackCard(track, albumImage, dataRelease) {
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

export function searchInTracks(searchTerm) {
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
