<프로젝트 주요 파일 구조>
```
src/
├── components/
│   ├── tests/
│   ├── AddTaskModal.jsx
│   ├── ModifyTaskModal.jsx
│   ├── Tasks.jsx
│   ├── Calendar.jsx
│   ├── CategoryForm.jsx
│   ├── CategoryViewModal.jsx
│   └── CategoryEditModal.jsx
├── views/
│   ├── tests/
│   └── DashboardPage.jsx
├── utils/
│   └── DateUtils.js
├── assets/
│   └── css/
├── json/
├── App.jsx
├── index.jsx
└── setupTests.js
```

<명세서>

2 리액트 앱에서의 상태 변화 테스트하기
리액트의 useState를 활용하여 상태 변화가 일어날 때 UI에 반영되는지 테스트합니다. 버튼 클릭 시 상태가 변경되고 UI가 업데이트되는지 확인합니다. 상태 변화 테스트가 포함된 리액트 앱 테스트 코드와 실행 화면을 결과물로 제출합니다.<br>
[테스트 코드] (https://github.com/diamondgonny/goormthon/tree/main/exp/lv5-todo-react/src/components/tests)


3 리액트 컴포넌트 간 데이터 흐름 테스트
부모-자식 컴포넌트 간 데이터 전달을 테스트합니다. 부모 컴포넌트에서 데이터를 전달하고, 자식 컴포넌트에서 이를 표시하는 방식으로 테스트를 진행합니다. 부모-자식 컴포넌트 간 데이터 전달이 잘 되는지 확인할 수 있는 테스트 코드와 실행 화면을 결과물로 제출합니다.<br>
[테스트 코드] (https://github.com/diamondgonny/goormthon/tree/main/exp/lv5-todo-react/src/views/tests)

6 테스트 코드로 To-Do 앱 개선하기
Jest와 React Testing Library를 사용해 이전 챕터에서 만들었던 To-Do 앱의 각 기능(입력, 추가, 완료/취소 버튼 등)에 대한 테스트를 작성하여 앱의 동작을 검증합니다. Jest 테스트 코드와 테스트 실행 결과 스크린샷을 결과물로 제출합니다.<br>
(2 참조)

<br>![test--verbose](https://github.com/user-attachments/assets/3a487e41-f189-4206-b2bf-b05de43645fa)
