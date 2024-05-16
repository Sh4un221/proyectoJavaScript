export function detectView() {

    const sectionAlbums = document.querySelector(".section__1");
    const sectionMedia = document.querySelector(".section__2");
    const sectionTrackList = document.querySelector(".section__3");
   
    if (window.innerWidth <= 900) {

        console.log("Movile view");
        sectionAlbums.style.display = "flex";
        sectionMedia.style.display = "none";
        console.log(sectionAlbums);

        sectionTrackList.style.display = "none";
        btnAlbumView.click();
    }
    else {
        console.log("Desktop view");
        console.log(sectionAlbums);

        sectionAlbums.style.display = "flex";
        sectionMedia.style.display = "block";
        sectionTrackList.style.display = "flex";
    }
   
}
