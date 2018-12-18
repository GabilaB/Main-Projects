import axios from "axios";
import { $ } from "./bling";

const mapOptions = {
  center: { lat: 43.2, lng: -79.8 },
  zoom: 2
};

function loadPlaces(map, lat = 43.2, lng = -79.8) {
  axios.get(`/api/stores/near?lat=${lat}&lng=${lng}`).then(res => {
    const places = res.data;
    if (!places.length) {
      alert("no places found!");
      return;
    }

    //create a bounds

    const bounds = new google.map.LatLngBounds();
    const infoWindow = new google.map.InfoWindow();

    const markers = places.map(place => {
      const [placeLng, PlaceLat] = place.location.coordinates;
      const position = { lat: PlaceLat, lng: placeLng };
      bounds.extend(position);
      const marker = new google.map.Marker({ map, position });
      marker.place = place;
      return marker;
    });

    //If clicks on markers, show the details of that place
    markers.foreach(marker =>
      marker.addListener("click", function() {
        const html = `
        <div class="popup">
            <a href"/store/${this.place.slug}">
                <img src="/uploads/${this.place.photo || "store.png"} alt="${
          this.place.name
        }" />
                <p>${this.place.name} - ${this.place.location.address}</p>
            </a>
        </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, this);
      })
    );

    //zoom map to fit all markers
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  });
}

function makeMap(mapDiv) {
  if (!mapDiv) return;

  //make the mao
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);

  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    loadPlaces(
      map,
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
  });
}

export default makeMap;
