function autocomplete(input, latInput, lngInput) {
  if (!input) return; //skip the function fro running

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();
    // latInput.value = place.geometry.location.lat();
    // lngInput.value = place.geometry.location.lng();
    console.log(place);
  });
}

export default autocomplete;
