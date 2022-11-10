
const mapa = document.getElementById("mapaPuntos")
const map = L.map('mapaPuntos').setView([-34.60362913561667, -58.38158515467938], 10);
const locationSelector = document.getElementById("loc");


const mapPath=document.getElementsByTagName("path");

mapLink =
    '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors'
    }).addTo(map);

const getData= async() => {
    const responseLocations = await fetch('./data/get_locations.json');
    const dataLocations = await responseLocations.json();
    locations=dataLocations.features;
    console.log(locations)

    const getBarrio= (nameBarrio) => locations.filter(location => location.properties.barrio.includes(nameBarrio))

    const locationsCABA= getBarrio("CABA");
    const markerOptionsCABA = customizeMarkerStyle();
    const locationsProvincia = getBarrio("provincia");
    const markerOptionsProvincia =customizeMarkerStyle2();

    function customizeMarkerStyle(){
        return{
            radius: 9,
            fillColor:'#8e1f30',
            color:'black',
            weight:1.2,
            opacity:1,
            fillOpacity: 0.8,
        }
    }
    function customizeMarkerStyle2(){
        return{
            radius: 9,
            fillColor:'#e4a82f',
            color:'black',
            weight:1.2,
            opacity:1,
            fillOpacity: 0.8,
        }
    }

    function onEachFeature(feature, layer){
        if (feature.properties && feature.properties.local){
            layer.bindPopup(feature.properties.local)
        }
    }


    function showGeoJson(barrio, marker) {
        L.geoJSON(barrio, {
            pointToLayer: function (feature, latlng){
                return L.circleMarker(latlng, marker);
            },
            onEachFeature
        })
            .addTo(map)
    }

    locationSelector.addEventListener('change', (e) => {
        let rutaMostrada=[];
        if (e.target.value === 'CABA'){
            Array.from(mapPath).forEach(path => path.remove())
            rutaMostrada = [locationsCABA, markerOptionsCABA]

        } else if (e.target.value==="provincia"){

            Array.from(mapPath).forEach(path => path.remove())
            rutaMostrada = [locationsProvincia, markerOptionsProvincia]
        } else if (e.target.value==="all"){
            Array.from(mapPath).forEach(path => path.remove())
            showGeoJson(locationsCABA, markerOptionsCABA);
            showGeoJson(locationsProvincia, markerOptionsProvincia)
        } else {
            Array.from(mapPath).forEach(path => path.remove())
        }
        const [barrio, markerOptions] = rutaMostrada;
        showGeoJson(barrio, markerOptions);
    })
}

getData();

