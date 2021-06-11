let windowH = window.innerHeight;
let windowW = window.innerWidth;

const margin =
	windowW > 800
		? { t: 25, r: 25, b: 50, l: 75 }
		: { t: 25, r: 25, b: 50, l: 50 };
const size = {
	w:
		Math.floor(
			document.querySelector("#kyoto1200__scatterplot").clientWidth
		) - 1,
	h: 3000,
};

const sizeTitleChart = {
	w: document.querySelector("#title-chart").clientWidth,
	h: document.querySelector("#title-chart").clientHeight,
};

const sizeSub = {
	w: document.querySelector("#sub-chart").clientWidth,
	h: document.querySelector("#sub-chart").clientHeight,
};
let petalSize = windowW > 800 ? windowW / 1425 : 0.6;
let transformOriginSize =
	windowW > 800 ? { x: 6.16, y: 8.975 } : { x: 3.655, y: 5.33 };

const svgTitle = d3
	.select("#title-chart")
	.append("svg")
	.attr("width", windowW > 800 ? sizeTitleChart.w + 20 : sizeTitleChart.w)
	.attr("height", sizeTitleChart.h);

const svgSub = d3
	.select("#sub-chart")
	.append("svg")
	.attr("width", sizeSub.w)
	.attr("height", sizeSub.h);

const containerSubG = svgSub.append("g").classed("container-sub", true);

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
const containerHG = svgH
	.append("g")
	.classed("container-histogram sub sub-3", true);
const containerSG = svgS.append("g").classed("container-scatterplot", true);
const histogramContainer = document.querySelector(".container-histogram");

let filteredData,
	dataAfter1900,
	groupedByDate,
	groupedDataAfter1900,
	xScale,
	xScaleSub,
	yScaleSub,
	yScaleHistogram,
	yScaleHistogramAfter1900,
	yScaleScatterplot,
	colorScale,
	angleScale,
	xAxisH,
	yAxisH,
	xAxisLabelH,
	yAxisLabelH,
	horizontalLineH,
	draggableLine,
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

		availableYears = filteredData.map((d) => d.year);
		dataAfter1900 = filteredData.filter((d) => {
			return d.year >= 1900;
		});
		groupedDataAfter1900 = groupData(dataAfter1900);

		draw();
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

function groupData(data) {
	let groupedData = d3.group(data, (d) => d.date_doy);
	groupedData = Array.from(groupedData);
	groupedData = groupedData.sort((a, b) => a[0] - b[0]);
	return groupedData;
}

