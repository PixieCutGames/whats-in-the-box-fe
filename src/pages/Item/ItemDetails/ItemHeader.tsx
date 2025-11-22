import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Item } from "../../../types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import useItemActions from "../../../shared/hooks/useItemActions";
import { useMediaQuery } from "@uidotdev/usehooks";
import ConfirmationDialog from "../../../shared/components/ui/ConfirmationDialog";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import toast from "react-hot-toast";

type ItemHeaderProps = {
  item?: Item;
  onUpdate: () => void;
};
function ItemHeader({ item, onUpdate }: ItemHeaderProps) {
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const navigate = useNavigate();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const { deleteItem, loadingDeleteItem } = useItemActions();

  const onDelete = () => {
    if (!item) return;
    deleteItem(
      item.id,
      () => {
        toast.success("Item deleted successfully.");
        setOpenDeleteConfirmation(false);
        navigate(`/box/${item.containerId}`);
      },
      () => {
        toast.error("Failed to delete item.");
      }
    );
  };

  const onEdit = () => {
    if (notDesktop) {
      navigate("/item/edit", { state: item });
      return;
    }
    setOpenEditDialog(true);
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="p-2 -ml-2 hover:bg-background-accent rounded-lg transition-colors shrink-0"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <h1 className="text-text-primary truncate">{item?.name}</h1>
      </div>

      {/* Button group */}
      <div>
        <Menu>
          <MenuButton className="p-2 hover:bg-background-accent rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5 text-text-primary" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="mt-2 min-w-32 bg-popover text-popover-foreground border border-border rounded-md p-1 shadow-md focus:outline-none"
          >
            <MenuItem>
              <button
                onClick={onEdit}
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden focus:bg-accent focus:text-accent-foreground text-text-primary hover:bg-background-accent hover:text-text-primary transition-colors no-underline"
              >
                Edit Item
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => setOpenDeleteConfirmation(true)}
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive transition-colors no-underline"
              >
                Delete Item
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <ConfirmationDialog
        title="Delete Item?"
        confirmText="Delete Item"
        isDanger
        isOpen={openDeleteConfirmation}
        loading={loadingDeleteItem}
        loadingText="Deleting..."
        onCancel={() => setOpenDeleteConfirmation(false)}
        onConfirm={onDelete}
      >
        <p className="text-sm text-text-secondary sm:hidden">
          This will permanently delete this item.
        </p>

        <p className="text-sm text-text-secondary sm:block hidden">
          Are you sure you want to delete {item?.name}?
          <br />
          This action cannot be undone.
        </p>
      </ConfirmationDialog>
      <AddEditDialog
        isOpen={openEditDialog}
        onClose={(refetch) => {
          setOpenEditDialog(false);
          if (refetch) onUpdate();
        }}
        itemDetails={item}
        type="item"
      />
    </div>
  );
}

export default ItemHeader;
