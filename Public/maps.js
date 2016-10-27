var map;

var lat=[];
var lng = [];
var locations;
var position;
var icon;
var json_data=[];

// Create a new blank array for all the listing markers.
var markers = [];

function displayMaps(locations,icon){
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        position = locations[i];
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            id: i
        });
        markers.push(marker);

    }
}


function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 20, lng: -30},
        zoom: 3
    });
    var e = document.getElementById("ddlSearch");
    var strUser = e.options[e.selectedIndex].value;


    $.get("/api/tweet/" + strUser,
        function (response) {
            json_data = [];
            for (i = 0; i < response.length; i++) {
                lat[i] = response[i]._source.location.coordinates[0];
                lng[i] = response[i]._source.location.coordinates[1];
                json_data[i] = {
                    "lat": lat[i],
                    "lng": lng[i]
                }

            }
            console.log("response length received :" + json_data.length);
            console.log(json_data.length);

            if (strUser == 'All') {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == 'Election') {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == 'Sports') {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Entertainment") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Health") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Technology") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Travel") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Religion") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Food") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Fashion") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                displayMaps(locations, icon);
            }
            else if (strUser == "Social") {
                locations = json_data;
                icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                displayMaps(locations, icon);
            }
        });
}