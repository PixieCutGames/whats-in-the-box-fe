import { Link, useParams } from "react-router-dom";
import useItemDetails from "./useItemDetails";
import ItemHeader from "./ItemHeader";
import DaysAgo from "../../../shared/components/ui/DaysAgo";
import ContainerImage from "../../../shared/components/ContainerImage";

function ItemDetails() {
  const { id } = useParams();
  // TODO: handle containersError
  const { item, isLoading, refetch } = useItemDetails(id);

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ItemHeader item={item} onUpdate={() => refetch()} />
      {/* Item details */}
      <div className="lg:hidden">
        {/* Item Photo */}
        <ContainerImage imageUrl={item?.imageUrl} name={item?.name ?? ""} />
      </div>
      <div className="bg-background-surface border border-border rounded-lg p-6 lg:flex block gap-6">
        <div className="hidden lg:block w-sm">
          {/* Item Photo */}
          <ContainerImage imageUrl={item?.imageUrl} name={item?.name ?? ""} />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Location:
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
