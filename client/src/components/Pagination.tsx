import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { FiltersType } from "@/types/events.filter"
import type { SetStateAction } from "react"

interface PaginationProps {
  filters: FiltersType,
  setFilters: React.Dispatch<SetStateAction<FiltersType>>,
  totalEvents: number
}

export function PaginationComp({ filters, setFilters, totalEvents }: PaginationProps) {
  const totalPages = (totalEvents / 12) + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={filters.page === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={() =>
              filters.page > 1 &&
              setFilters(prev => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={filters.page === totalPages ? "pointer-events-none opacity-50" : ""}
            onClick={() =>
              filters.page < totalPages &&
              setFilters(prev => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>)
}
