var nodes;
var force;
var HEIGHT = window.innerHeight-5;
var WIDTH = $("#container").width();
var prev_click;

var linearScale;
var circle;
var bubble;
var svg;

var display =  function(){
	var n = authors.length;

	//create svg area
	svg = d3.select("#container").append("svg")
		.attr("width", WIDTH)
		.attr("height", HEIGHT)
		.attr("shape-rendering", "auto")
		.append("g")
    	.call(d3.behavior.zoom().scaleExtent([0.2, 10]).on("zoom", zoom));

    //create white background
    var background = svg.append('rect')
    	.style('fill','white')
    	.attr('width', 10000)
    	.attr('height', 10000)
    	.on('click', function(){
    		svg.selectAll("line").remove();
    		d3.selectAll('circle')
    			.attr('opacity',1)
    			.attr('r', function(d){return d.r})
    			.style('fill', function(d){return d.color});
    		details_showing = false;
			hideDetailsPane();
    	});

    //scale data to fit screen
    linearScale = d3.scale.linear().domain([0,2]);

    // fill nodes on startup
	nodes = new Array();
	for(var j=0; j<n; j++){
		nodes.push({
			name: authors[j].author,
			size: Math.max(1, linearScale(authors[j].papers.length)),
			paperCount: authors[j].papers.length,
			color: randomColor({luminosity: 'light', hue: 'blue'})
		});
	}

	//
	var	data = {
    		"name":"root",
			"children": nodes
			};

   	bubble = d3.layout.pack()
	    .sort(function(a,b){
	    	return b.value-a.value;
	    })
	    .size([WIDTH-300, HEIGHT])
	    .padding(10);

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


	details_showing = false;
	current_name = "";
	node.enter().append("circle")
	    .attr("transform", function(d,i) { return "translate(" + d.x  + "," + d.y + ")"; })
	    .attr("r", function(d) { return 0; })
		.style("fill", 'blue')
		.style("stroke-width",4)
		.on('mouseover', function(d,i){
			d3.select(this)
				.style('stroke', 'blue');
			showDetailsTooltip(d,i);
		})
		.on('mouseleave', function(d,i){
			d3.select(this)
				.style('stroke', '');
				hideDetailsTooltip(d,i);
		})
		.on('click', function(d,i){
			// show/hide slide in Panel
			if(details_showing == true && d.name == current_name){
				details_showing = false;
				hideLinks();
				hideDetailsPane();
			}
			else{
				current_name = d.name;
				details_showing = true;
				showLinks(i);
				showDetailsPane(d,i);
			}


			d3.selectAll("circle")
				//.attr('r', function(d){return d.r})
				.style('fill', function(d){return d.color});

			d3.select(this)
				//.attr("r", function(d){return d.r+d.r*0.25})
				.style('fill', 'red');
		})
	    .transition()
	    .duration(500)
	    .delay(function(d,i){return d.r})
	    .attr("r", function(d) { return d.r; })
	    .style("fill", function(d) {
			return d.color;
		});



    function showLinks(index){
    	svg.selectAll("line").remove();
    	d3.selectAll('circle').attr('opacity',1);

    	var links_copy = new Array();
    	links_copy = $.extend(true, [], links);
    	links_copy = links_copy.filter(function(element, i, array){
    		if(element.source != index)   return false;
			else return true;
    	});

    	var d3Links = svg.selectAll('link')
	        .data(links_copy)
	        .enter().append('line')
	        .attr('x1', function(d,i) { return node[0][d.source].transform.animVal[0].matrix.e; })
	        .attr('y1', function(d,i) { return node[0][d.source].transform.animVal[0].matrix.f; })
	        .attr('x2', function(d,i) { return node[0][d.source].transform.animVal[0].matrix.e; })
	        .attr('y2', function(d,i) { return node[0][d.source].transform.animVal[0].matrix.f; })
	        .style('stroke', '#222')
	        .style('stroke-width', 2)
	        .transition()
	    	.duration(500)
	    	.attr('x2', function(d,i) { return node[0][d.target].transform.animVal[0].matrix.e; })
	        .attr('y2', function(d,i) { return node[0][d.target].transform.animVal[0].matrix.f; });

	    var targets = new Array();
	    for(var i=0; i<links_copy.length; i++){
	    	targets.push(authors_copy[links_copy[i].target].author);
	    }

	    d3.selectAll('circle')
	    .attr('opacity', function(d,i){
	    	if(targets.indexOf(d.name) == -1 && d.name != authors_copy[index].author){
	    		return 0.1;
	    	}
	    	d3.select(this).moveToFront();
	    	return 1;
	    })
    }


  function hideLinks(){
		svg.selectAll("line").remove();
		d3.selectAll('circle').attr('opacity',1);
	}


	function classes(root) {
	  var classes = [];

	  function recurse(name, node) {
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, name: node.name, value: node.size, paperCount: node.paperCount, color: node.color});
	  }

	  recurse(null, root);
	  return {children: classes};
	}
}

function createPie(){
		var data = [{"label":"one", "value":20},
            {"label":"two", "value":50},
            {"label":"three", "value":30}];

		var smallSVG = d3.select("#sidePie").append("svg")
			.data([data])
			.attr("width", 400)
			.attr("height", 250)
			.append("g")
    		.attr("transform", "translate(" + 400 / 2 + "," + 250 / 2 + ")");

		var arc = d3.svg.arc()
    		.innerRadius(50)
    		.outerRadius(100);

		var pie = d3.layout.pie()
		    .value(function(d,i) { return d.value; });

    	var arcs = smallSVG.selectAll("g.slice")
    		.data(pie)
    		.enter().append("svg:g")
    		.attr("class", "slice");

        arcs.append("path")
                .attr("fill", function(d, i) { return randomColor(); } )
                .attr("d", function(d){return arc(d)});

        arcs.append("svg:text")
            .attr("transform", function(d) {
                d.innerRadius = 60;
                d.outerRadius = 100;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d, i) { return data[i].label; });
    }

//Simulate click on node when using textual search
function pickAuthor(author){
	var e = document.createEvent('UIEvents');
	e.initUIEvent('click', true, true, window, 1);

	var elem = d3.selectAll("circle").filter(function(d, i) { return d.name == author; });
	elem.node().dispatchEvent(e);
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
	svg.selectAll("line").remove();
}
