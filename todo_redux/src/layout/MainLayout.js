import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";

export default function MainLayout() {
  return (
    <div className="main-container">
      <HeaderNav />
      {/** Nested Route (children)의 Element(Component가 노출되는 자리)
       * Path (URL)가 달라질 때 마다 Outlet에 노출되는 컴포넌트가 달라진다.
       */}
      <Outlet />
    </div>
  );
}
