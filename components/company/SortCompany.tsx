import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoFilter } from "react-icons/io5";

interface SortCompanyProps {
  onSortChange?: (field: string, order: "asc" | "desc") => void;
}

const SortCompany: React.FC<SortCompanyProps> = ({ onSortChange }) => {
  const handleSortClick = (field: string, order: "asc" | "desc") => {
    if (onSortChange) {
      onSortChange(field, order);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div data-id="sort" className="cursor-pointer text-black">
          <IoFilter className="ml-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Valuation</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-valuation-asc"
                  onClick={() => handleSortClick("valuation", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-valuation-desc"
                  onClick={() => handleSortClick("valuation", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Total Shares</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-total-share-asc"
                  onClick={() => handleSortClick("totalShare", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-total-share-desc"
                  onClick={() => handleSortClick("totalShare", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Funding Target</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-funding-target-asc"
                  onClick={() => handleSortClick("fundingTarget", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-funding-target-desc"
                  onClick={() => handleSortClick("fundingTarget", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Price per Share</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-price-share-asc"
                  onClick={() => handleSortClick("priceShare", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-price-share-desc"
                  onClick={() => handleSortClick("priceShare", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Investment Deadline</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-deadline-asc"
                  onClick={() => handleSortClick("deadline", "asc")}
                >
                  Sooner to Later
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-deadline-desc"
                  onClick={() => handleSortClick("deadline", "desc")}
                >
                  Later to Sooner
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Minimum Investment</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-min-invest-asc"
                  onClick={() => handleSortClick("minInvest", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-min-invest-desc"
                  onClick={() => handleSortClick("minInvest", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Maximum Investment</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  data-id="sort-max-invest-asc"
                  onClick={() => handleSortClick("maxInvest", "asc")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-id="sort-max-invest-desc"
                  onClick={() => handleSortClick("maxInvest", "desc")}
                >
                  High to Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortCompany;
