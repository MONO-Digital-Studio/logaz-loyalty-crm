
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { DropdownMenuSubTrigger } from "./dropdown-menu/DropdownMenuSubTrigger"
import { DropdownMenuSubContent } from "./dropdown-menu/DropdownMenuSubContent"
import { DropdownMenuContent } from "./dropdown-menu/DropdownMenuContent"
import { DropdownMenuItem } from "./dropdown-menu/DropdownMenuItem"
import { DropdownMenuCheckboxItem } from "./dropdown-menu/DropdownMenuCheckboxItem"
import { DropdownMenuRadioItem } from "./dropdown-menu/DropdownMenuRadioItem"
import { DropdownMenuLabel } from "./dropdown-menu/DropdownMenuLabel"
import { DropdownMenuSeparator } from "./dropdown-menu/DropdownMenuSeparator"
import { DropdownMenuShortcut } from "./dropdown-menu/DropdownMenuShortcut"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
