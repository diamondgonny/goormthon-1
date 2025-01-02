import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../DashboardPage";

// 1. 자식 컴포넌트들을 mock 처리하여, 전달된 props를 추적
jest.mock("../../components/Calendar", () => {
  return function MockCalendar({ selectedDate, setSelectedDate, tasks }) {
    return (
      <div>
        <span>MockCalendar</span>
        <pre data-testid="calendar-props">
          {JSON.stringify({
            selectedDate,
            tasks,
            setSelectedDate: typeof setSelectedDate === "function" ? "function" : setSelectedDate
          })}
        </pre>
      </div>
    );
  };
});

jest.mock("../../components/Tasks", () => {
  return function MockTasks({
    selectedDate,
    categories,
    tasks,
    setTasks,
    setAddTaskModal,
    setModifyTaskModal,
    setSelectedTask
  }) {
    return (
      <div>
        <span>MockTasks</span>
        <pre data-testid="tasks-props">
          {JSON.stringify({
            selectedDate,
            categories,
            tasks,
            setTasks: typeof setTasks === "function" ? "function" : setTasks,
            setAddTaskModal: typeof setAddTaskModal === "function" ? "function" : setAddTaskModal,
            setModifyTaskModal: typeof setModifyTaskModal === "function" ? "function" : setModifyTaskModal,
            setSelectedTask: typeof setSelectedTask === "function" ? "function" : setSelectedTask
          })}
        </pre>
      </div>
    );
  };
});

jest.mock("../../components/AddTaskModal", () => {
  return function MockAddTaskModal({
    isVisible,
    onClose,
    categories,
    prevSelectedDate,
    openCategoryModal,
    tasks,
    setTasks
  }) {
    return (
      <div>
        <span>MockAddTaskModal</span>
        <pre data-testid="add-task-modal-props">
          {JSON.stringify({
            isVisible,
            onClose: typeof onClose === "function" ? "function" : onClose,
            categories,
            prevSelectedDate,
            openCategoryModal: typeof openCategoryModal === "function" ? "function" : openCategoryModal,
            tasks,
            setTasks: typeof setTasks === "function" ? "function" : setTasks
          })}
        </pre>
      </div>
    );
  };
});

jest.mock("../../components/ModifyTaskModal", () => {
  return function MockModifyTaskModal({
    isVisible,
    onClose,
    categories,
    openCategoryModal,
    tasks,
    setTasks,
    selectedTask
  }) {
    return (
      <div>
        <span>MockModifyTaskModal</span>
        <pre data-testid="modify-task-modal-props">
          {JSON.stringify({
            isVisible,
            onClose: typeof onClose === "function" ? "function" : onClose,
            categories,
            openCategoryModal: typeof openCategoryModal === "function" ? "function" : openCategoryModal,
            tasks,
            setTasks: typeof setTasks === "function" ? "function" : setTasks,
            selectedTask
          })}
        </pre>
      </div>
    );
  };
});

jest.mock("../../components/CategoryViewModal", () => {
  return function MockCategoryViewModal(props) {
    return (
      <div>
        <span>MockCategoryViewModal</span>
        <pre data-testid="category-view-modal-props">{JSON.stringify(props)}</pre>
      </div>
    );
  };
});

jest.mock("../../components/CategoryEditModal", () => {
  return function MockCategoryEditModal(props) {
    return (
      <div>
        <span>MockCategoryEditModal</span>
        <pre data-testid="category-edit-modal-props">{JSON.stringify(props)}</pre>
      </div>
    );
  };
});

