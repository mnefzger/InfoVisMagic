	var content;
	var papers = new Array();
	var authors = new Array();
	var HEIGHT = window.innerHeight-25;
	var WIDTH = window.innerWidth-25;
	/*var HEIGHT = 800;
	var WIDTH = 1000;*/

	var pixels = [];
	for(var y=0; y<HEIGHT; y++){
		pixels[y] = [];
		for(var x=0; x<WIDTH; x++){
			pixels[y].push(0);
		}
	}


	var x_cor = 0;
	var y_cor = 0;
	var item_width;
	var item_height;


	var calcPosition = function(w,h){
		outer:
		for(var y=10; y<pixels.length; y++){
			for(var x=0; x<pixels[y].length; x++){
				if(pixels[y][x] == 0){
					x_cor = x;
					y_cor = y;
					setTrue(x,y,w,h);
					break outer;
				}
			}
		}
	}

	var setTrue = function(X,Y,w,h){
		console.log(w,h);
		for(var y=Y; y<Y+h; y++){
			for(var x=X; x<X+w; x++){
				if(pixels[y] != undefined)	pixels[y][x] = 1;
			}
		}
	}

	var getX = function(){
		return x_cor;
	}
	var getY = function(){
		return y_cor;
	}

	var makeItHappen =  function(){
		var data = [];
		for(i=0;i<authors.length; i++){
	    	data.push({author: authors[i].author});
		}
		for(i=0;i<data.length; i++){
			calcPosition(data[i].author.length*7, 12);
			data[i]['x'] = getX();
			data[i]['y'] = getY();
		}

		var container = d3.select('#container')
			.append('svg')
			.attr('width', WIDTH)
			.attr('height', HEIGHT);

		var items = container.selectAll('rect');
		/*items
			.data(data)
			.enter().append('rect')
			.style("stroke", "gray")
	        .style("fill", "white")
	        .attr("width", 175)
	        .attr("height", 25)
	        .attr("x", function(d,i){return (i%10)*180})
	        .attr("y", function(d,i){return Math.floor(i/10) *30})
	        .style("opacity",0)
	        .on( 'mouseenter', function() {
	          d3.select( this )
	            .transition()
	            .style( 'fill', '#ddd' );
	        } )
	        .on( 'mouseleave', function() {
	          d3.select( this )
	            .transition()
	            .style( 'fill', 'white' );
	        } );*/


	    items
			.data(data)
			.enter().append('text')
			.text(function(d,i){return data[i].author})
			.style("font-size", function(d,i){
	        	var count = authors[i].papers.length;
	        	var fontSize;
	        	if(count > 18) fontSize = authors[i].papers.length/3;
	        	else fontSize = 9;
	        	//return fontSize + 'px';
	        	return '12px';
	        })
	        .attr("x", function(d,i){
	        	console.log(data[i].x)
	        	return data[i].x;
	        })
	        .attr("y", function(d,i){
	        	return data[i].y;
	        })
	        .style("cursor", "pointer")
	        .style("font-weight", function(d,i){
	        	if(authors[i].papers.length > 25) return 'bold';
	        	return 'normal';
	        })
	        .style("opacity",0)
	        .on( 'mouseenter', function() {
	          d3.select( this )
	            .transition()
	            .style('opacity', 1)
	            .style('font-weight', 'bold')
	            .style('font-size', '25px')
	            .style( 'fill', 'red' );
	        } )
	        .on( 'mouseleave', function(d,i) {
	          d3.select( this )
	            .transition()
	            .style('opacity', Math.max(0.1, authors[i].papers.length/15))
	            .style('font-weight', 'normal')
	            .style('font-size', '12px')
	            .style( 'fill', 'black' );
	        } );
	        //.style('fill', function(d,i){return randomColor()});

		container.selectAll('rect')
			.transition()
			.duration(250)
			.delay(function(d,i){return i*10})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", 1);
		container.selectAll('text')
			.transition()
			.duration(250)
			.delay(function(d,i){return i*10})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", function(d,i){
				return Math.max(0.1, authors[i].papers.length/15);
			});
			/*.style("font-size", function(d,i){
				return authors[i].papers.length;
			});*/

	}





	var width = 400,
	height = 600,
	padding = 6, // separation between nodes
	maxRadius = 20;

	var n = authors.length, // total number of nodes
	m = 1; // number of distinct clusters

	var color = d3.scale.category10()
	.domain(d3.range(m));

	var x = d3.scale.ordinal()
	.domain(d3.range(m))
	.rangePoints([0, width], 1);

	var nodes = d3.range(n).map(function() {
		var i = Math.floor(Math.random() * m),
		v = (i + 1) / m * -Math.log(Math.random());
		return {
			radius: Math.sqrt(v) * maxRadius,
			color: color(i),
			cx: x(i),
			cy: height / 2
		};
	});

	var force = d3.layout.force()
	.nodes(nodes)
	.size([width, height])
	.gravity(0)
	.charge(0)
	.on("tick", tick)
	.start();

	var svg = d3.select("#container").append("svg")
	.attr("width", width)
	.attr("height", height);

	var circle = svg.selectAll("circle")
	.data(nodes)
	.enter().append("circle")
	.attr("r", function(d) { return d.radius; })
	.style("fill", function(d) { return d.color; })
	.call(force.drag);

	function tick(e) {
		circle
		.each(gravity(.2 * e.alpha))
		.each(collide(.5))
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	}

	// Move nodes toward cluster focus.
	function gravity(alpha) {
		return function(d) {
			d.y += (d.cy - d.y) * alpha;
			d.x += (d.cx - d.x) * alpha;
		};
	}

	// Resolve collisions between nodes.
	function collide(alpha) {
		var quadtree = d3.geom.quadtree(nodes);
		return function(d) {
			var r = d.radius + maxRadius + padding,
			nx1 = d.x - r,
			nx2 = d.x + r,
			ny1 = d.y - r,
			ny2 = d.y + r;
			quadtree.visit(function(quad, x1, y1, x2, y2) {
				if (quad.point && (quad.point !== d)) {
					var x = d.x - quad.point.x,
					y = d.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
					if (l < r) {
						l = (l - r) / l * alpha;
						d.x -= x *= l;
						d.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					}
				}
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			});
		};
	}
