import { create } from 'zustand';

export interface Filter {
    hospitals: string | undefined;
    year: string | undefined;
    month: string | undefined;
    services: string | undefined;
}

type FilterStore = {
    filter: Filter;
    setFilter: (newFilter: Filter) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
    filter: {
        hospitals: undefined,
        year: undefined,
        month: undefined,
        services: undefined,
    },
    setFilter: (newFilter: Filter) => set((state) => ({ ...state, filter: newFilter })),
}));