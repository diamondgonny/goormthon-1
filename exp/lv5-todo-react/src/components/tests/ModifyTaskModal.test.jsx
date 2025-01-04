import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModifyTaskModal from '../ModifyTaskModal';

// Mock 데이터 설정
const mockCategories = [
  { id: 1, name: '업무', color: '#FF0000' },
  { id: 2, name: '개인', color: '#00FF00' }
];

const mockSelectedTask = {
  id: 1,
  title: '기존 할 일',
  contents: '기존 내용',
  date: '2024-03-15',
  categoryId: 1,
  checked: false
};

const mockTasks = [mockSelectedTask];

describe('ModifyTaskModal Component', () => {
  const mockSetTasks = jest.fn();
  const mockOnClose = jest.fn();
  const mockOpenCategoryModal = jest.fn();

  const defaultProps = {
    isVisible: true,
    onClose: mockOnClose,
    categories: mockCategories,
    openCategoryModal: mockOpenCategoryModal,
    tasks: mockTasks,
    setTasks: mockSetTasks,
    selectedTask: mockSelectedTask
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 상태가 selectedTask 데이터로 올바르게 설정되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    expect(screen.getByPlaceholderText('할 일')).toHaveValue('기존 할 일');
    expect(screen.getByPlaceholderText('할 일 세부 사항')).toHaveValue('기존 내용');
  });

  test('제목 입력 시 상태가 올바르게 업데이트되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('할 일');
    fireEvent.change(titleInput, { target: { value: '수정된 할 일' } });

    expect(titleInput).toHaveValue('수정된 할 일');
  });

  test('내용 입력 시 상태가 올바르게 업데이트되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const contentInput = screen.getByPlaceholderText('할 일 세부 사항');
    fireEvent.change(contentInput, { target: { value: '수정된 내용' } });

    expect(contentInput).toHaveValue('수정된 내용');
  });

  test('카테고리 변경 시 상태가 올바르게 업데이트되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const categoryButton = screen.getByText('개인');
    fireEvent.click(categoryButton);

    expect(categoryButton).toHaveClass('selected');
  });

  test('수정 버튼 클릭 시 tasks 상태가 업데이트되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('할 일');
    fireEvent.change(titleInput, { target: { value: '수정된 할 일' } });

    const modifyButton = screen.getByText('수정');
    fireEvent.click(modifyButton);

    expect(mockSetTasks).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('삭제 버튼 클릭 시 tasks 상태가 업데이트되는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    expect(mockSetTasks).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('취소 버튼(X)을 클릭하면 모달이 닫히는지 확인', () => {
    render(<ModifyTaskModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
