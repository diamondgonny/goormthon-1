import { useState, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Gift } from "lucide-react";

const SummaryPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productArray = Array.from(orderDatas.products);
  const productList = productArray.map(([key, value]) => (
    <div
      key={key}
      className="flex justify-between items-center py-2 border-b last:border-0"
    >
      <span className="font-medium">{key}</span>
      <span className="text-muted-foreground">{value}개</span>
    </div>
  ));

  const hasOptions = orderDatas.options.size > 0;
  let optionsRender = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys());
    const optionList = optionsArray.map((key) => (
      <div
        key={key}
        className="flex justify-between items-center py-2 border-b last:border-0"
      >
        <span className="font-medium">{key}</span>
        <span className="text-muted-foreground">선택됨</span>
      </div>
    ));
    optionsRender = (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">옵션 선택 사항</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            총 옵션 금액: {orderDatas.totals.options.toLocaleString()}원
          </div>
        </CardHeader>
        <CardContent>
          <div className="pr-4">{optionList}</div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">주문 확인</h1>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">선택하신 상품</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            총 상품 금액: {orderDatas.totals.products.toLocaleString()}원
          </div>
        </CardHeader>
        <CardContent>
          <div className="pr-4">{productList}</div>
        </CardContent>
      </Card>

      {optionsRender}

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="confirm-checkbox"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <label
              htmlFor="confirm-checkbox"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              주문하실 상품의 내용을 확인하셨습니까?
            </label>
          </div>
          <div className="text-lg font-semibold text-right mb-4">
            총 결제 금액: {orderDatas.totals.total.toLocaleString()}원
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setStep(0)}>
            이전으로
          </Button>
          <Button disabled={!checked} onClick={handleSubmit}>
            주문하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummaryPage;
