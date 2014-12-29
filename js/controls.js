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

  // $('#author_picker').keypress(function(event) {
  //   if ( event.which == 13 ) {
  //     event.preventDefault();
  //     pickAuthor($(this).val());
  //   }
  // });

  $('#author_picker').typeahead({source: getOnlyNames(authors),
                                 afterSelect: function(item){
                                   pickAuthor(item);
                                 }
                               });

}


// return an array with only the names of all authors -> Autocomplete
function getOnlyNames(authors_array){
  array = new Array();

  for(i=0; i<authors_array.length; i++){
    array.push(authors_array[i].author);
  }
  return array;
}


var tooltip_timeout;
// opens a tooltip on mouseover
function showDetailsTooltip(node, index){
  clearTimeout(tooltip_timeout);

  $("#tooltip").fadeIn(200);
  $("#tooltip").css("position", "absolute");
  $("#tooltip").css("top", node.y + 100);
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


function showDetailsPane(node, index){
 $("#slideInPanel").html('');

 $("#slideInPanel").append("<h3 id='author_name'>" + authors_copy[index].author + "</h3>");
 $("#slideInPanel").append("<div id='siderBar_papersContainer'></div>");

 $("#siderBar_papersContainer").append("<div id='sidePie'></div>");
 createPie();

  for(i=0; i<authors_copy[index].papers.length; i++){
    $("#siderBar_papersContainer").append(
        "<div class='paperContainer'>"
      +   "<a href='" + authors_copy[index].papers[i].url + "' target='_blank'>"
      +     "<strong>"+ authors_copy[index].papers[i].year + "</strong> | " + authors_copy[index].papers[i].title
      +   "</a>"
      + "</div>"
    );
  }



  $("#slideInPanel").animate({width:'400px'},150);
}

function hideDetailsPane(){
    $("#slideInPanel").animate({width:'0px'},150);
}
