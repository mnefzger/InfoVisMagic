var compareMode = false; // compare two authors?
var candidate_one = null;
var candidate_two = null;
var flag_candidateReset = false;

var co_authors = Array();

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

}

function toggleCompareButton(){
  if($("#compare_authors_button").hasClass("active")){
    $("#compare_authors_button").removeClass("active");
    $("#compare_authors_button span").removeClass("glyphicon-eye-close");
    $("#compare_authors_button span").addClass("glyphicon-eye-open");
    clearComparison(candidate_one);
  }
  else {
    $("#compare_authors_button").addClass("active");
    $("#compare_authors_button span").removeClass("glyphicon-eye-open");
    $("#compare_authors_button span").addClass("glyphicon-eye-close");
    $("#author_name").text("Vergleich");
  }
}

function clearComparison(reset_candidate){
  flag_candidateReset = true;

  compareMode = false;
  candidate_one = null;
  candidate_two = null;

  showDetailsPane(null,reset_candidate);
  clearCompareInSVG(authors_copy[reset_candidate].author);
  flag_candidateReset = false;
}


function compareContent(){
    $("#siderBar_papersContainer #sidePie").remove();
    $(".paperContainer").remove();
    $("#siderBar_papersContainer").html('');

    $("#siderBar_papersContainer").append("<div id='authors'>"+
                                            "<div id='author1'>" + authors[candidate_one].author + "<div id='color1'></div></div>"+
                                            "<div id='author2'> <span class='missing_candidate'>Vergleichspartner aussuchen</span> </div>"+
                                          "</div>"+
                                          "<div class='separator'></div>"
                                          );

    if(candidate_two!=null){
      $("#author2").html(authors[candidate_two].author + "<div id='color2'></div>");
      $("#siderBar_papersContainer").append("<div id='bar1'><h4>Anzahl Paper:</h4></div>"+
                                            "<div id='bar2'><h4>Anzahl Co-Autoren:</h4></div>");


      // count co auhors
      co_authors[candidate_one] = 0;
      co_authors[candidate_two] = 0;
      for(i=0; i<links.length; i++){
        if(links[i].source == candidate_one){
          co_authors[candidate_one]++;
        }
        else if(links[i].source == candidate_two){
          co_authors[candidate_two]++;
        }
      }

      console.log("co authors: "+co_authors[candidate_one] +" | "+co_authors[candidate_two]);
      makeBarCharts(candidate_one, candidate_two);
    }


    function makeBarCharts(index1, index2){
      d3.selectAll('circle')
      .style('opacity', 0.2)
      .style('fill', function(d){return d.color});

      svg.selectAll("line").remove();

      var a1 = d3.selectAll('circle').filter(function(d, i) { return d.name == authors_copy[index1].author ; });
      var a2 = d3.selectAll('circle').filter(function(d, i) { return d.name == authors_copy[index2].author ; });
      a1.style('fill', '#AEE239').style('opacity', 1);
      a2.style('fill', '#FA6900').style('opacity', 1);


      var data = [authors_copy[index1].papers.length, authors_copy[index2].papers.length];

      var bar1SVG = d3.select("#bar1").append("svg")
      .data([data])
      .attr("width", 375)
      .attr("height", 80)
      .append("g")
      .attr("transform", "translate(20 , 10)");


      var scale = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 325]);

      var bars = bar1SVG.selectAll("g.bars")
      .data(data)
      .enter().append("svg:g");

      bars.append("rect")
      .attr("width", function(d) { return 0; })
      .attr("height", 20)
      .attr("y", function(d,i){return i*25;})
      .style("fill", function(d,i){
        if(i==0) return '#AEE239';
        return '#FA6900';
      })
      .transition()
      .duration(250)
      .attr("width", function(d) { return scale(d); });

      bars.append("text")
      .attr("text-anchor", "middle")
      .text(function(d) { return d; })
      .style('fill', '#fff')
      .attr("transform", function(d, i) {
        if(i==0) return "translate(" + (scale(data[i])+15) + "," + 15 + ")";
        return "translate(" + (scale(data[i])+15) + "," + (i*40) + ")";
      });


      // Co authors Bar
      console.log(co_authors[index1]);
      var data2 = [co_authors[index1], co_authors[index2]];

      var bar2SVG = d3.select("#bar2").append("svg")
      .data([data2])
      .attr("width", 375)
      .attr("height", 80)
      .append("g")
      .attr("transform", "translate(20 , 10)");


      var scale = d3.scale.linear()
      .domain([0, d3.max(data2)])
      .range([0, 325]);

      var bars2 = bar2SVG.selectAll("g.bars")
      .data(data2)
      .enter().append("svg:g");

      bars2.append("rect")
      .attr("width", function(d) { return 0; })
      .attr("height", 20)
      .attr("y", function(d,i){return i*25;})
      .style("fill", function(d,i){
        if(i==0) return '#AEE239';
        return '#FA6900';
      })
      .transition()
      .duration(250)
      .attr("width", function(d) { return scale(d); });

      bars2.append("text")
      .attr("text-anchor", "middle")
      .text(function(d) { return d; })
      .style('fill', '#fff')
      .attr("transform", function(d, i) {
        if(i==0) return "translate(" + (scale(data2[i])+15) + "," + 15 + ")";
        return "translate(" + (scale(data2[i])+15) + "," + (i*40) + ")";
      });
    }

}
