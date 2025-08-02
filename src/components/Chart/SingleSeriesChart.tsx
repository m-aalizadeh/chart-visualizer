import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface SingleSeriesChartProps {
  data: [number, number | null][];
  width?: number;
  height?: number;
  margin?: number;
}

const SingleSeriesChart: React.FC<SingleSeriesChartProps> = ({
  data,
  width = 600,
  height = 300,
  margin = 50,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const filteredData = data.filter(([_, value]) => value !== null) as [
      number,
      number,
    ][];

    if (filteredData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[0]) as [number, number])
      .range([margin, width - margin]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[1]) as [number, number])
      .range([height - margin, margin]);

    const line = d3
      .line<[number, number]>()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));
    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
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

export default SingleSeriesChart;
