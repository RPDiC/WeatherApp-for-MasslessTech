
$(document).ready(function(){


  //var x = document.getElementById("display");

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getStatus);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function getStatus(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);
    map = document.getElementById('map');

    var myOptions = {
      center:latlon,zoom:14,
      scrolling:"no",
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var map = new google.maps.Map(document.getElementById("map"), myOptions);

    //insert openweathermap api key after '=' of api_url
    api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' +
    lon + '&units=metric&appid=';

    $.ajax({
      url : api_url,
      method : 'GET',
      success : function (data) {
        var tempr = data.main.temp;
        var location = data.name;
        var desc = data.weather[0].description;
        var type = data.weather[0].id;
        getImage(type);
        $('#temp').text(tempr + '°');
        $('#location').text(location);
        $('#description').text(desc);
      }
    });

  }

  function getImage(type) {
    var element = document.getElementById('background');
    if(899 < type && type < 910) {
      element.style.backgroundImage = "url('img/1.jpg')";
    } else if(type > 800) {
      element.style.backgroundImage = "url('img/9.jpg')";
    } else {
      type = ""+type;
      var char = type.charAt(0);
      element.style.backgroundImage = "url('img/"+char+".jpg')";
    }

  }
  getLocation();

});

$(document).ready();
