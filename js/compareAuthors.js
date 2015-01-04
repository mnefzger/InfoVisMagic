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

 toggleCompareButton();
 
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
  compareMode = false;
  candidate_one = null;
  candidate_two = null;
}
