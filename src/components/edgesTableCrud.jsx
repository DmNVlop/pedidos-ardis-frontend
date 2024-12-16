import { useContext, useState, useRef, useEffect } from "react";
import { Table, Input, Button, Form, message, Modal, Popconfirm } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Highlighter from "react-highlight-words";
import { OrdersContext } from "./../context/orders-context";
import { API_URLs } from "../shared/common-settings";

const EdgesCRUD = () => {
  const { edges } = useContext(OrdersContext);
  const [dataSource, setDataSource] = useState(edges || []);
  const [count, setCount] = useState(0);
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);

  const component_URL = API_URLs.edges;

  useEffect(() => {
    setDataSource(edges);
  }, [edges]);

  const handleDelete = async (key) => {
    try {
      await axios.delete(`${component_URL}/${key}`);
      const newData = dataSource.filter((item) => item.key !== key);
      message.success("Canto eliminado correctamente");
      setDataSource(newData);
    } catch (error) {
      message.error("Error al eliminar el canto. Error: " + error);
      console.error("Error deleting edge:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(component_URL, {
        data: values,
      });
      const newEdge = response.data.data;
      setDataSource([...dataSource, { key: newEdge.documentId, ...newEdge }]);
      setCount(count + 1);
      message.success("Canto agregado correctamente");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error al agregar el canto. Error: " + error);
      console.error("Error adding edge:", error);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.put(`${component_URL}/${editingKey}`, {
        data: values,
      });
      const updatedEdge = response.data.data;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => editingKey === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...updatedEdge });
        setDataSource(newData);
        setEditingKey("");
        setIsModalOpen(false);
      }
      message.success("Canto actualizado correctamente");
    } catch (error) {
      message.error("Error al actualizar el canto. Error: " + error);
      console.error("Error saving edge:", error);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters, confirm)}
          size="small"
          style={{ width: 90 }}
        >
          Resetear
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? "#1890ff" : undefined, width: "32px" }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dataIndex]: selectedKeys[0],
    }));
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
    setFilters({});
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchText("");
    setSearchedColumn("");
  };

  const columns = [
    {
      title: "Nombre ID",
      dataIndex: "NameID",
      key: "NameID",
      ...getColumnSearchProps("NameID"),
    },
    {
      title: "Descripción",
      dataIndex: "Description",
      key: "Description",
      ...getColumnSearchProps("Description"),
    },
    {
      title: "Espesor",
      dataIndex: "Thickness",
      key: "Thickness",
      ...getColumnSearchProps("Thickness"),
    },
    {
      title: "Corrección",
      dataIndex: "Correction",
      key: "Correction",
      ...getColumnSearchProps("Correction"),
    },
    {
      title: "Acción",
      // <div>
      //   Acción
      //   <Button
      //     icon={<CloseCircleOutlined />}
      //     onClick={clearAllFilters}
      //     style={{ marginLeft: 8 }}
      //   />
      // </div>
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
        }}
      >
        <h2>Cantos</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Agregar Canto
        </Button>

        {/* <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setIsModalOpen(true);
              }}
            >
              Importar
            </Button> */}
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey="key" />
      <Modal
        title={editingKey === "" ? "Agregar Canto" : "Editar Canto"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={editingKey === "" ? handleAdd : handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="NameID"
            label="Nombre ID"
            rules={[{ required: true, message: "Por favor ingrese el ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="Description" label="Descripción">
            <Input />
          </Form.Item>
          <Form.Item
            name="Thickness"
            label="Espesor"
            rules={[
              { required: true, message: "Por favor ingrese el Espesor" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Correction"
            label="Corrección"
            // rules={[{ required: true, message: "Por favor ingrese el largo" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EdgesCRUD;
