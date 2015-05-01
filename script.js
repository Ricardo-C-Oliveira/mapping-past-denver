 var map = L.map('map', {
     'zoomControl': false,
 }).setView([39.752171, -104.998817], 17);

 //zoom custom position
 L.control.zoom({
     position: 'topright'
 }).addTo(map);

 //the base map
 L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
 }).addTo(map);

 //create the datasets that will hold the layers      
 var dataset1 = new L.layerGroup();
 var dataset2 = new L.layerGroup();
 var dataset3 = new L.layerGroup();

 //JSON request 
 L.geoJson(data1, {
     style: function (feature) {
         return {
             weight: 5,
             color: '#6e7ce8',
             weight: 2,
             opacity: 1,
             dashArray: '3',
             fillOpacity: 0.7,
         };
     },
     onEachFeature: effects,
 }).addTo(dataset1);


 L.geoJson(data2, {
     style: function (feature) {
         return {
             weight: 5,
             color: '#e31424',
             weight: 2,
             opacity: 1,
             dashArray: '3',
             fillOpacity: 0.7,
         };
     },
     onEachFeature: effects,
 }).addTo(dataset2);

 L.geoJson(data3, {
     style: function (feature) {
         return {
             weight: 5,
             color: '#14e324',
             weight: 2,
             opacity: 1,
             dashArray: '3',
             fillOpacity: 0.7,
         };
     },
     onEachFeature: effects,
 }).addTo(dataset3);


 //hover effect and popup effect
 function effects(feature, layer) {
     popupOptions = {
         maxWidth: 200
     };
     if (feature.properties.NAME !== null) {
         layer.bindLabel(feature.properties.NAME, popupOptions, {
             noHide: true
         });
     };
     layer.bindPopup("<b>Name: </b>" + feature.properties.NAME + "<br><b>Description: </b>" + feature.properties.DESCR + "<br><b>Floors: </b>" + feature.properties.FLOORS + "<br><b>Material: </b>" + feature.properties.MATERIAL);
     layer.on({
         click: zoomToFeature
     });
 };


 //zoom to feature
 function zoomToFeature(e) {
     map.fitBounds(e.target.getBounds());
 }

 //group the datasets
 var overlayData = {
     "1887": dataset1,
     "1925": dataset2,
     "1961": dataset3
 };


 //create the layer control
 L.control.layers(overlayData, null, {
     collapsed: false,
     position: 'topleft'
 }).addTo(map);

 var sidebar = L.control.sidebar('sidebar').addTo(map);