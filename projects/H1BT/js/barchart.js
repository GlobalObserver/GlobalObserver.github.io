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

var svg = d3.select("#barchart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  // .attr('viewBox','-50 -50 1000 500')
  // .attr('preserveAspectRatio','xMinYMin');

// Define data

var data = [
  {compensation: "Below 25,000", number: 5704, number2: 6983},
  {compensation: "25,000 to 49,999", number: 75047, number2: 12321},
  {compensation: "50,000 to 74,999", number: 135727, number2: 105827},
  {compensation: "75,000 to 99,999", number: 60765, number2: 99326},
  {compensation: "100,000 to 124,999", number: 23511, number2: 59988},
  {compensation: "125,000 to 149,999", number: 6613, number2: 29416},
  {compensation: "150,000 to 174,999", number: 3321, number2: 11962},
  {compensation: "175,000 to 199,999", number: 1324, number2: 4339},
  {compensation: "Over 200,000", number: 2609, number2: 5945}
];


// Define scales

var xScale = d3.scaleBand()
    .domain(data.map(function(d) {return d.compensation; }))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.3);

var xScale1 = d3.scaleBand()
    .domain(['number', 'number2'])
    .range([0, xScale.bandwidth()])

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
      return d.number > d.number2 ? d.number : d.number2;
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
  .attr("font-weight", "bold")
  .text("Average Compensation");


var yLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("transform", "rotate(-90)")
  .attr("y", 20)
  .attr("x", -height/2 -60)
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .text("Number of petitions");

// Draw data
var compensation = svg.selectAll(".compensation")
    .data(data)
    .enter().append('g')
    .attr("class", "compensation")
    .attr("transform", d => `translate(${xScale(d.compensation)}, 0)`);

// Chart 1

var chart1 = compensation.selectAll(".bar.number")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "number")
    .attr("x", function(d) {return xScale1('number'); })
    .attr("y", height - margin.bottom)
    .attr("width", xScale1.bandwidth())
    .attr("height", 0)
    .attr("fill", "#00ccff")
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill", "#D3D3D3");
      tooltip.transition().duration(100)
      tooltip.html(`Year: <b>2012</b> <br> Petitions: <b>${d.number}</b>`)
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + 10 + "px")
      .style("opacity", 1)
      .style("font-size", "18px")
      .style("padding", "5px 8px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "#00ccff")
      tooltip.html("")
      .style("padding", "0");
    });

// Chart 2

var chart2 = compensation.selectAll(".bar.number2")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "number2")
    .attr("x", function(d) {return xScale1('number2'); })
    .attr("y", height - margin.bottom)
    .attr("width", xScale1.bandwidth())
    .attr("height", 0)
    .attr("fill", "#ffbb33")
    .on("mouseover", function(d,i) {
      d3.select(this).attr("fill", "#D3D3D3");
      tooltip.transition().duration(100)
      tooltip.html(`Year: <b>2018</b> <br> Petitions: <b>${d.number2}</b>`)
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY + 20 + "px")
      .style("opacity", 1)
      .style("font-size", "18px")
      .style("padding", "5px 8px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "#ffbb33")
      tooltip.html("")
      .style("padding", "0");
    });;


chart1.transition()
  .duration(1000)
  .attr("height", function(d) {return height - margin.bottom - yScale(d.number);})
  .attr("y", function(d) {return yScale(d.number); });


chart2.transition()
  .duration(1000)
  .attr("height", function(d) {return height - margin.bottom - yScale(d.number2);})
  .attr("y", function(d) {return yScale(d.number2); });

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

var year12 = svg.append("text").text("2007")
                  .attr("x", width/1.4)
                  .attr("y", height/9)
                  .attr("fill", "black")
                  .attr("class", "legend");


var year18 = svg.append("text").text("2017")
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
