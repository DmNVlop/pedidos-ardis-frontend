import { useState, useRef, useEffect, useContext } from "react";
import { Table, Input, Button, Form, message, AutoComplete } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { columnsSettingOrdersTable } from "../mocks/columnsSettingOrdersTable";
import { OrdersContext } from "./../context/orders-context";

const getMatStringFormated = (material) => {
  const matName = material.material || "";
  const matThickness = material.thickness || "";
  const matWidth = material.width || "";
  const matHeight = material.height || "";
  return {
    value: `${matName} - ${matWidth}x${matHeight}x${matThickness}`,
  };
};

const PiecesTableEditable = () => {
  const { materials } = useContext(OrdersContext);
  const [dataSource, setDataSource] = useState([]);
  //const [materias, setMaterias] = useState(MATERIALS_DATA);
  const [count, setCount] = useState(0);
  const inputRefs = useRef([]);

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    rowIndex,
    colIndex,
    required,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = Form.useFormInstance();

    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
        if (dataIndex !== "material") inputRef.current.select();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
        moveToNextCell(rowIndex, colIndex);
      } catch (errInfo) {
        message.error(`Error salvando: ${errInfo.errorFields[0].errors[0]}`);
        console.warn("Save failed:", errInfo);
      }
    };

    const saveAutocomplete = (event) => {
      if (event.key === "Enter") {
        validateMaterial(form.getFieldValue(dataIndex));
        save();
      }
    };

    const validateMaterial = (value) => {
      const isValid = materials.some(
        (material) => getMatStringFormated(material).value === value
      );
      if (!isValid) {
        message.error("Por favor, selecciona un material válido de la lista.");
        form.setFieldsValue({ [dataIndex]: "" });
      }
    };

    const moveToNextCell = (rowIndex, colIndex) => {
      const nextColIndex = colIndex + 1;
      const nextRowIndex = rowIndex + (nextColIndex >= columns.length ? 1 : 0);
      const nextCol = nextColIndex >= columns.length ? 0 : nextColIndex;

      if (
        inputRefs.current[nextRowIndex] &&
        inputRefs.current[nextRowIndex][nextCol]
      ) {
        inputRefs.current[nextRowIndex][nextCol].focus();
        inputRefs.current[nextRowIndex][nextCol].select();
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: required,
              message: `${title} es requerido.`,
            },
          ]}
        >
          {dataIndex === "material" ? (
            <AutoComplete
              options={materials.map((material) =>
                getMatStringFormated(material)
              )}
              filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
              }
              ref={(el) => {
                if (el) {
                  inputRef.current = el;
                  if (!inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex] = [];
                  }
                  inputRefs.current[rowIndex][colIndex] = el;
                }
              }}
              onKeyDown={saveAutocomplete}
              className="editable-cell-input"
              onBlur={() => {
                validateMaterial(form.getFieldValue(dataIndex));
                save();
              }}
            />
          ) : (
            <Input
              ref={(el) => {
                if (el) {
                  inputRef.current = el;
                  if (!inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex] = [];
                  }
                  inputRefs.current[rowIndex][colIndex] = el;
                }
              }}
              className="editable-cell-input"
              onPressEnter={save}
              onBlur={save}
            />
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell editable-cell-value-wrap"
          style={{ paddingRight: 24, minHeight: "24px" }}
          onClick={toggleEdit}
        >
          {children || (
            <span style={{ color: "transparent" }}>placeholder</span>
          )}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  EditableCell.propTypes = {
    title: PropTypes.string,
    editable: PropTypes.bool,
    children: PropTypes.node,
    dataIndex: PropTypes.string,
    record: PropTypes.object,
    handleSave: PropTypes.func,
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    required: PropTypes.bool,
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = (newData) => {
    setDataSource([...dataSource, { key: count, ...newData }]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const columns = columnsSettingOrdersTable(dataSource, handleDelete);

  const mergedColumns = columns.map((col, colIndex) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record, rowIndex) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title || "Material",
        handleSave,
        rowIndex,
        colIndex,
        required: col.required,
      }),
    };
  });

  return (
    <Form form={Form.useFormInstance()} component={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          Número de pedido: <span style={{ fontWeight: "bold" }}>6574637</span>
        </div>
        <Button
          onClick={() =>
            handleAdd({
              material: "",
              veta: "",
              largo: "",
              ancho: "",
              cantidad: "",
              L1: "",
              L2: "",
              A1: "",
              A2: "",
              comentario: "",
            })
          }
          type="primary"
          icon={<PlusOutlined />}
        >
          Agregar
        </Button>
      </div>
      <div style={{ width: "100%", marginBottom: "3rem" }}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          style={{ width: "100%" }}
        />
      </div>
    </Form>
  );
};

export default PiecesTableEditable;
