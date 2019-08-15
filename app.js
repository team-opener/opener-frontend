import calendarHeatmap from "./calendar-heatmap/calendar-heatmap.js";

const fixHeader = () => {
  const target = document.querySelector("#targetHeader");
  const targetHeight = target.offsetHeight;
  console.log(`${targetHeight}px`);

  window.addEventListener("scroll", function(e) {
    const scrollHeight = window.scrollY;
    if (scrollHeight > targetHeight) {
      target.classList.add("active");
    } else {
      target.classList.remove("active");
    }
  });
};

let weekNumb = 5;
let margin = { top: 20, right: 25, bottom: 20, left: 25 },
  width =
    document.querySelector("#lineChart").offsetWidth -
    margin.left -
    margin.right,
  height = 400 - margin.top - margin.bottom;
let xScale = d3
  .scaleBand()
  .domain(["월", "화", "수", "목", "금"]) // input
  .range([0, width]); // output
let yScale = d3
  .scaleLinear()
  .domain([6, 24]) // input
  .range([height, 0]); // output
let line = d3
  .line()
  .x(d => xScale(d.x)) // set the x values for the line generator
  .y(d => yScale(d.y)) // set the y values for the line generator
  .curve(d3.curveMonotoneX); // apply smoothing to the line
let svg = d3
  .select("#lineChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const drawChart = () => {
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  svg
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
};

const drawLine = ({ dataset, classNameLine, classNameDot }) => {
  svg
    .append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", `line ${classNameLine}`)
    .attr("d", line) // 11. Calls the line generator
    .attr("transform", `translate(${width / weekNumb / 2}, 0)`);

  svg
    .selectAll(classNameDot)
    .data(dataset)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", `${classNameDot} dot`) // Assign a class for styling
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("transform", `translate(${width / weekNumb / 2}, 0)`)
    .on("mouseover", function(d) {
      console.log(d);
      this.classList.add("focus");
    })
    .on("mouseout", function() {
      this.classList.remove("focus");
      svg.select("focus").remove();
    });
};

let datasetStart = [
  { x: "월", y: 9.5 },
  { x: "화", y: 10 },
  { x: "수", y: 12 },
  { x: "목", y: 15 },
  { x: "금", y: 9 }
];

let datasetEnd = [
  { x: "월", y: 16 },
  { x: "화", y: 18 },
  { x: "수", y: 15 },
  { x: "목", y: 23 },
  { x: "금", y: 18 }
];

fixHeader();
drawChart();
drawLine({
  dataset: datasetStart,
  classNameLine: "line-start",
  classNameDot: "dot-start"
});
drawLine({
  dataset: datasetEnd,
  classNameLine: "line-end",
  classNameDot: "dot-end"
});

var now = moment()
  .endOf("day")
  .toDate();
var yearAgo = moment()
  .startOf("day")
  .subtract(1, "year")
  .toDate();
var chartData = d3.timeDays(yearAgo, now).map(function(dateElement) {
  return {
    date: dateElement,
    count:
      dateElement.getDay() !== 0 && dateElement.getDay() !== 6
        ? Math.floor(Math.random() * 60)
        : Math.floor(Math.random() * 10)
  };
});

var chart1 = calendarHeatmap()
  .data(chartData)
  .selector("#heatMap")
  .colorRange(["#D8E6E7", "#0074dd"])
  .tooltipEnabled(true)
  .onClick(function(data) {
    console.log("onClick callback. Data:", data);
  });

chart1(); // render the chart
