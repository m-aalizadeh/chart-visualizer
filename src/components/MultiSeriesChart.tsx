import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface MultiSeriesChartProps {
  data: [number, (number | null)[]][];
  width?: number;
  height?: number;
  margin?: number;
}

const MultiSeriesChart: React.FC<MultiSeriesChartProps> = ({
  data,
  width = 600,
  height = 300,
  margin = 50,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const series1 = data
      .map(([x, values]) => [x, values[0]])
      .filter((d) => d[1] !== null) as [number, number][];
    const series2 = data
      .map(([x, values]) => [x, values[1]])
      .filter((d) => d[1] !== null) as [number, number][];
    const series3 = data
      .map(([x, values]) => [x, values[2]])
      .filter((d) => d[1] !== null) as [number, number][];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const allValues = [
      ...series1.map((d) => d[1]),
      ...series2.map((d) => d[1]),
      ...series3.map((d) => d[1]),
    ];

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => d[0])) as [number, number])
      .range([margin, width - margin]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(allValues) as [number, number])
      .range([height - margin, margin]);

    const line = d3
      .line<[number, number]>()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));

    svg
      .append("path")
      .datum(series1)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(series2)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(series3)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [data, width, height, margin]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default MultiSeriesChart;
