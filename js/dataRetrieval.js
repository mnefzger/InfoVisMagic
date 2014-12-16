var papers = new Array();
var authors = new Array();
var yearsArray = new Array();

$(document).ready(function() {

  /*$.ajax({
  url: "http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all",
  success: success
});*/

$.ajax({
  url: "helper.php",
  success: success, // we always get succes as long as localhost that retrieves the actual Data is online
  error: failure
});

});

function failure(){
  $("#loader").text("Failed retrieving data! Is localhost online?");
}

function success(data){

  if(data != false){ // data is here!
    $("#loader").hide();
    $("#overlay").hide();
    $(".raw_data").html(data);

    table = $(".pubdb");
    var year;

    articles = $(".pubdb tbody tr").each(function() {
      // set year
      if($(this).children().length < 2){
        year = $(this).children('.year_separator').children('b').text();
        yearsArray.push(year);
      }

      var title = $(this).children().eq(1).children('b').children('a').text();
      var info = $(this).children().eq(1).children('i').text();

      var entry = {
        authors: getAuthors($(this).children().eq(1), title),
        title: title,
        info: info,
        year: year
      }

      papers.push(entry);
    });
  }
  else { // error
    $("#loader").text("Failed retrieving data!");
  }

  display();
  populateControls();
};

var getAuthors = function(data, title){
  var allAuthors = data.text().split('\n')[0];
  var aut = allAuthors.split(',');

  for(var i=0; i<aut.length; i++){
    // delete space in front of name
    if(aut[i].indexOf(' ') == 0){
      aut[i] = aut[i].substring(1);
    }
    // fill in authors array
    var exists = false;
    $.each(authors, function(index, obj){
      if(obj.author == aut[i]){
        obj.papers.push(title);
        exists = true;
        return false;
      }
    });
    if(!exists){
      authors.push({author: aut[i], papers: [title]});
    }
  }
  return aut;
};
