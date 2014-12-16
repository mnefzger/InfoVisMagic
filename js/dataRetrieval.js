var papers = new Array();
var authors = new Array();
var content;

$(document).ready(function() {

  /*$.ajax({
  url: "http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all",
  success: success
});*/

$.ajax({
  url: "helper.php",
  success: success
});

});

function success(data){
  content = data;

  $(".loader").hide();
  $(".raw_data").html(content);

  table = $(".pubdb");

  articles = $(".pubdb tbody tr").each(function() {
    if($(this).children().length > 1){
      var title = $(this).children().eq(1).children('b').children('a').text();
      var info = $(this).children().eq(1).children('i').text();

      var entry = {
        authors: getAuthors($(this).children().eq(1), title),
        title: title,
        info: info
      }

      papers.push(entry);
    }
  });

  display();
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
