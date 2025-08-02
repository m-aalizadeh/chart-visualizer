export type DataPoint = [number, number | null] | [number, (number | null)[]];

export interface ChartData {
  title: string;
  data: DataPoint[];
}
