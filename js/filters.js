var selected_years = yearsArray; // instantiate with all years selected.

function updateYearFilter(){

   selected_years = new Array(); // empty array
    $('#year_picker option:selected').each(function() {
      selected_years.push($(this).val());
    });

    console.log(authors[1].papers.length);

    authors_copy = authors;

     for(var i=1; i<authors.length; i++){
         authors_copy[i].papers = authors[i].papers.filter(isInYears);
     }


    console.log("filtered: "+ authors_copy[1].papers.length);

    nodes = new Array();

    for(var j=0; j<authors.length; j++){
      nodes.push({
        radius: Math.max(5, authors[j].papers.length),
        color: 'red',
        cx: Math.random()*(WIDTH-this.radius),
        cy: Math.random()*(HEIGHT-this.radius)
      });
    }

    force.nodes(nodes).start();
}


function isInYears(element, i, array) {
  if(selected_years.indexOf(element.year) == -1){
    return false;
  }
  else {
    return true;
  }
}
