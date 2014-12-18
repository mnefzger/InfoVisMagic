var selected_years = yearsArray; // instantiate with all years selected.

function updateYearFilter(){
   var authors_copy = new Array();

   selected_years = new Array(); // empty array
    $('#year_picker option:selected').each(function() {
      selected_years.push($(this).val());
    });


    authors_copy = $.extend(true, [], authors);

    for(var i=0; i<authors_copy.length; i++){
        authors_copy[i].papers = authors_copy[i].papers.filter(isInYears);
    }

    var authors_copy = authors_copy.filter(isEmpty);

    // Update instructionen für die Visualisierung......
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
