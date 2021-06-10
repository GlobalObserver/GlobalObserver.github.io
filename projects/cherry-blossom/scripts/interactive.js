function scrolly() {
	// INTRO EXPLANATION
	let introOffset = windowW > 800 ? 0.5 : 0.3;
	enterView({
		selector: "div.explanation__step",
		enter: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.selectAll(".explanation__step").style("opacity", 0.1);
			d3.select(el).style("opacity", 1);
			d3.selectAll("g.sub").style("opacity", 0.1);
			d3.select(`g.sub-${index}`).style("opacity", 1);
			if (index === 4) {
				d3.selectAll("g.sub").style("opacity", 1);
			}
			if (windowW <= 800) {
				if (index === 1) {
					d3.select("#sub-chart")
						.transition()
						.duration(1000)
						.style("visibility", "hidden");
				}
			}
		},
		exit: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.select(el).style("opacity", 0.1);
			d3.select(`.explanation__step[data-index="${index - 1}"]`).style(
				"opacity",
				1
			);
			d3.selectAll("g.sub").style("opacity", 0.1);
			d3.select(`g.sub-${index - 1}`).style("opacity", 1);
			if (windowW <= 800) {
				if (index === 1) {
					d3.select("#sub-chart")
						.transition()
						.duration(1000)
						.style("visibility", "visible");
				}
			}
		},
		offset: introOffset,
	});

	// ANALYSIS
	enterView({
		selector: "div.analysis__step",
		enter: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.selectAll(".analysis__step").style("opacity", 0.1);
			d3.select(el).style("opacity", 1);
			const horizontalLineG = containerHG.selectAll("g.h-line");
			const histogramPetalG = containerHG.selectAll(".histogram-petal");
			if (index === 0) {
				d3.select(".median-line")
					.transition()
					.duration(1000)
					.style("opacity", 1);
				if (windowW <= 800) {
					d3.select("#kyoto1200__histogram")
						.transition()
						.duration(1000)
						.style("top", "0px");
					d3.select("#sub").style("visibility", "hidden");
				}
			} else if (index === 1) {
				containerHG
					.selectAll(".count")
					.transition()
					.duration(1000)
					.style("opacity", 0);

				yScaleHistogram.domain([0, 51]);

				yAxisH
					.transition()
					.duration(1000)
					.call(d3.axisLeft().scale(yScaleHistogram).ticks(5));

				horizontalLineG.each(function (d, i) {
					d3.select(this)
						.select("line")
						.transition()
						.duration(1000)
						.attr("y1", yScaleHistogram(i * 10 + 10))
						.attr("y2", yScaleHistogram(i * 10 + 10));
				});

				histogramPetalG.selectAll(".ancient").each(function (d, i) {
					d3.select(this.parentNode)
						.transition()
						.duration(1000)
						.attr(
							"transform",
							(d) =>
								`translate(${xScale(d.date_doy) - 5.7}, ${
									yScaleHistogram(d.count) - 8.63
								}) rotate(${angleScale(
									d.tempC
								)}) scale(${petalSize})`
						);
				});

				containerHG
					.select(".histogram-title-text")
					.text("Full-bloom date (812-1899)");

				d3.select("#kyoto1200__histogram").style("height", "60vh");
				svgH.attr("height", windowH * 0.6);
				d3.selectAll(".after1900").classed("after1900-active", true);

				histogramPetalG
					.selectAll(".modern")
					.transition()
					.duration(1000)
					.delay(1000)
					.each(function (d, i) {
						d3.select(this.parentNode).attr(
							"transform",
							(d) =>
								`translate(${xScale(d.date_doy) - 5.7}, ${
									yScaleHistogramAfter1900(d.countAfter1900) -
									5.7 +
									windowH * 0.3 -
									30
								}) rotate(${angleScale(
									d.tempC
								)}) scale(${petalSize})`
						);
					});
			} else if (index === 2) {
				containerHG
					.select(".line-2021")
					.transition()
					.duration(1000)
					.style("opacity", 1);
			}
		},
		exit: (el) => {
			let index = +d3.select(el).attr("data-index");
			d3.select(el).style("opacity", 0.1);
			d3.select(`.analysis__step[data-index="${index - 1}"]`).style(
				"opacity",
				1
			);
			const horizontalLineG = containerHG.selectAll("g.h-line");
			const histogramPetalG = containerHG.selectAll(".histogram-petal");
			if (index === 0) {
				d3.select(".median-line").style("opacity", 0);
				if (windowW <= 800) {
					d3.select("#kyoto1200__histogram")
						.transition()
						.duration(1000)
						.style("top", "180px");
					d3.select("#sub").style("visibility", "visible");
					d3.select("#sub-chart").style("visibility", "hidden");
				}
			} else if (index === 1) {
				containerHG
					.selectAll(".count")
					.transition()
					.duration(1000)
					.style("opacity", 0);

				yScaleHistogram.domain([0, 58]);

				yAxisH
					.transition()
					.duration(1000)
					.call(d3.axisLeft().scale(yScaleHistogram).ticks(5));

				horizontalLineG.each(function (d, i) {
					d3.select(this)
						.select("line")
						.transition()
						.duration(1000)
						.attr("y1", yScaleHistogram(i * 10 + 10))
						.attr("y2", yScaleHistogram(i * 10 + 10));
				});

				histogramPetalG.each(function (d, i) {
					d3.select(this)
						.transition()
						.duration(1000)
						.attr(
							"transform",
							(d) =>
								`translate(${xScale(d.date_doy) - 5.7}, ${
									yScaleHistogram(d.count) - 8.63
								}) rotate(${angleScale(
									d.tempC
								)}) scale(${petalSize})`
						);
				});

				containerHG
					.select(".histogram-title-text")
					.text("Full-bloom date (812-2021)");

				containerHG
					.selectAll(".after1900")
					.classed("after1900-active", false);

				svgH.transition()
					.duration(1500)
					.attr("height", windowH * 0.3);
				d3.select("#kyoto1200__histogram")
					.transition()
					.duration(1500)
					.style("height", "30vh");
			} else if (index === 2) {
				containerHG
					.selectAll(".line-2021")
					.transition()
					.duration(1000)
					.style("opacity", 0);
			}
		},
		offset: 0.3,
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
			let x;
			if (windowW > 800) {
				x =
					d.date_doy < 105
						? xScale(d.date_doy) + 10
						: xScale(d.date_doy) - 230;
			} else {
				x = (windowW - margin.l) / 2 - 110 + margin.l;
			}
			let isAfter1900Visible = d3
				.select(".after1900")
				.classed("after1900-active");
			let y;
			if (isAfter1900Visible) {
				y =
					d.year >= 1900
						? yScaleHistogramAfter1900(d.countAfter1900) +
						  windowH * 0.3 -
						  margin.t
						: yScaleHistogram(d.count);
			} else {
				y = yScaleHistogram(d.count);
			}
			d3.select(".histogram-tooltip")
				.style("top", `${y + 10}px`)
				.style("left", `${x}px`)
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
			let x;
			if (windowW > 800) {
				x =
					d.date_doy < 105
						? xScale(d.date_doy) + 10
						: xScale(d.date_doy) - 230;
			} else {
				x = (windowW - margin.l) / 2 - 110 + margin.l;
			}
			let y = yScaleScatterplot(d.year);
			d3.select(".scatterplot-tooltip")
				.style("top", `${y + 10}px`)
				.style("left", `${x}px`)
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
	if (windowW > 800) {
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
	let annotationOffset = windowW > 800 ? 0.3 : 0.1;
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

			let x;
			if (windowW > 800) {
				x = xScale(data[0].date_doy);
			} else {
				x = data[0].year > 1000 ? xScale(data[0].date_doy) : xScale(84);
			}
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
					windowW > 800
						? `<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${year}</b><br><span class="dim">Full-bloom date:</span> <b>${data[0].month} ${data[0].day}</b><br><span class="dim">Temperature:</span> <b>${data[0].tempF} (F)</b><br><span class="dim">Source:</span> <b>${data[0].source}</b><br><br><br>${annotation[i].comment}`
						: `<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${year}</b><br><span class="dim">Full-bloom date:</span> <b>${data[0].month} ${data[0].day}</b><br><br>${annotation[i].comment}`
				);
		},
		exit: function (el) {
			d3.select(el)
				.attr("fill-opacity", 0.8)
				.attr("stroke-width", 0.5)
				.attr("stroke", "#ccc");
			let year = +el.getAttribute("id").slice(12);
			let data = d3.select(el).data();
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
				let x;
				if (windowW > 800) {
					x = xScale(prevData[0].date_doy);
				} else {
					x =
						prevData[0].year > 1000
							? xScale(prevData[0].date_doy)
							: xScale(84);
				}

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
						windowW > 800
							? `<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${prevYear}</b><br><span class="dim">Full-bloom date:</span> <b>${
									prevData[0].month
							  } ${
									prevData[0].day
							  }</b><br><span class="dim">Temperature:</span> <b>${
									prevData[0].tempF
							  } (F)</b><br><span class="dim">Source:</span> <b>${
									prevData[0].source
							  }</b><br><br><br>${
									i !== 8
										? annotation[i - 1].comment
										: annotation[4].comment
							  }`
							: `<div class="x-closing" onclick="hideAnnotation()">x</div><span class="dim">Year:</span> <b>${prevYear}</b><br><span class="dim">Full-bloom date:</span> <b>${
									prevData[0].month
							  } ${prevData[0].day}</b><br><br>${
									i !== 8
										? annotation[i - 1].comment
										: annotation[4].comment
							  }`
					);
			}
		},
		offset: annotationOffset,
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
		offset: annotationOffset,
	});

	let formHistogramOffset =
		windowW > 800 ? 0.7 + 50 / windowH : 0.7 + 50 / windowH - 180 / windowH;

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
			d3.select(".histogram-title-text").text(
				`Full-bloom date (812-${id})`
			);
			if (windowW > 800) {
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
		exit: function (el) {
			let id = el.children[0].getAttribute("id").slice(12);
			let histogramPetalEl = histogramContainer.querySelector(
				`use#histogram-${id}`
			);
			histogramPetalEl.parentElement.classList.remove(
				"histogram-petal-active"
			);
			if (id === 812) {
				d3.select(".histogram-title-text").text(`Full-bloom date`);
			} else {
				d3.select(".histogram-title-text").text(
					`Full-bloom date (812-${id})`
				);
			}
			if (windowW > 800) {
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
		offset: formHistogramOffset,
	});

	// SHOW FINAL COUNTS
	if (windowW > 800) {
		enterView({
			selector: ".scrollButtonCenter",
			enter: function (el) {
				d3.selectAll(".count")
					.transition()
					.duration(1000)
					.style("opacity", 1);
				d3.select(".histogram-title-text").text(
					`Full-bloom date (812-2021)`
				);
			},
			exit: function (el) {
				d3.selectAll(".count").style("opacity", 0);
			},
			offset: 0.8,
		});
	}
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
