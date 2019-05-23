window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature-section');

  const temperatureSpan = document.querySelector('.temperature-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = `${proxy}https://api.darksky.net/forecast/15fe3e62ac4f3c66dbd60e77d43f6675/${lat},${long}`;

      fetch(api)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
          //   console.log(data);
          const { temperature, summary, icon } = data.currently;

          // SETTING DOM ELEMENTS FROM API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //FORMULA FOR CELCIUS

          let celcius = (temperature - 32) * (5 / 9);

          // SET ICONS

          setIcons(icon, document.querySelector('.icon'));

          // FARENHEIT TO CELCIUS
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent =
      'Hey, you need to enable your geolocation to get your Temp!';
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
