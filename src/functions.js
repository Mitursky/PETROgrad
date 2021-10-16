import mapboxgl from "mapbox-gl";
import map from "./App.js";
let me;
function createMarker({
  src,
  width = 50,
  height = 50,
  func = () => {},
  lat = 59.93,
  lng = 30.19,
  className = "marker",
  map,
  arg,
  setInfo,
  name,
  subtitle,
  text,
}) {
  let marker;
  var el = document.createElement("div");
  el.className = className;
  el.style.backgroundImage = `url(${src})`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.backgroundSize = "100%";

  el.addEventListener("click", function () {
    console.log("click");
    if (className == "buildings") {
      let center = [map.getCenter().lng, map.getCenter().lat];
      let zoom = map.getZoom();
      setInfo({
        name,
        subtitle,
        text,
        src,
        goBack: { center: center, zoom: zoom },
        center: center,
      });
    }
    if (className == "buildings") {
      map.flyTo({
        center: [lng, lat - 0.003 / (812 / window.innerHeight)],
        zoom: 15,
      });
    } else {
      map.flyTo({
        center: [lng, lat],
        zoom: 15,
      });
    }

    if (func) {
      func(arg);
    }
  });
  if (className == "me") {
    if (me) {
      me.remove();
    }
    console.log("me");
    me = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
  } else {
    console.log(className);
    marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
  }
}

export { createMarker };
