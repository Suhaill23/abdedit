import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;
const LOW_MEMORY_LIMIT_GB = 4;
const LOW_CPU_LIMIT = 4;

type ConnectionLike = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithCapabilities = Navigator & {
  connection?: ConnectionLike;
  deviceMemory?: number;
};

type AdaptiveMotionState = {
  enableEnhancedEffects: boolean;
  isLowPowerDevice: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
};

const getAdaptiveMotionState = (): AdaptiveMotionState => {
  if (typeof window === 'undefined') {
    return {
      enableEnhancedEffects: false,
      isLowPowerDevice: false,
      isMobile: false,
      prefersReducedMotion: false,
      saveData: false,
    };
  }

  const nav = navigator as NavigatorWithCapabilities;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const saveData = Boolean(nav.connection?.saveData);
  const deviceMemory = nav.deviceMemory ?? 8;
  const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
  const isLowPowerDevice =
    deviceMemory <= LOW_MEMORY_LIMIT_GB || hardwareConcurrency <= LOW_CPU_LIMIT;

  return {
    enableEnhancedEffects: !isMobile && !prefersReducedMotion && !saveData && !isLowPowerDevice,
    isLowPowerDevice,
    isMobile,
    prefersReducedMotion,
    saveData,
  };
};

const listeners = new Set<() => void>();
let currentState = getAdaptiveMotionState();
let cleanup: (() => void) | undefined;

const isEqual = (a: AdaptiveMotionState, b: AdaptiveMotionState) =>
  a.enableEnhancedEffects === b.enableEnhancedEffects &&
  a.isLowPowerDevice === b.isLowPowerDevice &&
  a.isMobile === b.isMobile &&
  a.prefersReducedMotion === b.prefersReducedMotion &&
  a.saveData === b.saveData;

const emitIfChanged = () => {
  const nextState = getAdaptiveMotionState();

  if (isEqual(currentState, nextState)) {
    return;
  }

  currentState = nextState;
  listeners.forEach((listener) => listener());
};

const startListening = () => {
  if (typeof window === 'undefined' || cleanup) {
    return;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = navigator as NavigatorWithCapabilities;
  const connection = nav.connection;

  const handleChange = () => emitIfChanged();

  window.addEventListener('resize', handleChange, { passive: true });
  mediaQuery.addEventListener('change', handleChange);
  connection?.addEventListener?.('change', handleChange);

  cleanup = () => {
    window.removeEventListener('resize', handleChange);
    mediaQuery.removeEventListener('change', handleChange);
    connection?.removeEventListener?.('change', handleChange);
    cleanup = undefined;
  };
};

const stopListening = () => {
  if (listeners.size === 0) {
    cleanup?.();
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  startListening();
  emitIfChanged();

  return () => {
    listeners.delete(listener);
    stopListening();
  };
};

const getSnapshot = () => currentState;

const getServerSnapshot = (): AdaptiveMotionState => ({
  enableEnhancedEffects: false,
  isLowPowerDevice: false,
  isMobile: false,
  prefersReducedMotion: false,
  saveData: false,
});

export const useAdaptiveMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
