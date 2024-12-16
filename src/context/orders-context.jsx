import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [materialsCtx, setMaterialsCtx] = useState([]);
  const [edgesCtx, setEdgesCtx] = useState([]);

  return <OrdersContext.Provider value={{ materialsCtx, setMaterialsCtx, edgesCtx, setEdgesCtx }}>{children}</OrdersContext.Provider>;
};

OrdersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
