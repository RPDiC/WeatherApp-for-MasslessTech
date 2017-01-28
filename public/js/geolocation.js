
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
    map.style.height = '200px';
    map.style.width = '100%';

    var myOptions = {
      center:latlon,zoom:14,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});

  //insert openweathermap api key after '=' of api_url
    api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' +
    lon + '&units=metric&appid=1c29adccd542de3d967c2dee625fdf89';

    $.ajax({
      url : api_url,
      method : 'GET',
      success : function (data) {
        var tempr = data.main.temp;
        var location = data.name;
        var desc = data.weather[0].description;
        var type = data.weather[0].id;
        console.log("type " + type);
        getImage(type);
        //$('#background').html("<img src='/img/9.jpg'>");
        $('#temp').text(tempr + '°');
        $('#location').text(location);
        $('#description').text(desc);
      }
    });

  }
    //console.log(type);
  function getImage(type) {
    //var img = document.createElement("img");
    var element = document.getElementById('background');
    if (type > 800) {
      element.style.backgroundImage = "url('img/6.jpg')";
      //img.src = "img/9.jpg";
      //document.getElementById('background').innerHTML="<img src='img/9.jpg'>";
      //$('#background'.attr("src", "/9.jpg"));
      //$('#background').html("<img style='position:absolute' src='img/9.jpg'>");
    } else {
      element.style.backgroundImage = "url('img/6.jpg')";
      //img.src = "img/9.jpg";
      //document.getElementById('background').innerHTML="<img src='img/9.jpg'>";
      //$('#background').html("<img style='position:absolute' src='img/9.jpg'>");
      //document.getElementById("background").src="../public/img/8.jpg";
      //$('#background'.attr("src", "/1.jpg"));
    }

  }
  getLocation();

});

$(document).ready();
