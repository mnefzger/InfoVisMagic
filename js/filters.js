var selected_years = yearsArray; // instantiate with all years selected.
var authors_copy = new Array();

function updateYearFilter(){


   selected_years = new Array(); // empty array
    $('#year_picker option:selected').each(function() {
      selected_years.push($(this).val());
    });


    authors_copy = $.extend(true, [], authors);

    for(var i=0; i<authors_copy.length; i++){
        authors_copy[i].papers = authors_copy[i].papers.filter(isInYears);
    }

    authors_copy = authors_copy.filter(isEmpty);

    // Update instructionen für die Visualisierung......
    nodes = new Array();
    for(var i=0; i<authors_copy.length; i++){
      nodes.push({
        radius: Math.max(10, linearScale(authors_copy[i].papers.length)),
        color: 'red',
        name: authors_copy[i].author
      });
    }

    force.charge(-20)
    .nodes(nodes)
    .links(links)
    .size([WIDTH, HEIGHT]);
    updateForceField();
}

function isEmpty(element){
  if(element.papers.length == 0) return false;
  return true;
}


function isInYears(element, i, array) {
  if(selected_years.indexOf(element.year) == -1){
    return false;
  }
  else {
    return true;
  }
}

function updateForceField(){
  circle = circle.data(force.nodes());

  // circle.enter().append('circle')
  // .style("fill", function(d){
  //   return randomColor({
  //     luminosity: 'light',
  //     hue: 'blue'
  //   });
  // })
  // .attr('r', function(d){
  //   return d.radius;
  // })
  // .on('click', function(){
  //   d3.select(this)
  //   .transition()
  //   .duration(1500)
  //   .attr("transform", "translate(200,0)")
  //   .fixed = true;
  //   var elem = d3.mouse(this);
  //   force.size([elem[0], elem[1]]);
  //   this.fixed  = true;
  //   force.start();
  // })
  // .call(force.drag);
  //
  // circle.exit().remove();
  //
  // force.start();

}
