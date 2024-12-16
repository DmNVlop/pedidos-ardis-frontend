import { useState, useContext, useEffect } from "react";
import { Button, Form, message, Popconfirm } from "antd";

import MaterialsView from "./MaterialsView";
import { OrdersContext } from "../../context/orders-context";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { API_URLs } from "../../shared/common-settings";

const component_URL = API_URLs.materials;

const MaterialsContainer = () => {
  const { setMaterialsCtx } = useContext(OrdersContext);

  // Hook para manejar peticiones
  const { resData, error, loading, refetch, execute } = useAxiosFetch(component_URL);

  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Cargar datos iniciales
  useEffect(() => {
    if (resData && Array.isArray(resData.data)) {
      const formattedMaterials = resData.data.map((item) => ({
        ...item,
        key: item.id || item.documentId,
      }));
      setDataSource(formattedMaterials);
      setMaterialsCtx(resData.data); // Guardar datos en el contexto
    }
  }, [resData, setMaterialsCtx]);

  // Manejar errores
  useEffect(() => {
    if (error) {
      message.error(`Error al cargar materiales: ${error.message}`);
    }
  }, [error]);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      const newMaterial = await execute(component_URL, "POST", values); // POST para agregar

      setDataSource((prev) => [...prev, { key: newMaterial.documentId, ...newMaterial }]);
      message.success("Material agregado correctamente");
      form.resetFields();
      setIsModalOpen(false);
      refetch(); // Refrescar lista
    } catch (error) {
      message.error(`Error al agregar material: ${error.message}`);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedMaterial = await execute(`${component_URL}/${editingKey}`, "PUT", values); // PUT para actualizar

      setDataSource((prev) => prev.map((item) => (item.key === editingKey ? { ...item, ...updatedMaterial } : item)));
      message.success("Material actualizado correctamente");
      form.resetFields();
      setIsModalOpen(false);
      setEditingKey("");
      refetch(); // Refrescar lista
    } catch (error) {
      message.error(`Error al actualizar material: ${error.message}`);
    }
  };

  const handleDelete = async (key) => {
    try {
      await execute(`${component_URL}/${key}`, "DELETE"); // DELETE para eliminar

      setDataSource((prev) => prev.filter((item) => item.key !== key));
      message.success("Material eliminado correctamente");
      refetch(); // Refrescar lista
    } catch (error) {
      message.error(`Error al eliminar material: ${error.message}`);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalOpen(true);
  };

  return (
    <MaterialsView
      dataSource={dataSource}
      columns={[
        {
          title: "Nombre",
          dataIndex: "material",
          key: "material",
        },
        {
          title: "Veta",
          dataIndex: "sv",
          key: "sv",
        },
        {
          title: "Espesor",
          dataIndex: "thickness",
          key: "thickness",
        },
        {
          title: "Largo",
          dataIndex: "width",
          key: "width",
        },
        {
          title: "Ancho",
          dataIndex: "height",
          key: "height",
        },
        {
          title: "Cantidad",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Acción",
          key: "accion",
          render: (_, record) => (
            <>
              <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                Editar
              </Button>
              <Popconfirm title="¿Seguro que quieres eliminar?" onConfirm={() => handleDelete(record.key)}>
                <Button>Eliminar</Button>
              </Popconfirm>
            </>
          ),
        },
      ]}
      isModalOpen={isModalOpen}
      form={form}
      onAddClick={() => {
        form.resetFields();
        setIsModalOpen(true);
        setEditingKey("");
      }}
      onCancelModal={() => setIsModalOpen(false)}
      onSave={editingKey ? handleSave : handleAdd}
      modalTitle={editingKey === "" ? "Agregar Materia" : "Editar Materia"}
      loading={loading} // Mostrar spinner si está cargando
    />
  );
};

export default MaterialsContainer;
