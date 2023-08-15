import { useSelector } from "react-redux";

const useDashboardInterfaceState = () => {
  const { dashboardType } = useSelector((state) => state.dashboard);
  return { dashboardType };
};

export default useDashboardInterfaceState;
