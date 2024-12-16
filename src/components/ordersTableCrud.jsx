import { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrdersTableCrud = () => {
  const initialPedidos = [];
  const [dataSource, setDataSource] = useState(initialPedidos);
  const navigate = useNavigate();

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleEdit = (record) => {
    navigate(`/order/${record.NoPedido}`);
  };

  const handleAdd = () => {
    navigate("/order/new");
  };

  const columns = [
    { title: "No Pedido", dataIndex: "NoPedido", key: "NoPedido" },
    { title: "Cliente", dataIndex: "Cliente", key: "Cliente" },
    { title: "Fecha IN", dataIndex: "FechaIN", key: "FechaIN" },
    { title: "Fecha Entrega", dataIndex: "FechaEntrega", key: "FechaEntrega" },
    { title: "No Piezas", dataIndex: "NoPiezas", key: "NoPiezas" },
    { title: "Comentario", dataIndex: "Comment", key: "Comment" },
    { title: "Creado por", dataIndex: "CreadoPor", key: "CreadoPor" },
    {
      title: "Acción",
      key: "accion",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="¿Seguro que quieres eliminar?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>Pedidos</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Agregar Pedido
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        style={dataSource?.length === 0 ? { marginBottom: "2rem" } : ""}
      />
    </>
  );
};

export default OrdersTableCrud;
