export function Landmark(name, latitude, longitude, address, businessStatus, photo,api_id, currentOpeningHours, rating, userRatingCount, websiteUri ){
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.businessStatus = businessStatus;
    this.photo = photo;
    this.api_id = api_id;
    this.currentOpeningHours = currentOpeningHours;
    this.rating = rating;
    this.userRatingCount = userRatingCount;
    this.websiteUri = websiteUri;
}