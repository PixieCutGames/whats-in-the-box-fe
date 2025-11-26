import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../../types";
import { ArrowLeft, ChevronDown, MoreVertical, Plus } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Maybe } from "yup";
import ConfirmationDialog from "../../../shared/components/ui/ConfirmationDialog";
import { useState } from "react";
import useContainerActions from "../../../shared/hooks/useContainerActions";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import { useMediaQuery } from "@uidotdev/usehooks";
import toast from "react-hot-toast";

type ContainerHeaderProps = {
  container: Maybe<Container>;
  onUpdate: () => void;
};
function ContainerHeader({ container, onUpdate }: ContainerHeaderProps) {
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
          className="p-2 -ml-2 hover:bg-background-accent rounded-lg transition-colors shrink-0"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <h1 className="text-text-primary truncate">{container?.name}</h1>
      </div>

      {/* Button group */}
      <div className="lg:flex shrink-0 hidden">
        {/* Add Item Button */}
        <button
          onClick={() => setOpenAddItemDialog(true)}
          className="flex items-center gap-2 p-2 pl-4 bg-primary hover:bg-primary-hover text-text-inverse rounded-bl-lg rounded-tl-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Item</span>
        </button>
        {/* Separator */}
        <span className="flex items-center gap-2 py-2 bg-primary text-text-inverse font-thin">
          |
        </span>
        {/* More Menu */}
        <Menu>
          <MenuButton className="flex items-center gap-2 p-2 rounded-tr-lg rounded-br-lg bg-primary hover:bg-primary-hover transition-colors focus:outline-none">
            <ChevronDown className="h-4 w-4 text-text-inverse hidden sm:block" />
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
                Edit Box
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => setOpenDeleteConfirmation(true)}
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive transition-colors no-underline"
              >
                Delete Box
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="lg:hidden block">
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
                onClick={() =>
                  navigate("/item/new", {
                    state: { containerId: container?.id },
                  })
                }
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden focus:bg-accent focus:text-accent-foreground text-text-primary hover:bg-background-accent hover:text-text-primary transition-colors no-underline"
              >
                Add item
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={onEdit}
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden focus:bg-accent focus:text-accent-foreground text-text-primary hover:bg-background-accent hover:text-text-primary transition-colors no-underline"
              >
                Edit Box
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => setOpenDeleteConfirmation(true)}
                className="block w-full rounded-sm px-2 py-1.5 text-sm text-start outline-hidden text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive transition-colors no-underline"
              >
                Delete Box
              </button>
            </MenuItem>
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
        <p className="text-sm text-text-secondary sm:hidden">
          This will delete the box and all items inside. This cannot be undone.
        </p>

        <p className="text-sm text-text-secondary sm:block hidden">
          Are you sure you want to delete this box?
          <br />
          All items inside it will also be deleted. This action cannot be
          undone.
        </p>
      </ConfirmationDialog>
      <AddEditDialog
        isOpen={openEditDialog}
        onClose={(refetch) => {
          setOpenEditDialog(false);
          if (refetch) onUpdate();
        }}
        details={container ?? undefined}
        type="container"
      />
      <AddEditDialog
        isOpen={openAddItemDialog}
        onClose={(refetch) => {
          setOpenAddItemDialog(false);
          if (refetch) onUpdate();
        }}
        containerId={container?.id}
        type="item"
      />
    </div>
  );
}

export default ContainerHeader;
