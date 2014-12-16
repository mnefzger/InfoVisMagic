var selected_years = yearsArray; // instantiate with all years selected.

function updateYearFilter(){

   selected_years = new Array(); // empty array
    $('#year_picker option:selected').each(function() {
      selected_years.push($(this).val());
    });

console.log(selected_years);
}
