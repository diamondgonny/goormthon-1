import Calendar from "../components/Calendar";
import Tasks from "../components/Tasks";
import { useState } from "react";
import CategoryViewModal from "../components/CategoryViewModal";
import CategoryEditModal from "../components/CategoryEditModal";
import AddTaskModal from "../components/AddTaskModal";
import ModifyTaskModal from "../components/ModifyTaskModal";

const TEXT_CATEGORY_UNSPECIFIED = "미지정";
const COLOR_CATEGORY_UNSPECIFIED = "#59E7C1"

function DashboardPage() {
  // **localStorage 초기화 로직을 컴포넌트 내부로 이동함**
  //(컴포넌트 외부에서 실행되는 초기화 로직이 테스트 시점의 localStorage mock 데이터를 반영하지 못해 발생한 이슈)

  // 테스트 에러 결과를 보면, DashboardPage 컴포넌트에서 initialCategories가 우리가 테스트에서 의도한 mockCategories가 아니라, [defaultCategory]만 들어있는 상태로 잡히고 있었다.
  // 이는 테스트 실행 시점과 모듈이 import될 때 실행되는 로직이 서로 엇갈리기 때문이었다.

  // Jest 테스트에서는, 이런 식으로 진행된다:
  // 1. import DashboardPage from "./DashboardPage";
  // 2. 그 다음 jest.spyOn(Storage.prototype, "getItem") 등등으로 localStorage를 mock 세팅
  // 문제는 1번 시점에 DashboardPage.js 최상단 로직이 이미 실행돼서 localStorage에 [defaultCategory]만 들어간 상태가 된다는 것
  // 테스트코드에서 2번으로 mock을 설정해줘도, 이미 DashboardPage.js는 최상단 localStorage 로직이 이미 실행되어 mock 데이터가 무시됨

  const getInitialCategories = () => {
    const defaultCategory = {
      id: 0,
      name: TEXT_CATEGORY_UNSPECIFIED,
      color: COLOR_CATEGORY_UNSPECIFIED
    };

    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify([defaultCategory]));
    }
    return JSON.parse(localStorage.getItem("categories"));
  };

  const getInitialTasks = () => {
    return localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  };

  // useState 초기값을 함수로 설정
  const [tasks, setTasks] = useState(getInitialTasks);
  const [categories, setCategories] = useState(getInitialCategories);

  // Task 관련 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setAddTaskModal] = useState(false); // Task 추가 모달
  const [isModifyTaskModalOpen, setModifyTaskModal] = useState(false); // Task 추정 모달
  const [selectedTask, setSelectedTask] = useState(null);
  
  // category 관련 상태
  const [editingCategory, setEditingCategory] = useState(null); // 편집할 카테고리
  const [categoryModals, setCategoryModals] = useState({
    isViewOpen: false, // 카테고리 조회 모달
    isAddOpen: false, // 카테고리 추가 모달
    isEditOpen: false,
  });

  //할 일 추가 모달 상태 변경
  const handleAddTaskModal = () => {
    setAddTaskModal(false);
  };

  const handleModifyTaskModal = () => {
    setModifyTaskModal(false);
    setSelectedTask(null); // 선택된 Task 초기화
  };

  // 특정 카테고리 모달 열기
  const openCategoryModal = (modalType) => {
    setCategoryModals(prev => ({
      isViewOpen: false,
      isAddOpen: false,
      isEditOpen: false,
      [modalType]: true
    }))
  }

  // 모든 카테고리 모달 닫기
  const closeCategoryModals = () => {
    setCategoryModals({
      isViewOpen: false,
      isAddOpen: false,
      isEditOpen: false
    })
  }

  return (
    <div className="dashboard">
      <aside>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          tasks={tasks}
        />
      </aside>
      <main>
        <Tasks 
          selectedDate={selectedDate} 
          categories={categories}
          tasks={tasks}
          setTasks={setTasks}
          setAddTaskModal={setAddTaskModal}
          setModifyTaskModal={setModifyTaskModal}
          setSelectedTask={setSelectedTask} // 선택된 Task 업데이트
          />
      </main>
      {/* 할 일 추가 모달 */}
      <AddTaskModal 
        isVisible={isAddTaskModalOpen} 
        onClose={handleAddTaskModal} 
        categories = {categories}
        prevSelectedDate = {selectedDate}
        openCategoryModal={openCategoryModal}
        tasks={tasks}
        setTasks={setTasks}
        />

      {/* 할 일 수정 모달 */}
      <ModifyTaskModal
        isVisible={isModifyTaskModalOpen}
        onClose={handleModifyTaskModal}
        categories={categories}
        openCategoryModal={openCategoryModal}
        tasks={tasks}
        setTasks={setTasks}
        selectedTask={selectedTask} // 선택된 Task 전달
      />
      
      {/* 카테고리 조회 모달 */}
      {categoryModals.isViewOpen && (
        <CategoryViewModal
          categories={categories}
          setEditingCategory={setEditingCategory}
          openCategoryModal={openCategoryModal}
          closeCategoryModals={closeCategoryModals}
        />
      )}

      {/* 카테고리 편집 모달 (추가, 수정 기능) */}
      {(categoryModals.isAddOpen || categoryModals.isEditOpen) && (
        <CategoryEditModal
          isAddOpen={categoryModals.isAddOpen}
          isEditOpen={categoryModals.isEditOpen}
          editingCategory={editingCategory}
          categories={categories}
          setCategories={setCategories}
          openCategoryModal={openCategoryModal}
          closeCategoryModals={closeCategoryModals}
        />
      )}
    </div>
  );
}

export default DashboardPage;
