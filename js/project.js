	var content;
	var papers = new Array();
	var authors = new Array();
	/*var HEIGHT = window.innerHeight;
	var WIDTH = window.innerWidth;*/
	var HEIGHT = 800;
	var WIDTH = 1000;

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


	$(document).ready(function() {

		/*$.ajax({
			url: "http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all",
		  	success: success
		});*/

		$.ajax({
			url: "helper.php",
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
		//console.log(authors);
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
	        .style("opacity",0);
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
				return authors[i].papers.length/10;
			});
			/*.style("font-size", function(d,i){
				return authors[i].papers.length;
			});*/
			    
	}
