import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FiltersState {
  filters: {
    category: string;
    status: string;
    deliveryMethod: string;
    createdBy: string;
    type: string;
  };
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
}

const initialFilters = {
  category: '',
  status: '',
  deliveryMethod: '',
  createdBy: '',
  type: '',
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      filters: initialFilters,
      
      setFilter: (key, value) => 
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      
      clearFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: 'complaints-filters',
    }
  )
);