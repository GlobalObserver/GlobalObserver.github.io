 var smallScreen = window.innerWidth < 500 ? true : false;
 var width = document.querySelector("#chart").clientWidth;
 var height = document.querySelector("#chart").clientHeight;
 var chartSize;
 var padding = smallScreen ? 50 : 150;

 if (width > height){
     chartSize = height - padding;
 }else {
     chartSize = width - padding;
 }
 var margin = {
     top: (height - chartSize) / 2,
     right: (width - chartSize) / 1.5,
     bottom: (height - chartSize) / 3,
     left:  (width - chartSize) / 2
 };



var innerRadius = smallScreen ? 15 : 50;
var outerRadius = chartSize / 2; 

var monthAxisAngleScale = d3.scaleTime()
     .domain([1, 13])
     .range([0, Math.PI * 2]),
    dayAxisAngleScale = d3.scaleLinear()
     .domain([1, 373])
     .range([0, Math.PI * 2]);

var monthScale = d3.scaleOrdinal()
     .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
     .range(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

var circleRadiusScale = d3.scaleSqrt().range([4, 50]);

if (smallScreen) {
    circleRadiusScale.range([1, 20])
}

var svg = d3.select("#chart")
    .attr("width", chartSize + margin.top + margin.bottom)
    .attr("height", chartSize + margin.left + margin.right);

function angleToCoorsScale(angle, offset = 1){
    return [Math.cos(angle - Math.PI / 2) * outerRadius * offset, Math.sin(angle - Math.PI / 2) * outerRadius * offset];
}

d3.json("./us_terr_data/terr.json", function (error, data) {

    if (error) throw error;

    data = data.filter(function(d){
        return +d.year >= 1990;
    })

    data.forEach(function(d){
        d.year = +d.year;
        d.month = +d.month;
        d.day = +d.day;
        d.kill = +d.kill;

    })
    
    // Array.prototype.sum = function (prop) {
    // var total = 0
    // for ( var i = 0, _len = this.length; i < _len; i++ ) {
    //     total += this[i][prop]
    // }
    // return total
    // }

    // console.log(zero.sum("kill"))

    // console.log(data);

    var bounds = svg.append("g")
        .style("transform", `translate(${margin.left + outerRadius}px, ${margin.top + outerRadius}px)`);

    var grids = bounds.append("g");

    var monthData = d3.range(1, 13, 1); 

    monthData.forEach(function(d){
        var angle = monthAxisAngleScale(d);
        var [x, y] = angleToCoorsScale(angle);

        grids.append("line")
            .attr("x2", x)
            .attr("y2", y)
            .attr("class", "grids");

        var [labelX, labelY] = angleToCoorsScale(angle, 1.1);

        grids.append("text")
            .attr("x", labelX)
            .attr("y", labelY)
            .attr("class", "month-label")
            .text(monthScale(d));

    });

    var minYear = d3.min(data, function(d){return d.year});
    var maxYear = d3.max(data, function(d){return d.year});

    var radiusScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([innerRadius, outerRadius]); 

    var yearData = d3.range(minYear, maxYear + 1, 1);

    yearData.forEach(function(d){

        var missingYear = d == 1993 ? true : false;

        var circleGrids = grids.append("circle")
            .attr("r", radiusScale(d))
            .attr("class", "grids")
            .attr("id", missingYear ? "missing-year" : true)

        if (d ==1995 || d==2000 || d==2005 || d==2010 || d==2015){

        grids.append("text")
            .attr("x", 20) 
            .attr("y", -radiusScale(d) + 4)
            .attr("class", "year-label")
            .text(`${d}`);
        }
       
    })
    // scale for the circle size
   circleRadiusScale
            .domain([0, d3.max(data, d => d.kill)]);
            
    // line generator for drawing circles on the radial chart     
    var line = d3.lineRadial()
        .radius(function (d) {
                return radiusScale(+d.year);
            })
        .angle(function (d) {
                return dayAxisAngleScale((+d.month - 1 ) * 31 +d.day);
            });

    data.sort(function (a, b) {
            if (a.kill > b.kill)
                return -1;
            if (a.kill < b.kill) return 1;
            return 0;
        });

     // draw the circles
    var circle = bounds.selectAll('.point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr("id", function(d){
                 if (d.terr_group.includes("Al-Qaida") && +d.kill > 1300) {
                    return "nine-eleven-circle"
                }
                if (d.group_type == "White Supremacists"  && d.city == "Oak Creek") {
                    return "wisconsin-shoot"
                }
            })
            .attr("fill", "rgba(8,196,208)")
            .attr("stroke", function(d){
                if (isNaN(d.kill)){
                    return "rgba(255,255,255,1)"
                } 
            })
            .attr("stroke-width", 1.5)
            .attr('transform', function (d) {
                if (isNaN(d.month)){
                    console.log(d)
                }else {
                // generate coordinates for the cicrcle using the above line generator
                var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
                return 'translate(' + coors + ')'
             }
            })
            .attr('r', 0)
            .on("mouseover", function (d) {

                d3.selectAll(".point").style("opacity", 0.09);
                d3.selectAll(".grids").style("opacity", 0.09);
                d3.selectAll(".year-label").style("opacity", 0.09);
                d3.selectAll(".month-label").style("opacity", 0.09);

                d3.select(this)
                    .style("opacity", 0.8);

                // when mouseover, show the state and city at the center
                var fontSize = 18;

                // var centerText = block.append("text")
                //     .append("tspan")
                //     .attr("class", "centerText")
                //     .attr("fill", "white")
                //     .attr("text-anchor", "middle")
                //     .attr("font-size", fontSize)
                //     .style("opacity", 1);

                // var words = d.state + ", " + d.city
                // words = words.split(" ");

                // var tspanLine = 0;

                // words.forEach(function (w) {
                //     var previousWords = centerText.text();
                //     centerText.text(previousWords + " " + w);

                //     if (centerText.node().getBBox().width > innerRadius * 2) {
                //         tspanLine++
                //         centerText.text(previousWords);
                //         centerText = block.append("text").append("tspan")
                //             .attr("class", "centerText")
                //             .attr("y", tspanLine * (fontSize + 3))
                //             .attr("fill", "white")
                //             .attr("text-anchor", "middle")
                //             .attr("font-size", fontSize)
                //             .text(" " + w);
                //     }
                // })

                // // adjust texts position
                // var textMoveUp = ((d3.selectAll(".centerText")._groups["0"].length) * (fontSize - 3)) / 2;
                // block.selectAll("text").attr("transform", `translate(0, ${-textMoveUp})`);

                // create a new data structure for the authors tree map 
                var state_data = [];

                // calculate the selected circle's cx and cy
                var coors = line([d]).slice(1).slice(0, -1).split(",");
                var coorsArray = JSON.parse("[" + coors + "]");
                var cx = coorsArray[0];
                var cy = coorsArray[1];

                // calculate the selected circle's width and height 
                var circle_width = d3.select(this).node().getBBox().width;
                var circle_height = d3.select(this).node().getBBox().height;


                // the first function to create the data structure
                function a() {
                    state_data.push({

                        name: d.state,
                        parent: null,
                        children: []

                    })
                }

                // the second function to put variables in to the children data 
                function b() {

                    state_data[0].children.push({
                        name: `Location: ${d.state}, ${d.city}`,
                        parent: d.state
                    })

                    state_data[0].children.push({
                        name: `Date: ${d.month}/${d.day}/${d.year}`,
                        parent: d.state
                    })

                    state_data[0].children.push({
                        name: `Group: ${d.terr_group}`,
                        parent: d.state
                    })

                    state_data[0].children.push({
                        name: `Major Weapons: ${d.weapon.split(" ")[0]}`,
                        parent: d.state
                    })

                    state_data[0].children.push({
                        name: `Deaths: ${d.kill}`,
                        parent: d.state
                    })
                }

                // execute a first then b
                a();
                b();

                // initialize the tree map
                var treemap = d3.tree()
                    .size([circle_height + 100, circle_width + 100])

                if (smallScreen) {
                    treemap
                    .size([circle_height + 40, circle_width + 30])
                }

                // create the hierarchical data structure
                var nodes = d3.hierarchy(state_data[0], function (d, i) {
                    return d.children;
                })

                nodes = treemap(nodes);

                // adds the links between the nodes
                var link = bounds.selectAll(".link")
                    .data(nodes.descendants().slice(1))
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        // for the right side circles
                        if (cx <= 0) {
                            return "M" + (cx - d.parent.y + d.y) + "," + (cy - d.parent.x + d.x) +
                                "C" + (cx - d.parent.y + (d.y + d.parent.y) / 2) + "," + (cy - d
                                    .parent.x + d.x) +
                                " " + (cx - d.parent.y + (d.y + d.parent.y) / 2) + "," + (cy - d
                                    .parent.x + d.parent.x) +
                                " " + (cx) + "," + (cy); // move root node to cx and cy 
                        } else { // for the left side circles 
                            return "M" + (cx - d.parent.y + d.y - 2 * (cx - d.parent.y + d.y -
                                    cx)) + "," + (cy - d.parent.x + d.x) +
                                "C" + (cx - d.parent.y + (d.y + d.parent.y) / 2 - 2 * (cx - d.parent
                                    .y + (d.y + d.parent.y) / 2 - cx)) + "," + (cy - d.parent.x + d
                                    .x) +
                                " " + (cx - d.parent.y + (d.y + d.parent.y) / 2 - 2 * (cx - d.parent
                                    .y + (d.y + d.parent.y) / 2 - cx)) + "," + (cy - d.parent.x + d
                                    .parent.x) +
                                " " + (cx) + "," + (cy); // move root node to cx and cy
                        }
                    })
                    .attr("stroke", "white")
                    .style("opacity", 0.5)
                    .attr("fill", "none");

                // adds each node as a group
                var node = bounds.selectAll(".node")
                    .data(nodes.descendants().slice(1))
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {

                        if (cx <= 0) {
                            return "translate(" + (cx - d.parent.y + d.y) + "," + (cy - d.parent.x +
                                d.x) + ")";
                        } else {
                            return "translate(" + (cx - d.parent.y + d.y - 2 * (cx - d.parent.y + d
                                .y - cx)) + "," + (cy - d.parent.x + d.x) + ")";
                        }
                    });

                // adds the circle to the node
                node.append("circle")
                    .attr("r", 1)
                    .style("stroke", "white")
                    .style("fill", "white");

                // adds the text to the node
                node.append("text")
                    .attr("dy", ".35em")
                    .attr("dx", function (d) {

                        if (cx <= 0) {
                            return "0.35em";
                        } else {
                            return "-0.35em"
                        }
                    })
                    .style("text-anchor", function (d) {

                        if (cx <= 0) {
                            return "start";
                        } else {
                            return "end"
                        }
                    })
                    .text(function (d) {
                        if (d.parent == null) {
                            return " "
                        } else {
                            return d.data.name;
                        }
                    })
                    .attr("fill", "white")
                    .style("font-size", smallScreen ? "10px" : "14px");

            })
            .on("mouseout", function (d) {
                // block.selectAll("text").remove();
                svg.selectAll(".link").remove();
                svg.selectAll(".node").remove();
                d3.selectAll(".grids").style("opacity", 0.2);
                d3.select("#missing-year").style("opacity", 1);
                d3.selectAll(".point").style("opacity", 0.5);
                d3.selectAll(".year-label").style("opacity", 1);
                d3.selectAll(".month-label").style("opacity", 1);
            })



            var source = d3.select(".right-col").append("div")
                .attr("class", "data-source-container")

            source
                .html(`Source: <a href="https://www.newamerica.org/in-depth/terrorism-in-america/what-threat-united-states-today/">New America</a> and National Consortium for the Study of Terrorism and Responses to Terrorism (START), University of Maryland. (2018). <a href="https://www.start.umd.edu/gtd">The Global Terrorism Database (GTD)</a>`)
                .attr("color", "gray");



            var sizeLegend = svg.append("g")
                .attr("transform", `translate(${margin.left}, 0)`);

            if(smallScreen){
                sizeLegend
                .attr("transform", `translate(20, 0)`);
            }

            var nan = sizeLegend.append("g")
                .attr("class", "nan-legend")

            nan.append("circle")
                .attr("r", circleRadiusScale(0))
                .attr("fill", "none")
                .attr("stroke", "rgba(255,255,255,0.8)")
                .attr("stroke-width", smallScreen ? 0.5 : 1)
                .attr("cx", 5)
                .attr("cy", 5);

            nan.append("text")
                .text("Null")
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("x", 10 + circleRadiusScale(50))
                .attr("y", 9)
                .attr("font-size", smallScreen ? "8px" : "10px")

            var small = sizeLegend.append("g")
                .attr("class", "small-legend")

            small.append("circle")
                .attr("r", circleRadiusScale(0))
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("cx", 5)
                .attr("cy", smallScreen ? 5 + circleRadiusScale(0)*3 + circleRadiusScale(0)*5 : 5 + circleRadiusScale(0)*2.5 + circleRadiusScale(0)*2 ) ;

            small.append("text")
                .text("Zero Death")
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("x", 10 + circleRadiusScale(50))
                .attr("y", smallScreen ? 9 + circleRadiusScale(0)*3 + circleRadiusScale(0)*5 : 9 + circleRadiusScale(0)*2.5 + circleRadiusScale(0)*2)
                .attr("font-size", smallScreen ? "8px" : "10px")


            var medium = sizeLegend.append("g")
                .attr("class", "medium-legend")


            medium.append("circle")
                .attr("r", circleRadiusScale(10))
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("cx", 5)
                .attr("cy", smallScreen ? 5 + circleRadiusScale(0)*5 +circleRadiusScale(10)*4 : 5 + circleRadiusScale(0)*5.5 +circleRadiusScale(10)*2 );

            medium.append("text")
                .text("10 Deaths")
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("x", 10 + circleRadiusScale(50))
                .attr("y", smallScreen ? 9 + circleRadiusScale(0)*5 +circleRadiusScale(10)*4 : 9 + circleRadiusScale(0)*5.8 +circleRadiusScale(10)*2 )
                .attr("font-size", smallScreen ? "8px" : "10px")


            var large = sizeLegend.append("g")
                .attr("class", "large-legend")

            large.append("circle")
                .attr("r",circleRadiusScale(100))
                .attr("fill","rgba(255,255,255,0.5)")
                .attr("cx", 5)
                .attr("cy", smallScreen ? 5 + circleRadiusScale(0)*5 +circleRadiusScale(10)*2 + +circleRadiusScale(100)*3 : 5 + circleRadiusScale(0)*5 +circleRadiusScale(10)*2 + +circleRadiusScale(100)*2);

            large.append("text")
                .text("100 Deaths")
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("x", 8 +circleRadiusScale(100))
                .attr("y", smallScreen ? 6 + circleRadiusScale(0)*5 +circleRadiusScale(10)*2 + +circleRadiusScale(100)*3 : 9  + circleRadiusScale(0)*4.8 +circleRadiusScale(10)*2 + +circleRadiusScale(100)*2)
                .attr("font-size", smallScreen ? "8px" : "10px")


            var dashedLegend = svg.append("g")
                .attr("transform", `translate(${width/2-margin.right/4}, 20)`);

            if (smallScreen) {
                dashedLegend 
                .attr("transform", `translate(30, 60)`);
            }

            dashedLegend.append("line")
                .attr("class", "dashed")
                // .attr("x1", 0)
                .attr("x2", smallScreen ? 30 : margin.right/2)
                .attr("stroke", "white")
                .style("opacity", 0.8);

            dashedLegend.append("text")
                .text("Missing Year")
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("font-size", smallScreen ? "8px" : "10px")
                .attr("text-anchor", "middle")
                .attr("baseline-shift", "60%")
                .attr("x", margin.right/4)


             // block center with a black circle
            var block = bounds.append('g').attr("class", "block-center-circle");

            block.append('circle')
                    .attr('r', innerRadius - 5)
                    .attr("fill", "black");


            var colorLegend = svg.append("g")
                .attr("class", "color-legend-container")
                .attr("transform", `translate(${width-margin.right}, 0)`);
            
            if (smallScreen){
                colorLegend
                .attr("transform", `translate(${width-80}, 0)`);
            }

            colorLegend.selectAll(".color-legend-circle")
                .data([1,2,3,4,5,6])
                .enter()
                .append("circle")
                .attr("class", "color-legend-circle")
                .attr("cx", 6)
                .attr("cy", d => smallScreen ? d*8 : d*16)
                .attr("r", smallScreen ? 2 : 4)
                .attr("fill", function(d){
                    if(d==1){
                        return "#FFFB30"
                    } else if (d==2){
                        return "#E05103" 
                    } else if (d==3){
                        return "#5288E8"
                    } else if (d==4){
                        return "#FFA0D4"
                    } else if (d==5){
                        return "#2DE045"
                    } else {
                        return "#59656F"
                    }
                })

                colorLegend.selectAll(".color-legend-text")
                .data([1,2,3,4,5,6])
                .enter()
                .append("text")
                .attr("class", "color-legend-text")
                .attr("x", 14)
                .attr("y", d => smallScreen ? d*8 : d*16)
                .text(function(d){
                    if(d==1){
                        return "Jihadi-Inspired"
                    } else if (d==2){
                        return "Right-Wing" 
                    } else if (d==3){
                        return "Left-Wing"
                    } else if (d==4){
                        return "Incel"
                    } else if (d==5){
                        return "Environmental"
                    } else {
                        return "Others"
                    }
                })
                .attr("fill", "rgba(255,255,255,0.5)")
                .attr("font-size", smallScreen ? "8px" : "12px")
                .attr("baseline-shift", "-35%")

                d3.select(".color-legend-container")
                    .style("opacity", 0);
                
                if (smallScreen){
                    var chartHeight = document.querySelector("#chart").getBoundingClientRect().height;
                    var desHeight = document.querySelector(".data-source-container").getBoundingClientRect().height;
                
                    d3.select(".right-col")
                        .style("height", `${chartHeight+desHeight}px`); 
                }             
});


