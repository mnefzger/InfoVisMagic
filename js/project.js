var nodes;
var force;
var HEIGHT = window.innerHeight-5;
var WIDTH = $("#container").width();

var linearScale;
var circle;
var force;
var svg;

var display =  function(){
	padding = 1; // separation between nodes

	var n = authors.length, // total number of nodes
	m = 10; // number of distinct clusters

	//create svg area
	svg = d3.select("#container").append("svg")
		.attr("width", WIDTH)
		.attr("height", HEIGHT)
		.append("g")
    	.call(d3.behavior.zoom().scaleExtent([0.2, 10]).on("zoom", zoom));

    var background = svg.append('rect')
    	.style('fill','white')
    	.attr('width', 10000)
    	.attr('height', 10000);

    //scale data to fit screen
    linearScale = d3.scale.linear().domain([0,2]);



	nodes = new Array();
	for(var j=0; j<n; j++){
		nodes.push({
			radius: Math.max(10, linearScale(authors[j].papers.length)),
			color: 'red',
			name: authors[j].author
		});
	}


	 var links = [
        { source: 0, target: 1},
        { source: 0, target: 2},
        { source: 0, target: 3},
        { source: 2, target: 4},
        { source: 2, target: 5},
        { source: 2, target: 6}

    ];

	force = d3.layout.force()
    //.gravity(0)
    .charge(-20)
    //.theta(100)
    //.friction(0)
    .nodes(nodes)
    .links(links)
    .size([WIDTH, HEIGHT])
    .start();

    force.on("tick", function(e) {
	  	var q = d3.geom.quadtree(nodes),
	    i = 0;
	  	while (++i < n) {
	    		q.visit(collide(nodes[i]));
	  	}
	  	svg.selectAll("circle")
	      	.attr("cx", function(d) { return d.x; })
	      	.attr("cy", function(d) { return d.y; });
	    svg.selectAll('line')
	    	.attr("x1", function(d) { return d.source.x; })
      		.attr("y1", function(d) { return d.source.y; })
      		.attr("x2", function(d) { return d.target.x; })
      		.attr("y2", function(d) { return d.target.y; });
	});

	var links = svg.selectAll('link')
        .data(links)
        .enter().append('line')
        .attr('x1', function(d) { return d.source.x })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; })
        .style('stroke', '#aaa')
        .style('stroke-width', 1);

	circle = svg.selectAll('circle')
		.data(nodes)
		.enter().append('circle')
		.style("fill", function(d){
			return randomColor({
   				luminosity: 'light',
   				hue: 'blue'
			});
		})
		.attr('r', function(d){
			return d.radius;
		})
		.on('click', function(){
			d3.select(this)
				.transition()
				.duration(1500)
				.attr("transform", "translate(200,0)")
				.fixed = true;
			var elem = d3.mouse(this);
			force.size([elem[0], elem[1]]);
			this.fixed  = true;
			force.start();
		})
		.call(force.drag);



	// Resolve collisions between nodes.
	function collide(node) {
	  var r = node.radius,
	      nx1 = node.x - r,
	      nx2 = node.x + r,
	      ny1 = node.y - r,
	      ny2 = node.y + r;
	  return function(quad, x1, y1, x2, y2) {
	    if (quad.point && (quad.point !== node)) {
	      var x = node.x - quad.point.x,
	          y = node.y - quad.point.y,
	          l = Math.sqrt(x * x + y * y),
	          r = node.radius + quad.point.radius;
	      if (l < r) {
	        l = (l - r) / l * .5;
	        node.x -= x *= l;
	        node.y -= y *= l;
	        quad.point.x += x;
	        quad.point.y += y;
	      }
	    }
	    return x1 > nx2
	        || x2 < nx1
	        || y1 > ny2
	        || y2 < ny1;
	  };
	}

	// Move nodes toward cluster focus.
	function gravity(alpha) {
		return function(d) {
			d.y += (d.cy - d.y) * alpha;
			d.x += (d.cx - d.x) * alpha;
		};
	}


	function zoom() {
  		svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

}
