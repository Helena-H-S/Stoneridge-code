var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Erinevad kategooriad ja värvid
var categories = {
    "Scania": { color: "green", locations: [] },
    "Volvo": { color: "orange", locations: [] },
    "Renault": { color: "Turquoise", locations: [] }, 
    "Volvo Group": { color: "black", locations: [] }, 
    "MAN": { color: "blue", locations: [] },
    "Ford": { color: "violet", locations: [] },
    "Daimler": { color: "purple", locations: [] },
    "DAF": { color: "brown", locations: [] },
    "Stoneridge": { color: "red", locations: [] }
};

// Klientide ja tehaste asukohad
var clientLocations = {
    "Scania": [
        ["Oskarshamn", 57.2654, 16.4474],
        ["Södertälje", 59.1955, 17.6252],
        ["Opglabbeek", 51.0402, 5.5910],
        ["Antwerp", 51.2194, 4.4025],
        ["Hasselt", 50.9307, 5.3325],
        ["Krakow", 50.0497, 19.9449],
    ],
    "Volvo": [
        ["Gent", 51.05, 3.7167],
        ["Tuve", 57.7485, 11.8954],
        ["Boras", 57.7210, 12.9401],
        ["Wacol", -27.5833, 152.9333],
        ["Curitiba", -25.4809, -49.3044],
        ["Ohio", 40.4173, -82.9071],
        ["Dublin", 37.7022, -121.9358],
        ["Radford", 37.1318, -80.5764],
        ["Byhalia", 34.8720, -89.6906],
        ["Memphis", 35.1495, -90.0490],
        ["Greensboro", 36.0726, -79.7920],
        ["Bangalore", 12.9716, 77.5946],
        ["Göteborg", 57.7089, 11.9746],
        ["Samutprakarn", 13.5993, 100.5998],
        ["Singapore", 1.3521, 103.8198],
        ["Wroclaw", 51.1079, 17.0385],
    ],
    "Renault": [
      ["Blainville", 49.1542, 1.5684],
      ["Venissieux", 45.6983, 4.8869],
      ["Saint-Priest Cedex", 45.6915, 4.9413],
      ["BOURG-EN-BRESSE", 46.2052, 5.2258],
  ],
  "Volvo Group": [
      ["Nevers", 46.9909, 3.1628],
      ["Macungie", 40.5755, -75.5617],
      ["Panevezys", 55.7333, 24.3500],
      ["Quebec", 46.8139, -71.2082],
      ["Ovar", 40.8610, -8.6261],
  ],
  "MAN": [
      ["München", 48.1351, 11.5820],
      ["Steyr", 48.0408, 14.4213],
      ["Starachowice", 51.0375, 21.0703],
      ["Salzgitter", 52.1538, 10.4153],
      ["Krakow", 50.0497, 19.9449],
      ["Ankara", 39.9334, 32.8597],
  ],
  "Ford": [
      ["Budapest", 47.4979, 19.0402],
      ["Kansas City", 39.0997, -94.5786],
      ["Inonu - Eskisehir", 39.7843, 30.5192],
      ["Köln", 50.9375, 6.9603],
      ["Craiova", 44.3302, 23.7949],
      ["Bridgend", 51.5075, -3.5775],
      ["Valencia", 39.4699, -0.3763],
      ["Daventry", 52.2569, -1.1607],
      ["Ecorse", 42.2431, -83.1455],
      ["Essex", 51.5742, 0.4857],
      ["KOELN-NEIHL", 50.9766, 6.9581],
  ],
  "Daimler": [
      ["Germersheim", 49.2203, 8.3643],
      ["Nýřany", 49.6853, 13.2178],
      ["Neu-Ulm", 48.3928, 10.0112],
      ["Samano", 43.3522, -3.2074],
  ],
  "DAF": [
      ["Eindhoven", 51.4416, 5.4697],
      ["Ponta Grossa", -25.0953, -50.1619],
  ],
};

