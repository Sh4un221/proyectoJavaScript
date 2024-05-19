// api.js
export const getAlbumById = async (id) => {
    const url = `https://spotify23.p.rapidapi.com/albums/?ids=${id}`;
    const options = {
        method: 'GET',
        params: {
            ids: `${id}`
        },
        headers: {
            'X-RapidAPI-Key': '2bae3b21c1msh20c5157d8b0370ap18f26fjsn7807f8a7965f',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.albums
    } catch (error) {
        console.error('Error al obtener el álbum:', error);
        return null;
    }
};
export const getTrackRecommendations = async () => {
    const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2bae3b21c1msh20c5157d8b0370ap18f26fjsn7807f8a7965f',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.tracks
    } catch (error) {
        console.error(error);
        return null
    }
}