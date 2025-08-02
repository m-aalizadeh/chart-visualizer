import React from 'react';
import SingleSeriesChart from './SingleSeriesChart';
import MultiSeriesChart from './MultiSeriesChart';
import type { ChartData } from '../../types/chartTypes';

interface ChartProps {
  chartData: ChartData;
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  if (!chartData?.data || chartData.data.length === 0) {
    return <div className="text-red-500">No data available</div>;
  }

  const isMultiSeries = Array.isArray(chartData.data[0][1]);

  return (
    <div className="m-5 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{chartData.title}</h2>
      {isMultiSeries ? (
        <MultiSeriesChart data={chartData.data as [number, (number | null)[]][]} />
      ) : (
        <SingleSeriesChart data={chartData.data as [number, number | null][]} />
      )}
    </div>
  );
};

export default Chart;