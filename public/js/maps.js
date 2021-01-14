let platform = new H.service.Platform({
    'apikey': 'NrUwSucqFHVPOyyoPFRL690RCflp9vvzqw_P892N-OY'
  });

// Obtain the default map types from the platform object:





    function landmarkGeocode() {
      let title = document.querySelector('h1').textContent;
      var geocoder = platform.getSearchService(),
          landmarkGeocodingParameters = {
            q: title,
            at: '0,0',
            limit: 1
          };
    
      geocoder.discover(
        landmarkGeocodingParameters,
        showMap,
        (e) => console.log(e)
      );
    }


function showMap(result){
  let location = result.items[0].position;
  console.log(location);
  let defaultLayers = platform.createDefaultLayers();

  let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.lat, lng: location.lng }
    });


    let marker = new H.map.Marker({lat:location.lat, lng:location.lng});
    map.addObject(marker);
    let ui = H.ui.UI.createDefault(map, defaultLayers);

      
} 
landmarkGeocode();