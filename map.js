//popup and sidebar
function onEachFeature(feature, layer) {
    //popup
    if (feature.properties && feature.properties.AGENCY) {
        layer.bindPopup(`
<h3>${feature.properties.AGENCY}</h3>
<p>${feature.properties.JOB}</p>
<p>${feature.properties.DATES}</p>
`);
    }

    //sidebar interactivity
    layer.on({
        click: function populate() {
            
            document.getElementById("side-agency").innerHTML = `${feature.properties.AGENCY}`;
            document.getElementById("side-jobtitle").innerHTML = `${feature.properties.JOB}`;
            document.getElementById("side-description").innerHTML = `${feature.properties.JOBTXT}`;
            document.getElementById("side-logo").src = `${feature.properties.LOGO}`;
        }
    })

}


//Basemap tile layer
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

//importing my layer from AGOL and differentiating the point style based on Work or School
var points = L.esri.featureLayer({
    url: 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/BrianKneesMapResume/FeatureServer/0?token=sDERHq631mUt5Ajl_DvCzOZPxpDAh39BWlayX6t8dk4ZdKxszfPIKzaMmqyE0IAhpoq685LxAu0m68RQQx1V6DEvCtNa3c-yztFLuTUT2dqnhOykQo_SdrYA93FRcGX8090w_nnZKWyJsWesctN63cZvEnZ6L2E5umnIlRPLJt9GUnd-DY0g0fUiqErq9qHSRShEgpTe-_sZqhN1Zf5VSTWSe0UYADppog948enTJ9ONbzfOb9NP7w5BiYYe5vH3ly7hDD5qJO2kabX19DUdUQ..',
    pointToLayer: function (geojson, latlng) {
        return L.marker(latlng, {
            icon: pointicons[geojson.properties.TYPE]
        });
    },
    onEachFeature: onEachFeature,
});


// Setting Maximum Bounds
var southWest = L.latLng(20, -138.5),
    northEast = L.latLng(53, -55.5),
    bounds = L.latLngBounds(southWest, northEast);

//center of map as well as basemap and featurelayer
var map = L.map('map', {
    center: [43, -118.5],
    zoom: 7,
    layers: [CartoDB_DarkMatter, points],
    maxZoom: 11,
    minZoom: 5,
    maxBounds: bounds,
});

//changing icons
var pointicons = {
    Work: L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Location_dot_purple.svg/1024px-Location_dot_purple.svg.png',
        iconSize: [15, 15]
    }),
    School: L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dot_yellow_ff4.svg/1024px-Dot_yellow_ff4.svg.png',
        iconSize: [15, 15],
    })
};
