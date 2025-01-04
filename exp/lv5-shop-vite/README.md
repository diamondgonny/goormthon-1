<프로젝트 주요 파일 구조>
```
src/
├── components/
│   ├── ui/
│   │   └── (shadcn/ui components)
│   ├── Navbar.jsx
│   └── ErrorBanner.jsx
├── contexts/
│   └── OrderContext.jsx
├── mocks/
│   ├── handlers.js
│   └── server.js
├── pages/
│   ├── CompletePage/
│   │   └── CompletePage.jsx
│   ├── NoticePage/
│   │   └── NoticePage.jsx
│   ├── OrderPage/
│   │   ├── tests/
│   │   ├── OrderPage.jsx
│   │   ├── Type.jsx
│   │   ├── Products.jsx
│   │   └── Options.jsx
│   └── SummaryPage/
│       ├── tests/
│       └── SummaryPage.jsx
├── lib/
├── App.jsx
├── App.test.jsx
├── index.css
├── main.jsx
├── setupTests.js
└── test-utils.jsx
```

<명세서>

4 React MUI를 사용하여 게시판 UI 구성하기  
Material-UI(MUI) 라이브러리를 사용하여 게시판 UI를 구현합니다. MUI 컴포넌트(Button, Table, Dialog 등)를 활용하여 게시판 화면을 구성합니다. MUI 컴포넌트로 구성된 게시판 UI를 확인합니다. 결과물로 MUI 컴포넌트로 구성된 게시판 UI 스크린샷을 제출합니다. -> shadcn/ui로 대체  
(하단 스크린샷 참고)  

5 React 컴포넌트 스타일링하기  
React에서 다양한 방법으로 컴포넌트의 스타일을 적용합니다. CSS, Styled Components, Emotion 등을 사용하여 컴포넌트의 스타일을 지정합니다. 스타일링이 적용된 React 컴포넌트의 화면을 확인합니다. 결과물로 스타일링이 적용된 React 컴포넌트의 화면 스크린샷을 제출합니다.  
(하단 스크린샷 참고)  

8 상품 주문 앱 고도화 하기: 기본적인 상품 검색 기능 구현하기  
수업에서 개발한 상품 주문 앱에 사용자가 상품 목록에서 원하는 상품을 검색할 수 있는 기능을 추가합니다. 검색어를 입력하면 해당하는 상품만 필터링하여 보여주는 기능을 구현하고, 테스트를 진행합니다. 상품 검색 기능이 작동하는 앱 코드 및 테스트 코드와 실행 화면 스크린샷을 결과물로 제출합니다.  
[앱 코드 (필터링)](https://github.com/diamondgonny/goormthon/blob/main/exp/lv5-shop-vite/src/pages/OrderPage/Type.jsx#L32-L48)  
[테스트 코드](https://github.com/diamondgonny/goormthon/blob/main/exp/lv5-shop-vite/src/pages/OrderPage/tests/Type.test.jsx#L29-L75)  

<br>![test--verbose](https://github.com/user-attachments/assets/1ee3c93c-87df-4c4f-9101-e81b81e11454)

<br>![shop-app](https://github.com/user-attachments/assets/2b47cdac-cc48-41f3-b60c-16f59aa73617)
