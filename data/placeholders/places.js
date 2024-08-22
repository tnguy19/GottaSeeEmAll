export const placeholders = [
    { imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' },
    { imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' },
    {imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' }
];

export class Place {
    constructor(title, imageUri, location) {
        this.name = title;
        this.imageUri = imageUri;
        this.address = location.address; //human-readable address
        this.location = {latitude: location.latitude, longitude: location.longitude}; // {lat: 0.2, lng: 0.3}
        this.id = new Date().toString() + Math.random().toString();
    }
}