var $introText = $("#intro-texts");
var $zeroDeath = $("#zero-death");
var $withDeaths = $("#with-deaths");
var $multiColor =$("#with-multicolors");
var $nineEleven = $("#nine-eleven");
var $alqaeda = $("#alqaeda");
var $alqaedaAndJihadi = $("#alqaeda-and-jihadi-inspired");
var $rightInspired = $("#right-inspired");
var $jihadiAndRightWing = $("#jihadi-and-right-wing");
var $rightWing = $("#right-wing");
var $white = $("#white");
var $whiteSec = $("#white-sec");
var $incel = $("#incel");
var $animalRights = $("#animal-rights");
var $explore = $("#explore");

var mouseoverEvent = new MouseEvent('mouseover', {'cancelable': true})



$introText.waypoint(function(direction){

     if (direction == "down"){

        $introText.addClass("paragraph-full-opacity");
        d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr('r', function (d) {
                if (isNaN(+d.kill)){
                    return circleRadiusScale(0);  
                } else {
                    return circleRadiusScale(+d.kill);
                }
                })
            .attr("fill", "rgb(8,196,208)")
    } if (direction == "up"){
        
        $introText.removeClass("paragraph-full-opacity");
         d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr('r', 0)

    }



}, {offset: smallScreen ? "80%" :"40%"}) 

