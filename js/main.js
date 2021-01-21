//Setting up the map.

let map = L.map('map', {
    measureControl:true,
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    zoomControl:true, maxZoom:45, minZoom:5,
    center: [34.3553, 67.5875],
    zoomDelta: 0.25,
    zoom: 6.2,
})

/*
let baseMap = L.tileLayer ('https://api.mapbox.com/styles/v1/abdullah-1976/ckk4kj56v5h6i17p4okgqpbci/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWJkdWxsYWgtMTk3NiIsImEiOiJja2s0anhpbDMwMXhrMnJuMnNwdHZ6Mmt4In0.Z2nE8aSYetW_EkN5-28_-Q', {
  attribution: 'Base Map: <a href="https://www.mapbox.com/">Mapbox</a> | Author: <a href="https://www.linkedin.com/in/AbdullahAmeen/">Abdullah Ameen</a>',
}).addTo(map);
*/

// Adding the highlighs.
function highlightFeature(e) {
  e.target.setStyle({

     color: '#030809',
     fillOpacity:1,
 });
}

function myOnEachFeature(feature, layer) {
 layer.on({
      mouseover: highlightFeature,
     mouseout: unHighlightFeature,
 });
}


function unHighlightFeature(e) {
 e.target.setStyle({
      color: "000000",
 });
}
// Function how to disable dragging in Leaflet map
/*
$('#map').mousedown( function() {
  map.dragging.disable();
});
*/

// Adding color to the map to make it thematic
function chooseColor(density){
  if ( density > 115000 ) return "#253494";
		else if ( density > 90000 ) return "#2c7fb8";
        else if ( density > 70000 ) return "#41b6c4";
        else if ( density > 40000 ) return "#7fcdbb";
        else if ( density > 10000 ) return "#c7e9b4";
        else if ( density > 4000 ) return "#ffffcc";
};

// Loading the geojson file using jQuery.
let datafile = $.getJSON("data/datafile1.geojson",function(electionData){
    L.geoJson( electionData, {
      style: function(feature){
        var fillColor = chooseColor(feature.properties.VotesCast);

        return { color: "#2e0404", weight: 0.8, fillColor: fillColor, fillOpacity: 0.8, };
      },

      onEachFeature:
      myOnEachFeature,

    }).bindPopup(function(layer ){
      return ("<h4>"+ "<h3>" + "Province: " + layer.feature.properties.Province + "</h3>" + "<u>Number of Votes</u>" + "<br>" + "Total Votes Cast : " + layer.feature.properties.VotesCast + "<br>"+ " Dr. Abdullah : " + layer.feature.properties.Abdullah + "<br>" + " Dr. Ghani : " + layer.feature.properties.Ghani +
       "<br>" + " Other Candidates : " + layer.feature.properties.Others + "<br>"+ "<hr class ='popupspace'>" + "<u>Percentage</u>" + "<br>"+ "Dr. Abdullah : " + Math.round(layer.feature.properties.Perc_Abdul*1000)/10 +"%" + "<br>"+ "Dr. Ghani : " + Math.round(layer.feature.properties.Perc_Ghani*1000)/10 + "%" + "<br>"+ "Other Candidates : " + Math.round(layer.feature.properties.Perc_Other*1000)/10 + "%" +"</h4>" )
        }).addTo(map);
  });

  

// Adding the legend to the map
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Total Votes Cast</h4>";
  div.innerHTML += '<i style="background: #ffffcc"></i><span>4500 - 10000</span><br>';
  div.innerHTML += '<i style="background: #c7e9b4"></i><span>10001 - 40000</span><br>';
  div.innerHTML += '<i style="background: #7fcdbb"></i><span>40001 - 70000</span><br>';
  div.innerHTML += '<i style="background: #41b6c4"></i><span>70001 - 90000</span><br>';
  div.innerHTML += '<i style="background: #2c7fb8"></i><span>90001 - 115000</span><br>';
  div.innerHTML += '<i style="background: #253494"></i><span>115000 - 350000</span><br>';

  return div;
};

legend.addTo(map);


// Adding  title to the map
L.Control.textbox = L.Control.extend({
  onAdd: function(map) {
    
  var text = L.DomUtil.create('div');
  text.id = "info_text";
  text.innerHTML = "<div class='Title'> <h2>Afghan Presidential Election - 2019 </h2></div>"
  return text;
  },

  onRemove: function(map) {
  
  }
});

L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'topleft' }).addTo(map);


// Adding the scal bar
L.control.scale().addTo(map);


// Adding highlight and de highlights
function highlightFeature(e) {
  e.target.setStyle({

     fillColor: '#e5ef16',
 });
}

function myOnEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: unHighlightFeature,
  });
}

function unHighlightFeature(e) {
  e.target.setStyle({

    fillColor: chooseColor(e.target.feature.properties.VotesCast)
});
}
