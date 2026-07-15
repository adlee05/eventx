import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { type SetStateAction } from "react"
import { type FiltersType } from "@/types/events.filter"

// comp
export function Filters({ filters, setFilters }: {
  filters: FiltersType,
  setFilters: React.Dispatch<SetStateAction<FiltersType>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <CheckboxGroup filters={filters} setFilters={setFilters} />
      </PopoverContent>
    </Popover >
  )
}

export function CheckboxGroup({ filters, setFilters }: {
  filters: FiltersType,
  setFilters: React.Dispatch<SetStateAction<FiltersType>>
}) {
  const categoryOptions = ["art", "recreational", "tech"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        categories: [...prev.categories, category]     // push returns length, use concat or spread prev categories arr
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter(c => c !== category)
      }))
    }
  };

  return (
    <FieldSet>
      <FieldLegend variant="label">
        Filter by Category
      </FieldLegend>
      <FieldDescription>
        Select the events categories you want to search for
      </FieldDescription>
      <FieldGroup className="gap-3">
        {categoryOptions.map(category => (
          <Field orientation="horizontal" key={category}>
            <Checkbox
              checked={filters.categories.includes(category)}
              onCheckedChange={(checked) => {
                handleCategoryChange(category, checked === true)
              }}
            />
            <FieldLabel
              className="font-normal"
            >
              {category[0].toUpperCase() + category.slice(1)}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
