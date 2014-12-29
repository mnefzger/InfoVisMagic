var compareMode = false; // compare two authors?
var candidate_one = null;
var candidate_two = null;

function compareAuthors(authorIndex){
 compareMode = true;

  if(candidate_one == null){
    candidate_one = authorIndex;
  }
  else if(candidate_two==null){
      candidate_two = authorIndex;
  }

  if(candidate_one == null || candidate_two == null) {
    $(".compare_button_"+authorIndex).text("Wähle Vegleichspartner");
  }
  disableCompareButtons();

 // right comparison summary
 $("#compare_wrap").remove(); // empty first and recreate each time (refresh)
 $("#compare_container").show();
  $("#compare_container").html("<h2>Vergleiche:</h2><div id='compare_wrap'></div>");
  if(candidate_one !=null){
  $("#compare_wrap").append("<p>"+authors[candidate_one].author+" <a class='clearCandidate' onClick='javascript:clearCandidate(1)'>X</a></p>")
  }
  else{
    $("#compare_wrap").append("<p>Kandidaten Wählen!</p>");
  }
  if(candidate_two !=null){
    $("#compare_wrap").append("<p>VS.</p>")
    $("#compare_wrap").append("<p>"+authors[candidate_two].author+" <a class='clearCandidate' onClick='javascript:clearCandidate(2)'>X</a></p>")
  }


  // comparison field
  if(candidate_one!=null){
    $("#slideInPanel").html("");
    $("#slideInPanel").animate({width:'300px'},150);
    $("#slideInPanel2").animate({right:'300px'},150);

    comparisonPanesContent(candidate_one, "slideInPanel");
  }
  else{
    hideDetailsPane();
    $("#slideInPanel2").animate({right:'0px'},150);
  }

  if(candidate_two!=null){
    $("#slideInPanel2").show(150);
    $("#slideInPanel2").html("");
    $("#slideInPanel2").animate({width:'300px'},150);

    comparisonPanesContent(candidate_two, "slideInPanel2");
  }
  else {
    $("#slideInPanel2").hide(150);
  }

}


function comparisonPanesContent(authorIndex, panel){
  $("#"+panel).append("<h3 id='author_name'>" + authors_copy[authorIndex].author + "</h3>");
}

function clearComparison(){
  compareMode = false;
  $("#compare_container").hide();
  $("#slideInPanel").animate({width:"0px"},150);
  $("#slideInPanel2").hide(150);
}


function clearCandidate(number){

  if(number == 1){
    candidate_one = null;
  }
  else {
    candidate_two = null;
  }

  if(candidate_one == null && candidate_two == null){
    clearComparison();
  }
  else {
    compareAuthors(); // refresh!
  }
}

function disableCompareButtons(){
  $(".compare_button_"+candidate_one).addClass("disabled");
  $(".compare_button_"+candidate_two).addClass("disabled");
}
