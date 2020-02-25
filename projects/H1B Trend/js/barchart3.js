var margin = {top: 60, right: 0, bottom: 50, left: 165};
    width = 900 - margin.right - margin.left;
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("#barchart3")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define data

var data = [
  {occupation: "Computer related", petitions: 2008315},
  {occupation: "Architecture & Engineering", petitions: 318670},
  {occupation: "Education", petitions: 244608},
  {occupation: "Administrative specializations", petitions: 245304},
  {occupation: "Medicine & Health", petitions: 185050},
  {occupation: "Managers & Officals", petitions: 78583},
  {occupation: "Life Sciences", petitions: 63735},
  {occupation: "Mathematics", petitions: 65828},
  {occupation: "Physical Sciences", petitions: 49985},
  {occupation: "Other", petitions: 141039}
];

// Define scales

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d.petitions;
    })])
    .range([0, width]);

var yScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.occupation; }))
    .range([height, 0])
    .padding(0.1);


// Draw Axes

var xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

var yAxis = svg.append("g")
      .call(d3.axisLeft(yScale));

// add colors scale

// var colors = d3.scaleLinear()
//   .domain([0, d3.max(data, function(d) {
//     return d.petitions;
//   })])
//   .range(["#FFB832", "#C61C6F"]);

// Draw tooltips

var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background", "yellow");

// Draw data

var chart = svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("height", yScale.bandwidth())
    .attr("width", 0)
    .attr("x", 0)
    .attr("y", function(d) {return yScale(d.occupation);})
    .attr("fill", "#00ccff")
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill", "#D3D3D3")
      tooltip.transition().duration(100)
      tooltip.html(`Number of petitions: ${d.petitions}`)
      .style("left", d3.event.pageX - 50 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .style("opacity", 1)
      .style("padding", "5px 8px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "#00ccff")
      tooltip.html("")
      .style("padding", "0");
    });

// Draw labels

var xLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", width/2)
  .attr("y", height + margin.bottom - 4)
  .attr("text-anchor", "middle")
  .text("Number of petitions")
  .style("font-weight", "bold");

var yLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("transform", "rotate(-90)")
  .attr("y", -150)
  .attr("x", -height/2)
  .attr("text-anchor", "middle")
  .text("Occupation")
  .style("font-weight", "bold");

// Make transition

chart.transition()
  .attr("width", function(d) {return xScale(d.petitions);})
  .attr("x", 0)
  .delay(function(d,i) {
    return i*150;
  });
