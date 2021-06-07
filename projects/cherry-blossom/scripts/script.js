let windowH = window.innerHeight;
let windowW = window.innerWidth;

const margin = { t: 25, r: 25, b: 50, l: 75 };
const size = {
	w:
		Math.floor(
			document.querySelector("#kyoto1200__scatterplot").clientWidth
		) - 1,
	h: 3000,
};

const sizeTitleChart = {
	w: Math.floor(document.querySelector("#title-chart").clientWidth) - 1,
	h: Math.floor(document.querySelector("#title-chart").clientHeight) - 1,
};

const sizeSub = {
	w: Math.floor(document.querySelector("#sub-chart").clientWidth) - 1,
	h: Math.floor(document.querySelector("#sub-chart").clientHeight) - 1,
};
let petalSize = windowW > 576 ? windowW / 1425 : 0.5;

const svgTitle = d3
	.select("#title-chart")
	.append("svg")
	.attr("width", sizeTitleChart.w + 20)
	.attr("height", sizeTitleChart.h);

const svgSub = d3
	.select("#sub-chart")
	.append("svg")
	.attr("width", sizeSub.w)
	.attr("height", sizeSub.h);

const svgH = d3
	.select("#kyoto1200__histogram")
	.append("svg")
	.attr("width", size.w)
	.attr("height", windowH * 0.3);

const svgS = d3
	.select("#kyoto1200__scatterplot")
	.append("svg")
	.attr("width", size.w)
	.attr("height", size.h);

const containerTitleG = svgTitle.append("g").classed("container-title", true);
const containerSubG = svgSub.append("g").classed("container-sub", true);
const containerHG = svgH
	.append("g")
	.classed("container-histogram sub sub-3", true);
const containerSG = svgS.append("g").classed("container-scatterplot", true);
const histogramContainer = document.querySelector(".container-histogram");

let filteredData,
	xScale,
	xScaleSub,
	yScaleSub,
	yScaleHistogram,
	yScaleScatterplot,
	colorScale,
	angleScale,
	angles,
	draggableLine,
	// avgLine,
	availableYears;

Promise.all([d3.csv("data/sakura.csv"), d3.text("asset/petal.svg")]).then(
	function (datasets) {
		let data = datasets[0];
		let svgEl = datasets[1];

		let defs = containerSG.append("defs").html(svgEl);
		filteredData = data.filter((d) => {
			return d.date_doy !== "NA";
		});
		filteredData.forEach(parseData);
		console.log(filteredData);
		availableYears = filteredData.map((d) => d.year);

		draw(filteredData);
		scrolly();
		interactive();
	}
);

function parseData(d) {
	d.year = +d.year;
	d.date_doy = +d.date_doy;
	d.tempC = +d.tempC;
	d.tempF = +d.tempF;
	d.doy_100yr = +d.doy_100yr;
}