$zeroDeath.waypoint(function(direction){

     if (direction == "down"){

        $zeroDeath.addClass("paragraph-full-opacity");
        $introText.removeClass("paragraph-full-opacity");

        d3.selectAll(".point")
            .transition()
            .duration(500)
             .attr('r', function (d) {
                 if (d.kill == 0) {
                    return circleRadiusScale(+d.kill);
                }

                else {
                    return 0
                }
                    
            })



    } if (direction == "up"){
        $zeroDeath.removeClass("paragraph-full-opacity");
        $introText.addClass("paragraph-full-opacity");
        d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr('r', function (d) {
                if (isNaN(+d.kill)){
                    return circleRadiusScale(0);  
                } else {
                    return circleRadiusScale(+d.kill);
                }
                })
    }



}, {offset: smallScreen ? "80%" :"50%"})

$withDeaths.waypoint(function(direction){

     if (direction == "down"){

       $withDeaths.addClass("paragraph-full-opacity");
       $zeroDeath.removeClass("paragraph-full-opacity");

        d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr('r', function (d) {
                if (isNaN(+d.kill) == false){
                    if (d.kill > 0){
                        return circleRadiusScale(+d.kill);
                    } else {
                        return 0;
                    }
                } else {
                    return 0
                }
             })

    } if (direction == "up"){
        $withDeaths.removeClass("paragraph-full-opacity");
        $zeroDeath.addClass("paragraph-full-opacity");
       
        d3.selectAll(".point")
            .transition()
            .duration(500)
             .attr('r', function (d) {

                 if (d.kill == 0) {
                    return circleRadiusScale(+d.kill);
                }

                else {
                    return 0
                }
                    
            })
    }



}, {offset: smallScreen ? "80%" : "50%"})

