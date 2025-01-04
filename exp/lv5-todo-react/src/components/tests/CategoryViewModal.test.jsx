import { render, screen, fireEvent } from '@testing-library/react';
import CategoryViewModal from '../CategoryViewModal';

describe('CategoryViewModal', () => {
  const mockCategories = [
    { id: 0, name: '미지정', color: '#808080' },
    { id: 1, name: '업무', color: '#FF0000' },
    { id: 2, name: '개인', color: '#00FF00' }
  ];
  
  const mockSetEditingCategory = jest.fn();
  const mockOpenCategoryModal = jest.fn();
  const mockCloseCategoryModals = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('카테고리 목록이 정상적으로 렌더링되는지 확인', () => {
    render(
      <CategoryViewModal
        categories={mockCategories}
        setEditingCategory={mockSetEditingCategory}
        openCategoryModal={mockOpenCategoryModal}
        closeCategoryModals={mockCloseCategoryModals}
      />
    );

    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('카테고리 클릭 시 편집 모달이 열리는지 확인', () => {
    render(
      <CategoryViewModal
        categories={mockCategories}
        setEditingCategory={mockSetEditingCategory}
        openCategoryModal={mockOpenCategoryModal}
        closeCategoryModals={mockCloseCategoryModals}
      />
    );

    // '업무' 카테고리 클릭
    fireEvent.click(screen.getByText('업무'));
    
    expect(mockSetEditingCategory).toHaveBeenCalledWith(mockCategories[1]);
    expect(mockOpenCategoryModal).toHaveBeenCalledWith('isEditOpen');
  });

  it('추가 버튼 클릭 시 추가 모달이 열리는지 확인', () => {
    render(
      <CategoryViewModal
        categories={mockCategories}
        setEditingCategory={mockSetEditingCategory}
        openCategoryModal={mockOpenCategoryModal}
        closeCategoryModals={mockCloseCategoryModals}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(mockOpenCategoryModal).toHaveBeenCalledWith('isAddOpen');
  });

  it('미지정 카테고리는 클릭이 불가능한지 확인', () => {
    render(
      <CategoryViewModal
        categories={mockCategories}
        setEditingCategory={mockSetEditingCategory}
        openCategoryModal={mockOpenCategoryModal}
        closeCategoryModals={mockCloseCategoryModals}
      />
    );

    fireEvent.click(screen.getByText('미지정'));
    
    expect(mockSetEditingCategory).not.toHaveBeenCalled();
    expect(mockOpenCategoryModal).not.toHaveBeenCalled();
  });

  it('취소 버튼(X)을 클릭하면 모달이 닫히는지 확인', () => {
    render(
      <CategoryViewModal
        categories={mockCategories}
        setEditingCategory={mockSetEditingCategory}
        openCategoryModal={mockOpenCategoryModal}
        closeCategoryModals={mockCloseCategoryModals}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(mockCloseCategoryModals).toHaveBeenCalled();
  });
});
