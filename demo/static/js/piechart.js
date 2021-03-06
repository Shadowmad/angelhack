// # Example call for the demo at http//cbrandolino.github.com/camvas

// If the browser does not support any URL, getUserMedia or
// In this example call, we will directly draw the webcam stream on a canvas.
window.onload = function(){
	var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
	$("#canvas").attr('width', window.innerWidth / 2);
	$("#canvas").attr('height',  3 * window.innerWidth / 8);
	// ctx.canvas.width = window.innerWidth;
	// ctx.canvas.height = 3 * window.innerWidth / 4;
	var draw = function(video, dt) {
		ctx.drawImage(video, 0, 0, window.innerWidth / 2, 3 * window.innerWidth / 8)
	}
	var myCamvas = new camvas(ctx, draw)
}

window.pieData = [];

function getEventInfo(cb, pie, value) {
	newData = [];
	$.ajax({
		type: "GET",
		url: "/event/info",
		cache: false,
		contentType: false,
		processData: false,
	}).done(function(data) {
		for (field in data) {
			if (field != "_id") {
				newData.push({
					label: field.toString(),
					value: value ? value : data[field]
				});
			}
		}
		cb(pie, newData);
	});
}

function updatePieData(pie, data) {
		if (window.pieData.length == 0) {
			window.pieData = data;
			pie.updateProp("data.content", window.pieData);
		} else {
			for (item in data) {
				window.pieData.find((el, idx) => {
					if (el.label == item.label) {
						window.pieData[idx].value = el.value;
					}
				})
			}
		}
	};

$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: "/event/twitter",
	}).done(function(data) {
		if (data.twitter <= 50)
			$(".twitter_bar").css("backgroundColor", 'rgb(255,116,116)');
		if (data.twitter > 50 && data.twitter < 75)
			$(".twitter_bar").css("backgroundColor", 'rgb(253,236,109)');
		if (data.twitter >= 75)
			$(".twitter_bar").css("backgroundColor", '#28a745');
		$(".twitter_bar").css("width", data.twitter + '%');
		$(".twitter_bar").text(data.twitter + '%');
	});


	function base64ToBlob(base64, mime)
	{
	    mime = mime || '';
	    var sliceSize = 1024;
	    var byteChars = window.atob(base64);
	    var byteArrays = [];

	    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
	        var slice = byteChars.slice(offset, offset + sliceSize);

	        var byteNumbers = new Array(slice.length);
	        for (var i = 0; i < slice.length; i++) {
	            byteNumbers[i] = slice.charCodeAt(i);
	        }

	        var byteArray = new Uint8Array(byteNumbers);

	        byteArrays.push(byteArray);
	    }

	    return new Blob(byteArrays, {type: mime});
	}

	function saveImageVideoFeed() {
		var canvas = document.getElementsByTagName('canvas')[0];
		let dataURL = canvas.toDataURL('image/jpeg', 1.0);
		var base64ImageContent = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
		let data = base64ToBlob(base64ImageContent, 'image/jpeg');
		var formData = new FormData();
		formData.append('file', data);
		$.ajax({
			type: "POST",
			url: "/images/uploadbinary",
			cache: false,
			contentType: false,
			processData: false,
			data: formData
		}).done(function(o) {
			console.log(o);
			// If you want the file to be visible in the browser
			// - please modify the callback in javascript. All you
			// need is to return the url to the file, you just saved
			// and than put the image in your browser.
		});
	}

	setInterval(saveImageVideoFeed, 3000);

	// var pie = new d3pie(document.getElementById("pieChart"), {
	// 	"header": {
	// 		"title": {
	// 			"text": "Event Happiness Chart",
	// 			"color": "#000000",
	// 			"fontSize": 24,
	// 			"font": "open sans"
	// 		},
	// 		"titleSubtitlePadding": 20
	// 	},
	// 	"footer": {
	// 		"color": "#999999",
	// 		"fontSize": 10,
	// 		"font": "open sans",
	// 		"location": "bottom"
	// 	},
	// 	"size": {
	// 		"canvasWidth": window.innerWidth / 2,
	// 		"pieInnerRadius": "50%",
	// 		"pieOuterRadius": "100%"
	// 	},
	// 	"data": {
	// 		"smallSegmentGrouping": {
	// 			"enabled": true
	// 		},
	// 		"sortOrder": "value-desc",
	// 		"content": [
	// 			{
	// 				"label": "Happiness",
	// 				"value": 10,
	// 				"color": "#00ff00"
	// 			},
	// 			{
	// 				"label": "Sadness",
	// 				"value": 10,
	// 				"color": "#8b6834"
	// 			},
	// 			{
	// 				"label": "Anger",
	// 				"value": 10,
	// 				"color": "#ff0000"
	// 			},
	// 			{
	// 				"label": "Neutral",
	// 				"value": 10,
	// 				"color": "#808080"
	// 			},
	// 			{
	// 				"label": "Contempt",
	// 				"value": 10,
	// 				"color": "#00ccff"
	// 			},
	// 			{
	// 				"label": "Disgust",
	// 				"value": 10,
	// 				"color": "#ff8000"
	// 			},
	// 			{
	// 				"label": "Fear",
	// 				"value": 10,
	// 				"color": "#000000"
	// 			},
	// 			{
	// 				"label": "Surprise",
	// 				"value": 10,
	// 				"color": "#80ffff"
	// 			},
	// 		]
	// 	},
	// 	"labels": {
	// 		"outer": {
	// 			"pieDistance": 32
	// 		},
	// 		"inner": {
	// 			"hideWhenLessThanPercentage": 3
	// 		},
	// 		"mainLabel": {
	// 			"fontSize": 11
	// 		},
	// 		"percentage": {
	// 			"color": "#ffffff",
	// 			"decimalPlaces": 0
	// 		},
	// 		"value": {
	// 			"color": "#adadad",
	// 			"fontSize": 11
	// 		},
	// 		"lines": {
	// 			"enabled": true
	// 		},
	// 		"truncation": {
	// 			"enabled": true
	// 		},
	// 		"inner": {
	// 			"hideWhenLessThanPercentage": 5
	// 		},
	// 	},
	// 	"effects": {
	// 		"load": {
	// 			"effect": "none"
	// 		},
	// 		"pullOutSegmentOnClick": {
	// 			"effect": "none",
	// 		}
	// 	},
	// 	"misc": {
	// 		"gradient": {
	// 			"enabled": true,
	// 			"percentage": 100
	// 		}
	// 	}
	// });

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
	window.pie = pie;

	// updatePieData(pie);
	// getEventInfo(updatePieData, pie);
	// getEventInfo(updatePieData, pie, 10);
	// setInterval(updatePieData(pie), 60000);
	// setInterval(getEventInfo.bind(this, updatePieData, pie, 0.1), 100);
});