$multiColor.waypoint(function(direction){

     if (direction == "down"){

        d3.select(".color-legend-container")
                    .style("opacity", 1);

        $multiColor.addClass("paragraph-full-opacity");
        $withDeaths.removeClass("paragraph-full-opacity");

        d3.selectAll(".point")
            .attr('r', function (d) {
                if (isNaN(+d.kill)){
                    return circleRadiusScale(0);  
                } else {
                    return circleRadiusScale(+d.kill);
                }
             })
            .attr("fill", function(d){
                    if (d.group_type == "Jihadi-inspired") {
                        return "#FFFB30"
                    }
                    else if ((d.group_type == "Right-wing") 
                        || (d.group_type == "White Supremacists")) {
                        
                        return "#E05103"
                    } 
                    else if (d.group_type == "Left-wing"){
                        return "#5288E8"
                    }
                    else if (d.group_type == "Incel") {
                        return "#FFA0D4"
                    }
                    else if (d.group_type == "Environmental Extremists") {
                        return "#2DE045"
                    }
                    else {
                        return "#59656F"
                    }
             });

            } if (direction == "up"){
                 $multiColor.removeClass("paragraph-full-opacity");
                 $withDeaths.addClass("paragraph-full-opacity");
                 d3.selectAll(".point")
                    .attr('r', function (d) {
                        if (isNaN(+d.kill) == false){
                            if (d.kill > 0){
                                return circleRadiusScale(+d.kill);
                            } else {
                                return 0;
                            }
                        } else {
                            return 0
                        }
                    })
                    .attr("fill", "rgb(8,196,208)")
                 d3.select(".color-legend-container")
                    .style("opacity", 0);
    }



}, {offset: smallScreen ? "80%" : "50%"})

