import { render, screen } from "../../../test-utils";
import SummaryPage from "../SummaryPage";

test("checkbox and button", () => {
  render(<SummaryPage setStep={() => {}} />);
  const checkbox = screen.getByRole("checkbox", {
    name: "주문하실 상품의 내용을 확인하셨습니까?",
  });
  expect(checkbox.getAttribute("aria-checked")).toBe("false");

  const confirmButton = screen.getByRole("button", { name: "주문하기" });
  expect(confirmButton.disabled).toBeTruthy();
});
