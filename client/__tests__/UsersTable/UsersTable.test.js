import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UsersTable from '../../src/pagesView/Home/components/UsersTable';
import { ASC, NAME, DESC } from '../../src/constants/constants';
import {
  mocksWithData,
  mocksWithDataDesc,
  mocksWithFilterAge,
} from './mock/mock';

describe('UsersTable', () => {
  it('should render users data correctly and sorted by name asc as a default', async () => {
    const { container } = render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <UsersTable
          data={mocksWithData[0].result.data.users}
          handleSort={() => {}}
          sortOrder={ASC}
          sortField={NAME}
          valueInput={null}
          handleInputChange={() => {}}
          loading={false}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      const tableRows = container.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(3);

      const rowData = Array.from(tableRows).map((row) =>
        Array.from(row.querySelectorAll('td')).map((cell) =>
          cell.textContent.trim()
        )
      );

      expect(rowData[0]).toEqual(['1', 'Alice', '30']);
      expect(rowData[1]).toEqual(['2', 'Jhon', '25']);
      expect(rowData[2]).toEqual(['3', 'Mikki', '54']);
    });
  });

  it('should render and interact with sorting by name in descending order', async () => {
    const { container } = render(
      <MockedProvider mocks={mocksWithDataDesc} addTypename={false}>
        <UsersTable
          handleSort={() => {}}
          data={mocksWithDataDesc[0].result.data.users}
          sortField={NAME}
          sortOrder={DESC}
        />
      </MockedProvider>
    );

    const nameHeaderCell = container.querySelector(
      'th[aria-label="firstName"]'
    );

    expect(nameHeaderCell).toBeInTheDocument();

    fireEvent.click(nameHeaderCell);

    await waitFor(() => {
      const tableRows = container.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(3);

      const rowData = Array.from(tableRows).map((row) =>
        Array.from(row.querySelectorAll('td')).map((cell) =>
          cell.textContent.trim()
        )
      );

      const expectedData = [
        ['3', 'Mikki', '54'],
        ['2', 'Jhon', '25'],
        ['1', 'Alice', '30'],
      ];

      expect(rowData).toEqual(expectedData);
    });
  });

  it('should filter the table by age when entering data into the age input', async () => {
    const { container } = render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <UsersTable
          handleSort={() => {}}
          data={mocksWithFilterAge[0].result.data.users}
          sortField={NAME}
          sortOrder={ASC}
        />
      </MockedProvider>
    );

    const ageFilterInput = container.querySelector('input[id="age"]');

    expect(ageFilterInput).toBeInTheDocument();

    fireEvent.change(ageFilterInput, { target: { value: '30' } });

    await waitFor(() => {
      const tableRows = container.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1);

      const rowData = Array.from(tableRows).map((row) =>
        Array.from(row.querySelectorAll('td')).map((cell) =>
          cell.textContent.trim()
        )
      );
      expect(rowData[0]).toEqual(['1', 'Alice', '30']);
    });
  });
});