$nineEleven.waypoint(function (direction){

        if (direction == "down"){

            $nineEleven.addClass("paragraph-full-opacity");
            $multiColor.removeClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .attr("r", function(d){
                
                if (d.terr_group.includes("Al-Qaida") && +d.kill > 1300) {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
            
            document.querySelector("#nine-eleven-circle")
                .dispatchEvent(mouseoverEvent);
        }

        if (direction == "up") {

            $multiColor.addClass("paragraph-full-opacity");
            $nineEleven.removeClass("paragraph-full-opacity");

            d3.selectAll(".point")
                .style("opacity", 0.5)
                .attr('r', function (d) {
                if (isNaN(+d.kill)){
                    return circleRadiusScale(0);  
                } else {
                    return circleRadiusScale(+d.kill);
                }
                })
                

            d3.selectAll(".grids").style("opacity", 0.2);
            d3.select("#missing-year").style("opacity", 1);
            d3.selectAll(".year-label").style("opacity", 1);
            d3.selectAll(".month-label").style("opacity", 1);
            d3.selectAll(".node").remove();
            d3.selectAll(".link").remove();
        }

}, {offset: smallScreen ? "80%" : "50%"})


$alqaeda.waypoint(function (direction){

        if (direction == "down"){

            $alqaeda.addClass("paragraph-full-opacity");
            $nineEleven.removeClass("paragraph-full-opacity");

            d3.selectAll(".grids").style("opacity", 0.2);
            d3.select("#missing-year").style("opacity", 1);
            d3.selectAll(".year-label").style("opacity", 1);
            d3.selectAll(".month-label").style("opacity", 1);
            d3.selectAll(".node").remove();
            d3.selectAll(".link").remove();

            d3.selectAll(".point")
            .style("opacity", 0.5)
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.terr_group.includes("Al-Qaida") && +d.kill > 0) {
                    return circleRadiusScale(d.kill);
                } 
                else {
                    return 0;
                }
            })

        }

        if (direction == "up"){
            $alqaeda.removeClass("paragraph-full-opacity");
            $nineEleven.addClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.terr_group.includes("Al-Qaida") && +d.kill > 1300) {
                    return circleRadiusScale(d.kill);
                }
                
                else {
                    return 0
                }
            })
            .style("opacity", 0.5)
           

            document.querySelector("#nine-eleven-circle")
                .dispatchEvent(mouseoverEvent);
        }

}, {offset: smallScreen ? "80%" : "50%"})

