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

	// setInterval(saveImageVideoFeed, 5000);
	var pie = new d3pie(document.getElementById("pieChart"), {
		"header": {
			"title": {
				"text": "Event Happiness Chart",
				"color": "#000000",
				"fontSize": 24,
				"font": "open sans"
			},
			"titleSubtitlePadding": 20
		},
		"footer": {
			"color": "#999999",
			"fontSize": 10,
			"font": "open sans",
			"location": "bottom"
		},
		"size": {
			"canvasWidth": 590,
			"pieInnerRadius": "50%",
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "Happy",
					"value": 10,
					"color": "#00ff00"
				},
				{
					"label": "Sad",
					"value": 10,
					"color": "#8b6834"
				},
				{
					"label": "Angry",
					"value": 10,
					"color": "#ff0000"
				},
				{
					"label": "Neutral",
					"value": 10,
					"color": "#808080"
				},
				{
					"label": "Contempt",
					"value": 10,
					"color": "#00ccff"
				},
				{
					"label": "Disgusted",
					"value": 10,
					"color": "#ff8000"
				},
				{
					"label": "Fear",
					"value": 10,
					"color": "#000000"
				},
				{
					"label": "Surprised",
					"value": 10,
					"color": "#80ffff"
				},
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
			"load": {
				"effect": "none"
			},
			"pullOutSegmentOnClick": {
				"effect": "none",
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
