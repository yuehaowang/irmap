var Statistics = {
	u_amount : 0,
	c_amount : 0,
	p_amount : 0,
	markers : new Array()
};

var ZOOM_LEVEL = 10;

window.onload = function () {
	initMapTitle();

	initAboutModal();

	var map = new BMap.Map("container");
	map.setMapStyle({style : MAP_STYLE});
	map.addEventListener("zoomend", function () {
		hideOverlayMarkers(map);
	});

	addControls(map);
	addMarks(map);

	initStatisticsModal();

	var zoom = 2, point = new BMap.Point(0, 40);
	if (window.innerWidth < 480) {
		zoom = 4;
		point = new BMap.Point(110, 37);
	}
	map.centerAndZoom(point, zoom);
}

function initMapTitle(argument) {
	document.title = MAP_TITLE;

	var navbar = $("#navbar");
	$("#container").height($(window).height() - navbar.height());

	$("#map_title").text(MAP_TITLE);
}

function initAboutModal () {
	var tag = $("#about_modal_body");
	var content = "";

	for (var k in ABOUT) {
		content += "<h4>" + k + "</h4>";

		var list = ABOUT[k];

		for (var i = 0, l = list.length; i < l; i++) {
			content += "<p>" + list[i] + "</p>";
		}

		content += "</br>";
	}

	tag.html(content);
}

function initStatisticsModal () {
	var tag = $("#statistics_modal_body");
	var content = "";

	content += "<h4>大学总数</h4>"
	content += "<p>" + Statistics.u_amount + "</p>";

	content += "<br />";

	content += "<h4>城市总数</h4>"
	content += "<p>" + Statistics.c_amount + "</p>";

	content += "<br />";

	content += "<h4>学生总数</h4>"
	content += "<p>" + Statistics.p_amount + "</p>";

	tag.html(content);
}

function addControls(map) {
	var navigation = new BMap.NavigationControl({anchor : BMAP_ANCHOR_BOTTOM_RIGHT});
	map.addControl(navigation);
}

function addMarks (map) {
	var myGeo = new BMap.Geocoder();

	for (var city in DATA) {
		var universityList = DATA[city];

		var c_nameStr = "<div style='max-height: 300px; overflow: auto;'>";

		/** Get students in the same city */
		for (var university in universityList) {
			var nameList = universityList[university];

			c_nameStr += "<br /><b style='font-size: 20px;'>" + university + "</b><br />";

			Statistics.u_amount++;

			for (var i = 0, l = nameList.length; i < l; i++) {
				var n = nameList[i];

				c_nameStr += n + " ";

				Statistics.p_amount++;
			}

			c_nameStr += "<br />";
		}

		c_nameStr += "</div>";

		/** Get students in the same university */
		for (var university in universityList) {
			var nameList = universityList[university];
			var u_nameStr = "";

			for (var i = 0, l = nameList.length; i < l; i++) {
				var n = nameList[i];

				u_nameStr += n + " ";
			}

			createMarker(myGeo, map, city, university, c_nameStr, u_nameStr);
		}

		Statistics.c_amount++;
	}
}

function createMarker (geo, map, city, university, c_names, u_names) {
	function create (point){
		if (point) {
			var marker = new BMap.Marker(point,{
				icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
					scale: 1,
					fillColor: "orangered",
					fillOpacity: 0.8
				})
			});
			marker.m_city = city;
			map.addOverlay(marker);
			marker.setAnimation(BMAP_ANIMATION_DROP);

			marker.addEventListener("click", function () {
				var zoom = map.getZoom();

				var opts = {
					width : 200,
					title : zoom < ZOOM_LEVEL ? city : university,
					enableMessage : false
				};

				var infoWindow = new BMap.InfoWindow(zoom < ZOOM_LEVEL ? c_names : u_names, opts);
				map.openInfoWindow(infoWindow, point);
			});

			Statistics.markers.push(marker);

			hideOverlayMarkers(map);
		}
	}

	if (SPEC_POS[university]) {
		var p = SPEC_POS[university];

		create(new BMap.Point(p[0], p[1]));
	} else {
		geo.getPoint(university, create, city);
	}
}

function hideOverlayMarkers (map) {
	var zoom = map.getZoom(), buff = new Array(), list = Statistics.markers, l = list.length;

	if (zoom < ZOOM_LEVEL) {
		for (var i = 0; i < l; i++) {
			var m = list[i], city = m.m_city;

			if (buff.indexOf(city) >= 0) {
				m.hide();
			} else {
				m.show();

				buff.push(city);
			}
		}
	} else {
		for (var i = 0; i < l; i++) {
			var m = list[i];

			if (!m.isVisible()) {
				m.show();
			}
		}
	}
}