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
          name: authors_copy[i].author,
          size: Math.max(1, linearScale(authors_copy[i].papers.length)),
          paperCount: authors_copy[i].papers.length
      });
    }

    var json = {
        "name":"root",
        "children": nodes 
    };

    drawCircles(json);

    calcLinks(authors_copy);


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


