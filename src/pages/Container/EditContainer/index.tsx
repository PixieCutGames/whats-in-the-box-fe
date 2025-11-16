import { useLocation, useNavigate } from "react-router-dom";
import AddEditContainerForm from "../../../shared/components/AddEditContainerForm";

function EditContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  if (!location.state.name || !location.state.id) navigate("/boxes");

  return <AddEditContainerForm details={location.state} />;
}

export default EditContainer;
