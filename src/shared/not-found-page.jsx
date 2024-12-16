import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Result
      icon={<img src="/page-404.png" />}
      title="Recurso no encontrado."
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Volver al inicio
          </Button>
        </Link>
      }
      // style={{ height: "calc(100vh - 128px)" }}
    />
  );
}

export default NotFoundPage;
