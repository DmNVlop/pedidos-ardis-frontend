import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export const columnsSettingOrdersTable = (dataSource, handleDelete) => [
  {
    title: "Material",
    dataIndex: "material",
    editable: true,
    required: true,
    width: 400, // Ancho fijo en píxeles
  },
  {
    title: "Veta",
    dataIndex: "veta",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "Largo",
    dataIndex: "largo",
    editable: true,
    required: true,
    width: 80, // Ancho fijo en píxeles
  },
  {
    title: "Ancho",
    dataIndex: "ancho",
    editable: true,
    required: true,
    width: 80, // Ancho fijo en píxeles
  },
  {
    title: "Cantidad",
    dataIndex: "cantidad",
    editable: true,
    required: true,
    width: 60, // Ancho fijo en píxeles
  },
  {
    title: "L1",
    dataIndex: "L1",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "L2",
    dataIndex: "L2",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "A1",
    dataIndex: "A1",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "A2",
    dataIndex: "A2",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "Comentario",
    dataIndex: "comment",
    editable: true,
    required: false,
    width: 100, // Ancho fijo en píxeles
  },
  {
    title: "Acción",
    dataIndex: "accion",
    render: (_, record) =>
      dataSource.length >= 1 ? (
        <Popconfirm
          title="¿Seguro que quieres eliminar?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ) : null,
    width: 100,
  },
];
