import { useRef } from "react";

/**
 * An hook to help in controlling state updates in components depennding
 * on whether they are mounted or unmounted.
 *
 * @returns an Object, {isMounted: Boolean, setMounted: Function}
 */
export default function useMounted() {
  const mounted = useRef(true);

  const setMounted = (isMounted) => {
    mounted.current = isMounted;
  };

  return {
    isMounted: mounted.current,
    setMounted,
  };
}
