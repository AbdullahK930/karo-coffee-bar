import type Lenis from "lenis";

interface LenisLockState {
  instance: Lenis | null;
  locked: boolean;
}

// Lenis drives scroll via its own JS loop rather than native scrolling, so
// CSS `overflow: hidden` alone does not stop it. This shared, mount-order-safe
// handoff lets PageLoader lock scroll through Lenis's own stop()/start() API
// regardless of which component's effect runs first.
const lenisLock: LenisLockState = { instance: null, locked: false };

export function registerLenis(instance: Lenis) {
  lenisLock.instance = instance;
  if (lenisLock.locked) instance.stop();
}

export function unregisterLenis() {
  lenisLock.instance = null;
}

export function lockScroll() {
  lenisLock.locked = true;
  lenisLock.instance?.stop();
}

export function unlockScroll() {
  lenisLock.locked = false;
  lenisLock.instance?.start();
}
