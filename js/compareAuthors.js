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
  }
}

function clearComparison(){
  temp = candidate_one;
  compareMode = false;
  candidate_one = null;
  candidate_two = null;

  showDetailsPane(null,temp);
}


function compareContent(){
    $("#siderBar_papersContainer #sidePie").remove();
    $(".paperContainer").remove();
 
    if(candidate_two!=null){
      $("#siderBar_papersContainer").append("<p>Vergleich mit "+authors[candidate_two].author+"</p>");
    }
    else {
      $("#siderBar_papersContainer").append("<p>Vergleichspartner aussuchen</p>");
    }
}
