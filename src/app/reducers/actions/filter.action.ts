const SEARCH_FILTER_ACTIVE: string = `[SEARCH_FILTER] SEARCH_FILTER_ACTIVE`;
const SEARCH_FILTER_RESET: string = `[SEARCH_FILTER] SEARCH_FILTER_RESET`;

export interface IFilterState {
    type: string;
    payload?: any;
}

export class FilterInitialState implements IFilterState {
    type: string = SEARCH_FILTER_RESET;
    payload?: any = {
        filterValue: '',
        traineesDataSource: []
    };
    constructor() {
        this.type = SEARCH_FILTER_RESET;
        this.payload = [];
    }
}
export class FilterActionState implements IFilterState {
    type: string = SEARCH_FILTER_RESET;
    payload?: any = {
        filterValue: '',
        traineesDataSource: []
    };
    constructor(type?: string, payload?: any) {
        this.type = type;
        this.payload = payload;
    }
}

export const FilterActionList = {
    SEARCH_FILTER_ACTIVE,
    SEARCH_FILTER_RESET
}