import RedHotStore from "./RedHotStore";
import RedHotAdmin from "./RedHotAdmin";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  return isAdmin ? <RedHotAdmin /> : <RedHotStore />;
}