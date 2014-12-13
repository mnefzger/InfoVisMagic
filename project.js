	var data = [];
	for(i=0; i<50; i++){
    	data.push(Math.round(Math.random()*100));
	}  

	var container = d3.select('#container')
		.append('svg')
		.attr('width', 1000)
		.attr('height', 1000);

	var circles = container.selectAll('circle');
	circles
		.data(data)
		.enter().append('circle')
		.style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 0)
        .attr("cx", function(d,i){return (i+1)*20})
        .attr("cy", function(d,i){return (i+1)*20});
		
	container.selectAll('circle').transition()
		.duration(function(d,i){return (i+1)*100})
		.ease("linear")
		.attr("r", function(d,i){ return (i+1) /2})
		.style("fill", function(d,i){
			return randomColor({
				hue:'red',
				luminosity:'bright'
			})
		});    