$alqaedaAndJihadi.waypoint(function (direction){

        if (direction == "down"){

            $alqaedaAndJihadi.addClass("paragraph-full-opacity");
            $alqaeda.removeClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if ((d.terr_group.includes("Al-Qaida")) || ((d.group_type == "Jihadi-inspired") && d.year > 2001)) {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })

        }

        if (direction == "up"){
            $alqaedaAndJihadi.removeClass("paragraph-full-opacity");
            $alqaeda.addClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .style("opacity", 0.5)
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.terr_group.includes("Al-Qaida") && +d.kill > 0) {
                    return circleRadiusScale(d.kill);
                } 
                else {
                    return 0;
                }
            })
    
        }

}, {offset: smallScreen ? "80%" : "50%"})


$rightInspired.waypoint(function (direction){

        if (direction == "down"){

            $rightInspired.addClass("paragraph-full-opacity");
            $alqaedaAndJihadi.removeClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.year>2001&&d.kill>0) {

                    if ((d.group_type == "Right-wing") 
                            || (d.group_type == "White Supremacists")) {
                
                            return circleRadiusScale(d.kill)
                        }
                        else {
                            return 0
                        }
                }
                
                else {
                    return 0
                }
            })

        }

        if (direction == "up"){
            $rightInspired.removeClass("paragraph-full-opacity");
            $alqaedaAndJihadi.addClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
                .duration(500)
                .attr("r", function(d){
                    
                    if ((d.terr_group.includes("Al-Qaida")) || ((d.group_type == "Jihadi-inspired") && d.year > 2001)) {
                        return circleRadiusScale(d.kill)
                    }
                    
                    else {
                        return 0
                    }
                })
        }

}, {offset: smallScreen ? "80%" : "50%"})



