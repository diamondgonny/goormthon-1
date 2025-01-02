import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tasks from '../Tasks';
import DateUtils from '../../utils/DateUtils';

describe('Tasks Component', () => {
  const mockDate = new Date('2025-01-15');
  const mockCategories = [
    { id: 1, color: '#FF0000', name: '카테고리1' },
    { id: 2, color: '#00FF00', name: '카테고리2' },
  ];
  const mockTasks = [
    { id: 1, title: '테스트 태스크 1', categoryId: 1, checked: false, date: mockDate },
    { id: 2, title: '테스트 태스크 2', categoryId: 2, checked: true, date: mockDate },
  ];
  const mockSetTasks = jest.fn();
  const mockSetAddTaskModal = jest.fn();
  const mockSetModifyTaskModal = jest.fn();
  const mockSetSelectedTask = jest.fn();

  const renderTasks = () => {
    return render(
      <Tasks
        selectedDate={mockDate}
        categories={mockCategories}
        tasks={mockTasks}
        setTasks={mockSetTasks}
        setAddTaskModal={mockSetAddTaskModal}
        setModifyTaskModal={mockSetModifyTaskModal}
        setSelectedTask={mockSetSelectedTask}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('날짜와 태스크 통계가 올바르게 표시되는지 확인', () => {
    renderTasks();
    const dateUtils = new DateUtils();
    
    expect(screen.getByText(dateUtils.formatDate(mockDate, "day"))).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  test('태스크 목록이 올바르게 렌더링되는지 확인', () => {
    renderTasks();
    
    expect(screen.getByText('테스트 태스크 1')).toBeInTheDocument();
    expect(screen.getByText('테스트 태스크 2')).toBeInTheDocument();
  });

  test('체크박스 클릭 시 태스크 상태가 변경되는지 확인', () => {
    renderTasks();
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    expect(mockSetTasks).toHaveBeenCalled();
  });

  test('태스크 클릭 시 수정 모달이 열리는지 확인', () => {
    renderTasks();
    
    const taskButton = screen.getByText('테스트 태스크 1');
    fireEvent.click(taskButton);
    
    expect(mockSetSelectedTask).toHaveBeenCalledWith(mockTasks[0]);
    expect(mockSetModifyTaskModal).toHaveBeenCalledWith(true);
  });

  test('추가 버튼 클릭 시 추가 모달이 열리는지 확인', () => {
    renderTasks();
    
    const addButton = screen.getByText('추가');
    fireEvent.click(addButton);
    
    expect(mockSetAddTaskModal).toHaveBeenCalledWith(true);
  });

  test('완료된 태스크의 스타일이 올바르게 적용되는지 확인', () => {
    renderTasks();
    
    const completedTask = screen.getByText('테스트 태스크 2');
    expect(completedTask).toHaveClass('completed');
  });
}); 
