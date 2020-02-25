// Generate svg

var margin = {top: 60, right: 0, bottom: 120, left: 100};
var width = 1000 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;

// var svg = d3.select("#barchart")
//     .append("svg")
//     .attr("width", width + margin.right + margin.left)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

var svg = d3.select("#barchart2")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  // .attr('viewBox','-50 -50 1000 500')
  // .attr('preserveAspectRatio','xMinYMin');

// Define data

var data = [
  {acompensation: 68159, year: 2007},
  {acompensation: 69740, year: 2008},
  {acompensation: 70787, year: 2009},
  {acompensation: 74025, year: 2010},
  {acompensation: 77293, year: 2011},
  {acompensation: 77593, year: 2012},
  {acompensation: 81342, year: 2013},
  {acompensation: 83859, year: 2014},
  {acompensation: 86510, year: 2015},
  {acompensation: 89590, year: 2016},
  {acompensation: 92317, year: 2017}
];


// Define scales


// var xScale = d3.scaleBand()
//     .domain([2007, 2017])
//     .range([0, xScale.bandwidth()])

var xScale = d3.scaleBand()
.domain(data.map(function(d) { return d.year; }))
.rangeRound([margin.left, width - margin.right])
.padding(0.3);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
      return d.acompensation;
    })])
    .range([height - margin.bottom, margin.top]);

// Draw Axes

var xAxis = svg.append("g")
    .attr("class","axis")
    .call(d3.axisBottom(xScale))
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

var yAxis = svg.append("g")
    .attr("class","axis")
    .call(d3.axisLeft(yScale))
    .attr("transform", `translate(${margin.left}, 0)`);

// Draw Labels

var xLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x",width/2)
  .attr("y", height - 10)
  .attr("text-anchor", "middle")
  .text("Average compensation");


var yLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("transform", "rotate(-90)")
  .attr("y", 20)
  .attr("x", -height/2 -60)
  .attr("text-anchor", "middle")
  .text("Year");

// Draw data
var chart = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {return xScale(d.year); })
    .attr("y", height - margin.bottom)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("fill", "#eb9d2c")
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill", "#ffff4d");
      tooltip.transition().duration(100)
      tooltip.html(`${d.spaces} spaces`)
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .style("opacity", 1)
      .style("padding", "5px 8px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "#eb9d2c")
      tooltip.html("")
      .style("padding", "0");
    });


chart1.transition()
  .duration(1000)
  .attr("height", function(d) {return height - margin.bottom - yScale(d.year);})
  .attr("y", function(d) {return yScale(d.year); });


chart2.transition()
  .duration(1000)
  .attr("height", function(d) {return height - margin.bottom - yScale(d.year2);})
  .attr("y", function(d) {return yScale(d.year2); });

var bluerect = svg.append("rect")
                  .attr("x", width/1.5)
                  .attr("y", height/12)
                  .attr("width", 25)
                  .attr("height", 25)
                  .attr("fill", "#00ccff")
                  .attr("class", "legend");

var orangerect = svg.append("rect")
                  .attr("x", width/1.2)
                  .attr("y", height/12)
                  .attr("width", 25)
                  .attr("height", 25)
                  .attr("fill", "#ffbb33")
                  .attr("class", "legend");

var year12 = svg.append("text").text("2012")
                  .attr("x", width/1.4)
                  .attr("y", height/9)
                  .attr("fill", "black")
                  .attr("class", "legend");


var year18 = svg.append("text").text("2018")
                  .attr("x", width/1.13)
                  .attr("y", height/9)
                  .attr("fill", "black")
                  .attr("class", "legend");

// Draw tooltip
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#ccf5ff")
    .style("border-radius", "6px");
