import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const ViewChart = ({ data }) => {
  return (
    <div className="text-paragraph p-4 rounded-lg shadow  bg-[var(--background_component)]">
      <h1 className="text-title font-bold mb-6">Buku Paling Banyak Dilihat</h1>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data} layout="vertical" margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis type="number" tickFormatter={(value) => Math.floor(value)} />
            <YAxis dataKey="title" type="category" width={180} />
            <Tooltip />
            <Legend />
            <Bar dataKey="view" fill="#8884d8" name="Jumlah View" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-paragraph text-center">Belum ada data view</p>
      )}
    </div>
  );
};

export default ViewChart;
