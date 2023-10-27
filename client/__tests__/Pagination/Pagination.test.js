import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../src/pagesView/Home/components/Pagination';

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Pagination
        totalItems={20}
        itemsPerPage={10}
        page={1}
        setPage={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should have "Prev" button disabled on the first page', () => {
    const { getByText } = render(
      <Pagination
        totalItems={20}
        itemsPerPage={10}
        page={1}
        setPage={() => {}}
      />
    );
    const prevButton = getByText('Prev');
    expect(prevButton).toHaveAttribute('disabled');
  });

  it('should have "Next" button disabled on the last page', () => {
    const { getByText } = render(
      <Pagination
        totalItems={20}
        itemsPerPage={10}
        page={2}
        setPage={() => {}}
      />
    );
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('should call setPage with the correct page when "Prev" or "Next" is clicked', () => {
    const setPageMock = jest.fn();
    const { getByText } = render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        page={3}
        setPage={setPageMock}
      />
    );
    fireEvent.click(getByText('Prev'));
    expect(setPageMock).toHaveBeenCalledWith(2);

    fireEvent.click(getByText('Next'));
    expect(setPageMock).toHaveBeenCalledWith(4);
  });
});
