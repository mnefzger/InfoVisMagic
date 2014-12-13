	var content;
	var papers = new Array();

	$(document).ready(function() {

		$.ajax({
			url: "http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all",
		  	success: success
		});

	 });

	function success(data){
		content = data;

		$(".loader").hide();
		$(".raw_data").html(content);

		table = $(".pubdb");

		articles = $(".pubdb tbody tr").each(function() {

			var entry = {
				authors: getAuthors($(this).children().eq(1)), 
				title: $(this).children().eq(1).children('b').children('a').text(),
				info: $(this).children().eq(1).children('i').text()
			}

			papers.push(entry);
		});

		makeItHappen();
	};

	var getAuthors = function(data){
		var allAuthors = data.text().split('\n')[0];
		var authors = allAuthors.split(',')
		return authors;
	};


	var makeItHappen =  function(){
		var data = [];
		for(i=0;i<papers.length; i++){
	    	data.push(papers[i].authors[0]);
		} 
		console.log(data.length); 

		var container = d3.select('#container')
			.append('svg')
			.attr('width', 1000)
			.attr('height', 1000);

		var items = container.selectAll('rect');
		items
			.data(data)
			.enter().append('rect')
			.style("stroke", "gray")
	        .style("fill", "white")
	        .attr("width", 175)
	        .attr("height", 25)
	        .attr("x", function(d,i){return 10})
	        .attr("y", function(d,i){return (i*30)+15})
	        .style("opacity",0)
	        .on( 'mouseenter', function() {
	          // select element in current context
	          d3.select( this )
	            .transition()
	            .style( 'fill', '#ddd' );
	        } )
	        .on( 'mouseleave', function() {
	          // select element in current context
	          d3.select( this )
	            .transition()
	            .style( 'fill', 'white' );
	        } );


	    items
			.data(data)
			.enter().append('text')
			.text(function(d,i){return data[i]})
	        .attr("x", function(d,i){
	        	return 10;
	        })
	        .attr("y", function(d,i){return (i*30)})
	        .style("opacity",0);
			
		container.selectAll('rect')
			.transition()
			.duration(1000)
			.delay(function(d,i){return i*50})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", 1);
		container.selectAll('text')
			.transition()
			.duration(1000)
			.delay(function(d,i){return i*50})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", 1);
			    
	}
