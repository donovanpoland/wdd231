import { apiKey } from "../../../scripts/api-key.mjs";
import { API_TYPES, incrementCounter } from './api-tracker.mjs';

let map;
let weatherTileLayer;

const defaultLayer = "temp_new";

// Google Map API functionality
function initMap() {
    // Track API usage
    incrementCounter(API_TYPES.GOOGLE_MAPS);

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 39.3210, lng: -111.0937 }, // Center on Utah
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        fullscreenControl: true,
        keyboardShortcuts: false 
    });

    // Initial weather layer
    addWeatherLayer(defaultLayer);

    // Listen for layer selection changes
    const selector = document.getElementById("layer-select");
    selector.addEventListener("change", function () {
        const selectedLayer = this.value;
        updateWeatherLayer(selectedLayer);
    });
}

// Open Weather Map API functionality
function addWeatherLayer(layerName) {
    weatherTileLayer = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            const url = `https://tile.openweathermap.org/map/${layerName}/${zoom}/${coord.x}/${coord.y}.png?appid=${apiKey}`;
            
            // Track tile request (optional)
            trackWeatherTile();

            return url;
        },
        tileSize: new google.maps.Size(256, 256),
        opacity: 1,
        name: "WeatherLayer"
    });

    const timeout = setTimeout(() => {
        map.overlayMapTypes.insertAt(0, weatherTileLayer);
        }, 3000);
}

function updateWeatherLayer(newLayer) {
    // Remove existing layer
    map.overlayMapTypes.removeAt(0);

    // Add new layer - wait 3 seconds before applying layer
    const timeout = setTimeout(() => {
        addWeatherLayer(newLayer);
    }, 3000);
}

function trackWeatherTile() {
    console.log("Tile loaded!");
    incrementCounter(API_TYPES.OPEN_WEATHER_TILE);
}

// Call initMap when the window loads (or with Google Maps API callback)
window.initMap = initMap;
