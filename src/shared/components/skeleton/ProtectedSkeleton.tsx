import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Containers from "./Containers";
import Items from "./Items";
import Profile from "./Profile";
import ChangePasswordSkeleton from "./ChangePasswordSkeleton";
import SearchPageSkeleton from "./Search/Advanced";
import ItemDetailsSkeleton from "./ItemDetailsSkeleton";
import ItemFormSkeleton from "./ItemForm";
import ContainerFormSkeleton from "./ContainerForm";
import ContainerDetailsSkeleton from "./ContainerDetails";
import GlobalLoading from "./GlobalLoading";

function ProtectedSkeleton() {
  const { pathname, ...location } = useLocation();
  console.log(location);
  console.log(pathname);

  if (pathname === "/") return <Dashboard />;
  if (pathname === "/boxes") return <Containers />;
  if (pathname === "/items") return <Items />;
  if (pathname === "/profile") return <Profile />;
  if (pathname === "/change-password") return <ChangePasswordSkeleton />;
  if (pathname === "/search") return <SearchPageSkeleton />;
  if (pathname === "/box/edit" || pathname === "/box/new")
    return <ContainerFormSkeleton />;
  if (pathname.includes("/box/")) return <ContainerDetailsSkeleton />;
  if (pathname === "/item/edit" || pathname === "/item/new")
    return <ItemFormSkeleton />;
  if (pathname.includes("/item/")) return <ItemDetailsSkeleton />;
  return <GlobalLoading />;
}

export default ProtectedSkeleton;