function draw() {
	groupedByDate = groupData(filteredData);
	// ----------- CREATE SCALES -----------
	xScale = d3
		.scaleLinear()
		.domain([83, 125])
		.range([margin.l, size.w - margin.r]);

	xScaleTitle = d3
		.scaleLinear()
		.domain([83, 125])
		.range([
			windowW > 800 ? 20 : 0,
			windowW > 800 ? sizeTitleChart.w + 20 : sizeTitleChart.w,
		]);

	xScaleSub = d3
		.scaleLinear()
		.domain([83, 125])
		.range([
			margin.l,
			windowW > 800 ? windowW * 0.3 - margin.r * 2 : sizeSub.w - margin.r,
		]);

	yScaleTitle = d3
		.scaleLinear()
		.domain([800, 2030])
		.range([10, sizeTitleChart.h - 20]);

	yScaleSub = d3
		.scaleLinear()
		.domain([800, 2050])
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
		.range([144, -144]);

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
				)}) rotate(${angleScale(d.tempC)}, ${transformOriginSize.x}, ${
					transformOriginSize.y
				}) scale(${petalSize})`
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
		.attr("transform", `translate(${windowW > 800 ? 30 : 20}, 30)`)
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

	let angleLegendG = d3
		.select("#sub-legend")
		.append("g")
		.classed("angle-legend sub sub-2", true);

	angleLegendG
		.append("text")
		.classed("angle-legend-title", true)
		.attr(
			"transform",
			`translate(${windowW > 800 ? 30 : 20}, ${windowW > 800 ? 100 : 80})`
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
		.text("Full-bloom date (days after Jan. 1)");

	let yAxisSubLabel = scatterplotSubG
		.append("g")
		.classed("axis-sub-label", true)
		.attr(
			"transform",
			`rotate(-90) translate(${-sizeSub.h / 2}, ${
				windowW > 800 ? margin.l / 2 : 15
			})`
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
				)}) rotate(${angleScale(d.tempC)}, ${
					windowW > 800 ? 3.27 : 2.925
				}, ${windowW > 800 ? 4.61 : 4.265}) scale(${
					windowW > 800 ? 0.5 * petalSize : 0.8 * petalSize
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

	// ----------- MAIN SVG -----------
	// ---------- HISTOGRAM -----------
	let histogramTitle = containerHG
		.append("g")
		.classed("histogram-title", true)
		.attr("transform", `translate(${margin.l - 20}, 30)`)
		.append("text")
		.classed("histogram-title-text", true)
		.text("Full-bloom date");

	xAxisH = containerHG
		.append("g")
		.classed("axis", true)
		.attr("transform", `translate(0, ${windowH * 0.3 - margin.b})`)
		.call(d3.axisBottom(xScale));

	xAxisLabelH = containerHG
		.append("text")
		.classed("x-axis-label", true)
		.attr("transform", `translate(${size.w - 20}, ${windowH * 0.3 - 20})`)
		.text("(days after Jan. 1)");

	yAxisH = containerHG
		.append("g")
		.classed("axis", true)
		.attr("transform", `translate(${margin.l}, 0)`)
		.call(d3.axisLeft(yScaleHistogram).ticks(5));

	yAxisLabelH = containerHG
		.append("g")
		.classed("axis-label", true)
		.attr(
			"transform",
			`rotate(-90) translate(${-(windowH * 0.3) / 2}, ${
				windowW > 800 ? margin.l / 2 + 10 : margin.l / 2
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
				data.count = idx + 1;
			}
		});
		groupedDataAfter1900.forEach((el) => {
			idx = el[1].findIndex((d) => d === data);
			if (idx == -1) {
				return;
			} else {
				data.countAfter1900 = idx + 1;
			}
		});
	});

	horizontalLineH = [10, 20, 30, 40, 50];
	containerHG
		.selectAll("g.h-line")
		.data(horizontalLineH)
		.join("g")
		.classed("h-line", true)
		.append("line")
		.attr("x1", margin.l)
		.attr("y1", (d) => yScaleHistogram(d))
		.attr("x2", size.w - margin.r)
		.attr("y2", (d) => yScaleHistogram(d))
		.attr("stroke", "#ccc")
		.attr("stroke-width", 0.5);

	let medianLine = containerHG.append("g").classed("median-line", true);

	medianLine
		.append("rect")
		.attr("x", xScale(103.5))
		.attr("y", windowW > 800 ? margin.t : margin.t + 10)
		.attr("width", xScale(104.5) - xScale(103.5))
		.attr(
			"height",
			windowW > 800
				? windowH * 0.3 - margin.t - 35
				: windowH * 0.3 - margin.t - 45
		)
		.attr("fill", "none")
		.attr("stroke", "#ffbf00")
		.attr("stroke-width", 3);

	medianLine
		.append("g")
		.classed("median-text", true)
		.attr(
			"transform",
			`translate(${xScale(105)}, ${
				windowW > 800 ? margin.t + 5 : margin.t + 20
			})`
		)
		.append("text")
		.text("Median: 104 days");

	// ---------- AFTER 1900 ----------
	yScaleHistogramAfter1900 = d3
		.scaleLinear()
		.domain([0, 13])
		.range([windowH * 0.3 - margin.b, margin.t + 20]);

	containerHAfter1900G = containerHG
		.append("g")
		.classed("histogram after1900", true)
		.attr("transform", `translate(0, ${windowH * 0.3 - 30})`);

	let horizontalLineAfter1900H = [5, 10];
	containerHAfter1900G
		.selectAll("g.h-lineAfter1900")
		.data(horizontalLineAfter1900H)
		.join("g")
		.classed("h-lineAfter1900", true)
		.append("line")
		.attr("x1", margin.l)
		.attr("y1", (d) => yScaleHistogramAfter1900(d))
		.attr("x2", size.w - margin.r)
		.attr("y2", (d) => yScaleHistogramAfter1900(d))
		.attr("stroke", "#ccc")
		.attr("stroke-width", 0.5);

	let medianLineAfter1900 = containerHAfter1900G
		.append("g")
		.classed("after1900", true);

	medianLineAfter1900
		.append("rect")
		.attr("x", xScale(97.5))
		.attr("y", yScaleHistogramAfter1900(10))
		.attr("width", xScale(98.5) - xScale(97.5))
		.attr(
			"height",
			yScaleHistogramAfter1900(1) - yScaleHistogramAfter1900(12)
		)
		.attr("fill", "none")
		.attr("stroke", "#ffbf00")
		.attr("stroke-width", 3);

	medianLineAfter1900
		.append("g")
		.classed("median-text", true)
		.attr(
			"transform",
			`translate(${xScale(98)}, ${yScaleHistogramAfter1900(11)})`
		)
		.append("text")
		.text("Median: 98 days");

	let line2021 = containerHAfter1900G.append("g").classed("line-2021", true);

	line2021
		.append("rect")
		.attr("x", xScale(83.5))
		.attr("y", yScaleHistogramAfter1900(2))
		.attr("width", xScale(84.5) - xScale(83.5))
		.attr(
			"height",
			yScaleHistogramAfter1900(1) - yScaleHistogramAfter1900(4)
		)
		.attr("fill", "none")
		.attr("stroke", "#ffbf00")
		.attr("stroke-width", 3);

	line2021
		.append("g")
		.classed("median-text", true)
		.attr(
			"transform",
			`translate(${xScale(83.5)}, ${yScaleHistogramAfter1900(3)})`
		)
		.append("text")
		.text(windowW > 800 ? "2021: 84 days" : "2021");

	containerHAfter1900G
		.append("g")
		.classed("histogram-title after1900", true)
		.attr("transform", `translate(${margin.l - 20}, 30)`)
		.append("text")
		.classed("histogram-title-text", true)
		.text("Full-bloom date (1900-2021)");

	containerHAfter1900G
		.append("g")
		.classed("axis after1900", true)
		.attr("transform", `translate(0, ${windowH * 0.3 - margin.b})`)
		.call(d3.axisBottom(xScale));

	containerHAfter1900G
		.append("g")
		.classed("axis after1900", true)
		.attr("transform", `translate(${margin.l}, 0)`)
		.call(d3.axisLeft(yScaleHistogramAfter1900).ticks(3));

	containerHAfter1900G
		.append("text")
		.classed("x-axis-label", true)
		.attr("transform", `translate(${size.w - 20}, ${windowH * 0.3 - 20})`)
		.text("(days after Jan. 1)");

	containerHAfter1900G
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

	// HISTOGRAM PETALS
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
				}) rotate(${angleScale(d.tempC)}, ${transformOriginSize.x}, ${
					transformOriginSize.y
				}) scale(${petalSize})`
		);

	histogramG
		.append("use")
		.attr("class", (d) => (d.year < 1900 ? "ancient" : "modern"))
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
		.attr("y", (d) => yScaleHistogram(d[1].length) - 10)
		.text((d) => d[1].length);

	// ---------- SCATTERPLOT -----------
	let yAxisS = d3.axisLeft(yScaleScatterplot).tickFormat(d3.format("d"));
	containerSG
		.append("g")
		.classed("y-axis-s", true)
		.attr("transform", `translate(${windowW > 800 ? 100 : 70}, 0)`)
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
		.attr("href", "#analysis");

	scrollButton.append("span");
	scrollButton.append("span");
	scrollButton.append("span");
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

// 	petalSize = windowW > 800 ? windowW / 1425 : 0.5;

// 	svgSub
// 		.attr("width", document.querySelector("#sub").clientWidth)
// 		.attr("height", document.querySelector("#sub").clientHeight);
// 	svgH.attr("width", size.w);
// 	svgS.attr("width", size.w);

// 	draw(filteredData);
// 	interactive();
// };
