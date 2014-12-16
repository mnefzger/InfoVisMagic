function populateControls(){

  // Year picker
  $("#year_picker").append("<h2>Veröffentlichungsjahr</h2>");

  for(i in yearsArray){
    $("#year_picker").append("<option value="+yearsArray[i]+" class='yearPicker_"+yearsArray[i]+"'>"+yearsArray[i]+"</option>");
  }



    $('#year_picker').multiselect();

}
