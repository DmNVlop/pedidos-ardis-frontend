import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/loading";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import NavbarHeader from "./shared/navbar";
import NotFoundPage from "./shared/not-found-page";

const OrdersTableCrud = lazy(() => import("./components/OrdersTableCrud"));

const PiecesTableEditable = lazy(() => import("./components/piecesTableEditable"));

const MaterialsContainer = lazy(() => import("./components/Materials/MaterialsContainer"));
const EdgesCRUD = lazy(() => import("./components/edgesTableCrud"));

const RoutersApp = () => {
  return (
    <Router>
      <Layout>
        <NavbarHeader />
        <Content
          style={{
            padding: "0 50px",
            marginTop: 64,
            height: "calc(100vh - 128px)",
          }}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Navigate to="/order" />} />
              <Route path="/order" element={<OrdersTableCrud />} />
              <Route path="/order/new" element={<PiecesTableEditable />} />
              <Route path="/order/:id" element={<PiecesTableEditable />} />
              <Route path="/material" element={<MaterialsContainer />} />
              <Route path="/edge" element={<EdgesCRUD />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Router>
  );
};

export default RoutersApp;
