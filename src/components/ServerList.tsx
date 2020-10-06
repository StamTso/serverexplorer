import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import apiService from '../utils/apiService';
import { ROUTES } from '../utils/constants/ROUTES';
import { authToken } from '../utils/constants/API_CONSTANTS';

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
            if (sortConfig.key === 'name') {
                sortedServerList.sort((a, b) => {
                    if (a.name.split('#')[0] < b.name.split('#')[0]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a.name.split('#')[0] > b.name.split('#')[0]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    if (a.name.split('#')[1] < b.name.split('#')[1]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a.name.split('#')[1] > b.name.split('#')[1]) {
                        console.log(b.name.split('#')[1]);
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                   
                    return 0;
                });
            }

            if (sortConfig.key === 'distance') {
                sortedServerList.sort((a, b) => {
                    if (a.distance < b.distance) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a.distance > b.distance) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }

        }
        return sortedServerList;
    }), [sortConfig]);

    const onSortColumn = (key: string) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onSortColumn('name')}>Servers</th>
                        <th onClick={() => onSortColumn('distance')}>Distance</th>
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