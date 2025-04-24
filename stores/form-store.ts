import { create } from "zustand";

type Field = {
  name: string;
  value: string;
};

type SubStore = {
  fields: Field[];
  errors: { path: string; message: string }[];
  setField: (name: string, value: string) => void;
  setErrors: (errors: { path: string; message: string }[]) => void;
};

/**
 persist(
        (set, get) => ({
          fields: [...initial],
          errors: [],

          setField: (name: any, value: any) => {
            set(
              (state: any) => {
                const idx = state.fields.findIndex((f: any) => f.name === name);
                if (idx >= 0) {
                  const updated = [...state.fields];
                  updated[idx] = { name, value };
                  return { fields: updated };
                }
                return { fields: [...state.fields, { name, value }] };
              },
              false,
              `setField(${name})`
            );
          },

          setErrors: (errors: any) => set({ errors }, false, "setErrors"),
        }),
        {
          name: `${name}`,
          storage: createJSONStorage(() => sessionStorage),
          partialize: (state: any) => ({
            fields: state.fields,
            errors: state.errors,
          }),
          merge: (persistedState: any, currentState: any) => ({
            ...currentState,
            ...persistedState,
          }),
        }
      ),
 */

export const createSubStore = (initial: Field[]) =>
  create<SubStore>((set, get) => ({
    fields: [...initial],
    errors: [],

    setField: (name, value) => {
      set((state) => {
        const idx = state.fields.findIndex((f) => f.name === name);
        if (idx >= 0) {
          const updated = [...state.fields];
          updated[idx] = { name, value };
          return { fields: updated };
        } else {
          return { fields: [...state.fields, { name, value }] };
        }
      });
    },

    setErrors: (errors) => set({ errors }),
  }));

type SubStoreMap = {
  [id: string]: ReturnType<typeof createSubStore>;
};

type MainStore = {
  stores: SubStoreMap;
  createStore: (
    id: string,
    initial: Field[]
  ) => void;
  getStore: (id: string) => ReturnType<typeof createSubStore> | undefined;
  removeStore: (id: string) => void;
};

export const useMainStore = create<MainStore>((set, get) => ({
  stores: {},

  createStore: (id, initial: Field[] = []) => {
    const newStore = createSubStore(initial);
    set((state) => ({
      stores: {
        ...state.stores,
        [id]: newStore,
      },
    }));
  },

  getStore: (id) => get().stores[id],

  removeStore: (id) => {
    set((state) => {
      const { [id]: _, ...rest } = state.stores;
      return { stores: rest };
    });
  },
}));
