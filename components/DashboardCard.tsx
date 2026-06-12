type DashboardCardProps = {
  titulo: string;
  valor: string | number;
};

export default function DashboardCard({
  titulo,
  valor,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-slate-500">{titulo}</h3>
      <p className="text-3xl font-bold mt-2">{valor}</p>
    </div>
  );
}