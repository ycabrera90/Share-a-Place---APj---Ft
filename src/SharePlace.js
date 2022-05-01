import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const localUserButton = document.querySelector('#locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        this.modal = new Modal(
            'loading-modal-content',
            'Loading location - please wait!'
        );

        addressForm.addEventListener(
            'submit',
            this.addressFormHandler.bind(this)
        );

        localUserButton.addEventListener(
            'click',
            this.locateUserHandler.bind(this)
        );

        this.shareBtn.addEventListener(
            'click',
            this.sharePlaceHandler.bind(this)
        );
    }

    sharePlaceHandler() {
        const sharedLinkInputElement = document.getElementById('share-link');
        if (!navigator.clipboard) {
            sharedLinkInputElement.select();
            return;
        }
        navigator.clipboard
            .writeText(sharedLinkInputElement.value)
            .then(() => {
                alert('Copied into clipboard!');
            })
            .catch((error) => {
                console.log(error);
                sharedLinkInputElement.select();
            });
    }

    async addressFormHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().leng === 0) {
            alert('Invalid address entered - Please try again');
            return;
        }
        this.modal.show();
        try {
            const coodinates = await getCoordsFromAddress(address);
            this.selectPlace(coodinates, address);
        } catch (error) {
            alert(error);
        }
        this.modal.hide();
    }

    selectPlace(coordinates, address) {
        if (this.googleMaps) {
            this.googleMaps.render(coordinates);
        } else {
            this.googleMaps = new Map();
            this.googleMaps.render(coordinates);
        }

        //
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${
            location.origin
        }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
            coordinates.lng
        }`;
    }

    locateUserHandler() {
        // chequeamos que el navegador sea lo suficientemente moderno para soportar esta opcion
        if (!navigator.geolocation) {
            alert(
                'Location feature in not available in your browser - please use a more moderm browser or enter manually'
            );
            return;
        }

        this.modal.show();
        navigator.geolocation.getCurrentPosition(
            async (positionCallBack) => {
                const coordinates = {
                    lat: positionCallBack.coords.latitude,
                    lng: positionCallBack.coords.longitude,
                };
                const address = await getAddressFromCoords(coordinates);
                console.log(address);
                this.modal.hide();
                this.selectPlace(coordinates, address);
            },
            (positionErrorCallback) => {
                this.modal.hide();
                alert(
                    'Could not locate you unfortunately. Please enter an address manually'
                );
            }
        );
    }
}

const placeFinder = new PlaceFinder();
