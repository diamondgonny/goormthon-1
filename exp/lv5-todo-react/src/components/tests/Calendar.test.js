import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';
import DateUtils from '../../utils/DateUtils';
import '@testing-library/jest-dom';

describe('Calendar Component', () => {
  const dateUtils = new DateUtils();
  const today = new Date();
  const mockSetSelectedDate = jest.fn();
  const mockTasks = [
    { id: 1, date: today.toISOString(), checked: true },
    { id: 2, date: today.toISOString(), checked: false }
  ];

  const defaultProps = {
    selectedDate: today,
    setSelectedDate: mockSetSelectedDate,
    tasks: mockTasks
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 activeStartDate가 정확하게 설정되어야 함', () => {
    render(<Calendar {...defaultProps} />);
    const monthHeader = screen.getByRole('heading', { level: 1 });
    expect(monthHeader).toHaveTextContent(dateUtils.formatDate(today, 'month'));
  });

  test('이전 달 버튼 클릭 시 activeStartDate가 업데이트되어야 함', () => {
    render(<Calendar {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: 'Previous Month' });
    
    fireEvent.click(prevButton);
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const monthHeader = screen.getByRole('heading', { level: 1 });
    expect(monthHeader).toHaveTextContent(dateUtils.formatDate(prevMonth, 'month'));
  });

  test('다음 달 버튼 클릭 시 activeStartDate가 업데이트되어야 함', () => {
    render(<Calendar {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: 'Next Month' });
    
    fireEvent.click(nextButton);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const monthHeader = screen.getByRole('heading', { level: 1 });
    expect(monthHeader).toHaveTextContent(dateUtils.formatDate(nextMonth, 'month'));
  });

  test('월간 태스크 통계가 날짜 선택에 따라 올바르게 표시되어야 함 (같은 달)', () => {
    render(<Calendar {...defaultProps} />);

    // 어제 날짜 계산
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 어제 날짜 클릭 시뮬레이션
    fireEvent.click(screen.getByText(yesterday.getDate().toString().padStart(2, '0')));
    let stats = screen.getByRole('status', { name: 'Monthly Task Statistics' });
    expect(stats).toHaveTextContent('1/2'); // 같은 달이므로 전체 태스크는 여전히 표시됨

    // 오늘 날짜 클릭 시뮬레이션
    fireEvent.click(screen.getByText(today.getDate().toString().padStart(2, '0')));
    stats = screen.getByRole('status', { name: 'Monthly Task Statistics' });
    expect(stats).toHaveTextContent('1/2');
  });

  test('월간 태스크 통계가 날짜 선택과 월 이동에 따라 올바르게 표시되어야 함 (다른 달)', () => {
    // 오늘을 1일로 설정
    const today = new Date();
    today.setDate(1);

    const mockTasks = [
      { id: 1, date: today.toISOString(), checked: true },
      { id: 2, date: today.toISOString(), checked: false }
    ];

    const customProps = {
      selectedDate: today,
      setSelectedDate: mockSetSelectedDate,
      tasks: mockTasks
    };

    render(<Calendar {...customProps} />);

    // 현재 달의 태스크 통계 확인
    let stats = screen.getByRole('status', { name: 'Monthly Task Statistics' });
    expect(stats).toHaveTextContent('1/2');

    // 이전 달로 이동
    const prevButton = screen.getByRole('button', { name: 'Previous Month' });
    fireEvent.click(prevButton);

    // 이전 달의 태스크 통계 확인
    stats = screen.getByRole('status', { name: 'Monthly Task Statistics' });
    expect(stats).toHaveTextContent('0/0'); // 이전 달에는 태스크가 없음

    // 이전 달의 마지막 날 클릭
    const lastDayOfPrevMonth = new Date(today);
    lastDayOfPrevMonth.setDate(0);
    fireEvent.click(screen.getByText(lastDayOfPrevMonth.getDate().toString().padStart(2, '0')));

    // 다시 현재 달로 이동
    const nextButton = screen.getByRole('button', { name: 'Next Month' });
    fireEvent.click(nextButton);

    // 1일(오늘) 클릭
    fireEvent.click(screen.getByText('01'));
    stats = screen.getByRole('status', { name: 'Monthly Task Statistics' });
    expect(stats).toHaveTextContent('1/2');
  });

});