function draw(data) {
	let filteredData = data;
	let groupedByDate = d3.group(filteredData, (d) => d.date_doy);
	groupedByDate = Array.from(groupedByDate);
	groupedByDate = groupedByDate.sort((a, b) => a[0] - b[0]);
	// ----------- CREATE SCALES -----------
	xScale = d3
		.scaleLinear()
		.domain([83, 125])
		.range([margin.l, size.w - margin.r]);

	xScaleTitle = d3
		.scaleLinear()
		.domain([83, 125])
		.range([20, sizeTitleChart.w + 20]);

	xScaleSub = d3
		.scaleLinear()
		.domain([83, 125])
		.range([margin.l, windowW * 0.3 - margin.r * 2]);

	yScaleTitle = d3
		.scaleLinear()
		.domain([800, 2030])
		.range([10, sizeTitleChart.h - 10]);

	yScaleSub = d3
		.scaleLinear()
		.domain([800, 2030])
		.range([margin.t, sizeSub.h - margin.b]);

	yScaleHistogram = d3
		.scaleLinear()
		.domain([0, d3.max(groupedByDate, (d) => d[1].length) + 1])
		.range([windowH * 0.3 - margin.b, margin.t + 20]);

	yScaleScatterplot = d3
		.scaleLinear()
		.domain([800, 2030])
		.range([margin.t, size.h - margin.b]);

	colorScale = d3
		.scaleSequential()
		.domain(d3.extent(filteredData, (d) => d.year))
		.interpolator(d3.interpolateRdPu);

	angleScale = d3
		.scaleLinear()
		.domain(d3.extent(filteredData, (d) => d.tempC))
		.range([-144, 144]);

	// ----------- TITLE -----------
	let scatterplotTitleG = containerTitleG
		.append("g")
		.classed("scatterplot-title", true);

	let petalTitleG = scatterplotTitleG
		.selectAll("g.petal-title")
		.data(filteredData)
		.enter()
		.append("g")
		.classed("petal-title", true)
		.attr(
			"transform",
			(d) =>
				`translate(${xScaleTitle(d.date_doy)}, ${yScaleTitle(
					d.year
				)}) rotate(${angleScale(d.tempC)}) scale(${petalSize})`
		);

	petalTitleG
		.append("use")
		.attr("xlink:href", "#petal-svg")
		.attr("fill", (d) => colorScale(d.year))
		.attr("fill-opacity", 0.8)
		.attr("stroke-width", 0.3)
		.attr("stroke", "black")
		.style("opacity", 0)
		.transition()
		.delay((d) => (d.year - 800) * 3)
		.style("opacity", 1);

	// ----------- SUB SVG -----------

	let colorLegendG = d3
		.select("#sub-legend")
		.append("g")
		.classed("color-legend sub sub-1", true);

	colorLegendG
		.append("text")
		.classed("color-legend-title", true)
		.attr("transform", `translate(${windowW > 576 ? 30 : 20}, 30)`)
		.text("Year");

	colorLegendG
		.append("img")
		.classed("color-legend-img", true)
		.attr("src", "asset/color-legend.png")
		.attr("height", 15);

	const colorLegendTicks =
		windowW > 700 ? [812, 1114, 1417, 1719, 2021] : [812, 1417, 2021];

	colorLegendG
		.append("g")
		.classed("color-legend-ticks", true)
		.selectAll("g.color-legend-tick")
		.data(colorLegendTicks)
		.enter()
		.append("g")
		.classed("color-legend-tick", true)
		.append("text")
		.text((d) => d);

	// let shapeWidth = windowW * 0.045 > 50 ? 50 : windowW * 0.045;

	// let colorLegend = d3
	// 	.legendColor()
	// 	.labelFormat(d3.format("d"))
	// 	.title("Year")
	// 	.shapeWidth(windowW > 576 ? shapeWidth : 50)
	// 	.cells(windowW > 576 ? 5 : 3)
	// 	.orient("horizontal")
	// 	.scale(colorScale);

	// containerSubG
	// 	.append("g")
	// 	.classed("color-legend sub sub-1", true)
	// 	.attr("transform", `translate(${windowW > 576 ? 30 : 20}, ${margin.t})`)
	// 	.call(colorLegend);

	// d3.select(".legendTitle").attr("transform", "translate(0, 10)");

	// angles =
	// 	windowW > 650
	// 		? [
	// 				{ temp: 53.2, angle: -144 },
	// 				{ temp: 48.4, angle: -72 },
	// 				{ temp: 43.5, angle: 0 },
	// 				{ temp: 38.7, angle: 72 },
	// 				{ temp: 33.8, angle: 144 },
	// 		  ]
	// 		: [
	// 				{ temp: 53.2, angle: -144 },
	// 				{ temp: 43.5, angle: 0 },
	// 				{ temp: 33.8, angle: 144 },
	// 		  ];

	let angleLegendG = d3
		.select("#sub-legend")
		.append("g")
		.classed("angle-legend sub sub-2", true);

	angleLegendG
		.append("text")
		.classed("angle-legend-title", true)
		.attr(
			"transform",
			`translate(${windowW > 576 ? 30 : 20}, ${windowW > 576 ? 100 : 80})`
		)
		.text(
			windowW > 650
				? "(Estimated) Average March Temperature (F)"
				: "(Est.) Avg. March Temp (F)"
		);

	angleLegendG
		.append("img")
		.classed("angle-legend-img", true)
		.attr("src", "asset/angle-legend.png");

	// let containerSubCellsG = angleLegendG
	// 	.selectAll("g.angle-legend-petal")
	// 	.data(angles)
	// 	.enter()
	// 	.append("g")
	// 	.classed("angle-legend-petal", true)
	// 	.attr(
	// 		"transform",
	// 		(d, i) =>
	// 			`translate(${
	// 				windowW > 576 ? i * 45 + margin.l : i * 50 + 50
	// 			}, ${windowW > 576 ? 150 : 130}) rotate(${d.angle})`
	// 	);

	// containerSubCellsG
	// 	.append("use")
	// 	.attr("xlink:href", "#petal-svg")
	// 	.attr("fill", "#f880aa")
	// 	.attr("fill-opacity", 0.8)
	// 	.attr("stroke-width", 0.5)
	// 	.attr("stroke", "#ccc");

	// angleLegendG
	// 	.selectAll("g.angle-legend-label")
	// 	.data(angles)
	// 	.enter()
	// 	.append("g")
	// 	.classed("angle-legend-label", true)
	// 	.attr(
	// 		"transform",
	// 		(d, i) =>
	// 			`translate(${
	// 				windowW > 576 ? i * 45 + margin.l : i * 50 + 50
	// 			}, ${windowW > 576 ? 180 : 160})`
	// 	)
	// 	.attr("text-anchor", "middle")
	// 	.append("text")
	// 	.text((d) => d.temp);

	if (windowW > 576) {
		let scatterplotSubG = containerSubG
			.append("g")
			.classed("scatterplot-sub sub sub-0", true);

		let xAxisSub = d3.axisBottom(xScaleSub);
		scatterplotSubG
			.append("g")
			.classed("x-axis-sub", true)
			.attr("transform", `translate(0, ${sizeSub.h - margin.b})`)
			.call(xAxisSub);

		let yAxisSub = d3.axisLeft(yScaleSub).tickFormat(d3.format("d"));
		scatterplotSubG
			.append("g")
			.classed("y-axis-sub", true)
			.attr("transform", `translate(${margin.l}, 0)`)
			.call(yAxisSub);

		let xAxisSubLabel = scatterplotSubG
			.append("g")
			.classed("axis-sub-label", true)
			.attr(
				"transform",
				`translate(${margin.l + (sizeSub.w - margin.l) / 2}, ${
					sizeSub.h - margin.b + 30
				})`
			)
			.append("text")
			.text("Days after Jan. 1");

		let yAxisSubLabel = scatterplotSubG
			.append("g")
			.classed("axis-sub-label", true)
			.attr(
				"transform",
				`rotate(-90) translate(${-sizeSub.h / 2} ${margin.l / 2})`
			)
			.append("text")
			.text("Year");

		let petalSubG = scatterplotSubG
			.selectAll("g.sub-petal")
			.data(filteredData)
			.enter()
			.append("g")
			.classed("sub-petal", true)
			.attr(
				"transform",
				(d) =>
					`translate(${xScaleSub(d.date_doy)}, ${yScaleSub(
						d.year
					)}) rotate(${angleScale(d.tempC)}) scale(${
						0.5 * petalSize
					})`
			);

		petalSubG
			.append("use")
			.attr("id", (d) => `scatterplot-sub-${d.year}`)
			.attr("xlink:href", "#petal-svg")
			.attr("fill", (d) => colorScale(d.year))
			.attr("fill-opacity", 0.8)
			.attr("stroke-width", 0.3)
			.attr("stroke", "black");

		draggableLine = scatterplotSubG
			.append("g")
			.append("line")
			.attr("id", "draggable-line")
			.attr("draggable", true)
			.attr("x1", xScaleSub(83))
			.attr("y1", yScaleSub(812))
			.attr("x2", xScaleSub(125))
			.attr("y2", yScaleSub(812))
			.attr("stroke", "gray")
			.attr("stroke-width", 10);
	}

	// ----------- MAIN SVG -----------
	// ---------- HISTOGRAM -----------
	let histogramTitle = containerHG
		.append("g")
		.classed("histogram-title", true)
		.attr("transform", `translate(${margin.l - 20}, 30)`)
		.append("text")
		.text("Cherry blossom's full-blooming date");

	let xAxisBottom = d3.axisBottom(xScale);
	containerHG
		.append("g")
		.classed("axis", true)
		.attr("transform", `translate(0, ${windowH * 0.3 - margin.b})`)
		.call(xAxisBottom);
	containerHG
		.append("text")
		.classed("x-axis-label", true)
		.attr("transform", `translate(${size.w - 20}, ${windowH * 0.3 - 20})`)
		.text("(days after Jan. 1)");

	let yAxisH = d3.axisLeft(yScaleHistogram).ticks(5);
	containerHG
		.append("g")
		.classed("axis", true)
		.attr("transform", `translate(${margin.l}, 0)`)
		.call(yAxisH);

	let yAxisLabelH = containerHG
		.append("g")
		.classed("axis-label", true)
		.attr(
			"transform",
			`rotate(-90) translate(${-(windowH * 0.3) / 2} ${
				margin.l / 2 + 10
			})`
		)
		.append("text")
		.text("Count");

	let idx = -1;
	filteredData.forEach((data) => {
		groupedByDate.forEach((el) => {
			idx = el[1].findIndex((d) => d === data);
			if (idx == -1) {
				return;
			} else {
				data.count = idx;
			}
		});
	});

	let horizontalLineH = [10, 20, 30, 40, 50];
	containerHG
		.selectAll("g.h-line")
		.data(horizontalLineH)
		.enter()
		.append("g")
		.classed("h-line", true)
		.append("line")
		.attr("x1", margin.l)
		.attr("y1", (d) => yScaleHistogram(d))
		.attr("x2", size.w - margin.r)
		.attr("y2", (d) => yScaleHistogram(d))
		.attr("stroke", "#ccc")
		.attr("stroke-width", 0.5);

	// avgLine = containerHG.append("g").classed("avg-line", true);

	// avgLine
	// 	.append("line")
	// 	.attr("x1", xScale(102.87))
	// 	.attr("y1", yScaleHistogram(0))
	// 	.attr("x2", xScale(102.87))
	// 	.attr(
	// 		"y2",
	// 		yScaleHistogram(d3.max(groupedByDate, (d) => d[1].length) + 1)
	// 	)
	// 	.attr("stroke", "lightgray")
	// 	.attr("stroke-width", 3);

	// avgLine
	// 	.append("g")
	// 	.classed("avg-text", true)
	// 	.attr(
	// 		"transform",
	// 		`translate(${xScale(102.87) + 10}, ${yScaleHistogram(55)})`
	// 	)
	// 	.append("text")
	// 	.text(`802~902 avg: 102.87`);

	let histogramG = containerHG
		.selectAll("g.histogram-petal")
		.data(filteredData)
		.enter()
		.append("g")
		.classed("histogram-petal", true)
		.attr(
			"transform",
			(d) =>
				`translate(${xScale(d.date_doy) - 5.7}, ${
					yScaleHistogram(d.count) - 8.63
				}) rotate(${angleScale(d.tempC)}) scale(${petalSize})`
		);

	histogramG
		.append("use")
		.attr("id", (d) => `histogram-${d.year}`)
		.attr("xlink:href", "#petal-svg")
		.attr("fill", (d) => colorScale(d.year))
		.attr("fill-opacity", 0.8)
		.attr("stroke-width", 0.5)
		.attr("stroke", "#ccc");

	containerHG
		.selectAll("g.count")
		.data(groupedByDate)
		.enter()
		.append("g")
		.classed("count", true)
		.append("text")
		.attr("x", (d) => xScale(d[0]))
		.attr("y", (d) => yScaleHistogram(d[1].length) - 7)
		.text((d) => d[1].length);

	// ---------- SCATTERPLOT -----------
	let yAxisS = d3.axisLeft(yScaleScatterplot).tickFormat(d3.format("d"));
	containerSG
		.append("g")
		.classed("y-axis-s", true)
		.attr("transform", `translate(100, 0)`)
		.call(yAxisS);

	let horizontalLineS = [
		800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
		2000,
	];
	containerSG
		.selectAll("g.h-line")
		.data(horizontalLineS)
		.enter()
		.append("g")
		.classed("h-line", true)
		.append("line")
		.attr("x1", margin.l + 25)
		.attr("y1", (d) => yScaleScatterplot(d))
		.attr("x2", size.w - margin.r)
		.attr("y2", (d) => yScaleScatterplot(d))
		.attr("stroke", "#ccc")
		.attr("stroke-width", 0.5);

	containerSG
		.append("g")
		.classed("annotation-rect", true)
		.append("rect")
		.attr("x", xScale(101.5))
		.attr("y", yScaleScatterplot(1500))
		.attr("width", xScale(110.5) - xScale(101.5))
		.attr("height", yScaleScatterplot(1900) - yScaleScatterplot(1500))
		.attr("fill", "#ccc")
		.attr("fill-opacity", 0.5);

	containerSG
		.selectAll("g.annotation-line")
		.data(lines)
		.enter()
		.append("g")
		.classed("annotation-line", true)
		.append("line")
		.attr("id", (d) => d)
		.attr("x1", margin.l)
		.attr("y1", (d) => yScaleScatterplot(d))
		.attr("x2", size.w - margin.r)
		.attr("y2", (d) => yScaleScatterplot(d))
		.attr("stroke", "#3e3d3d")
		.attr("stroke-width", 1.5)
		.attr("stroke-dasharray", "4");

	d3.select("g.annotation-line").style("opacity", 0);

	let petalG = containerSG
		.selectAll("g.scatterplot-petal")
		.data(filteredData)
		.enter()
		.append("g")
		.classed("scatterplot-petal", true)
		.attr(
			"transform",
			(d) =>
				`translate(${xScale(d.date_doy) - 5.7}, ${
					yScaleScatterplot(d.year) - 8.63
				}) rotate(${angleScale(d.tempC)}) scale(${petalSize})`
		);

	petalG
		.append("use")
		.attr("id", (d) => `scatterplot-${d.year}`)
		.attr("xlink:href", "#petal-svg")
		.attr("fill", (d) => colorScale(d.year))
		.attr("fill-opacity", 0.8)
		.attr("stroke-width", 0.5)
		.attr("stroke", "#ccc");

	let scrollButton = d3
		.select("#kyoto1200__scatterplot")
		.append("div")
		.classed("scrollButton scrollButtonCenter", true)
		.append("a")
		.attr("href", "#tile");

	scrollButton.append("span");
	scrollButton.append("span");
	scrollButton.append("span");

	// d3
	// 	.select("#kyoto1200__scatterplot")
	// 	.append("div")
	// 	.classed("comment", true)
	// 	.append("article")
	// 	.append("p").html(`In 2018, full-blooming was earliest tie at that time
	//   (March 28th, 86 days after January 1st). In 2021,
	//   cherry blossoms in Kyoto peaked earliest on record,
	//   fully-blooming on March 26th (84 days after January
	//   1st).<br><br> After 1900, out of 122 years of data, 105 years of full-blooming occured
	//   before the average date (105 days after Jan. 1) until that year.`);

	// d3.select("#kyoto1200__scatterplot")
	// 	.append("div")
	// 	.classed("go-back-to-top", true)
	// 	.append("p")
	// 	.html(`<a href="#intro">Go back to top</a>`);
}

