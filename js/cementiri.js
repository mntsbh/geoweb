function addEdificiosCapa() {

    map.addSource("edificios_source", {
        "type": "vector",
        "url": "mapbox://mntsbh.9n6k2ui2"  // Nuestor ID Tileset

    }); //fin map source


    map.addLayer({
    "id": "edificios",
    "type": "fill-extrusion",
    "source": "edificios_source",
    "source-layer": "1cemgi-1xwqs8", // Nuestro nombre Tileset
    "maxzoom": 21,
    "minzoom": 15,
    "filter": [">", "alt", 0],
    "paint": {
        "fill-extrusion-color": [
            "interpolate", ["linear"], ["number", ["get", "alt"]],
            0, "#a8a5a5",
            1, "#a8a5a5",
            2, "#a8a5a5",
            3, "#a8a5a5",
            4, "#a8a5a5",
            
        ],
        "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8, 0,
            12.5, 0,
            14, ["*", 1, ["to-number", ["get", "alt"]]],
            16, ["*", 1.5, ["to-number", ["get", "alt"]]],
            20, ["*", 2, ["to-number", ["get", "alt"]]]
        ],
        "fill-extrusion-opacity": 0.9
    }
},"road-label");     // fin addLayer capa texto "water-name-lakeline-platja", "road-label"

}

function addPopupToMapEdificios2(nombreCapa) {

    map.on('click', nombreCapa, function (e) {
  
      var text = "";
      //console.info(e);
      for (key in e.features[0].properties) {
          if(key == "TIPOLOGIA")
  
        text += "<b> Tipo </b>:" + e.features[0].properties[key] + "<br>";
      }
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(text)
        .addTo(map);
  
    });
    map.on('mouseenter', nombreCapa, function () {
        map.getCanvas().style.cursor = 'pointer';
      });
    
      map.on('mouseleave', nombreCapa, function () {
        map.getCanvas().style.cursor = '';
      });
    
    }
               
    
        map.on('mouseenter', nombreCapa, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        map.on('mouseleave', nombreCapa, function () {
            map.getCanvas().style.cursor = '';
        });
    
   

    function filtrarEdificios(valor) {
        map.setFilter("edificios", [">", "numberOfFloorsAboveGround", parseInt(valor)]);

        document.getElementById("altura").innerHTML = "Altura superior a " + valor + "m.";

    }

    function activarEdificios (activo){
        if (activo) {
            map.setLayoutProperty("edificios", "visibility", "visible");
        } else {
            map.setLayoutProperty("edificios", "visibility", "none");
        }

    }