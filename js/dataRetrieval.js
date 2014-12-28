var papers = new Array();
var authors = new Array();
var yearsArray = new Array();
var links = new Array();

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
      } else {

        var title = $(this).children().eq(1).children('b').children('a').text();
        var info = $(this).children().eq(1).children('i').text();

        var entry = {
          authors: getAuthors($(this).children().eq(1), title, year),
          title: title,
          info: info,
          year: year
        }

        papers.push(entry);
      }
    });
  }
  else { // error
    $("#loader").text("Failed retrieving data!");
  }

  //make the copy available from start
  authors_copy = authors;

  //calculate connections between authors
  calcLinks(authors);

  populateControls();

  // fire up inital d3 visualisation
  display();

};

var getAuthors = function(data, title, year){
  var allAuthors = data.text().split('\n')[0];
  var aut = allAuthors.split(',');

  for(var i=0; i<aut.length; i++){
    // delete space in front of name
    if(aut[i].indexOf(' ') == 0){
      aut[i] = aut[i].substring(1);
    }

    var exists = false;

    paper = {
      title: title,
      year: year
    }

    $.each(authors, function(index, obj){
      if(obj.author == aut[i]){
        obj.papers.push(paper);
        exists = true;
        return false;
      }
    });

    if(!exists){
      authors.push({author: aut[i], papers: [paper]});
    }
  }

  // return correct array of this paper's authors
  return aut;
};

// find any connection between authors (co-written papers)
// takes any authors array as param
var calcLinks = function(array){
  links = new Array();
  for(var i=0; i<array.length; i++){
    for(var j=0; j<array[i].papers.length; j++){
      var connections = findPaper(array[i].papers[j].title, i, array);
      for(var x=0; x<connections.length; x++){
        links.push(connections[x]);
      }
    }
  }
}

// find connection of a given paper
var findPaper = function(paper, index, array){
  var connections = new Array();
  for(var i=0; i<array.length; i++){
    for(var j=0; j<array[i].papers.length; j++){
      if(i != index && array[i].papers[j].title == paper) connections.push({source: index, target: i});
    }
  }
  return connections;
}
