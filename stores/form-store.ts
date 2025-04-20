//import { create } from 'zustand';
//
//interface formState {
//  nombre: {
//    value: string;
//    setValue: (newValue: string) => void;
//    error: null|string;
//    setError: (newError: null|string) => void;
//  };
//  apellido: {
//    value: null|string;
//    setValue: (newValue: string) => void;
//    error: null|string;
//    setError: (newError: null|string) => void;
//  };
//  numeroTelefono: {
//    value: null|string;
//    setValue: (newValue: string) => void;
//    error: null|string;
//    setError: (newError: null|string) => void;
//  };
//  foto: {
//    value: null|string;
//    setValue: (newValue: string) => void;
//    error: null|string;
//    setError: (newError: null|string) => void;
//  }
//}
//
//export const useFormStore = create<formState>((set) => ({
//    nombre: {
//        value: '',
//        setValue: (newValue) => set((state) => ({nombre: {...state.nombre, value: newValue}})),
//        error: null,
//        setError: (newError) => set((state) => ({nombre: {...state.nombre, error: newError}}))
//      },
//    apellido: {
//        value: '',
//        setValue: (newValue) => set((state) => ({apellido: {...state.apellido, value: newValue}})),
//        error: null,
//        setError: (newError) => set((state) => ({apellido: {...state.apellido, error: newError}}))
//      },
//    numeroTelefono: {
//        value: '',
//        setValue: (newValue) => set((state) => ({numeroTelefono: {...state.numeroTelefono, value: newValue}})),
//        error: null,
//        setError: (newError) => set((state) => ({numeroTelefono: {...state.numeroTelefono, error: newError}}))
//      },
//    foto: {
//        value: '',
//        setValue: (newValue) => set((state) => ({foto: {...state.foto, value: newValue}})),
//        error: null,
//        setError: (newError) => set((state) => ({foto: {...state.foto, error: newError}}))
//      }
//}));

// stores/form-store.ts
import { create } from "zustand";

interface FormField {
  value: string;
  setValue: (value: string) => void;
  error?: string;
  setError: (newError: undefined | string) => void;
}

interface FormState {
  [key: string]: FormField;
}

export const useFormStore = create<FormState>()((set) => ({
  // Inicialización vacía con firma de índice
  ...["nombre", "apellido", "numeroTelefono", "foto"].reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: "",
        setValue: (value: string) =>
          set((state) => ({
            ...state,
            [key]: { ...state[key], value },
          })),
        error: undefined,
        setError: (error: string) =>
          set((state) => ({
            ...state,
            [key]: { ...state[key], error },
          })),
      },
    }),
    {}
  ),
}));


type SubStore = {
  name: string;
  value: string;
  setName: (name: string) => void;
  setValue: (value: string) => void;
};

export const createSubStore = (initial: { name: string; value: string }) =>
  create<SubStore>((set) => ({
    name: initial.name,
    value: initial.value,
    setName: (name) => set({ name }),
    setValue: (value) => set({ value }),
  }));

type SubStoreMap = {
  [id: string]: ReturnType<typeof createSubStore>;
};

type MainStore = {
  stores: SubStoreMap;
  createStore: (id: string, initial: { name: string; value: string }) => void;
  getStore: (id: string) => ReturnType<typeof createSubStore> | undefined;
  removeStore: (id: string) => void;
};

export const useMainStore = create<MainStore>((set, get) => ({
  stores: {},

  createStore: (id, initial) => {
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