$jihadiAndRightWing.waypoint(function (direction){

        if (direction == "down"){

            $jihadiAndRightWing.addClass("paragraph-full-opacity");
            $rightInspired.removeClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
             if(d.year > 2001 && d.kill > 0){
                
                    if (d.group_type=="Jihadi-inspired") {
                        return circleRadiusScale(d.kill)
                    }

                 else if ((d.group_type == "Right-wing") 
                        || (d.group_type == "White Supremacists")) {
            
                        return circleRadiusScale(d.kill)
                    }
                    else {
                        return 0
                      }
                }
                
                else {
                    return 0
                }
            })


        }

        if (direction == "up"){
            $jihadiAndRightWing.removeClass("paragraph-full-opacity");
            $rightInspired.addClass("paragraph-full-opacity");
             d3.selectAll(".point")
             .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.year>2001&&d.kill>0) {

                    if ((d.group_type == "Right-wing") 
                            || (d.group_type == "White Supremacists")) {
                
                            return circleRadiusScale(d.kill)
                        }
                        else {
                            return 0
                        }
                }
                
                else {
                    return 0
                }
            })
 
        }

}, {offset: smallScreen ? "80%" : "50%"})

$rightWing.waypoint(function (direction){

        if (direction == "down"){

            $rightWing.addClass("paragraph-full-opacity");
            $jihadiAndRightWing.removeClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
           
            if ((d.group_type == "Right-wing") 
                || (d.group_type == "White Supremacists")) {
    
                return circleRadiusScale(d.kill)
            }

                else {
                    return 0
                }
            })
           
        }

        if (direction == "up"){
            $rightWing.removeClass("paragraph-full-opacity");
           d3.selectAll(".point")
           .transition()
            .duration(500)
            .attr("r", function(d){
                
                if(d.year > 2001 && d.kill > 0){
                   
                       if (d.group_type=="Jihadi-inspired") {
                           return circleRadiusScale(d.kill)
                       }
   
                    else if ((d.group_type == "Right-wing") 
                           || (d.group_type == "White Supremacists")) {
               
                           return circleRadiusScale(d.kill)
                       }
                       else {
                           return 0
                         }
                   }
                   
                   else {
                       return 0
                   }
               })

        }

}, {offset: smallScreen ? "80%" : "50%"})

$white.waypoint(function (direction){

        if (direction == "down"){

            $white.addClass("paragraph-full-opacity");
            $rightWing.removeClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                            
                if(d.year >= 2011){

                    if (d.group_type == "White Supremacists"){
                        return circleRadiusScale(d.kill)
                    }
                    else {
                        return 0
                    }
                }
                            
                else {
                    return 0
                    }
                })
                       
        }

        if (direction == "up"){
            $white.removeClass("paragraph-full-opacity");
            $rightWing.addClass("paragraph-full-opacity");
             
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
           
                if ((d.group_type == "Right-wing") 
                    || (d.group_type == "White Supremacists")) {
        
                    return circleRadiusScale(d.kill)
                }
    
                    else {
                        return 0
                    }
                })
         
        }

}, {offset: smallScreen ? "80%" : "50%"})


