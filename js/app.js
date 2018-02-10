     /* The Model AKA Data */
    var locations = [
    {title: 'Philae Temple', location: { lat: 24.025122, lng: 32.884433 }},
    {title: 'Cathedral of the Archangel',location: { lat: 24.088938, lng: 32.899829 }},
    {title: 'Seheil Island', location: { lat: 24.06745, lng: 32.87625 }},
    {title: 'Nubian Museum', location: { lat: 24.079492, lng: 32.888572 }},
    {title: 'Elephantine Island', location: { lat: 24.100186, lng: 32.905452 }}
];
    var map;
    var markers = [];

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 24.113193, lng: 32.920774},
          zoom: 18
        });

var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();



        for(var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          markers.push(marker);
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

    
      function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
             var wikiRequestTimeout = setTimeout(function() {
                infowindow.setContent('<div id=' + marker.id + '>' + marker.title + '</div><p>Wikipedia Failed</p>');
            }, 2000);
            var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "&format=json&callback=wikiCallback";
            $.ajax({
                url: wikiURL,
                dataType: "jsonp",
                success: function(response) {
                    var list = response[1];
                    var link = "https://en.wikipedia.org/wiki/" + list[0];
                    infowindow.setContent('<div id=' + marker.id + '>' + marker.title + '</div><br/><a href="' + link + '" target="_blank">' +
                        'visit wikipedia for more info!</h1>');
                    clearTimeout(wikiRequestTimeout);
                }
            });
          infowindow.open(map, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}