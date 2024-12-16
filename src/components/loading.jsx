import { Spin } from "antd";

const loadingStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

function Loading() {
  return (
    <div id={"loading"} style={loadingStyle}>
      <Spin tip="Cargando" size="large">
        {content}
      </Spin>
    </div>
  );
}
export default Loading;
