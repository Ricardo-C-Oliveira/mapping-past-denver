L.mapbox.accessToken = 'pk.eyJ1IjoiZGFya3ZlbmdlcnMiLCJhIjoidFQyQi15ayJ9.0ImOfSMr3xjHj9W1Ilbo1g';

var southWest = L.latLng(39.747856, -106.003864),
  northEast = L.latLng(39.757304, -104.992214),
  bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  'zoomControl': false,
  'minZoom': 17,
  //'maxZoom': 5,
  'maxBounds': bounds
}).setView([39.752171, -105.000500], 17);

var layer = L.mapbox.tileLayer('darkvengers.48d79adc').addTo(map);
//zoom custom position
L.control.zoom({
  position: 'topright'
}).addTo(map);

//slider to set opacity
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');
var slider3 = document.getElementById('slider3');

noUiSlider.create(slider1, {
  start: [0.7],
  connect: 'lower',
  range: {
    'min': [0.1],
    'max': [1]
  }
});
noUiSlider.create(slider2, {
  start: [0.7],
  connect: 'lower',
  range: {
    'min': [0.1],
    'max': [1]
  }
});
noUiSlider.create(slider3, {
  start: [0.7],
  connect: 'lower',
  range: {
    'min': [0.1],
    'max': [1]
  }
});
noUiSlider.create(slider4, {
  start: [0.7],
  connect: 'lower',
  range: {
    'min': [0.1],
    'max': [1]
  }
});

function style1(feature) {
  return {
    weight: 5,
    fillColor: '#FF9900',
    color: '#c37a0b',
    weight: 2,
    opacity: 1,
    fillOpacity: slider1.noUiSlider.get(),
    dashArray: 3,
  };
};

function style2(feature) {
  return {
    weight: 5,
    fillColor: '#003300',
    color: '#0e280e',
    weight: 2,
    opacity: 1,
    fillOpacity: slider2.noUiSlider.get(),
    dashArray: 3,
  };
};

function style3(feature) {
  return {
    weight: 5,
    fillColor: '#0000FF',
    color: '#171795',
    weight: 2,
    opacity: 1,
    fillOpacity: slider3.noUiSlider.get(),
    dashArray: 3,
  };
};

