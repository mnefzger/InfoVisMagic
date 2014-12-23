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
        updateYearFilter();
      },
      allSelectedText: 'Alle ausgewählt',
      nSelectedText: ' Jahre gewählt',
      nonSelectedText: 'Kein Jahr gewählt',
      includeSelectAllOption: true
  });

}


var tooltip_timeout;
// opens a tooltip on mouseover
function showDetailsTooltip(node, index){
  clearTimeout(tooltip_timeout);

  $("#tooltip").fadeIn(200);
  $("#tooltip").css("position", "absolute");
  $("#tooltip").css("top", node.y + 20);
  $("#tooltip").css("left", node.x);
  $('#author').text(node.name);
  $('#papers').text("Anzahl Paper: " + node.paperCount);
  $('#author_img').attr('src','./img/'+node.name+'.jpg');
}
function hideDetailsTooltip(node, index){
  tooltip_timeout = setTimeout(function(){
    $("#tooltip").fadeOut(200);
  }, 70);
}


//show Details Pane
function showDetailsPane(node, index){

 console.log(authors[1].papers);

  $("#slideInPanel").append("<div id='siderBar_papersContainer'></div>")

  for(i=0; i<authors[index].papers.length; i++){
    $("#siderBar_papersContainer").append(
      "<div class='paperContainer'>"
      + "<a href='#'>"
      +   authors[index].papers[i].title
      + "</a>"
      +"</div>"
    );

  }

  $("#slideInPanel").animate({width:'250px'},150);
}

function hideDetailsPane(){
    $("#slideInPanel").animate({width:'0px'},150);
}