$whiteSec.waypoint(function (direction){

        if (direction == "down"){
            $whiteSec.addClass("paragraph-full-opacity");
            $white.removeClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                if (d.group_type == "White Supremacists" && d.city == "Oak Creek") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
         

            document.querySelector("#wisconsin-shoot")
                .dispatchEvent(mouseoverEvent);
        }

        if (direction == "up"){
            $whiteSec.removeClass("paragraph-full-opacity");
            $white.addClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                            
                if(d.year >= 2011){

                    if (d.group_type == "White Supremacists"){
                        return circleRadiusScale(d.kill)
                    }
                    else {
                        return 0
                    }
                }
                            
                else {
                    return 0
                    }
                })
            .style("opacity", 0.5)
                     

            d3.selectAll(".grids").style("opacity", 0.2);
            d3.select("#missing-year").style("opacity", 1);
            d3.selectAll(".year-label").style("opacity", 1);
            d3.selectAll(".month-label").style("opacity", 1);
            d3.selectAll(".node").remove();
            d3.selectAll(".link").remove();
        }

}, {offset: smallScreen ? "80%" : "50%"})

$incel.waypoint(function (direction){

        if (direction == "down"){

            $incel.addClass("paragraph-full-opacity");
            $whiteSec.removeClass("paragraph-full-opacity");

            d3.selectAll(".grids").style("opacity", 0.2);
            d3.select("#missing-year").style("opacity", 1);
            d3.selectAll(".year-label").style("opacity", 1);
            d3.selectAll(".month-label").style("opacity", 1);
            d3.selectAll(".node").remove();
            d3.selectAll(".link").remove();

            d3.selectAll(".point")
            .style("opacity", 0.5)
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if ( d.group_type == "Incel") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
      
        }

        if (direction == "up"){
            $incel.removeClass("paragraph-full-opacity");
            $whiteSec.addClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .attr("r", function(d){
                
                if (d.group_type == "White Supremacists" && d.city == "Oak Creek") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
          

            document.querySelector("#wisconsin-shoot")
                .dispatchEvent(mouseoverEvent);

        }

}, {offset: smallScreen ? "80%" : "50%"})

$animalRights.waypoint(function (direction){

        if (direction == "down"){

            $animalRights.addClass("paragraph-full-opacity");
            $incel.removeClass("paragraph-full-opacity");
            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.group_type == "Environmental Extremists") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
          
        }

        if (direction == "up"){
            $animalRights.removeClass("paragraph-full-opacity");
            $incel.addClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .style("opacity", 0.5)
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if ( d.group_type == "Incel") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
        
        }

}, {offset: smallScreen ? "80%" : "50%"})



$explore.waypoint(function (direction){

        if (direction == "down"){

            $explore.addClass("paragraph-full-opacity");
            $animalRights.removeClass("paragraph-full-opacity");

            d3.select(".color-legend-container")
                    .style("opacity", 1);
           
            d3.selectAll(".point")
                 .attr("fill", function(d){
                    if (d.group_type == "Jihadi-inspired") {
                        return "#FFFB30"
                    }
                    else if ((d.group_type == "Right-wing") 
                        || (d.group_type == "White Supremacists")) {
                        
                        return "#E05103"
                    } 
                    else if (d.group_type == "Left-wing"){
                        return "#5288E8"
                    }
                    else if (d.group_type == "Incel") {
                        return "#FFA0D4"
                    }
                    else if (d.group_type == "Environmental Extremists") {
                        return "#2DE045"
                    }
                    else {
                        return "#59656F"
                    }
             })
                .style("opacity", 0.5)
                .transition()
                .duration(500)
                .attr('r', function (d) {
                if (isNaN(+d.kill)){
                    return circleRadiusScale(0);  
                } else {
                    return circleRadiusScale(+d.kill);
                }
             })
         

        }

        if (direction == "up"){
            $explore.removeClass("paragraph-full-opacity");
            $animalRights.addClass("paragraph-full-opacity");

            d3.selectAll(".point")
            .transition()
            .duration(500)
            .attr("r", function(d){
                
                if (d.group_type == "Environmental Extremists") {
                    return circleRadiusScale(d.kill)
                }
                
                else {
                    return 0
                }
            })
        
        }

}, {offset: smallScreen ? "80%" :"60%"})


