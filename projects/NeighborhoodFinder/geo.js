let neighborhoodBounds = geoData.features;

function getNeighborhoodBound(neighborhood) {
  for (let i = 0; i < neighborhoodBounds.length; ++i) {
    if (neighborhoodBounds[i]["properties"]["Name"] === neighborhood) {
      return neighborhoodBounds[i];
    }
  }
  return null;
}

let mbtaGeoJSON = mbtaGeoData.features;
