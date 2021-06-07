const annotation = [
	{
		year: 812,
		comment:
			"Oldest ever recorded. Professor Aono collected the data from a Japanese history text, <a href='https://en.wikipedia.org/wiki/Nihon_K%C5%8Dki' target='_blank'>Nihon Koki</a>.",
		category: "point",
	},
	{
		year: 961,
		comment: "Earliest full-blooming for 423 years, from 812 to 1235.",
		category: "point",
	},
	{
		year: 1084,
		comment: "Latest full-blooming for 510 years, from 812 to 1322.",
		category: "point",
	},
	{
		year: 1323,
		comment: "Latest full-blooming ever recorded.",
		category: "point",
	},
	{
		year: 1409,
		comment: "Earliest full-blooming until 2002.",
		category: "point",
	},
	{
		year: 1510,
		comment:
			"From 1500 to 1900, three-quarters of peak-blooming happened between 102 to 110 days after Jan. 1 (from April 11 to 20).",
		category: "line",
	},
	{
		year: 1880,
		comment:
			"From 1880 to present, the temperature data are recorded from the Japan Meteorological Agency, rather than estimated, as they were before these years by Professor Aono.",
		category: "line",
	},
	{
		year: 1953,
		comment:
			"From 1953 to present, data about full-blooming dates are obtained from the Japan Meteorological Agency.",
		category: "line",
	},
	{
		year: 2021,
		comment: "Earliest full-blooming ever recorded.",
		category: "point",
	},
];

const points = annotation
	.filter((el) => el.category === "point")
	.map((el) => el.year);

const lines = annotation
	.filter((el) => el.category === "line")
	.map((el) => el.year);
console.log(lines);