// Tehaste asukohad (näide Stoneridge jaoks)
var factoryLocations = {
    "Stoneridge": [
        ["Juarez", 31.6904, -106.4245],
        ["El Paso", 31.7619, -106.4850],
        ["Lexington", 40.6782, -82.5861],
        ["Novi", 42.4801, -83.4755],
        ["Manaus", -3.1190, -60.0217],
        ["Campinas", -22.9071, -47.0633],
        ["Solna", 59.3600, 18.0006],
        ["Tallinn", 59.4370, 24.7536],
        ["Barneveld", 52.1389, 5.5951],
        ["Dundee", 56.4620, -2.9707],
        ["Bayonne", 43.4924, -1.4744],
        ["Örebro", 59.2753, 15.2134],
        ["Esslingen", 48.7418, 9.3101],
        ["Suzhou", 31.2988, 120.5853],
    ],
};

// Lisa markerid kaardile vastavalt kategooriatele
function addMarkers(category, locations) {
  for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var marker = L.circleMarker([location[1], location[2]], {
          color: categories[category].color,
          fillColor: categories[category].color,
          fillOpacity: 0.5,
          radius: 5
      }).addTo(map);

      // Lisa hüpikaken koos "Back to World" lingiga
      marker.bindPopup("<b>" + location[0] + "</b><br>" +
          "<a href='#' class='back-to-world'>Back to World</a>");

      // Lisa sündmuskuulaja markerile, et suumida sisse
      marker.on('click', function(e) {
          map.flyTo(e.target.getLatLng(), 8, { duration: 2 }); // Suumige asukoha lähedale, kuid mitte liiga lähedale
      });

      categories[category].locations.push(marker);
  }
}

// Lisa sündmuskuulaja "Back to World" nupu jaoks
map.on('popupopen', function(event) {
  var popup = event.popup;
  var backButton = popup._contentNode.querySelector('.back-to-world');
  if (backButton) {
      backButton.addEventListener('click', function(e) {
          e.preventDefault();
          map.flyTo([20, 0], 2, { duration: 2 }); // Suumige tagasi suurele kaardivaatele
          map.closePopup(); // Sulgege hüpikaken
      });
  }
});

// Lisa kõik asukohad kaardile
for (var category in clientLocations) {
  addMarkers(category, clientLocations[category]);
}
for (var category in factoryLocations) {
  addMarkers(category, factoryLocations[category]);
}

// Filtreerimisfunktsioon
function filterMarkers(category, show) {
  var locations = categories[category].locations;
  locations.forEach(function(marker) {
      if (show) {
          map.addLayer(marker);
      } else {
          map.removeLayer(marker);
      }
  });
}

function setupFilterListener(filterId, category) {
  var checkbox = document.getElementById(filterId);
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      filterMarkers(category, this.checked);
    });
  }
}

setupFilterListener('filter-scania', 'Scania');
setupFilterListener('filter-volvo', 'Volvo');
setupFilterListener('filter-renault', 'Renault');
setupFilterListener('filter-volvo-group', 'Volvo Group');
setupFilterListener('filter-man', 'MAN');
setupFilterListener('filter-ford', 'Ford');
setupFilterListener('filter-daimler', 'Daimler');
setupFilterListener('filter-daf', 'DAF');


// Kuulaja tehaste filtrile
document.getElementById('filter-factories').addEventListener('change', function() {
  filterMarkers("Stoneridge", this.checked);
});

// Lisa kõik asukohad kaardile (alglaadimisel)
for (var category in clientLocations) {
  addMarkers(category, clientLocations[category]);
}
for (var category in factoryLocations) {
  addMarkers(category, factoryLocations[category]);
}

// "Clear" nupu funktsionaalsus
document.getElementById('clear-filters').addEventListener('click', function() {
  // Eemalda kõik markerid kaardilt
  for (var category in categories) {
      filterMarkers(category, false);
  }

  // Lülita kõik filtrid välja
  document.querySelectorAll('.filters input[type="checkbox"]').forEach(function(checkbox) {
      checkbox.checked = false;
  });
});
