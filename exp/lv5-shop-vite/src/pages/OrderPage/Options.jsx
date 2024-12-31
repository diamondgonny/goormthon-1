import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function Options({ name, updateItemCount }) {
  return (
    <div className="flex items-center space-x-2 p-2">
      <Checkbox
        id={`${name}-option`}
        onCheckedChange={(checked) => {
          updateItemCount(name, checked ? 1 : 0);
        }}
      />
      <Label
        htmlFor={`${name}-option`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </Label>
    </div>
  );
}

export default Options;
