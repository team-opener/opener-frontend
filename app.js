const appInit = () => {
  fixHeader();
  switch(true) {
    case /index/.test(PATH):
      homePage();
      break;
    case /mypage/.test(PATH):
      mypagePage();
      break;
  }
}

// header 부분 스크롤 이벤트 
const fixHeader = () => {
  const target = document.querySelector("#targetHeader");
  const targetHeight = target.offsetHeight;

  window.addEventListener("scroll", function(e) {
    const scrollHeight = window.scrollY;
    if (scrollHeight > targetHeight) {
      target.classList.add("active");
    } else {
      target.classList.remove("active");
    }
  });
};

const drawingChart = () => {
  let weekNumb = 5;
  let margin = { top: 20, right: 25, bottom: 20, left: 25 },
    width = 460 - margin.left - margin.right,
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
};

// home페이지에서 사용할 함수 
const homePage = () => {
  const itemList = document.querySelector('#itemList')
  fetch(BACK + '/user/info/all')
  .then( res => res.json())
  .then(data => {
    data.forEach((v, i, a) => {
      var path = BACK + v.profileImgPath
      const ITEM_CARD = `<li class="item card">
        <div class="profile-img">
          <img src="${path}" alt="profile-image" />
        </div>
        <div class="item-desc">
          <h3 class="user-name">${v.name}</h3>
          <p class="course-name">${v.course}</p>
          <p class="entry-time">${v.entryTime}</p>
        </div>
        </li>`
      itemList.insertAdjacentHTML('beforeend', ITEM_CARD)
    })
  })
}

// mypage페이지에서 사용할 함수 
const mypagePage = () => {
  const userTitleEle = document.querySelector('.user_title')

  fetch(BACK + '/user/info?name=Ingleby')
  .then(res => res.json())
  .then(data => {
    var path = BACK + data.profileImgPath
    const USER_CARD = `<div class="item card">
    <div class="profile-img">
      <img src="${path}" alt="profile-image" />
    </div>
    <div class="item-desc">
      <h3 class="user-name">${data.name}</h3>
      <p class="course-name">${data.course}</p>
      <p class="entry-time">${data.entryTime}</p>
    </div>
  </div>`
    userTitleEle.insertAdjacentHTML('beforeend', USER_CARD) 
  })

  drawingChart()

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
}

// application 초기화 
import calendarHeatmap from "./calendar-heatmap/calendar-heatmap.js";
const PATH = window.location.pathname
const BACK = 'http://192.168.1.68:3000'
const ITEM_CARD = `<li class="item card">
<div class="profile-img">
  <img src="" alt="profile-image" />
</div>
<div class="item-desc">
  <h3 class="user-name">Snow</h3>
  <p class="course-name">Front-end${name}</p>
  <p class="entry-time">Entry Time</p>
</div>
</li>`
appInit()
