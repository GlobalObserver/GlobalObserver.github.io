
var pie = new d3pie("piechart", {
	"header": {
		"title": {
			"text": "",
			"fontSize": 30,
			"font": "open sans"
		},
		"subtitle": {
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 17
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasHeight": 800,
		"canvasWidth": 750,
		"pieInnerRadius": "49%",
		"pieOuterRadius": "92%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "Under 25",
				"value": 17665,
				"color": "#f8e700"
			},
			{
				"label": "25 - 34",
				"value": 226195,
				"color": "#28daeb"
			},
			{
				"label": "35 - 44",
				"value": 84193,
				"color": "#ffa000"
			},
			{
				"label": "45 - 54",
				"value": 7046,
				"color": "#ee86e7"
			},
			{
				"label": "Over 55",
				"value": 1008,
				"color": "#fd0035"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 16
		},
		"inner": {
			"hideWhenLessThanPercentage": 2
		},
		"mainLabel": {
			"fontSize": 12
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
			"enabled": true,
			"style": "straight"
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "Age {label}: {value} petitions",
		"styles": {
			"backgroundOpacity": 0.43,
			"borderRadius": 3,
			"fontSize": 15,
			"padding": 9
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
		"canvasPadding": {
			"top": 12,
			"right": 18,
			"left": 8
		}
	},
	"callbacks": {}
});
