import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Item } from "../../../types";
import { Menu, MenuButton } from "@headlessui/react";
import { useState } from "react";
import useItemActions from "../../../shared/hooks/useItemActions";
import { useMediaQuery } from "@uidotdev/usehooks";
import ConfirmationDialog from "../../../shared/components/ui/ConfirmationDialog";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import toast from "react-hot-toast";
import MenuItems from "../../../shared/components/ui/Menu/MenuItems";
import MenuItemButton from "../../../shared/components/ui/Menu/MenuItemButton";

type ItemHeaderProps = {
  item?: Item;
};
function ItemHeader({ item }: ItemHeaderProps) {
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
      item.containerId,
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
          className="p-2 -ml-2 hover:bg-background-accent dark:hover:bg-background-accent/10 rounded-lg transition-colors shrink-0"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary dark:text-text-dark-primary" />
        </Link>
        <h1 className="text-text-primary dark:text-text-dark-primary truncate">
          {item?.name}
        </h1>
      </div>

      {/* Button group */}
      <div>
        <Menu>
          <MenuButton className="p-2 hover:bg-background-accent dark:hover:bg-background-accent/10 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5 text-text-primary dark:text-text-dark-primary" />
          </MenuButton>
          <MenuItems anchor="bottom end" className="mt-2 min-w-32">
            <MenuItemButton onClick={onEdit}>Edit Item</MenuItemButton>
            <MenuItemButton
              danger
              onClick={() => setOpenDeleteConfirmation(true)}
            >
              Delete Box
            </MenuItemButton>
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
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary sm:hidden">
          This will permanently delete this item.
        </p>

        <p className="text-sm text-text-secondary dark:text-text-dark-secondary sm:block hidden">
          Are you sure you want to delete {item?.name}?
          <br />
          This action cannot be undone.
        </p>
      </ConfirmationDialog>
      <AddEditDialog
        isOpen={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        itemDetails={item}
        type="item"
      />
    </div>
  );
}

export default ItemHeader;
