import axios from "axios";
import { useEffect, useContext, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

function CompletePage({ setStep }) {
  const [OrderDatas, , resetOrderDatas] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderCompleted(OrderDatas);
  }, []);

  const orderCompleted = async (OrderDatas) => {
    try {
      let response = await axios.post(
        "http://localhost:4000/order",
        OrderDatas
      );
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const orderTable = orderHistory.map((item) => (
    <TableRow key={item.orderNumber}>
      <TableCell className="font-medium">{item.orderNumber}</TableCell>
      <TableCell className="text-right">
        {item.price.toLocaleString()}원
      </TableCell>
    </TableRow>
  ));

  const handleClick = () => {
    resetOrderDatas();
    setStep(0);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">
            주문을 처리하고 있습니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="mb-8">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600 mb-2">
            주문이 성공적으로 완료되었습니다
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          주문하신 내역은 이메일로 발송되었습니다
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>주문 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문 번호</TableHead>
                <TableHead className="text-right">주문 금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{orderTable}</TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button onClick={handleClick} size="lg">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default CompletePage;
