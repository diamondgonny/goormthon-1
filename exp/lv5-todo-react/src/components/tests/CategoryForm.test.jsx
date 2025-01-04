import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryForm from '../CategoryForm';
import colors from '../../json/category/colors.json';

describe('CategoryForm component', () => {
  const mockCategories = [
    { id: 0, name: '미지정', color: '#808080' }
  ];
  const mockSetCategories = jest.fn();
  const mockOpenCategoryModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('카테고리 추가 모달이 열렸을 때 초기 상태가 비어있어야 함', () => {
    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    const categoryNameInput = screen.getByPlaceholderText('카테고리 이름을 입력하세요');
    expect(categoryNameInput.value).toBe('');
  });

  test('카테고리 이름 입력이 정상적으로 동작해야 함', () => {
    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    const categoryNameInput = screen.getByPlaceholderText('카테고리 이름을 입력하세요');
    fireEvent.change(categoryNameInput, { target: { value: '새 카테고리' } });
    expect(categoryNameInput.value).toBe('새 카테고리');
  });

  test('카테고리 색상 선택이 정상적으로 동작해야 함', () => {
    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    // 색상 선택 영역이 존재하는지 확인
    const colorSection = screen.getByRole('group', { name: 'Select Category Color' });
    expect(colorSection).toBeInTheDocument();

    // colors.json에 정의된 모든 색상이 렌더링되었는지 확인
    const colorButtons = screen.getAllByRole('button', { name: /Color #/ });
    expect(colorButtons).toHaveLength(colors.colors.length);

    // 첫 번째 색상을 클릭하고 선택 여부 확인
    fireEvent.click(colorButtons[0]);
    const checkIcon = screen.getByRole('img', { name: 'Selected' });
    expect(checkIcon).toBeInTheDocument();
  });

  test('카테고리 추가 (버튼 클릭) 시 이름과 색상이 없으면 경고창이 표시되어야 함', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    const submitButton = screen.getByRole('button', { name: '추가' });
    fireEvent.click(submitButton);

    expect(mockAlert).toHaveBeenCalledWith('카테고리 이름을 입력해주세요.');
    mockAlert.mockRestore();
  });

  test('카테고리 추가 (버튼 클릭) 시 이름만 입력하고 색상 미선택시 경고창이 표시되어야 함', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    // 카테고리 이름만 입력
    const categoryNameInput = screen.getByPlaceholderText('카테고리 이름을 입력하세요');
    fireEvent.change(categoryNameInput, { target: { value: '새 카테고리' } });

    // 추가 버튼 클릭
    const submitButton = screen.getByRole('button', { name: '추가' });
    fireEvent.click(submitButton);

    expect(mockAlert).toHaveBeenCalledWith('카테고리 색상을 선택해주세요.');
    mockAlert.mockRestore();
  });

  test('카테고리 추가 (버튼 클릭) 시 이름과 색상을 모두 입력했을 때 정상적으로 추가되어야 함', () => {
    render(
      <CategoryForm
        isAddOpen={true}
        isEditOpen={false}
        categories={mockCategories}
        setCategories={mockSetCategories}
        openCategoryModal={mockOpenCategoryModal}
      />
    );

    // 카테고리 이름 입력
    const categoryNameInput = screen.getByPlaceholderText('카테고리 이름을 입력하세요');
    fireEvent.change(categoryNameInput, { target: { value: '새 카테고리' } });

    // 색상 선택
    const colorButtons = screen.getAllByRole('button', { name: /Color #/ });
    fireEvent.click(colorButtons[0]);

    // 추가 버튼 클릭
    const submitButton = screen.getByRole('button', { name: '추가' });
    fireEvent.click(submitButton);

    // 카테고리가 추가되고 조회 모달로 이동하는지 확인
    expect(mockSetCategories).toHaveBeenCalled();
    expect(mockOpenCategoryModal).toHaveBeenCalledWith('isViewOpen');
  });
}); 