// window.onresize = function () {
// 	d3.select("g.color-legend").remove();
// 	d3.select("g.angle-legend").remove();
// 	d3.select("g.sub-petal").remove();
// 	d3.select("g.y-axis-sub").remove();
// 	d3.select("g.sub-petal").remove();
// 	d3.select("#draggable-line").remove();
// 	d3.selectAll("g.axis").remove();
// 	d3.select("text.x-axis-label").remove();
// 	d3.selectAll("g.h-line").remove();
// 	d3.selectAll("g.histogram-petal").remove();
// 	d3.selectAll("g.count").remove();
// 	d3.select("y-axis-s").remove();
// 	d3.selectAll("g.scatterplot-petal").remove();
// 	d3.select("div.comment").remove();
// 	d3.select("div.go-back-to-top").remove();

// 	windowH = window.innerHeight;
// 	windowW = window.innerWidth;

// 	size.w = document.querySelector("#kyoto1200__scatterplot").clientWidth - 5;

// 	petalSize = windowW > 576 ? windowW / 1425 : 0.5;

// 	svgSub
// 		.attr("width", document.querySelector("#sub").clientWidth)
// 		.attr("height", document.querySelector("#sub").clientHeight);
// 	svgH.attr("width", size.w);
// 	svgS.attr("width", size.w);

