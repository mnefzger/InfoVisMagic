function populateControls(){

  // Year picker
  $("#year_picker").append("<h2>Veröffentlichungsjahr</h2>");

  for(i in yearsArray){
    $("#year_picker").append("<option value="+yearsArray[i]+" class='yearPicker_"+yearsArray[i]+"' selected>"+yearsArray[i]+"</option>");
  }

    $('#year_picker').multiselect({
      maxHeight: 200,
      buttonWidth: '180px',
      buttonContainer: '<div class="btn-group year_picker_container" />',
      onChange: function(element, checked) {
      //  if(checked === true) {
      updateYearFilter();
      //  }
      },
      allSelectedText: 'Alle ausgewählt',
      nSelectedText: ' Jahre gewählt',
      nonSelectedText: 'Kein Jahr gewählt'
  });

}
