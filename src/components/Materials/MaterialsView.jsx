import PropTypes from "prop-types";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const MaterialsView = ({ dataSource, columns, isModalOpen, form, onAddClick, onCancelModal, onSave, modalTitle }) => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <h2>Materiales</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddClick}>
        Agregar Materia
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} rowKey="key" />
    <Modal title={modalTitle} open={isModalOpen} onCancel={onCancelModal} onOk={onSave}>
      <Form form={form} layout="vertical">
        <Form.Item name="material" label="Nombre" rules={[{ required: true, message: "Por favor ingrese el nombre" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sv" label="Veta">
          <Input />
        </Form.Item>
        <Form.Item name="thickness" label="Espesor">
          <Input />
        </Form.Item>
        <Form.Item name="width" label="Largo" rules={[{ required: true, message: "Por favor ingrese el largo" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="height" label="Ancho" rules={[{ required: true, message: "Por favor ingrese el ancho" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="quantity" label="Cantidad" rules={[{ required: true, message: "Por favor ingrese la cantidad" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="availability"
          label="Disponibilidad"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la disponibilidad",
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>
);

// Añadir validaciones de props
MaterialsView.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired, // Aquí validamos modalTitle
};

export default MaterialsView;
