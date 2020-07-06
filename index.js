const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;
const barWidth = 125;

// const svg = d3.select("svg").attr("width", svgWidth).attr("heigth", svgHeight);

// d3.csv("./graph_FD.csv", function (data) {
//   console.log(data);
//   svg
//     .append("rect")
//     .attr("x", data.val_1)
//     .attr("width", data.val_1 / 10)
//     .attr("height", 25)
//     .attr("fill", "green");
// });

var margin = { top: 20, right: 30, bottom: 40, left: 90 },
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("./graph_FD.csv", function (data) {
  const total = { Brand: "Total KO", val_1: 0, val_2: 0, mark_val: 0 };
  data.forEach((d) => {
    if (!Array.isArray(d)) {
      total["val_1"] += Number(d["val_1"]);
      total["val_2"] += Number(d["val_2"]);
      total["mark_val"] += Number(d["mark_val"]);
    }
  });
  data.unshift(total);
  // Add X axis
  var x = d3.scaleLinear().domain([0, 6000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d) {
        return d.Brand;
      })
    )
    .padding(0.1);
  svg.append("g").call(d3.axisLeft(y));

  //Bars
  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d, i) {
      return y(d.Brand);
    })
    .attr("width", function (d) {
      return x(Number(d.val_1));
    })
    .attr("height", 10)
    .attr("opacity", 0.8)
    .attr("transform", "translate(0,20)")
    .attr("fill", function (d, i) {
      if (i % 2 == 0) return "green";
      return "red";
    });

  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d, i) {
      return y(d.Brand);
    })
    .attr("width", function (d) {
      return x(Number(d.val_2));
    })
    .attr("opacity", 0.4)
    .attr("height", 25)
    .attr("transform", "translate(0,14)")
    .attr("fill", function (d, i) {
      if (i % 2 == 0) return "green";
      return "red";
    });

  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return x(Number(d.mark_val));
    })
    .attr("y", function (d, i) {
      return y(d.Brand);
    })
    .attr("width", function (d) {
      return x(10);
    })
    .attr("transform", "translate(0,14)")
    .attr("height", 25)
    .attr("fill", "black");
});
