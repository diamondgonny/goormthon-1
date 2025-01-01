import { render, screen } from "../../../test-utils";
import { server } from "../../../mocks/server";
import Type from "../Type";
import { HttpResponse, http } from "msw";
import { OrderContextProvider } from "../../../contexts/OrderContext";

test("displays product images from server", async () => {
  render(<Type orderType="products" />);

  // 이미지 찾기 (mocks에 2개)
  const productImages = await screen.findAllByRole("img", {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(["America product", "England product"]);
});

test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  // 체크박스 가져오기 (mocks에 2개)
  const optionCheckboxes = await screen.findAllByRole("checkbox");

  expect(optionCheckboxes).toHaveLength(2);
});

test("should display product list correctly", async () => {
  render(
    <OrderContextProvider>
      <Type orderType="products" />
    </OrderContextProvider>
  );

  // 전체 상품 목록 표시
  const products = await screen.findAllByRole("img", { name: /product$/i });
  expect(products).toHaveLength(2);
});

test("should filter products based on search query", async () => {
  render(
    <OrderContextProvider>
      <Type orderType="products" searchQuery="Eng" />
    </OrderContextProvider>
  );

  // 검색 결과 표시 ("Eng" -> England)
  const productLabel = await screen.findByText("England");
  expect(productLabel).toBeInTheDocument();
});

test("should display all products when search query is empty", async () => {
  render(
    <OrderContextProvider>
      <Type orderType="products" searchQuery="" />
    </OrderContextProvider>
  );

  // 전체 결과 표시 ("" -> 전체 상품 목록)
  const products = await screen.findAllByRole("img", { name: /product$/i });
  expect(products).toHaveLength(2);
});

test("should perform case-insensitive search", async () => {
  render(
    <OrderContextProvider>
      <Type orderType="products" searchQuery="AMER" />
    </OrderContextProvider>
  );

  // 대소문자 구분 없는 검색 결과 표시 ("AMER" -> America)
  const productLabel = await screen.findByText("America");
  expect(productLabel).toBeInTheDocument();
});

test("when fetching product datas, face an error", async () => {
  // server.resetHandlers()로 인하여 msw의 핸들러가 초기화되므로 마지막에 위치시킴
  // 이 뒤에도 테스트를 진행하려면, afterEach(() => server.restoreHandlers());를 쓸 것
  server.resetHandlers(
    http.get("http://localhost:4000/products", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});
