import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "./Type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function OrderPage({ setStep }) {
  const [orderDatas] = useContext(OrderContext);

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Travel Products
            </CardTitle>
            <div className="relative w-1/2 lg:w-full lg:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search places.."
                className="w-full pl-8 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Type orderType="products" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Type orderType="options" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Total Price: {orderDatas.totals.total}
            </h2>
            <Button onClick={() => setStep(1)} className="w-full" size="lg">
              주문하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderPage;
