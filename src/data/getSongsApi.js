export const getSongs = async (url) => {
    try {
        const response = await fetch(url);
        const songs = await response.json();
        return songs;
    } catch (error) {
        console.log(error.message);
        return [];
    }
};
