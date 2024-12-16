import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const items = [
  {
    key: "/order",
    label: <Link to="/order">Pedidos</Link>,
  },
  {
    key: "nomencladores",
    label: "Nomencladores",
    children: [
      {
        key: "/material",
        label: <Link to="/material">Materiales</Link>,
      },
      {
        key: "/edge",
        label: <Link to="/edge">Cantos</Link>,
      },
      // {
      //   key: "/clients",
      //   label: <Link to="/clients">Clientes</Link>,
      // },
    ],
  },
  // {
  //   key: "configuracion",
  //   label: "Configuración",
  //   children: [
  //     {
  //       key: "/general",
  //       label: <Link to="/general">General</Link>,
  //     },
  //     {
  //       key: "/support",
  //       label: <Link to="/support">Soporte</Link>,
  //     },
  //   ],
  // },
];

function NavbarHeader() {
  const location = useLocation();

  return (
    <Header
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          flex: 0.9,
          display: "flex",
          height: "100%",
        }}
      >
        <Link to="/" style={{ height: "100%", display: "flex" }}>
          <img
            src="/logos/LogoPedidosCIMSA_150_Wh.png"
            alt="Logo Pedidos CIMSA"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location?.pathname]}
        style={{ flex: 1, justifyContent: "flex-end" }}
        items={items}
      />
    </Header>
  );
}

export default NavbarHeader;
