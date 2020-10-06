import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import apiService from '../utils/apiService';
import {ROUTES} from '../utils/constants/ROUTES';
import {authToken} from '../utils/constants/API_CONSTANTS';

export const  ServerList = () => {
    const [serverList, setServerList] = useState([]);
    const history = useHistory();

    if(!sessionStorage[authToken]){
        history.replace(ROUTES.LOGIN);
    }

    useEffect(() => {
        apiService.getServers().then(response => {
            setServerList(response);
        });
    }, []);

    return(
        <div>
            <table>
                <tr>
                    <th>Servers</th>
                    <th>Distance</th>
                </tr>
                {
                    serverList.map((server: any) => {
                        return (
                        <tr>
                            <td>{server.name}</td>
                            <td>{server.distance}</td>
                        </tr>
                        )
                    })
                }
            </table>
        </div>
    
    )
}