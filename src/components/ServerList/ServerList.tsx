import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { store } from '../../store';
import apiService from '../../utils/apiService';
import {getSortedTable, getOrderIcon} from './utils/serverTableUtils';
import {ServersList, Server} from '../../types/index';
import { ROUTES } from '../../utils/constants/ROUTES';
import { AUTH_TOKEN } from '../../utils/constants/API_CONSTANTS';
import { ORDER, SERVERLIST_KEYS } from '../../utils/constants/SERVERLIST_CONSTANTS';
import ACTION_TYPES from '../../utils/constants/ACTION_TYPES';
import './styles/ServerList.css';

export const ServerList = () => {
    const {state, dispatch} = useContext(store);
    const {serverList, sortConfig} = state;
    const history = useHistory();

    if (!sessionStorage[AUTH_TOKEN]) {
        history.replace(ROUTES.LOGIN);
    }

    const updateServerList = () => {
        apiService.getServers().then((response: ServersList) => {
          dispatch({type: ACTION_TYPES.UPDATE_SERVERLIST, payload: response })
      });
    }

    useEffect(() => {
        updateServerList();
        // Disabling exaustive deps since updateServerList doesn't change between renders
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const sortedServerList = getSortedTable(serverList, sortConfig);
        dispatch({type: ACTION_TYPES.UPDATE_SERVERLIST, payload: sortedServerList});
        // Disabling exaustive deps since serverList comes directly from the store in its latest form
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortConfig]);

    const onSortColumn = (key: string) => {
        let direction = ORDER.ASCENDING;
        if (sortConfig?.key === key && sortConfig.direction === ORDER.ASCENDING) {
            direction = ORDER.DESCENDING;
        }
        dispatch({type: ACTION_TYPES.UPDATE_SORTCONFIG, payload: {key, direction}});
    }

    return (
        <div
            className='table-container'
        >
            <table>
                <thead>
                    <tr>
                        <th
                            onClick={() => onSortColumn(SERVERLIST_KEYS.NAME)}
                        >
                            Servers
                            <div
                                className={'order-icon'}
                                data-testid={`order-icon-${sortConfig?.key}-${sortConfig?.direction}`}
                            >
                                {getOrderIcon(SERVERLIST_KEYS.NAME, sortConfig)}
                            </div>
                        </th>
                        <th
                            onClick={() => onSortColumn(SERVERLIST_KEYS.DISTANCE)}
                        >
                            Distance
                            <div
                                className={'order-icon'}
                            >
                                {getOrderIcon(SERVERLIST_KEYS.DISTANCE, sortConfig)}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serverList?.map((server: Server, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    data-testid='server-row'
                                >
                                    <td>{server.name}</td>
                                    <td>{server.distance}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}