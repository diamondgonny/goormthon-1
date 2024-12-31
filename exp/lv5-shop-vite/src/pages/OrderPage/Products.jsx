import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Products({ name, imagePath, updateItemCount }) {
  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3">
        <div className="aspect-[3/2] overflow-hidden rounded-md bg-gray-50 mb-3">
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:4000/${imagePath}`}
            alt={`${name} product`}
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor={name}
            className="text-sm font-medium block text-gray-900"
          >
            {name}
          </Label>
          <Input
            id={name}
            type="number"
            name="quantity"
            min="0"
            defaultValue={0}
            onChange={handleChange}
            className="w-full h-9"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Products;
