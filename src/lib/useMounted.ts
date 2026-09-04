import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client hydration. Lets a component render the same tree
 * on the server and on first client paint (avoiding a hydration mismatch),
 * then switch to client-only branches on the next tick.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
