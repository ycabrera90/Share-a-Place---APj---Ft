import { Map } from './UI/Map';

class LoadedPlace {
    constructor(coordinates, address) {
        const map = new Map();
        const headerTitleEl = document.querySelector('header h1');
        headerTitleEl.textContent = address;
        map.render(coordinates);
    }
}

const url = new URL(location.href);
const queryParmams = url.searchParams;
const coords = {
    lat: +queryParmams.get('lat'), // el signo mas es solo para comveritir a numero
    lng: +queryParmams.get('lng'),
};
const address = queryParmams.get('address');
new LoadedPlace(coords, address);
