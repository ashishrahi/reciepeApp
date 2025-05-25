// src/app/hooks.ts
import { useDispatch, useSelector } from 'react-redux';   // Regular imports for functions
import type { TypedUseSelectorHook } from 'react-redux';  // Type-only import for types
import type { RootState, AppDispatch } from './store';    // Type-only import for types

// Typed dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
