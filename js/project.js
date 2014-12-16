var display =  function(){	
	var HEIGHT = 500;
	var WIDTH = 1000;

	padding = 2,
	maxRadius = 150; // separation between nodes

	var n = authors.length, // total number of nodes
	m = 1; // number of distinct clusters

	var getData = function(){
		return authors;
	}


	//create svg area
	var svg = d3.select("#container").append("svg")
	.attr("width", WIDTH)
	.attr("height", HEIGHT);

	var nodes = new Array();

	for(var j=0; j<n; j++){
		nodes.push({
			radius: Math.max(5, authors[j].papers.length),
			color: 'red',
			cx: Math.random()*(WIDTH-this.radius),
			cy: Math.random()*(HEIGHT-this.radius)
		});
	}

	// Move nodes toward cluster focus.
	function gravity(alpha) {
		return function(d) {
			d.y += (d.cy - d.y) * alpha;
			d.x += (d.cx - d.x) * alpha;
		};
	}

	// Resolve collisions between nodes.
	function collide(node) {
	  var r = node.radius + padding,
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

	var force = d3.layout.force()
    .gravity(0)
    .charge(5)
    .friction(0)
    .distance(20)
    .nodes(nodes)
    .size([WIDTH, HEIGHT])
    .start();

    force.on("tick", function(e) {
	  	var q = d3.geom.quadtree(nodes),
	    i = 0,
	    n = nodes.length;
	  	while (++i < n) {
	    		q.visit(collide(nodes[i]));
	  	}
	  	svg.selectAll("circle")
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	});

	var circle = svg.selectAll('circle')
		.data(nodes)
		.enter().append('circle')
		.style("fill", function(d){
			return randomColor();
		})
		.attr('r', function(d){
			return d.radius;
		})
		.call(force.drag);

}
