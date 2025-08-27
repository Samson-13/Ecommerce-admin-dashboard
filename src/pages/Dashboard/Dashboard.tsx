import CustomersPanel from "../../components/CustomersPanel";
import PerformancePanel from "../../components/PerformancePanel";
import RevenueForecastChart from "../../components/RevenueForecastChart";
import SummaryCards from "../../components/SummaryCards";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AnnualProfitChart from "../../components/AnnualProfitChart";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-8">
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <RevenueForecastChart />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformancePanel />
                <CustomersPanel />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <AnnualProfitChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
