import { useMemo } from 'react'

export const useIsBrowser = () => {
  const isBrowser = useMemo(() => typeof window !== 'undefined', [])
  return isBrowser
}
