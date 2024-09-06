import { DashboardMain } from "@/containers/dashboard/home/home";
import ProtectedRoute from "@/provider/protected-route";

export default function Page() {
  return (
    <main>
      <ProtectedRoute>
        <DashboardMain />
      </ProtectedRoute>
    </main>
  );
}
