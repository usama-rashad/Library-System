import { useSelector } from "react-redux";

const useDashboardInterfaceState = () => {
  const { dashboardType } = useSelector((state) => state.dashboard);
  console.log(dashboardType);
  return { dashboardType };
};

export default useDashboardInterfaceState;
