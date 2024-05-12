// api.js
export const getAlbumById = async (id) => {
    const url = `https://spotify23.p.rapidapi.com/albums/?ids=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '948543f4e4msh99e06935b769323p1f35fejsnb9f9216a7497',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.albums[0]; 
    } catch (error) {
        console.error('Error al obtener el álbum:', error);
        return null; 
    }
};
