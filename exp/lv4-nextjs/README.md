![movie-app](https://github.com/user-attachments/assets/c2ba778a-c3fd-43cd-abc0-6b812f29a505)

<프로젝트 주요 파일 구조>
```
src/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── movie/
│   │   └── [id]/
│   │       ├── page.js
│   │       └── MovieDetail.js
│   ├── popular/
│   │   ├── page.js
│   │   └── PopularMovies.js
│   └── search/
│       ├── page.js
│       └── SearchResults.js
├── components/
│   └── client/
│       ├── MovieCard.js
│       ├── NavBar.js
│       └── SearchBar.js
├── context/
│   └── LanguageContext.js
└── utils/
    └── api.js
```

<명세서>

1 리액트에서 컴포넌트 재사용성 높이기
리액트에서 재사용 가능한 컴포넌트를 만들기 위해 props와 children을 활용한 컴포넌트를 설계하고, 여러 번 사용될 수 있는 형태로 구성합니다. 재사용 가능한 컴포넌트 코드와 실행 화면 스크린샷을 결과물로 제출합니다.

2 리액트 앱에서 에러 처리 및 예외 처리 구현하기
리액트 앱에서 발생할 수 있는 에러를 처리하고, 사용자에게 친절한 에러 메시지를 표시하는 기능을 구현합니다. 예를 들어, API 요청이 실패했을 때 에러 메시지를 화면에 표시하는 방법을 실습합니다. 에러 처리 기능이 구현된 리액트 앱 코드를 결과물로 제출합니다.

3 Next.js로 영화 목록 확인 앱 페이지화하기
Next.js를 사용하여 영화 목록 앱을 여러 페이지로 나누고, 페이지 간 이동이 가능하도록 라우팅을 설정합니다. 페이지 간 이동이 가능한 앱 코드와 실행 결과 스크린샷을 결과물로 제출합니다.

~~4 TypeScript로 영화 목록 확인 앱 리팩토링하기
TypeScript를 사용하여 영화 목록 확인 앱을 리팩토링하고, 컴포넌트의 Props와 상태에 타입을 명시하여 코드의 안정성을 확보합니다. TypeScript로 리팩토링된 영화 목록 확인 앱 코드와 실행 결과 스크린샷을 결과물로 제출합니다.~~

5 비동기 처리 학습 (Async/Await 활용하기)
비동기 작업을 처리하는 방법인 async와 await를 사용하여 API 호출 및 비동기 처리를 구현합니다. 예를 들어, 영화 정보를 가져오는 API를 사용하여 데이터를 비동기적으로 불러오고 화면에 표시합니다. 기능이 작동하는 앱 코드와 실행 화면 스크린샷을 결과물로 제출합니다.

6 Next.js에서 동적 라우팅 구현하기
Next.js에서 동적 라우팅을 사용하여 다양한 페이지를 생성하고, URL에 따라 동적으로 콘텐츠를 표시합니다. 예를 들어, 제품 ID를 URL에 포함시켜 제품 상세 페이지를 생성합니다. 동적 라우팅이 적용된 Next.js 앱 코드를 결과물로 제출합니다.

7 도커를 활용한 리액트 앱 배포하기
Docker를 사용해 리액트 앱을 컨테이너화하고, Dockerfile과 docker-compose.yml을 작성하여 로컬에서 앱을 실행할 수 있도록 설정합니다. Dockerfile과 Docker Compose 설정 파일, 컨테이너에서 실행된 앱 화면 캡처해 스크린샷을 결과물로 제출합니다.

8 React Context를 이용한 글로벌 상태 관리
React Context를 사용하여 전역 상태를 관리하고, 여러 컴포넌트에서 동일한 데이터를 공유할 수 있도록 구현합니다. 예를 들어, 사용자 로그인 상태나 언어 설정 등을 관리합니다. React Context를 이용한 상태 관리 코드와 실행 화면 스크린샷을 결과물로 제출합니다.

9 컴포넌트 라이프사이클 이해하기 (useEffect 활용)
useEffect를 활용하여 컴포넌트가 마운트되었을 때와 언마운트될 때의 동작을 구현합니다. 예를 들어, API 데이터를 불러와서 컴포넌트에 표시하는 작업을 수행합니다. useEffect를 활용한 데이터 fetching 코드를 결과물로 제출합니다.
