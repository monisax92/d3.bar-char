const fruits = [
	{ name: "grapes", sugar: 18.1 },
	{ name: "banana", sugar: 15.6 },
	{ name: "mango", sugar: 14.8 },
	{ name: "apple", sugar: 13.3 },
	{ name: "pineapple", sugar: 11.9 },
	{ name: "pear", sugar: 10.5 },
	{ name: "raspberry", sugar: 9.5 },
  { name: "orange", sugar: 9.2 },
  { name: "watermelon", sugar: 9.0 },
	{ name: "peach", sugar: 8.7 },
	{ name: "blackberry", sugar: 8.1 },
	{ name: "cherry", sugar: 8.0 },
	{ name: "plum", sugar: 7.5 },
	{ name: "blueberry", sugar: 7.3 },
	{ name: "strawberry", sugar: 5.8 }
];

//canvas and svg
const canvasWidth = 900;
const canvasHeight = 400;

const svg = d3
	.select(".canvas")
	.append("svg")
	.attr("width", canvasWidth)
	.attr("height", canvasHeight);

//group bars as a graph, set margins
const margin = { top: 10, right: 20, bottom: 70, left: 30 };
const graphWidth = canvasWidth - margin.left - margin.right;
const graphHeight = canvasHeight - margin.top - margin.bottom;

const graph = svg
	.append("g")
	.attr("width", graphWidth)
	.attr("height", graphHeight)
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

//joining data
const bars = graph.selectAll("rect").data(fruits);

//scales (y from bottom to top)
const y = d3
	.scaleLinear()
	.domain([0, d3.max(fruits, (fruit) => fruit.sugar)])
	.range([graphHeight, 0]);

const x = d3
	.scaleBand()
	.domain(fruits.map((fruit) => fruit.name))
	.range([0, graphWidth])
	.paddingInner(0.2)
	.paddingOuter(0.2);

//gradient for bars
const gradient = svg.append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", 0)
  .attr("x2", 1)
  .attr("y1", 0)
  .attr("y2", 1)
  
  gradient.append("stop")
  .attr("stop-color", "yellow")
  .attr("offset", "0%")
  
  gradient.append("stop")
  .attr("stop-color", "orangered")
  .attr("offset", "100%")

//style existing rectangles
bars
	.attr("width", x.bandwidth)
	.attr("height", (fruit) => graphHeight - y(fruit.sugar))
	.attr("fill", "url(#gradient)")
	.attr("x", (fruit) => x(fruit.name));


//style entry selection
bars
	.enter()
	.append("rect")
	.attr("width", x.bandwidth)
	.attr("height", (fruit) => graphHeight - y(fruit.sugar))
	.attr("fill", "url(#gradient)")
	.attr("x", (fruit) => x(fruit.name))
	.attr("y", (fruit) => y(fruit.sugar))
  
  
//axes
const xAxis = d3.axisBottom(x);
const xAxisGroup = graph
	.append("g")
	.attr("transform", `translate(0, ${graphHeight})`)
	.call(xAxis)
	.selectAll("text")
	.attr("transform", "rotate(-40)")
	.attr("text-anchor", "end")
	.attr("font-size", "1rem")
	.attr("fill", "grey")

const yAxis = d3
	.axisLeft(y)
	.ticks(4)
	.tickFormat((fruit) => fruit + "g");
const yAxisGroup = graph.append("g").call(yAxis);
