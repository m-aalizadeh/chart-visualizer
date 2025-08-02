import { useState, useEffect } from "react";
import Chart from "./components/Chart/Chart";
import type { ChartData } from "./types/chartTypes";
import "./App.css";

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        const data: ChartData[] = await response.json();
        setCharts(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Chart Viewer</h1>
      <div className="grid gap-8">
        {charts.map((chart, index) => (
          <Chart key={index} chartData={chart} />
        ))}
      </div>
    </div>
  );
}

export default App;