// 	draw(filteredData);
// 	interactive();
// };

function scrolly() {
	enterView({
		selector: "div.step",
		enter: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.selectAll(".step").style("opacity", 0.1);
			d3.select(el).style("opacity", 1);
			d3.selectAll("g.sub").style("opacity", 0.1);
			d3.select(`g.sub-${index}`).style("opacity", 1);
			if (index === 4) {
				d3.selectAll("g.sub").style("opacity", 1);
			}
		},
		exit: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.select(el).style("opacity", 0.1);
			d3.select(`.step[data-index="${index - 1}"]`).style("opacity", 1);
			d3.selectAll("g.sub").style("opacity", 0.1);
			d3.select(`g.sub-${index - 1}`).style("opacity", 1);
		},
		offset: 0.5,
	});
}

function interactive() {
	// HISTOGRAM TOOLTIP
	d3.selectAll(".histogram-petal")
		.on("mouseover", function (e, d) {
			d3.select(this)
				.selectChild()
				.attr("fill-opacity", 1)
				.attr("stroke-width", 3)
				.attr("stroke", "black");
			let x = xScale(d.date_doy);
			let y = yScaleHistogram(d.count);
			d3.select(".histogram-tooltip")
				.style("top", `${y + 10}px`)
				.style(
					"left",
					d.date_doy < 105 ? `${x + 10}px` : `${x - 230}px`
				)
				.style("visibility", "visible")
				.html(
					`<span class="dim">Year:</span> <b>${d.year}</b><br><span class="dim">Full-bloom date:</span> <b>${d.month} ${d.day}</b><br><span class="dim">Temperature:</span> <b>${d.tempF} (F)</b><br><span class="dim">Source:</span> <b>${d.source}</b><br>`
				);
		})
		.on("mouseout", function () {
			d3.select(this)
				.selectChild()
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			d3.select(".histogram-tooltip").style("visibility", "hidden");
		});

	// SCATTERPLOT TOOLTIP
	d3.selectAll(".scatterplot-petal")
		.on("mouseover", function (e, d) {
			d3.selectAll(".scatterplot-petal")
				.selectChild()
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			d3.select(this)
				.selectChild()
				.attr("fill-opacity", 1)
				.attr("stroke-width", 3)
				.attr("stroke", "black");
			let x = xScale(d.date_doy);
			let y = yScaleScatterplot(d.year);
			d3.select(".scatterplot-tooltip")
				.style("top", `${y + 10}px`)
				.style(
					"left",
					d.date_doy < 105 ? `${x + 10}px` : `${x - 230}px`
				)
				.style("visibility", "visible")
				.html(
					`<span class="dim">Year:</span> <b>${d.year}</b><br><span class="dim">Full-bloom date:</span> <b>${d.month} ${d.day}</b><br><span class="dim">Temperature:</span> <b>${d.tempF} (F)</b><br><span class="dim">Source:</span> <b>${d.source}</b><br>`
				);
			d3.select(".scatterplot-annotation__point").style(
				"visibility",
				"hidden"
			);
		})
		.on("mouseout", function () {
			d3.select(this)
				.selectChild()
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			d3.select(".scatterplot-tooltip").style("visibility", "hidden");
		});

	// DRAGGABLE LINE
	if (windowW > 576) {
		draggableLine.call(
			d3
				.drag()
				.on("drag", function (event) {
					let y = event.y;
					if (y < yScaleSub(812)) {
						y = yScaleSub(812);
					} else if (y > yScaleSub(2021)) {
						y = yScaleSub(2021);
					}
					d3.select(this).attr("y1", y).attr("y2", y);
				})
				.on("end", function (event) {
					d3.select(this).classed("dragged", true);
					let selectedYear = Math.round(yScaleSub.invert(event.y));
					let petalToJump = document
						.querySelector(".container-scatterplot")
						.querySelector(`#scatterplot-${selectedYear}`);
					if (petalToJump === null) {
						selectedYear = availableYears.reduce((prev, curr) => {
							return Math.abs(curr - selectedYear) <
								Math.abs(prev - selectedYear)
								? curr
								: prev;
						});
						petalToJump = document
							.querySelector(".container-scatterplot")
							.querySelector(`#scatterplot-${selectedYear}`);
					}
					petalToJump.scrollIntoView({
						block: "center",
						inline: "nearest",
					});
					setTimeout(() => {
						d3.select(this).classed("dragged", false);
					}, 1000);
				})
		);
	}

	// ADD ANNOTATIONS
	points.forEach((year) => {
		let thisPetal = d3.select(`use#scatterplot-${year}`);
		thisPetal.classed("toAnnotate", true);
	});

	// SHOW ANNOTATION POINTS
	enterView({
		selector: ".toAnnotate",
		enter: function (el) {
			let year = +el.getAttribute("id").slice(12);
			let data = d3.select(el).data();
			d3.selectAll(".scatterplot-petal")
				.selectChild()
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			d3.select(el)
				.attr("fill-opacity", 1)
				.attr("stroke-width", 3)
				.attr("stroke", "black");

			let x = xScale(data[0].date_doy);
			let y = yScaleScatterplot(year);
			let i = annotation.findIndex((el) => el.year === year);
			d3.select(".scatterplot-annotation__point")
				.style("top", `${y + 10}px`)
				.style(
					"left",
					data[0].date_doy < 105 ? `${x + 10}px` : `${x - 300}px`
				)
				.style("visibility", "visible")
				.html(
					`<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${year}</b><br><span class="dim">Full-bloom date:</span> <b>${data[0].month} ${data[0].day}</b><br><span class="dim">Temperature:</span> <b>${data[0].tempF} (F)</b><br><span class="dim">Source:</span> <b>${data[0].source}</b><br><br><br>${annotation[i].comment}`
				);
		},
		exit: function (el) {
			d3.select(el)
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			let year = +el.getAttribute("id").slice(12);
			let i = annotation.findIndex((el) => el.year === year);
			if (i === 0) {
				d3.select(".scatterplot-annotation__point").style(
					"visibility",
					"hidden"
				);
			} else {
				let prevYear = i !== 8 ? points[i - 1] : points[4];
				let prevPetal = d3.select(`#scatterplot-${prevYear}`);
				prevPetal
					.attr("fill-opacity", 1)
					.attr("stroke-width", 3)
					.attr("stroke", "black");
				let prevData = prevPetal.data();
				let x = xScale(prevData[0].date_doy);
				let y = yScaleScatterplot(prevYear);
				d3.select(".scatterplot-annotation__point")
					.style("top", `${y + 10}px`)
					.style(
						"left",
						prevData[0].date_doy < 105
							? `${x + 10}px`
							: `${x - 300}px`
					)
					.style("visibility", "visible")
					.html(
						`<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${prevYear}</b><br><span class="dim">Full-bloom date:</span> <b>${
							prevData[0].month
						} ${
							prevData[0].day
						}</b><br><span class="dim">Temperature:</span> <b>${
							prevData[0].tempF
						} (F)</b><br><span class="dim">Source:</span> <b>${
							prevData[0].source
						}</b><br><br><br>${annotation[i - 1].comment}`
					);
			}
		},
		offset: 0.3,
	});

	// SHOW ANNOTATION LINES
	enterView({
		selector: "g.annotation-line",
		enter: function (el) {
			let year = +d3.select(el).select("line").attr("id");
			let i = annotation.findIndex((el) => el.year === year);
			let y = yScaleScatterplot(year);
			d3.select(".scatterplot-annotation__line")
				.style("top", year === 1880 ? `${y - 80}px` : `${y + 2}px`)
				.style(
					"left",
					year === 1953
						? `${size.w - margin.r - 250}px`
						: `${margin.l}px`
				)
				.style("visibility", "visible")
				.html(`${annotation[i].comment}`);
		},
		exit: function (el) {
			let year = +d3.select(el).select("line").attr("id");
			let yearI = lines.findIndex((el) => el === year);
			if (yearI === 0) {
				d3.select(".scatterplot-annotation__line").style(
					"visibility",
					"hidden"
				);
			} else {
				let prevYear = lines[yearI - 1];
				let i = annotation.findIndex((el) => el.year === prevYear);
				let y = yScaleScatterplot(prevYear);
				d3.select(".scatterplot-annotation__line")
					.style(
						"top",
						prevYear === 1880 ? `${y - 80}px` : `${y + 2}px`
					)
					.style("left", `${margin.l}px`)
					.html(`${annotation[i].comment}`);
			}
		},
		offset: 0.3,
	});

	// FORM HISTOGRAM
	enterView({
		selector: "g.scatterplot-petal",
		enter: function (el) {
			let id = el.children[0].getAttribute("id").slice(12);
			let histogramPetalEl = histogramContainer.querySelector(
				`use#histogram-${id}`
			);
			histogramPetalEl.parentElement.classList.add(
				"histogram-petal-active"
			);
			if (windowW > 576) {
				if (draggableLine.classed("dragged")) {
					return;
				} else {
					draggableLine
						.transition()
						.attr("y1", yScaleSub(id))
						.attr("y2", yScaleSub(id));
				}
			}
			// if (id > 902) {
			// 	let avg = el.__data__.doy_100yr;
			// 	avgLine
			// 		.select("line")
			// 		.attr("x1", xScale(avg))
			// 		.attr("x2", xScale(avg));
			// }
		},
		exit: function (el) {
			let id = el.children[0].getAttribute("id").slice(12);
			let histogramPetalEl = histogramContainer.querySelector(
				`use#histogram-${id}`
			);
			histogramPetalEl.parentElement.classList.remove(
				"histogram-petal-active"
			);
			if (windowW > 576) {
				if (draggableLine.classed("dragged")) {
					return;
				} else {
					draggableLine
						.transition()
						.attr("y1", yScaleSub(id))
						.attr("y2", yScaleSub(id));
				}
			}
		},
		offset: 0.7,
	});

	// enterView({
	// 	selector: "#scatterplot-902",
	// 	enter: function (el) {
	// 		d3.select(".avg-line").style("opacity", 1);
	// 	},
	// 	exit: function (el) {
	// 		d3.select(".avg-line").style("opacity", 0);
	// 	},
	// 	offset: 0.7,
	// });

	// SHOW FINAL COUNTS
	enterView({
		selector: ".scrollButtonCenter",
		enter: function (el) {
			d3.selectAll(".count").style("opacity", 1);
		},
		exit: function (el) {
			d3.selectAll(".count").style("opacity", 0);
		},
		offset: 0.8,
	});
}

// HIDE ANNOTATIONS
function hideAnnotation() {
	d3.select(".scatterplot-annotation__point").style("visibility", "hidden");
	d3.selectAll(".scatterplot-petal")
		.selectChild()
		.attr("fill-opacity", 0.8)
		.attr("stroke-width", 0.5)
		.attr("stroke", "#ccc");
}
