import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {mockServerList} from './utils/mockServerList';
import {ServerList} from "./ServerList";
import { ORDER, SERVERLIST_KEYS } from '../../utils/constants/SERVERLIST_CONSTANTS';
import { PROTOCOL, BASEURL } from '../../utils/constants/API_CONSTANTS';
import { store, StateProvider } from '../../store';

describe('Server List', () => {
    it('should render a table listing all servers', () => {
        render( 
            <StateProvider>
                <ServerList />
            </StateProvider>, 
            {wrapper: MemoryRouter});
        const serverTitle = screen.getByText('Servers');
        const distanceTitle = screen.getByText('Distance');
        expect(serverTitle).toBeInTheDocument();
        expect(distanceTitle).toBeInTheDocument();
    });

    it('should render rows for each one of the received servers', async () => {
        render( 
            <store.Provider
                value={{state: {serverList: mockServerList, sortConfig: null}, dispatch: jest.fn()}}
            >
                <ServerList />
            </store.Provider>, 
            {wrapper: MemoryRouter});
        const rows = await screen.findAllByTestId('server-row');
        expect(rows.length).toEqual(mockServerList.length);
    });

    it('should render empty table message when no servers were retrieved', async () => {
        render( 
            <store.Provider
                value={{state: {serverList:[], sortConfig: null}, dispatch: jest.fn()}}
            >
                <ServerList />
            </store.Provider>, 
            {wrapper: MemoryRouter});
        const errorMessage = await screen.findByTestId('empty-server-list');
        expect(errorMessage).toBeInTheDocument;
    });


    it('should sort column when header is clicked', async() => {
        jest.spyOn(window, 'fetch');
        // @ts-ignore
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => (mockServerList),
        });
        render( 
        <StateProvider>
            <ServerList />
        </StateProvider>, 
        {wrapper: MemoryRouter});

        expect(window.fetch).toHaveBeenCalledWith(
            `${PROTOCOL}://${BASEURL}/servers`,
            expect.objectContaining({ 
                method: 'GET'
            }));

        userEvent.click(screen.getByText('Servers'));
        let icon = await screen.findByTestId(`order-icon-${SERVERLIST_KEYS.NAME}-${ORDER.ASCENDING}`);
        expect(icon).toBeInTheDocument();

        userEvent.click(screen.getByText('Servers'));
        icon = await screen.findByTestId(`order-icon-${SERVERLIST_KEYS.NAME}-${ORDER.DESCENDING}`);
        expect(icon).toBeInTheDocument()

        userEvent.click(screen.getByText('Distance'));
        icon = await screen.findByTestId(`order-icon-${SERVERLIST_KEYS.DISTANCE}-${ORDER.ASCENDING}`);
        expect(icon).toBeInTheDocument();

        await userEvent.click(screen.getByText('Distance'));
        icon = await screen.findByTestId(`order-icon-${SERVERLIST_KEYS.DISTANCE}-${ORDER.DESCENDING}`);
        expect(icon).toBeInTheDocument();
    })
})