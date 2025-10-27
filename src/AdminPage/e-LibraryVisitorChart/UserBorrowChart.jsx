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
import { useLibraryStats } from "./useLibraryStats";

const UserBorrowChart = () => {
  const { topBorrowers, loading, error } = useLibraryStats();

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (error) return <p className="text-center text-[var(--color_error)]">{error}</p>;

  return (
    <div className="text-paragraph p-4 rounded-lg shadow bg-[var(--background_component)]">
      <h1 className="text-title font-bold mb-6">
        User Dengan Peminjaman Buku Terbanyak
      </h1>

      {topBorrowers.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={topBorrowers} layout="vertical" margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis type="number" tickFormatter={(value) => Math.floor(value)} />
            <YAxis
              dataKey="name"
              type="category"
              width={180}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="borrowCount" fill="#ffc658" name="Jumlah Pinjam" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">Belum ada data peminjam</p>
      )}
    </div>
  );
};

export default UserBorrowChart;
