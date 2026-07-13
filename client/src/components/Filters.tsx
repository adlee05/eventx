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

// comp
export function Filters({ categories, setCategories }: {
  categories: string[],
  setCategories: React.Dispatch<SetStateAction<string[]>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <CheckboxGroup categories={categories} setCategories={setCategories} />
      </PopoverContent>
    </Popover>
  )
}

export function CheckboxGroup({ categories, setCategories }: {
  categories: string[],
  setCategories: React.Dispatch<SetStateAction<string[]>>
}) {
  const categoryOptions = ["art", "recreational", "tech"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setCategories(prev => [...prev, category]);
    } else {
      setCategories(prev => prev.filter(c => c !== category));
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
              checked={categories.includes(category)}
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
