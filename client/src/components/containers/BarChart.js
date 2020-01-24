import React from "react";
import * as d3 from "d3";
import "./../../styles/common.css";

class BarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var models = this.props.data;
    /*
    models = models.map(i => {
      return i;
    });
    */
    //set needed variables
    const width = this.props.width,
      height = this.props.height,
      margin = { top: 30, right: 20, bottom: 30, left: 50 },
      barPadding = 0.2,
      axisTicks = { qty: 5, outerSize: 0 };

    //try to delete first
    d3.select("svg").remove();

    //select element that youre drawing on
    const svg = d3
      .select("h2")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //create scales
    var xScale0 = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(barPadding);

    var xScale1 = d3.scaleBand();
    var yScale = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(axisTicks.qty)
      .tickSizeOuter(axisTicks.outerSize);

    xScale0.domain(models.map(d => d.model_name));
    xScale1.domain(["field1", "field2"]).range([0, xScale0.bandwidth()]);
    yScale.domain([
      0,
      d3.max(models, d => (d.field1 > d.field2 ? d.field1 : d.field2))
    ]);

    // Add the X Axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis);

    // Add the Y Axis
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var model_name = svg
      .selectAll(".model_name")
      .data(models)
      .enter()
      .append("g")
      .attr("class", "model_name")
      .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);

    //Add the completed bar
    model_name
      .selectAll(".bar.field1")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field1")
      .style("fill", "orange")
      .attr("x", d => xScale1("field1"))
      .attr("y", d => yScale(d.field1))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => {
        return height - margin.top - margin.bottom - yScale(d.field1);
      });

    //Add the attempted bar
    model_name
      .selectAll(".bar.field2")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field2")
      .style("fill", "pink")
      .attr("x", d => xScale1("field2"))
      .attr("y", d => yScale(d.field2))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => {
        return height - margin.top - margin.bottom - yScale(d.field2);
      });
  }

  render() {
    return <div className="centered" id={"#d3id"}></div>;
  }
}

export default BarChart;
