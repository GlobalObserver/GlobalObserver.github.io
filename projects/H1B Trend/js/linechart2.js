// var width = document.querySelector("#linechart").clientWidth;

var margin = {top: 20, left: 100, right: 20, bottom: 60};
var width = 1200 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;


var svg = d3.select("#linechart2")
  .append("svg")
  .attr("width", width)
  .attr("height", height);


var data = [
  {year: 2007, bachelor: 143937, master: 121987, professional: 14677, doctoral: 31212},
  {year: 2008, bachelor: 122941, master: 116561, professional: 13353, doctoral: 30576},
  {year: 2009, bachelor: 104511, master: 97703, professional: 13225, doctoral: 28538},
  {year: 2010, bachelor: 109478, master: 96163, professional: 13387, doctoral: 27290},
  {year: 2011, bachelor: 112334, master: 113284, professional: 13279, doctoral: 27130},
  {year: 2012, bachelor: 146174, master: 122325, professional: 12625, doctoral: 25188},
  {year: 2013, bachelor: 136453, master: 125052, professional: 12206, doctoral: 24671},
  {year: 2014, bachelor: 146368, master: 141470, professional: 12001, doctoral: 24995},
  {year: 2015, bachelor: 170865, master: 159828, professional: 11812, doctoral: 25188},
  {year: 2016, bachelor: 180077, master: 180961, professional: 11880, doctoral: 25602},
  {year: 2017, bachelor: 139055, master: 165830, professional: 9863, doctoral: 20589}
];

var xScale = d3.scaleLinear()
  .domain([2007,2017])
  .range([margin.left, width-margin.right]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) {
    return Math.max(d.bachelor, d.master, d.professional, d.doctoral);
  })])
  .range([height-margin.bottom, margin.top]);

var xAxis = svg.append("g")
  .attr("class","axis")
  .attr("transform",`translate(0,${height-margin.bottom})`)
  .call(d3.axisBottom().scale(xScale).ticks(11, "f"));

var yAxis = svg.append("g")
  .attr("class","axis")
  .attr("transform",`translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

var line = d3.line()
  .x(function(d) { return xScale(d.year); })
  .y(function(d) { return yScale(d.bachelor); })
  .curve(d3.curveCardinal);

var line2 = d3.line()
  .x(function(d) { return xScale(d.year); })
  .y(function(d) { return yScale(d.master); })
  .curve(d3.curveCardinal);

var line3 = d3.line()
  .x(function(d) { return xScale(d.year); })
  .y(function(d) { return yScale(d.professional); })
  .curve(d3.curveCardinal);

var line4 = d3.line()
  .x(function(d) { return xScale(d.year); })
  .y(function(d) { return yScale(d.doctoral); })
  .curve(d3.curveCardinal);

var path = svg.append("path")
  .datum(data)
  .attr("d", line)
  .attr("stroke","#00ccff")
  .attr("stroke-width",4)
  .attr("fill","none");

var path2 = svg.append("path")
  .datum(data)
  .attr("d", line2)
  .attr("stroke","#ffbb33")
  .attr("stroke-width",4)
  .attr("fill","none");

var path3 = svg.append("path")
  .datum(data)
  .attr("d", line3)
  .attr("stroke","#4dd678")
  .attr("stroke-width",4)
  .attr("fill","none");

var path4 = svg.append("path")
  .datum(data)
  .attr("d", line4)
  .attr("stroke","#ff6675")
  .attr("stroke-width",4)
  .attr("fill","none");

var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position","absolute")
  .style("background", "#ccf5ff");

var circle = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return xScale(d.year); })
    .attr("cy", function(d) { return yScale(d.bachelor); })
    .attr("r", 8)
    .attr("class", "circle")
    .attr("fill","#00ccff")
    .attr("stroke","#FFFFFF")
    .attr("stroke-width",2)
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill","#b50418").attr("r",12)
      tooltip.transition().duration(100)
      tooltip.html(`<b>${d.bachelor}</b> bachelors`)
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .style("opacity", 1)
      .style("padding", "8px 10px")
      .style("border-radius", "5px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill","#00ccff").attr("r",8)
      tooltip.html("")
      .style("padding", "0");
    });

var circle2 = svg.selectAll("circle2")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return xScale(d.year); })
    .attr("cy", function(d) { return yScale(d.master); })
    .attr("r", 8)
    .attr("class", "circle")
    .attr("fill", "#ffbb33")
    .attr("stroke","#FFFFFF")
    .attr("stroke-width",2)
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill","#b50418").attr("r",12)
      tooltip.transition().duration(100)
      tooltip.html(`<b>${d.master}</b> masters`)
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .style("opacity", 1)
      .style("padding", "8px 10px")
      .style("border-radius", "5px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill","#ffbb33").attr("r",8)
      tooltip.html("")
      .style("padding", "0");
    });

var circle3 = svg.selectAll("circle3")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return xScale(d.year); })
    .attr("cy", function(d) { return yScale(d.professional); })
    .attr("r", 8)
    .attr("class", "circle")
    .attr("fill", "#4dd678")
    .attr("stroke","#FFFFFF")
    .attr("stroke-width",2)
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill","#b50418").attr("r",12)
      tooltip.transition().duration(100)
      tooltip.html(`<b>${d.professional}</b> professional`)
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .style("opacity", 1)
      .style("padding", "8px 10px")
      .style("border-radius", "5px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill","#4dd678").attr("r",8)
      tooltip.html("")
      .style("padding", "0");
    });

  var circle4 = svg.selectAll("circle4")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return xScale(d.year); })
      .attr("cy", function(d) { return yScale(d.doctoral); })
      .attr("r", 8)
      .attr("class", "circle")
      .attr("fill", "#ff6675")
      .attr("stroke","#FFFFFF")
      .attr("stroke-width",2)
      .on("mouseover", function(d,i) {
        d3.select(this).attr("fill","#b50418").attr("r",12)
        tooltip.transition().duration(100)
        tooltip.html(`<b>${d.doctoral}</b> doctoral`)
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 50 + "px")
        .style("opacity", 1)
        .style("padding", "8px 10px")
        .style("border-radius", "5px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill","#ff6675").attr("r",8)
        tooltip.html("")
        .style("padding", "0");
      });

var xLabel = svg.append("text")
  .attr("class","axisLabel")
  .attr("x",width/2)
  .attr("y", height - 10)
  .attr("text-anchor","middle")
  .attr("font-weight", "bold")
  .text("Year");

var yLabel = svg.append("text")
  .attr("class","axisLabel")
  .attr("y", 20)
  .attr("x", -height/2 -60)
  .attr("text-anchor","middle")
  .attr("transform","rotate(-90)")
  .attr("font-weight", "bold")
  .text("Number of Requests");
