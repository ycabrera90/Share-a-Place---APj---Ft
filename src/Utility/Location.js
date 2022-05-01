const GOOGLE_APY_KEY = 'AIzaSyBv_GCwKqDGT7mUxF4bZ9fUsgc26S8PuHI';

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address); // se codifica el string para que pueda pasar por la url
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_APY_KEY}`
    );
    if (!response.ok) {
        throw new Error('Fail to fetch coordinates. Please try again!');
    }
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

export async function getAddressFromCoords(coords) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_APY_KEY}`
    );

    if (!response.ok) {
        throw new Error('Fail to fetch address. Please try again!');
    }
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;
    return address;
}
