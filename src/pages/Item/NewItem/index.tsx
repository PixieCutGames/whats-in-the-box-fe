import { useLocation } from "react-router-dom";
import AddEditItemForm from "../../../shared/components/AddEditItemForm";

function NewItem() {
  const { state } = useLocation();
  return <AddEditItemForm containerId={state.containerId} />;
}

export default NewItem;
