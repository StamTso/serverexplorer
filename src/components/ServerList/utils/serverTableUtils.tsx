import React from 'react';
import { ORDER, SERVERLIST_KEYS } from '../../../utils/constants/SERVERLIST_CONSTANTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

type Server = {
    name: string,
    distance: number
}

type ServerList = Array<Server>;

type SortConfig = {
    key: string,
    direction: string
};

//Handles the sorting for the columns
export const getSortedTable = (serverList: ServerList, sortConfig: SortConfig | null) => {
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
}

//Assigns the correct sort order icon
export const getOrderIcon = (column: string, sortConfig: SortConfig | null) => {
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