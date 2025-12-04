import { useMediaQuery } from "@uidotdev/usehooks";
import { Package, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import { Button } from "../../../shared/components/ui/Button";

function EmptyState() {
  const { id } = useParams();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const navigate = useNavigate();
  const [openAddItemDialog, setOpenAddItemDialog] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg">
      <div className="h-20 w-20 rounded-full bg-background-accent dark:bg-background-accent/10 flex items-center justify-center mb-6">
        <Package className="h-10 w-10 text-text-secondary dark:text-text-dark-secondary" />
      </div>
      <h3 className="text-text-primary dark:text-text-dark-primary mb-2">
        No items yet
      </h3>
      <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-6 max-w-md">
        Start adding items to this box to keep track of what's inside
      </p>
      <Button
        className="has-[>svg]:px-6 py-3 rounded-lg text-base h-auto hover:bg-primary-hover"
        onClick={() => {
          if (notDesktop) navigate("/item/new", { state: { containerId: id } });
          else setOpenAddItemDialog(true);
        }}
      >
        <Plus className="h-4 w-4" />
        Add Your First Item
      </Button>
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
