// atoms.ts
import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { Todo, FilterType } from './types';

export const todosAtom = atomWithImmer<Todo[]>([]);
export const filterAtom = atom<FilterType>('all');
