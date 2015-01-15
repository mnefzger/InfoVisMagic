var selected_years = yearsArray; // instantiate with all years selected.
var authors_copy = new Array();
var papers_copy = new Array();
var compareTemp1;
var compareTemp2;


function updateYearFilter(){
   selected_years = new Array(); // empty array
    $('#year_picker option:selected').each(function() {
      selected_years.push($(this).val());
    });

    if(compareMode &&
       authors_copy[candidate_one] != undefined && 
       authors_copy[candidate_two] != undefined){
          compareTemp1 = authors_copy[candidate_one].author;
          compareTemp2 = authors_copy[candidate_two].author;
    }

    //create deep copy of authors
    authors_copy = $.extend(true, [], authors);
    papers_copy = $.extend(true, [], papers);
    

    for(var i=0; i<authors_copy.length; i++){
        authors_copy[i].papers = authors_copy[i].papers.filter(isInYears);
    }

    //remove authors with empty papers
    authors_copy = authors_copy.filter(isEmpty);
    papers_copy = papers_copy.filter(isInYears);

    // Update nodes of visualisation......
    nodes = new Array();
    for(var i=0; i<authors_copy.length; i++){
      nodes.push({
          name: authors_copy[i].author,
          size: Math.max(1, linearScale(authors_copy[i].papers.length)),
          paperCount: authors_copy[i].papers.length,
          color: randomColor({luminosity: 'light', hue: 'blue'})
      }); 

      if(compareMode){
        if(authors_copy[i].author == compareTemp1) candidate_one = i;
        if(authors_copy[i].author == compareTemp2) candidate_two = i;
      }
    }

    var json = {
        "name":"root",
        "children": nodes 
    };

    drawCircles(json);

    calcLinks(authors_copy);

    // remember the old selection
    if(selected_author != '' && !compareMode) {
      pickAuthor(selected_author);
    }

    if(compareMode){
      compareAuthors(candidate_one, 1);
      compareAuthors(candidate_two, 2);
    }
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


