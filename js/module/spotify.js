// api.js
export const getAlbumById = async (id) => {
    const url = `https://spotify23.p.rapidapi.com/albums/?ids=${id}`;
    const options = {
        method: 'GET',
        params:{
            ids: `${id}`
        },
        headers: {
            'X-RapidAPI-Key': 'b53fe08de5msh5e06288c92eff31p17c73ajsnfcc575b6d297',
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
