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

const LikeChart = ({ data }) => {
  return (
    <div
      className="text-paragraph p-4 rounded-lg shadow bg-[var(--background_component)]"
    >
      <h1 className="text-title font-bold mb-6">Buku Paling Banyak Disukai</h1>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data} layout="vertical" margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis type="number" tickFormatter={(value) => Math.floor(value)} />
            <YAxis dataKey="title" type="category" width={180} />
            <Tooltip />
            <Legend />
            <Bar dataKey="like" fill="#82ca9d" name="Jumlah Like" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">Belum ada data like</p>
      )}
    </div>
  );
};

export default LikeChart;
