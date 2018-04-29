options = {
	chart: {
		backgroundColor: '#e3e3e3',
		width: 550,
		height: 500,
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Event emotion feedback'
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				style: {
					color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				}
			}
		}
	},
	series: [{
		name: 'Event emotions',
		colorByPoint: true,
		data: [{
			name: 'Chrome',
			y: 61.41,
			sliced: true,
			selected: true
		}, {
			name: 'Internet Explorer',
			y: 11.84
		}, {
			name: 'Firefox',
			y: 10.85
		}, {
			name: 'Edge',
			y: 4.67
		}, {
			name: 'Safari',
			y: 4.18
		}, {
			name: 'Sogou Explorer',
			y: 1.64
		}, {
			name: 'Opera',
			y: 1.6
		}, {
			name: 'QQ',
			y: 1.2
		}, {
			name: 'Other',
			y: 2.61
		}]
	}]
};

function getChartInfo(chart) {
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
					name: field.toString(),
					y: data[field]
				});
			}
		}
		console.log(data)
		chart.series[0].setData(newData, true);
	});
}


$(document).ready(() => {
	chart = Highcharts.chart('highchart', options);
	getChartInfo(chart);
	setInterval(getChartInfo.bind(window, chart), 1000);
});
