import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import workers from '../employees.json'

export type RoleType = '' | 'cook' | 'waiter' | 'driver'
export type SortType = '' | 'name:asc' | 'name:desc' | 'date:asc' | 'date:desc'

interface Filter {
  archive: boolean,
  type: SortType,
  role: RoleType
}

export interface WorkerI {
  id: number,
  name: string,
  isArchive: boolean,
  role: string,
  phone: string,
  birthday: string
}

const initialState: { data: WorkerI[] } = { data: workers }
let unsortedState: { data: WorkerI[] } = JSON.parse(JSON.stringify(initialState))
let _id = initialState.data.length > 0 ? initialState.data[initialState.data.length - 1].id + 1 : 0

const counterSlice = createSlice({
  name: 'workers',
  initialState: initialState,
  reducers: {
    sortWorkers: (state, { payload }: PayloadAction<Filter>) => {

      const sortedState = [...unsortedState.data]
        .filter(worker => {
          if (payload.archive) { return true }
          return worker.isArchive === payload.archive
        })
        .filter(workers => {
          if (payload.role === "") { return true }
          return workers.role === payload.role
        })

      if (payload.type === '') {
        state.data = [...sortedState]
      } else {
        state.data = [...sortedState].sort((a, b) => {
          const dateA = new Date(a.birthday.split('.').reverse().join('-'));
          const dateB = new Date(b.birthday.split('.').reverse().join('-'));
          if (payload.type === 'name:desc') {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
          }
          if (payload.type === 'name:asc') {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
          }

          if (payload.type === "date:desc") {
            if (dateA > dateB) { return -1; }
            if (dateA < dateB) { return 1; }
          }
          if (payload.type === "date:asc") {
            if (dateA < dateB) { return -1; }
            if (dateA > dateB) { return 1; }
          }
          return 0
        })
      }
    },
    updateWorker: (state, { payload }: PayloadAction<WorkerI>) => {
      unsortedState.data = unsortedState.data.map((worker) => {
        if (worker.id == payload.id) {
          return payload
        }
        return worker
      })
      state.data = unsortedState.data
    },
    addWorker: (state, { payload }: PayloadAction<Omit<WorkerI, 'id'>>) => {
      let newUnsotedState: { data: WorkerI[] } = JSON.parse(JSON.stringify(unsortedState))
      newUnsotedState.data.push({
        id: _id,
        ...payload
      })
      unsortedState = { ...newUnsotedState }
      _id+=1

      state.data = JSON.parse(JSON.stringify(unsortedState.data))

    }
  },
});

export const { sortWorkers, updateWorker, addWorker } = counterSlice.actions;

export default counterSlice.reducer;