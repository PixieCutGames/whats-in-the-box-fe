import { useMediaQuery } from "@uidotdev/usehooks";
import { Package, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEditDialog from "../../../shared/components/AddEditDialog";

function EmptyState() {
  const { id } = useParams();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const navigate = useNavigate();
  const [openAddItemDialog, setOpenAddItemDialog] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-background-surface border border-border rounded-lg">
      <div className="h-20 w-20 rounded-full bg-background-accent flex items-center justify-center mb-6">
        <Package className="h-10 w-10 text-text-secondary" />
      </div>
      <h3 className="text-text-primary mb-2">No items yet</h3>
      <p className="text-text-secondary text-center mb-6 max-w-md">
        Start adding items to this box to keep track of what's inside
      </p>
      <button
        onClick={() => {
          if (notDesktop) navigate("/item/new", { state: { containerId: id } });
          else setOpenAddItemDialog(true);
        }}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
      >
        <Plus className="h-5 w-5" />
        Add Your First Item
      </button>
      <AddEditDialog
        isOpen={openAddItemDialog}
        onClose={() => {
          setOpenAddItemDialog(false);
        }}
        containerId={id}
        type="item"
      />
    </div>
  );
}

export default EmptyState;
