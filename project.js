	var content;
	var papers = new Array();
	var authors = new Array();

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
			if($(this).children().length > 1){
				var title = $(this).children().eq(1).children('b').children('a').text();
				var info = $(this).children().eq(1).children('i').text();

				var entry = {
					authors: getAuthors($(this).children().eq(1), title), 
					title: title,
					info: info
				}

				papers.push(entry);
			}
		});
		//console.log(papers);
		console.log(authors);
		makeItHappen();
	};

	var getAuthors = function(data, title){
		var allAuthors = data.text().split('\n')[0];
		var aut = allAuthors.split(',');
		
		for(var i=0; i<aut.length; i++){
			// delete space in front of name
			if(aut[i].indexOf(' ') == 0){
				aut[i] = aut[i].substring(1);
			}
			// fill in authors array
			var exists = false;
			$.each(authors, function(index, obj){
				if(obj.author == aut[i]){
					obj.papers.push(title);
					exists = true;
					return false;
				}
			});
			if(!exists){
				authors.push({author: aut[i], papers: [title]});
			}
		}
		return aut;
	};

	var makeItHappen =  function(){
		var data = [];
		for(i=0;i<authors.length; i++){
	    	data.push(authors[i].author);
		}  

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
	        } );


	    items
			.data(data)
			.enter().append('text')
			.text(function(d,i){return data[i]})
	        .attr("x", function(d,i){return (i%10)*180;})
	        .attr("y", function(d,i){return Math.floor(i/10)*30 +15})
	        .style("opacity",0);
			
		container.selectAll('rect')
			.transition()
			.duration(250)
			.delay(function(d,i){return i*25})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", 1);
		container.selectAll('text')
			.transition()
			.duration(250)
			.delay(function(d,i){return i*25})
			.each("start", function() { d3.select(this).style("opacity", "0"); })
			.ease("linear")
			.style("opacity", 1);
			    
	}
