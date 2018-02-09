var map;
     // Function to initialize the map within the map div
function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14
       });
       // Create a single latLng literal object.
       var singleLatLng = {lat: 40.74135, lng: -73.99802};
   }


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}