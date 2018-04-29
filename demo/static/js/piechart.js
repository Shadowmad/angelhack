$(document).ready(function() {
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
