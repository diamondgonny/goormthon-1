import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("From order to order completion", async () => {
  const user = userEvent.setup();

  render(<App />);

  // 상품 주문
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  await user.clear(americaInput);
  await user.type(americaInput, "2");

  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  await user.clear(englandInput);
  await user.type(englandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  expect(insuranceCheckbox.getAttribute("aria-checked")).toBe("false");
  await user.click(insuranceCheckbox);
  expect(insuranceCheckbox.getAttribute("aria-checked")).toBe("true");

  const orderButton = screen.getByRole("button", {
    name: "주문하기",
  });
  await user.click(orderButton);

  ////////////////////   주문 확인 페이지   //////////////////
  const summaryHeading = screen.getByRole("heading", {
    name: "주문 확인",
  });
  expect(summaryHeading).toBeInTheDocument();

  // 상품 섹션 확인
  const productsSection = screen.getByText("선택하신 상품");
  expect(productsSection).toBeInTheDocument();
  const productsTotalText = screen.getByText(/총 상품 금액:/);
  expect(productsTotalText).toHaveTextContent("5,000원");

  // 옵션 섹션 확인
  const optionsSection = screen.getByText("옵션 선택 사항");
  expect(optionsSection).toBeInTheDocument();
  const optionsTotalText = screen.getByText(/총 옵션 금액:/);
  expect(optionsTotalText).toHaveTextContent("500원");

  // 선택한 상품과 옵션 확인
  expect(screen.getByText("America")).toBeInTheDocument();
  expect(screen.getByText("2개")).toBeInTheDocument();
  expect(screen.getByText("England")).toBeInTheDocument();
  expect(screen.getByText("3개")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();
  expect(screen.getByText("선택됨")).toBeInTheDocument();

  // 주문 확인 체크박스 클릭
  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하실 상품의 내용을 확인하셨습니까?",
  });
  expect(confirmCheckbox.getAttribute("aria-checked")).toBe("false");
  await user.click(confirmCheckbox);
  expect(confirmCheckbox.getAttribute("aria-checked")).toBe("true");

  // 주문하기 버튼 클릭
  const confirmOrderButton = screen.getByRole("button", {
    name: "주문하기",
  });
  await user.click(confirmOrderButton);

  ////////////////////   주문 완료 페이지   //////////////////
  const loadingText = screen.getByText("주문을 처리하고 있습니다...");
  expect(loadingText).toBeInTheDocument();

  const completeMessage = await screen.findByText(
    "주문이 성공적으로 완료되었습니다"
  );
  expect(completeMessage).toBeInTheDocument();

  const loadingDisappeared = screen.queryByText("주문을 처리하고 있습니다...");
  expect(loadingDisappeared).not.toBeInTheDocument();

  const homeButton = screen.getByRole("button", {
    name: "홈으로 돌아가기",
  });
  await user.click(homeButton);

  // 첫 페이지로 돌아왔을 때 초기화 확인
  const productsTotal = screen.getByText(/상품 총 가격:/);
  expect(productsTotal).toHaveTextContent("0");

  const optionsTotal = screen.getByText(/옵션 총 가격:/);
  expect(optionsTotal).toHaveTextContent("0");

  await waitFor(() => {
    screen.getByRole("spinbutton", { name: "America" });
  });
});
