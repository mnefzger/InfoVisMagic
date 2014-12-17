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
         if(authors_copy[i].papers.length == 0){ // delete author from array, if no papers left
           authors_copy.splice(i,1);
         }
     }

    console.log("filtered: "+ authors_copy[1].papers.length);

    // Update instructionen für die Visualisierung......
}


function isInYears(element, i, array) {
  if(selected_years.indexOf(element.year) == -1){
    return false;
  }
  else {
    return true;
  }
}