describe("DashboardPage", () => {
  const defaultCategory = {
    id: 0,
    name: "미지정",
    color: "#59E7C1",
  };

  // Mock 데이터 추가
  const mockCategories = [
    defaultCategory,
    {
      id: 1,
      name: "업무",
      color: "#FF6B6B",
    },
    {
      id: 2,
      name: "공부",
      color: "#4DABF7",
    },
    {
      id: 3,
      name: "운동",
      color: "#FFD43B",
    },
  ];

  const mockTasks = [
    {
      id: 1,
      title: "리액트 공부하기",
      description: "리액트 테스트 코드 작성",
      date: "2024-03-15",
      categoryId: 2,
      completed: false,
    },
    {
      id: 2,
      title: "헬스장 가기",
      description: "상체 운동하기",
      date: "2024-03-15",
      categoryId: 3,
      completed: true,
    },
    {
      id: 3,
      title: "회의 준비",
      description: "프로젝트 진행상황 정리",
      date: "2024-03-15",
      categoryId: 1,
      completed: false,
    },
  ];

  // 2. localStorage 모킹
  beforeEach(() => {
    // localStorage를 spyOn하여 mock 구현
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "categories") {
        return JSON.stringify(mockCategories);
      }
      if (key === "tasks") {
        return JSON.stringify(mockTasks);
      }
      return null;
    });

    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("대시보드 페이지 렌더링 시 MockCalendar, MockTasks가 표시된다", () => {
    render(<DashboardPage />);

    // 화면에 MockCalendar / MockTasks라는 텍스트가 보이는지 확인
    expect(screen.getByText("MockCalendar")).toBeInTheDocument();
    expect(screen.getByText("MockTasks")).toBeInTheDocument();
  });

  test("Calendar 컴포넌트에 props(selectedDate, setSelectedDate, tasks)가 올바르게 전달되는지 확인", () => {
    render(<DashboardPage />);

    const calendarProps = JSON.parse(
      screen.getByTestId("calendar-props").textContent
    );

    // Calendar props 검증
    expect(calendarProps).toHaveProperty("selectedDate");
    expect(calendarProps).toHaveProperty("setSelectedDate", "function");
    expect(calendarProps).toHaveProperty("tasks");
    expect(Array.isArray(calendarProps.tasks)).toBe(true);
  });

  test("Tasks 컴포넌트에 props(selectedDate, categories, tasks, setTasks 등)가 올바르게 전달되는지 확인", () => {
    render(<DashboardPage />);

    const tasksProps = JSON.parse(
      screen.getByTestId("tasks-props").textContent
    );

    // Tasks props 검증
    expect(tasksProps).toHaveProperty("selectedDate");
    expect(tasksProps).toHaveProperty("categories");
    expect(tasksProps).toHaveProperty("tasks");
    expect(tasksProps).toHaveProperty("setTasks", "function");
    expect(tasksProps).toHaveProperty("setAddTaskModal", "function");
    expect(tasksProps).toHaveProperty("setModifyTaskModal", "function");
    expect(tasksProps).toHaveProperty("setSelectedTask", "function");

    // Mock 데이터 검증
    expect(tasksProps.categories).toEqual(mockCategories);
    expect(tasksProps.tasks).toEqual(mockTasks);
    expect(tasksProps.categories.length).toBe(4);
    expect(tasksProps.tasks.length).toBe(3);
  });

  test("AddTaskModal, ModifyTaskModal의 isVisible, categories, tasks 등 props가 정상 전달되는지 확인", () => {
    render(<DashboardPage />);

    const addTaskModalProps = JSON.parse(
      screen.getByTestId("add-task-modal-props").textContent
    );
    const modifyTaskModalProps = JSON.parse(
      screen.getByTestId("modify-task-modal-props").textContent
    );

    // AddTaskModal props 검증
    expect(addTaskModalProps).toHaveProperty("isVisible", false);
    expect(addTaskModalProps).toHaveProperty("onClose", "function");
    expect(addTaskModalProps).toHaveProperty("categories", mockCategories);
    expect(addTaskModalProps).toHaveProperty("prevSelectedDate");
    expect(addTaskModalProps).toHaveProperty("openCategoryModal", "function");
    expect(addTaskModalProps).toHaveProperty("tasks", mockTasks);
    expect(addTaskModalProps).toHaveProperty("setTasks", "function");

    // ModifyTaskModal props 검증
    expect(modifyTaskModalProps).toHaveProperty("isVisible", false);
    expect(modifyTaskModalProps).toHaveProperty("onClose", "function");
    expect(modifyTaskModalProps).toHaveProperty("categories", mockCategories);
    expect(modifyTaskModalProps).toHaveProperty("openCategoryModal", "function");
    expect(modifyTaskModalProps).toHaveProperty("tasks", mockTasks);
    expect(modifyTaskModalProps).toHaveProperty("setTasks", "function");
    expect(modifyTaskModalProps).toHaveProperty("selectedTask", null);
  });

  test("Calendar 컴포넌트에 전달된 tasks가 mock 데이터와 일치하는지 확인", () => {
    render(<DashboardPage />);

    const calendarProps = JSON.parse(
      screen.getByTestId("calendar-props").textContent
    );

    expect(calendarProps.tasks).toEqual(mockTasks);
    expect(calendarProps.tasks.length).toBe(3);
  });

  test("CategoryViewModal과 CategoryEditModal이 초기에는 렌더링되지 않아야 함", () => {
    render(<DashboardPage />);
    
    expect(screen.queryByText("MockCategoryViewModal")).not.toBeInTheDocument();
    expect(screen.queryByText("MockCategoryEditModal")).not.toBeInTheDocument();
  });
});
