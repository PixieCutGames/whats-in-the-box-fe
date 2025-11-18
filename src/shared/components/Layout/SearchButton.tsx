import { useMediaQuery } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickSearchDialog from "./QuickSearchDialog";

function SearchButton() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const [searchOpen, setSearchOpen] = useState(false);

  const openQuickSearchDialog = () => {
    if (notDesktop) navigate("/quick");
    else setSearchOpen(true);
  };
  return (
    <>
      <button
        onClick={openQuickSearchDialog}
        className="p-2 rounded-lg hover:bg-background-accent transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-text-primary" />
      </button>
      <QuickSearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

export default SearchButton;