function style4(feature) {
  return {
    weight: 5,
    fillColor: '#6f146e',
    color: '#240526',
    weight: 2,
    opacity: 1,
    fillOpacity: slider4.noUiSlider.get(),
    dashArray: 3,
  };
};
//button is clicked to show layer
$("#layer1").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    map.removeLayer(geojson1);
    slider1.setAttribute('disabled', true); //disable slider when layer is removed
    $('#slider1').hide(); //hide the slider when the layer is removed
    $('#slider1').css('background-color', '#ccc'); //set slider color to gray
    $('#layer1').css('background', '#26a69e'); //return button to original color
    $('#area1').empty(); //remove area number
    $('#count1').empty(); //remove count number
  } else {
    slider1.removeAttribute('disabled');
    $('#slider1').show(); //add the slider when the layer is add
    $('#slider1').css('background-color', '#5c97bf'); //set slider color to blue
    $('#layer1').css('background', '#FF9900'); //set button color to match the layer's color
    $.getJSON("data/1887.json", function(data) {
      geojson1 = L.geoJson(data, {
        style: style1,
        onEachFeature: effects
      });
      map.addLayer(geojson1);
      //using turf to calculate area
      var data = geojson1.toGeoJSON(); //needs to tranalate the layer into geoJson
      var area1 = turf.area(data); //turf function to calculate area
      var area1 = area1.toFixed(2); //round to two decimals
      $('#area1').html('1887: ' + area1 + ' square meters'); //shows the area
      var count1 = data.features.length; //couts the number of objects in data
      $('#count1').html('1887: ' + count1 + ' structures.'); //shows the count
    });
  }
});
$("#layer2").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    map.removeLayer(geojson2);
    slider2.setAttribute('disabled', true);
    $('#slider2').hide();
    $('#slider2').css('background-color', '#ccc');
    $('#layer2').css('background', '#26a69e');
    $('#area2').empty();
    $('#count2').empty();
  } else {
    slider2.removeAttribute('disabled');
    $('#slider2').show();
    $('#slider2').css('background-color', '#5c97bf');
    $('#layer2').css('background', '#0e5e0e');
    $.getJSON("data/1925.json", function(data) {
      geojson2 = L.geoJson(data, {
        style: style2,
        onEachFeature: effects
      });
      map.addLayer(geojson2);
      var data = geojson2.toGeoJSON();
      var area2 = turf.area(data);
      var area2 = area2.toFixed(2);
      $('#area2').html('1925: ' + area2 + ' square meters');
      var count2 = data.features.length;
      $('#count2').html('1925: ' + count2 + ' structures.');
    });
  }
});
$("#layer3").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    map.removeLayer(geojson3);
    slider3.setAttribute('disabled', true);
    $('#slider3').hide();
    $('#slider3').css('background-color', '#ccc');
    $('#layer3').css('background', '#26a69e');
    $('#area3').empty();
    $('#count3').empty();
  } else {
    slider3.removeAttribute('disabled');
    $('#slider3').show();
    $('#slider3').css('background-color', '#5c97bf');
    $('#layer3').css('background', '#0000FF');
    $.getJSON("data/1961.json", function(data) {
      geojson3 = L.geoJson(data, {
        style: style3,
        onEachFeature: effects
      });
      map.addLayer(geojson3);
      console.log(geojson3);
      var data = geojson3.toGeoJSON();
      var area3 = turf.area(data);
      var area3 = area3.toFixed(2);
      $('#area3').html('1961: ' + area3 + ' square meters');
      var count3 = data.features.length;
      $('#count3').html('1961: ' + count3 + ' structures.');
    });
  }
});
$("#layer4").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    map.removeLayer(geojson4);
    slider4.setAttribute('disabled', true);
    $('#slider4').hide();
    $('#slider4').css('background-color', '#ccc');
    $('#layer4').css('background', '#26a69e');
    $('#area4').empty();
    $('#count4').empty();
  } else {
    slider4.removeAttribute('disabled');
    $('#slider4').show();
    $('#slider4').css('background-color', '#5c97bf');
    $('#layer4').css('background', '#6f146e');
    $.getJSON("data/2015.json", function(data) {
      geojson4 = L.geoJson(data, {
        style: style4,
        onEachFeature: effects
      });
      map.addLayer(geojson4);
      console.log(geojson4);
      var data = geojson4.toGeoJSON();
      var area4 = turf.area(data);
      var area4 = area4.toFixed(2);
      $('#area4').html('2015: ' + area4 + ' square meters');
      var count3 = data.features.length;
      $('#count4').html('2015: ' + count4 + ' structures.');
    });
  }
});
//add checkmark to each filter
$("button").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    $(this).find('span').removeClass('glyphicon glyphicon-ok');
  } else {
    $(this).find('span').addClass('glyphicon glyphicon-ok');
  }
});

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
    click: zoomToFeature,
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
};

function highlightFeature(e) {
  layer = e.target;
  originalStyle = layer.options.style;
  layer.setStyle({
    weight: 5,
    dashArray: '5',
    fillOpacity: 0.7,
    color: '#ccc',
  });
  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  if (originalStyle == style1) {
    geojson1.resetStyle(e.target);
  } else if (originalStyle == style2) {
    geojson2.resetStyle(e.target);
  } else {
    geojson3.resetStyle(e.target);
  }
}

//zoom to feature
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

var sidebar = L.control.sidebar('sidebar', {closeButton: true}).addTo(map);
sidebar.open('home');

var value;

slider1.noUiSlider.on('change', function() {
  value = slider1.noUiSlider.get();
  console.log(value);
  map.removeLayer(geojson1);
  $.getJSON("data/1887.json", function(data) {
    geojson1 = L.geoJson(data, {
      style: style1,
      onEachFeature: effects
    });
    map.addLayer(geojson1);
  });
});
slider2.noUiSlider.on('change', function() {
  value = slider2.noUiSlider.get();
  console.log(value);
  map.removeLayer(geojson2);
  $.getJSON("data/1925.json", function(data) {
    geojson2 = L.geoJson(data, {
      style: style2,
      onEachFeature: effects
    });
    map.addLayer(geojson2);
  });
});
slider3.noUiSlider.on('change', function() {
  value = slider3.noUiSlider.get();
  console.log(value);
  map.removeLayer(geojson3);
  $.getJSON("data/1961.json", function(data) {
    geojson3 = L.geoJson(data, {
      style: style3,
      onEachFeature: effects
    });
    map.addLayer(geojson3);
  });
});
slider4.noUiSlider.on('change', function() {
  value = slider4.noUiSlider.get();
  console.log(value);
  map.removeLayer(geojson3);
  $.getJSON("data/2015.json", function(data) {
    geojson3 = L.geoJson(data, {
      style: style4,
      onEachFeature: effects
    });
    map.addLayer(geojson4);
  });
});

$("#area").click(function() {
  data = geojson1.toGeoJSON();
  var area = turf.area(data);
  console.log(area)
})
