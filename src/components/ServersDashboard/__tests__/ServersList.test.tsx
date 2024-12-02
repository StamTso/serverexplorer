import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ServersList from '../ServersList';
import * as getCountryISO from '../../../utils/getCountryISO';
import mockCountryIsoLookup from '../../../tests/data/mockCountryIsoLookup';
import mockServers from '../../../tests/data/mockServers';

describe('ServersList Component', () => {
  const mockGetCountryISO = vi.spyOn(getCountryISO, 'default');
  mockGetCountryISO.mockImplementation((serverName: string) => {
    const countryName = serverName.split(' #')[0].trim();
    return mockCountryIsoLookup[countryName] || '';
  });

  it('renders the server list', () => {
    render(<ServersList servers={mockServers} />);

    expect(screen.getByText('USA #15')).toBeInTheDocument();
    expect(screen.getByText('Canada #2')).toBeInTheDocument();
    expect(screen.getByText('100 km')).toBeInTheDocument();
  });

  it('sorts servers by country name', () => {
    render(<ServersList servers={mockServers} />);
    const countryColumn = screen.getByTestId('country-column');
    fireEvent.click(countryColumn);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Canada #2');
    expect(rows[2]).toHaveTextContent('Germany #7');
    expect(rows[3]).toHaveTextContent('USA #15');
    expect(rows[4]).toHaveTextContent('USA #3');
    
  });

  it('sorts servers by distance', () => {
    render(<ServersList servers={mockServers} />);
    const distanceColumn = screen.getByText('Distance');
    fireEvent.click(distanceColumn);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('USA #15');
    expect(rows[2]).toHaveTextContent('USA #3');
    expect(rows[3]).toHaveTextContent('Canada #2');
    expect(rows[4]).toHaveTextContent('Germany #7');
  });
});