var compareMode = false; // compare two authors?
var candidate_one = null;
var candidate_two = null;

function compareAuthors(authorIndex, candidate){ // set candidate to determine which candidate is overwritten
 compareMode = true;

 if(candidate_one == null){
   candidate_one = authorIndex;
 }
 else if(candidate_two == null){
   candidate_two = authorIndex;
 }

 if(candidate == 1){
   candidate_one = authorIndex;
 }
 else if (candidate == 2){
   candidate_two = authorIndex;
 }

 if(compareMode == true){
 compareContent();
 }
 console.log("compare: "+candidate_one +" | "+candidate_two);

}

function toggleCompareButton(){
  if($("#compare_authors_button").hasClass("active")){
    $("#compare_authors_button").removeClass("active");
    $("#compare_authors_button span").removeClass("glyphicon-eye-close");
    $("#compare_authors_button span").addClass("glyphicon-eye-open");
    clearComparison();
  }
  else {
    $("#compare_authors_button").addClass("active");
    $("#compare_authors_button span").removeClass("glyphicon-eye-open");
    $("#compare_authors_button span").addClass("glyphicon-eye-close");
    $("#author_name").text("Vergleich");
  }
}

function clearComparison(){
  temp = candidate_one;
  compareMode = false;
  candidate_one = null;
  candidate_two = null;


  /*

  TODO: temp is always Alexander Wiethoff...?

  */



  showDetailsPane(null,temp);
  clearCompareInSVG(authors_copy[temp].author);
}


function compareContent(){
    $("#siderBar_papersContainer #sidePie").remove();
    $(".paperContainer").remove();
    $("#siderBar_papersContainer").html('');

    $("#siderBar_papersContainer").append("<div id='authors'>"+
                                            "<div id='author1'>" + authors[candidate_one].author + "<div id='color1'></div></div>"+
                                            "<div id='author2'> Vergleichspartner aussuchen </div>"+
                                          "</div>"+
                                          "<div class='separator'></div>"
                                          );
 
    if(candidate_two!=null){
      $("#author2").html(authors[candidate_two].author + "<div id='color2'></div>");
      $("#siderBar_papersContainer").append("<div id='bar1'><h4>Anzahl Paper:</h4></div>"+
                                            "<div id='bar2'><h4>Anzahl Co-Autoren:</h4></div>");
      makeBarCharts(candidate_one, candidate_two);
    }

    
}
