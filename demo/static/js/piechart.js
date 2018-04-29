// # Example call for the demo at http//cbrandolino.github.com/camvas

// If the browser does not support any URL, getUserMedia or
// In this example call, we will directly draw the webcam stream on a canvas.
window.onload = function(){
  var ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
  var draw = function(video, dt) {
    ctx.drawImage(video, 0, 0)
  }
  var myCamvas = new camvas(ctx, draw)
}

$(document).ready(function() {
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
		$.ajax({
			type: "POST",
			url: "/images/upload64",
			cache: false,
			contentType: false,
			processData: false,
			data: {
				file: dataURL
			}
		}).done(function(o) {
			console.log(o);
			// If you want the file to be visible in the browser
			// - please modify the callback in javascript. All you
			// need is to return the url to the file, you just saved
			// and than put the image in your browser.
		});
	}

	setInterval(saveImageVideoFeed, 5000);
	var pie = new d3pie(document.getElementById("pieChart"), {
		"header": {
			"title": {
				"text": "Event Happiness Pie Chart",
				"color": "#d72929",
				"fontSize": 24,
				"font": "open sans"
			},
			"subtitle": {
				"text": "Pie chart that shows percentage of moods on an event",
				"color": "#999999",
				"fontSize": 12,
				"font": "open sans"
			},
			"location": "top-left",
			"titleSubtitlePadding": 5
		},
		"footer": {
			"color": "#999999",
			"fontSize": 10,
			"font": "open sans",
			"location": "bottom-left"
		},
		"size": {
			"canvasWidth": 590,
			"pieInnerRadius": "49%",
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "Happy",
					"value": 67706,
					"color": "#e65414"
				},
				{
					"label": "Sad",
					"value": 36344,
					"color": "#8b6834"
				},
				{
					"label": "Angry",
					"value": 32170,
					"color": "#248838"
				},
				{
					"label": "Neutral",
					"value": 1231,
					"color": "#efefef"
				}
			]
		},
		"labels": {
			"outer": {
				"pieDistance": 32
			},
			"inner": {
				"hideWhenLessThanPercentage": 3
			},
			"mainLabel": {
				"fontSize": 11
			},
			"percentage": {
				"color": "#ffffff",
				"decimalPlaces": 0
			},
			"value": {
				"color": "#adadad",
				"fontSize": 11
			},
			"lines": {
				"enabled": true
			},
			"truncation": {
				"enabled": true
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			}
		},
		"misc": {
			"gradient": {
				"enabled": true,
				"percentage": 100
			}
		}
	});
});
