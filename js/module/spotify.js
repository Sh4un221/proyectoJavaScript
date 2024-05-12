// api.js
export const getAlbumById = async (id) => {
    const url = `https://spotify23.p.rapidapi.com/albums/?ids=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7736c806f9msh3281aecc3685b0cp13ef77jsnaffa073fbabb',
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
