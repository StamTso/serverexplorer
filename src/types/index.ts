export type Server = {
    name: string;
    distance: number;
}

export type SortConfig = {
    key: string;
    direction: string;
};

export type ServersList = Array<Server>;