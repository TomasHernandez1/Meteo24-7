/**
 * This file is licensed under Creative Commons Zero (CC0)
 * https://creativecommons.org/publicdomain/zero/1.0/
 *
 * Author: https://www.openstreetmap.org/user/Zartbitter
 */

var map;

function updateURLParameter(url, param, paramVal) {
	var theAnchor = null;
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";

	if (additionalURL) {
		var tmpAnchor = additionalURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor = tmpAnchor[1];
		if (theAnchor) {
			additionalURL = theParams;
		}

		tempArray = additionalURL.split("&");

		for (i = 0; i < tempArray.length; i++) {
			if (tempArray[i].split('=')[0] != param) {
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}
	} else {
		var tmpAnchor = baseURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor = tmpAnchor[1];

		if (theParams) {
			baseURL = theParams;
		}
	}

	if (theAnchor) {
		paramVal += "#" + theAnchor;
	}

	var rows_txt = temp + "" + param + "=" + paramVal;
	return baseURL + "?" + newAdditionalURL + rows_txt;
}

/**
 * Add or replace the language parameter of the URL and reload the page.
 * @param String id of the language
 */
function changeLanguage(pLang) {
	window.location.href = updateURLParameter(window.location.href, 'lang', pLang);
}

/**
 * Get all parameters out of the URL.
 * @return Array List of URL parameters key-value indexed
 */
function getUrlParameters() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/**
 * Callback for successful geolocation.
 * @var position Geolocated position
 */
function foundLocation(position) {
	if (typeof map != "undefined") {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		map.setView(new L.LatLng(lat, lon), 11);
	}
}

/**
 * Helper function for replacing leaflet-openweathermap's builtin marker by a wind rose symbol.
 * This function draws the canvas of one marker symbol once it is available in the DOM.
 */
function myWindroseDrawCanvas(data, owm) {

	var canvas = document.getElementById('id_' + data.id);
	canvas.title = data.name;
	var angle = 0;
	var speed = 0;
	var gust = 0;
	if (typeof data.wind != 'undefined') {
		if (typeof data.wind.speed != 'undefined') {
			canvas.title += ', ' + data.wind.speed + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.speed) + ' BFT';
			speed = data.wind.speed;
		}
		if (typeof data.wind.deg != 'undefined') {
			//canvas.title += ', ' + data.wind.deg + '°';
			canvas.title += ', ' + owm._directions[(data.wind.deg / 22.5).toFixed(0)];
			angle = data.wind.deg;
		}
		if (typeof data.wind.gust != 'undefined') {
			gust = data.wind.gust;
		}
	}
	if (canvas.getContext && speed > 0) {
		var red = 0;
		var green = 0;
		if (speed <= 10) {
			green = 10 * speed + 155;
			red = 255 * speed / 10.0;
		} else {
			red = 255;
			green = 255 - (255 * (Math.min(speed, 21) - 10) / 11.0);
		}
		var ctx = canvas.getContext('2d');
		ctx.translate(25, 25);
		ctx.rotate(angle * Math.PI / 180);
		ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
		ctx.beginPath();
		ctx.moveTo(-15, -25);
		ctx.lineTo(0, -10);
		ctx.lineTo(15, -25);
		ctx.lineTo(0, 25);
		ctx.fill();

		// draw inner arrow for gust
		if (gust > 0 && gust != speed) {
			if (gust <= 10) {
				green = 10 * gust + 155;
				red = 255 * gust / 10.0;
			} else {
				red = 255;
				green = 255 - (255 * (Math.min(gust, 21) - 10) / 11.0);
			}
			canvas.title += ', gust ' + data.wind.gust + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.gust) + ' BFT';
			ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
			ctx.beginPath();
			ctx.moveTo(-15, -25);
			ctx.lineTo(0, -10);
			//ctx.lineTo(15, -25);
			ctx.lineTo(0, 25);
			ctx.fill();
		}
	} else {
		canvas.innerHTML = '<div>'
			+ (typeof data.wind != 'undefined' && typeof data.wind.deg != 'undefined' ? data.wind.deg + '°' : '')
			+ '</div>';
	}
}

/**
 * Helper function for replacing leaflet-openweathermap's builtin marker by a wind rose symbol.
 * This function is called event-driven when the layer and its markers are added. Now we can draw all marker symbols.
 * The this-context has to be the windrose layer.
 */
function windroseAdded(e) {
	for (var i in this._markers) {
		var m = this._markers[i];
		var cv = document.getElementById('id_' + m.options.owmId);
		for (var j in this._cache._cachedData.list) {
			var station = this._cache._cachedData.list[j];
			if (station.id == m.options.owmId) {
				myWindroseDrawCanvas(station, this);
			}
		}
	}
}

/**
 * Example function to replace leaflet-openweathermap's builtin marker.
 */
function myOwmMarker(data) {
	// just a Leaflet default marker
	return L.marker([data.coord.Lat, data.coord.Lon]);
}

/**
 * Example function to replace leaflet-openweathermap's builtin popup.
 */
function myOwmPopup(data) {
	// just a Leaflet default popup
	return L.popup().setContent(typeof data.name != 'undefined' ? data.name : data.id);
}

/**
 * Initialize the map.
 */
function initMap() {

	var standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>'
	});

	// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
	// You don't need an API key for this to work at the moment, but this will change eventually.
	var OWM_API_KEY = '06aac0fd4ba239a20d824ef89602f311';

	var clouds = L.OWM.clouds({ opacity: 0.8, appId: OWM_API_KEY });
	var precipitationcls = L.OWM.precipitationClassic({ opacity: 0.5, appId: OWM_API_KEY });
	var snow = L.OWM.snow({ opacity: 0.5, appId: OWM_API_KEY });
	var pressure = L.OWM.pressure({ opacity: 0.4, appId: OWM_API_KEY });
	var temp = L.OWM.temperature({ opacity: 0.5, appId: OWM_API_KEY });
	var wind = L.OWM.wind({ opacity: 0.5, appId: OWM_API_KEY });

	var useGeolocation = true;
	var zoom = 5;
	//coordinate di centro mappa
	var lat = 43;
	var lon = 13;
	map = L.map('map', {
		center: new L.LatLng(lat, lon), zoom: zoom,
		layers: [standard]
	});
	map.attributionControl.setPrefix("");


	var baseMaps = {
		"OSM Standard": standard
	};

	var overlayMaps = {};
	overlayMaps['Nuvole'] = clouds;
	overlayMaps['Precipitazioni'] = precipitationcls;
	overlayMaps['Neve'] = snow;
	overlayMaps['Temperatura'] = temp;
	overlayMaps['Velocità del vento'] = wind;
	overlayMaps['Pressione'] = pressure;

	var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

	// patch layerControl to add some titles
	var patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = 'Meteo Corrente'; // 'TileLayers';
	layerControl._form.children[2].parentNode.insertBefore(patch, layerControl._form.children[2]);
	patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
	layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length - 2]);
	
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = 'Mappa'; // 'Maps';
	layerControl._form.children[0].parentNode.insertBefore(patch, layerControl._form.children[0]);



	if (useGeolocation && typeof navigator.geolocation != "undefined") {
		navigator.geolocation.getCurrentPosition(foundLocation);
	}
}
