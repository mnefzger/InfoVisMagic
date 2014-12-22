var nodes;
var force;
var HEIGHT = window.innerHeight-5;
var WIDTH = $("#container").width();

var linearScale;
var circle;
var bubble;
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
			name: authors[j].author,
			size: Math.max(1, linearScale(authors[j].papers.length)),
			paperCount: authors[j].papers.length
		});
	}

	var	data = {
    		"name":"root",
			"children": nodes
			};

   bubble = d3.layout.pack()
    .sort(null)
    .size([WIDTH, HEIGHT])
    .padding(1.5);

	drawCircles(data);

	function zoom() {
  		svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

}

function drawCircles (json){
	refreshSvg();

	var node = svg.selectAll(".node")
	    .data(bubble.nodes(classes(json))
	    	  .filter(function(d) { return !d.children; }));

	node.enter().append("circle")
	    .attr("transform", function(d,i) { return "translate(" + d.x  + "," + d.y + ")"; })
	    .attr("r", function(d) { return 0; })

	    .style("fill", 'blue')
	    .style("stroke-width",2)
	    .on('mouseover', function(d,i){
			d3.select(this)
				.style('stroke', 'red');
			showDetailsTooltip(d,i);
		})
		.on('mouseleave', function(d,i){
			d3.select(this)
				.style('stroke', '');
				hideDetailsTooltip(d,i);
		})
		.on('click', function(d,i){
			d3.select(this)
			//.moveToFront()
			/*.transition()
        	.duration(500)
        	.attr("r", function(d) { return 250; })
        	.style("stroke", '#000');*/

		})
        .transition()
        .duration(500)
        .delay(function(d,i){return Math.random()*1000})
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) {
	    	return randomColor({
   				luminosity: 'light',
   				hue: 'blue'
			})
		});

	function classes(root) {
	  var classes = [];

	  function recurse(name, node) {
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, name: node.name, value: node.size, paperCount: node.paperCount});
	  }

	  recurse(null, root);
	  return {children: classes};
	}
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

function refreshSvg(){
	svg.selectAll("circle").remove();
}
