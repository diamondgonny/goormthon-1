<명세서>

1 리액트 테스트 기초 학습  
리액트에서 테스트의 중요성과 종류(Jest, React Testing Library, Enzyme 등)를 학습하고, 리액트 애플리케이션에서 테스트가 어떻게 적용되는지 간단히 실습하며 리액트 테스트의 개념을 요약한 문서 및 테스트를 적용한 간단한 코드 예시를 만듭니다. 만든 자료는 결과물로 제출합니다.

7 더 나은 리액트 테스트를 위한 참고 학습  
리액트 테스트를 잘 작성하기 위한 모범 사례와 팁을 학습해 나만의 가이드라인을 만듭니다. 테스트 코드의 가독성을 높이고, 리팩토링 시의 테스트 유지 관리 방법 등을 가이드 라인 문서로 작성하고, 이를 결과물로 제출합니다.

---

## 테스팅 관련 정리

### 테스팅으로 얻는 이점, 중요성
- 디버깅 시간을 단축: 자동화 된 유닛 테스팅으로 문제 지점을 빠르게 찾아낼 수 있음
- 더욱 안정적인 앱: 양질의 테스트를 거친 코드로 안정적이고 신뢰할만한 앱이 됨
- 이 밖에도 유지보수 및 재설계 등을 더 수월하게 할 수 있음

### 테스트하기 전 Linter, Formatter 설정
- eslint 설치 : package.json의 eslintConfig 제거, `.eslintrc.json` 생성
- eslint plugins(test) 설치 : npm install eslint-plugin-testing-library eslint-plugin-jest-dom
- prettier 설치 : ⚙️ -> Extension Settings (기본값)

> 그 외 자세한 설정(vite) : [링크](https://app.diagrams.net/#G1n5lYnOvwAhb0f0LHlnK9K6e3EVPivI03#%7B%22pageId%22%3A%22xPqerJXdohP9GSeAmiIi%22%7D)

### 리액트 테스트에서의 파일 구조
- 일반적으로 src 폴더 내 컴포넌트와 동일한 계층에 테스트 파일을 두거나, 테스트 전용 tests 폴더를 사용함
- 컴포넌트 단위 테스트는 [ComponentName].test.js 형식으로 작성함
- 통합 테스트나 엔드투엔드 테스트는 별도 폴더(예: tests/integration, tests/e2e)에 배치함

### Jest Matcher
- Jest의 기본 제공 검증 함수 (테스트에서 값을 검증)
- 일반적인 JavaScript 값 검증에 사용
- expect 예: toBe(1), toEqual(obj), toBeTruthy(isOpen), toContain(item), toBeNull(), toThrow()...

### Jest DOM Matcher
- DOM 요소 테스트를 위한 추가 Matcher, Testing Library와 함께 사용
- HTML 요소의 상태, 속성, 내용 등을 검증
- expect 예: toBeInTheDocument(), toBeVisible(), toHaveTextContent(), toBeDisabled(), toHaveClass()...

### Jest Setup & Teardown
- beforeEach: 각 테스트 실행 전에 공통 초기화 작업을 수행하며, 독립적이고 일관된 테스트 환경을 보장
- afterEach: 각 테스트 실행 후 리소스 정리나 상태 초기화를 통해 메모리 누수 및 테스트 간 간섭 방지
- afterAll: 모든 테스트 완료 후 전역 리소스 해제나 클린업 작업에 사용, 예를 들어 DB 연결 종료

### getByTestId보다 getByRole을 권장하는 이유
- 사용자 관점의 테스트: getByRole은 실제 사용자가 화면을 인식하고 상호작용하는 방식과 유사하여, 사용자 경험을 보다 정확하게 테스트할 수 있음
- 테스트 유지 보수성 향상: getByTestId는 개발자가 임의로 부여한 data-testid 속성을 기반으로 하는 반면, getByRole은 HTML 구조와 시맨틱을 기반으로 하여 유지 보수에 도움됨
- 접근성 검증: getByRole을 사용하면 요소의 접근성 속성(aria-label 등)이 올바르게 설정되었는지 확인할 수 있음. 이는 웹 접근성 표준을 준수하는 데도 도움됨

### msw(Mock Service Worker)
- HTTP 통신 모킹: MSW는 브라우저 또는 Node.js 환경에서 실제 API 요청을 가로채 미리 정의된 핸들러로 가짜 응답을 반환하는 라이브러리
- 테스트 환경 구성: 테스트 전 MSW 서버를 시작하고, 요청 핸들러를 초기화하며, 테스트 종료 시 서버를 종료하는 핸들러 활용
- 유연한 요청 제어: 실제 서버 없이도 요청 성공, 실패 등 다양한 시나리오를 구성하여 테스트 케이스를 더욱 세밀하게 작성할 수 있음

> 처음에는 포트설정 때문에 헷갈렸는데, 리액트 앱이 요청을 전달하면 (예: 4000번 포트의) 백엔드 서버가 데이터를 줄지, MSW가 해당 포트로 가는 요청을 가로채 Mock 처리할지의 차이임

### 테스트 코드 작성 팁
- describe, it, test를 이용한 구조화: describe 블록으로 연관된 테스트를 묶고, it 또는 test 블록으로 개별 테스트 케이스를 명확히 구분
- 테스트 훅 사용: beforeEach, beforeAll, afterEach, afterAll 훅을 활용하여 반복되는 설정 및 정리 코드를 관리
- 명확하고 서술적인 테스트 이름 사용: 테스트 이름을 통해 테스트 대상과 예상되는 결과를 명확히 알 수 있도록 작성
- Arrange, Act, Assert (AAA) 패턴 사용: '준비 - 실행 - 검증' 이 패턴을 사용하면 테스트의 구조가 명확해지고 각 부분이 어떤 역할을 하는지 쉽게 이해할 수 있음
- 적절한 추상화 수준 유지: 구현 세부 사항에 지나치게 의존하는 테스트는 리팩토링 시 쉽게 깨질 수 있는 반면, 너무 추상적인 테스트는 버그를 제대로 잡아내지 못할 수 있음

> 그 외에도 테스트 당 한 주제의 Assert(expect) 사용, 테스트 데이터 분리 등이 있음

### 다음에 이 주제와 관련해서 배우고 싶은 것 (언젠간...)
- Storybook을 활용한 컴포넌트 주도 개발, 테스트 자동화 ([링크](https://www.youtube.com/watch?v=CBLPEeayqYo))
