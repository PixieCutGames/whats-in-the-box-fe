import { Link, useParams } from "react-router-dom";
import useItemDetails from "./useItemDetails";
import ItemHeader from "./ItemHeader";
import DaysAgo from "../../../shared/components/ui/DaysAgo";
import IconImage from "../../../shared/components/IconImage";
import ItemDetailsSkeleton from "../../../shared/components/skeleton/ItemDetailsSkeleton";
import ErrorState from "./ErrorState";

function ItemDetails() {
  const { id } = useParams();

  const { item, isLoading, error, refetch } = useItemDetails(id);

  if (isLoading) return <ItemDetailsSkeleton />;
  if (error) return <ErrorState refetch={refetch} />;
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ItemHeader item={item} />
      {/* Item details */}
      <div className="lg:hidden">
        {/* Item Photo */}
        <IconImage
          imageUrl={item?.imageUrl}
          name={item?.name ?? ""}
          type="item"
        />
      </div>
      <div className="bg-background-surface border border-border rounded-lg p-6 lg:flex block gap-6">
        <div className="hidden lg:block w-sm">
          {/* Item Photo */}
          <IconImage
            imageUrl={item?.imageUrl}
            name={item?.name ?? ""}
            type="item"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Box:
            </h3>
            <Link
              to={`/box/${item?.container.id}`}
              className="text-text-primary"
            >
              {item?.container.name}
            </Link>
          </div>
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Qty:
            </h3>
            <p className="text-text-primary">{item?.quantity}</p>
          </div>
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Description:
            </h3>
            <p className="text-text-primary">{item?.description}</p>
          </div>
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Last Updated:
            </h3>
            <p className="text-text-primary">
              {!!item && <DaysAgo date={item.updatedAt} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
