import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import apiService from '../utils/apiService';
import { ROUTES } from '../utils/constants/ROUTES';
import { AUTH_TOKEN } from '../utils/constants/API_CONSTANTS';
import { ORDER, SERVERLIST_KEYS } from '../utils/constants/SERVERLIST_CONSTANTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import '../styles/ServerList.css';

type Server = {
    name: string,
    distance: number
}

type SortConfig = {
    key: string,
    direction: string
}

type ServerList = Array<Server>;

export const ServerList = () => {
    const [serverList, setServerList] = useState<ServerList>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const history = useHistory();

    if (!sessionStorage[AUTH_TOKEN]) {
        history.replace(ROUTES.LOGIN);
    }

    useEffect(() => {
        apiService.getServers().then((response: ServerList) => {
            setServerList(response);
        });
    }, []);

    useEffect(() => setServerList((serverList: ServerList) => {
        let sortedServerList = [...serverList];
        if (sortConfig !== null) {
            if (sortConfig.key === SERVERLIST_KEYS.NAME) {
                sortedServerList.sort((a, b) => {
                    const [currentServerCountry, currentServerNumber] = a.name.split('#');
                    const [nextServerCountry, nextServerNumber] = b.name.split('#');

                    if (currentServerCountry < nextServerCountry) {
                        return sortConfig.direction === ORDER.ASCENDING ? -1 : 1;
                    }
                    if (currentServerCountry > nextServerCountry) {
                        return sortConfig.direction === ORDER.ASCENDING ? 1 : -1;
                    }
                    if (parseInt(currentServerNumber) < parseInt(nextServerNumber)) {
                        return sortConfig.direction === ORDER.ASCENDING ? -1 : 1;
                    }
                    if (parseInt(currentServerNumber) > parseInt(nextServerNumber)) {
                        return sortConfig.direction === ORDER.ASCENDING ? 1 : -1;
                    }

                    return 0;
                });
            }

            if (sortConfig.key === SERVERLIST_KEYS.DISTANCE) {
                sortedServerList.sort((a, b) => {
                    if (a.distance < b.distance) {
                        return sortConfig.direction === ORDER.ASCENDING ? -1 : 1;
                    }
                    if (a.distance > b.distance) {
                        return sortConfig.direction === ORDER.ASCENDING ? 1 : -1;
                    }
                    return 0;
                });
            }

        }
        return sortedServerList;
    }), [sortConfig]);

    const onSortColumn = (key: string) => {
        let direction = ORDER.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === ORDER.ASCENDING) {
            direction = ORDER.DESCENDING;
        }
        setSortConfig({ key, direction });
    }

    const getOrderIcon = (column: string) => {
        if (!sortConfig) {
            return;
        }

        if (sortConfig.key === column && sortConfig.direction === ORDER.ASCENDING) {
            return <FontAwesomeIcon icon={faAngleUp} />
        }
        if (sortConfig.key === column && sortConfig.direction === ORDER.DESCENDING) {
            return <FontAwesomeIcon icon={faAngleDown} />
        }
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
                                {getOrderIcon(SERVERLIST_KEYS.NAME)}
                            </div>
                        </th>
                        <th
                            onClick={() => onSortColumn(SERVERLIST_KEYS.DISTANCE)}
                        >
                            Distance
                            <div
                                className={'order-icon'}
                            >
                                {getOrderIcon(SERVERLIST_KEYS.DISTANCE)}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serverList.map((server: Server, index:number) => {
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