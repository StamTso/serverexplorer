import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import apiService from '../utils/apiService';
import { ROUTES } from '../utils/constants/ROUTES';
import { authToken } from '../utils/constants/API_CONSTANTS';
import { ORDER, SERVERLIST_KEYS } from '../utils/constants/SERVERLIST_CONSTANTS';
import '../styles/ServerList.css';

type Server = {
    name: string,
    distance: number
}

type ServerList = Array<Server>;

export const ServerList = () => {
    const [serverList, setServerList] = useState<ServerList>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);
    const history = useHistory();

    if (!sessionStorage[authToken]) {
        history.replace(ROUTES.LOGIN);
    }

    useEffect(() => {
        apiService.getServers().then((response: ServerList) => {
            setServerList(response);
        });
    }, []);

    useEffect(() => setServerList(serverList => {
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

    return (
        <div
            className='table-container'
        >
            <table>
                <thead>
                    <tr>
                        <th
                            onClick={() => onSortColumn(SERVERLIST_KEYS.NAME)}
                        >Servers
                        </th>
                        <th
                            onClick={() => onSortColumn(SERVERLIST_KEYS.DISTANCE)}
                        >
                            Distance
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serverList.map((server: Server) => {
                            return (
                                <tr>
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