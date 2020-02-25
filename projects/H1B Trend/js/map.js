let map = L.map("map").setView([0,0], 3);

let countryData = {
  "India": { "students": 247927, "latlong": [22.8857821183, 79.6119761026] },
  "China": { "students": 36362, "latlong": [36.56176546, 103.81907349] },
  "Phillipines": { "students": 3161, "latlong": [11.77536778, 122.88393253] },
  "South Korea": { "students": 3203, "latlong": [36.38523983, 127.83916086] },
  "Canada": { "students": 3551, "latlong": [61.36206324, -98.30777028] },
  "Taiwan": { "students": 2200, "latlong": [23.7539928, 120.95427281] },
  "Mexico": { "students": 2239, "latlong": [23.94753724, -102.52345169] },
  "UK": { "students": 1783, "latlong": [54.12387156, -2.86563164] },
  "Pakistan": { "students": 1536, "latlong": [29.9497515, 69.33957937] },
  "France": { "students": 1474, "latlong": [46.3329658, 2.2868515] },
  "Brazil": { "students": 1517, "latlong": [-10.78777702, -53.09783113] },
  "Nepal": { "students": 1249, "latlong": [28.24891365, 83.9158264] },
  "Japan": { "students": 1077, "latlong": [37.59230135, 138.0308956] },
  "Turkey": { "students": 1177, "latlong": [39.0616029, 35.16895346] },
  "Germany": { "students": 1127, "latlong": [51.10698181, 10.38578051] },
  "Iran": { "students": 1332, "latlong": [32.57503292, 54.27407004] },
  "Russia": { "students": 948, "latlong": [61.98052209, 96.68656112] },
  "Venezuela": { "students": 873, "latlong": [7.12422421, -66.18184123] },
  "Spain": { "students": 861, "latlong": [40.24448698, -3.64755047] }
};

let scale = 5;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 15,
  minZoom: 2,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZGR1cGxhbnQiLCJhIjoiY2p5MzU5Y2FpMHcyMjNicTh1c3Jqbzl1dyJ9.u02VQdp7VPZCOMT-RYn-VA'
  }).addTo(map);

for (country in countryData) {
  L.circle(countryData[country]["latlong"], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: countryData[country]["students"] * scale,
    }).addTo(map);
  var marker = L.marker(countryData[country]["latlong"]).addTo(map);
  marker.bindPopup(`<b>No. of petitions:</b> ${countryData[country]["students"]} <b>Country:</b> ${country}`).openPopup();
  marker.on('mouseover', function (e) {
    this.openPopup();
  });
  marker.on('mouseout', function (e) {
      this.closePopup();
});
}
