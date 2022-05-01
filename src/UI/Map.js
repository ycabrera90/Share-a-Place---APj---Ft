export class Map {
    constructor() {}

    render(coord) {
        if (!google) {
            console.log('Could not load maps library - please try again');
            return;
        }

        const mapElement = document.getElementById('map');
        const mapConfig = {
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 16,
        };

        const map = new google.maps.Map(mapElement, mapConfig);

        new google.maps.Marker({
            position: { lat: coord.lat, lng: coord.lng },
            map: map,
        });
    }
}
