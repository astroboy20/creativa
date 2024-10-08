import { PerformanceChart } from "@/containers/dashboard/perfomance/perfomance";
import ProtectedRoute from "@/provider/protected-route";

export default function Page() {
  return (
    <main>
      <ProtectedRoute>
        <PerformanceChart />
      </ProtectedRoute>
    </main>
  );
}
