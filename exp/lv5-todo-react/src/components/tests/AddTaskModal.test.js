import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTaskModal from '../AddTaskModal';

describe('AddTaskModal Component', () => {
  const mockCategories = [
    { id: 1, name: '카테고리1', color: '#FF0000' },
    { id: 2, name: '카테고리2', color: '#00FF00' }
  ];

  const mockTasks = [];
  const mockSetTasks = jest.fn();
  const mockOnClose = jest.fn();
  const mockOpenCategoryModal = jest.fn();

  const defaultProps = {
    isVisible: true,
    onClose: mockOnClose,
    categories: mockCategories,
    prevSelectedDate: new Date(),
    openCategoryModal: mockOpenCategoryModal,
    tasks: mockTasks,
    setTasks: mockSetTasks
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 state가 올바르게 설정되어야 함', () => {
    render(<AddTaskModal {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('할 일');
    const contentInput = screen.getByPlaceholderText('할 일 세부 사항');

    expect(titleInput.value).toBe('');
    expect(contentInput.value).toBe('');
  });

  test('제목 입력 시 state가 업데이트되어야 함', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('할 일');
    await user.type(titleInput, '새로운 할 일');

    expect(titleInput.value).toBe('새로운 할 일');
  });

  test('내용 입력 시 state가 업데이트되어야 함', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal {...defaultProps} />);

    const contentInput = screen.getByPlaceholderText('할 일 세부 사항');
    await user.type(contentInput, '할 일 상세 내용');

    expect(contentInput.value).toBe('할 일 상세 내용');
  });

  test('카테고리 선택 시 state가 업데이트되어야 함', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal {...defaultProps} />);

    const categoryButton = screen.getByText('카테고리2');
    await user.click(categoryButton);

    expect(categoryButton.classList.contains('selected')).toBe(true);
  });

  test('빈 제목으로 제출 시 경고창이 표시되어야 함', async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(<AddTaskModal {...defaultProps} />);

    const submitButton = screen.getByText('추가');
    await user.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('할 일을 입력해주세요.');
    expect(mockSetTasks).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test('올바른 데이터로 제출 시 tasks가 업데이트되어야 함', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('할 일');
    await user.type(titleInput, '새로운 할 일');

    const submitButton = screen.getByText('추가');
    await user.click(submitButton);

    expect(mockSetTasks).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('취소 버튼(X)을 클릭하면 모달이 닫히는지 확인', () => {
    render(<AddTaskModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
