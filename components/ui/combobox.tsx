"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const myptions = [
  { value: '76a89646-1596-4bb4-a205-e24b617c507f', label: 'Business' },
  { value: '4cd1fd14-2a7d-44f1-903c-406603c90907', label: 'Design' },
  { value: 'df1c876b-ad21-49d2-85b3-503c75d8ff61', label: 'Development' },
  {
    value: '71c533d8-0832-4566-a36b-952edbc32cb4',
    label: 'Finance & Accounting'
  },
  { value: '3a84b0dd-6b68-48aa-ad03-ec6deed73f37', label: 'IT & Software' },
  { value: 'd4c985a7-a6a1-43c3-9222-7dfed511660a', label: 'Marketing' },
  { value: '965867c0-b4a0-46ca-b371-901fc7bdf599', label: 'Music' },
  {
    value: '03d82775-2077-4b3b-8bd2-336541e974de',
    label: 'Personal Development'
  }
]

interface ComboboxProps {
    options: { label: string; value: string}[]
    value?: string;
    onChange: (value: string) => void;
}

export const Combobox = ({
    options,
    value,
    onChange
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandList>
                  <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                  >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
