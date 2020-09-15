$(document).ready(function() {
	loadGraphData();
	$('body').on('change','.dataType',function () {
		loadGraphData($('.dataType option:selected').val());	
	});
});

function loadGraphData(type = "monthly"){
	$.ajax({
		url : base_url + 'dashboard/getGraphData',
		type : "POST",
		data : {type : type},
		dataType : 'json',
		success : function(result){
			$('.seriesCategory').val(result.response.categories);
			$('.seriesData').val(result.response.series);
			
			loadGraph();
			
			
		}
	})
	return false;
}

function loadGraph() {
	var seriesCategory = $('.seriesCategory').val();
	var seriesData = $('.seriesData').val();
	setTimeout(function(){
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Review'
			},
			// subtitle: {
			// 	text: 'Source: WorldClimate.com'
			// },
			xAxis: {
				categories: JSON.parse(seriesCategory),
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					// text: 'Rainfall (mm)'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: JSON.parse(seriesData),
		});
	},1000);
}