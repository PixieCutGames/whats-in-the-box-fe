import { useLocation, useNavigate } from "react-router-dom";
import AddEditItemForm from "../../../shared/components/AddEditItemForm";

function EditContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  if (!location.state.name || !location.state.id) navigate(-1);

  return <AddEditItemForm details={location.state} />;
}

export default EditContainer;
