// initialize the map to center on Hawaii
var mymap = L.map('mapid').setView([20.7262, -156.4464], 10);

// create a background tile layer from open street maps
mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; ' + mapLink,
maxZoom: 18,
}).addTo(mymap);

// create a list of locations where I lived in Hawaii
var homes = [
  ["Makawao", 20.848229, -156.318178],
  ["Kihei", 20.7262, -156.4464],
  ["Waialua", 21.577104, -158.127254],
  ["Laysan", 25.765140, -171.733537],
  ["Pupukea", 21.645115, -158.037616],
  ["Hilo", 19.689504, -155.070366],
  ["Volcano", 19.424655, -155.256158],
  ["Honolulu",21.284209, -157.814673]

]
// create a featuregroup to store markers for house locations
var group = new L.featureGroup([])
var mauiGroup = new L.featureGroup([])
var laysan = new L.featureGroup([])
var oahu = new L.featureGroup([])
// initialize markers for each location
for (var i = 0; i < homes.length; i++) {
			marker = new L.marker([homes[i][1],homes[i][2]])
				.bindPopup(homes[i][0]) // create popups with labels for each location
				.addTo(mymap);
        group.addLayer(marker) //add marker to the group
        if (["Makawao", "Kihei"].indexOf(homes[i][0])>-1 ){
          mauiGroup.addLayer(marker)
        }
        else if(homes[i][0]==="Laysan"){
          laysan.addLayer(marker)
        }

		}

// initialize a new popup in the map
var popup = L.popup();

//initialize a function to display the latitude and longitude on mouse click
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)

        .setContent( "Lat: "+ e.latlng.lat.toString() + "\n Long: " + e.latlng.lng.toString())
        .openOn(mymap);
}

// add popup on mouse click to display latitude and longitude
mymap.on('click', onMapClick);

// set the initial zoom of the map to the area of the markers created above
mymap.fitBounds(group.getBounds());

//zoom to all islands, select by bounding box on all locations
$('#All').on('click',function(e){
    mymap.fitBounds(group.getBounds());
});

//zoom to hawaii island select by manual bounding box
$('#Hawaii').on('click', function(e){
  mymap.fitBounds([[19.986255155382327, -154.44305419921878],[19.210022196386095,-156.16241455078125]])

});

//zoom to maui based on new group
$('#Maui').on('click', function(e){
  mymap.fitBounds(mauiGroup.getBounds());
});

//create a view from the laysan marker by group id


$('#Laysan').on('click', function(e){
  mymap.fitBounds(laysan.getBounds())
  mymap.setZoom(14);  // zoom out to better fit screen
});


//create search criterea
var oahuNames = ['Waialua', 'Pupukea', 'Honolulu']

// iterate through list and select matching names to add to the oahu group
group.eachLayer(function(layer){

  var name = layer._popup._content
  if (oahuNames.indexOf(name)>-1){
    oahu.addLayer(layer);
  }
});


$('#Oahu').on('click', function(e){
  mymap.fitBounds(oahu.getBounds())
  mymap.setZoom(mymap.getZoom()-1); // zoom out to better fit screen
});
