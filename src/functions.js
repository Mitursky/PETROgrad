import mapboxgl from "mapbox-gl";
import map from "./App.js";
let me;
function createMarker({
  id,
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
  place_url,
  quiz,
  more,
  complete,
}) {
  let marker;
  var el = document.createElement("div");
  el.className = className;
  el.style.backgroundImage = `url(${src})`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.backgroundSize = "100%";
  if (id) {
    el.id = id;
  }

  if (complete) {
    el.style.border = "solid 5px var(--button_commerce_background)";
    el.style.boxShadow = "var(--button_commerce_background) 0px 0px 10px 3px";
  }

  el.addEventListener("click", function () {
    if (className == "buildings") {
      let center = [map.getCenter().lng, map.getCenter().lat];
      let zoom = map.getZoom();
      setInfo({
        name,
        subtitle,
        text,
        src,
        id,
        goBack: { center: center, zoom: zoom },
        center: center,
        place_url,
        quiz,
        more,
      });
    }
    map.rotateTo(0);
    function go() {
      if (!map.isRotating()) {
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
      } else {
        requestAnimationFrame(go);
      }
    }
    requestAnimationFrame(go);
  });
  if (className == "me") {
    if (me) {
      me.remove();
    }

    me = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
  } else {
    marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
  }
}

export { createMarker };
