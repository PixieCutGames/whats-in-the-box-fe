import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../../types";
import { ArrowLeft, ChevronDown, MoreVertical, Plus } from "lucide-react";
import { Menu, MenuButton } from "@headlessui/react";
import { Maybe } from "yup";
import ConfirmationDialog from "../../../shared/components/ui/ConfirmationDialog";
import { useState } from "react";
import useContainerActions from "../../../shared/hooks/useContainerActions";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import { useMediaQuery } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
import { Button } from "../../../shared/components/ui/Button";
import MenuItems from "../../../shared/components/ui/Menu/MenuItems";
import MenuItemButton from "../../../shared/components/ui/Menu/MenuItemButton";
import PinIcon from "../../../shared/components/PinIcon";

type ContainerHeaderProps = {
  container: Maybe<Container>;
};
function ContainerHeader({ container }: ContainerHeaderProps) {
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const navigate = useNavigate();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openAddItemDialog, setOpenAddItemDialog] = useState<boolean>(false);

  const { deleteContainer, deleteContainerLoading } = useContainerActions();

  const onDelete = () => {
    if (!container) return;
    deleteContainer(
      container.id,
      container.items.map((item) => item.id),
      () => {
        toast.success("Box deleted successfully.");
        setOpenDeleteConfirmation(false);
        navigate("/boxes", { replace: true });
      },
      () => {
        toast.error("Failed to delete box.");
      }
    );
  };

  const onEdit = () => {
    if (notDesktop) {
      navigate("/box/edit", { state: container });
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
          {container?.name}
        </h1>
        {/* Star Button */}
        {!!container && <PinIcon container={container} size="lg" />}
      </div>

      {/* Button group */}
      <div className="lg:flex shrink-0 hidden">
        {/* Add Item Button */}
        <Button
          onClick={() => setOpenAddItemDialog(true)}
          className="hover:bg-primary-hover py-5 rounded-r-none"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Item</span>
        </Button>

        {/* Separator */}
        <span className="flex items-center gap-2 py-2 bg-primary dark:bg-primary-dark text-primary-foreground dark:text-primary-dark-foreground font-thin">
          |
        </span>
        {/* More Menu */}
        <Menu>
          <MenuButton className="flex items-center gap-2 p-2 rounded-tr-lg rounded-br-lg bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark/90 text-primary-foreground dark:text-primary-dark-foreground transition-colors focus:outline-none">
            <ChevronDown className="h-4 w-4 hidden sm:block" />
          </MenuButton>
          <MenuItems anchor="bottom end" className="mt-2 min-w-32">
            <MenuItemButton onClick={onEdit}>Edit Box</MenuItemButton>
            <MenuItemButton
              danger
              onClick={() => setOpenDeleteConfirmation(true)}
            >
              Delete Box
            </MenuItemButton>
          </MenuItems>
        </Menu>
      </div>
      <div className="lg:hidden block">
        <Menu>
          <MenuButton className="p-2 hover:bg-background-accent dark:hover:bg-background-accent/10 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5 text-text-primary dark:text-text-dark-primary" />
          </MenuButton>
          <MenuItems anchor="bottom end" className="mt-2 min-w-32">
            <MenuItemButton
              onClick={() =>
                navigate("/item/new", {
                  state: { containerId: container?.id },
                })
              }
            >
              Add item
            </MenuItemButton>
            <MenuItemButton onClick={onEdit}>Edit Box</MenuItemButton>
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
        title="Delete Box?"
        confirmText="Delete Box"
        isDanger
        loading={deleteContainerLoading}
        loadingText="Deleting..."
        isOpen={openDeleteConfirmation}
        onCancel={() => setOpenDeleteConfirmation(false)}
        onConfirm={onDelete}
      >
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary sm:hidden">
          This will delete the box and all items inside. This cannot be undone.
        </p>

        <p className="text-sm text-text-secondary dark:text-text-dark-secondary sm:block hidden">
          Are you sure you want to delete this box?
          <br />
          All items inside it will also be deleted. This action cannot be
          undone.
        </p>
      </ConfirmationDialog>
      <AddEditDialog
        isOpen={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        details={container ?? undefined}
        type="container"
      />
      <AddEditDialog
        isOpen={openAddItemDialog}
        onClose={() => setOpenAddItemDialog(false)}
        containerId={container?.id}
        type="item"
      />
    </div>
  );
}

export default ContainerHeader;
