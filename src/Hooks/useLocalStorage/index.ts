import { useState, useEffect } from 'react'

/**
 * ### useLocalStorage
 * A custom React hook to manage state synchronized with local storage.
 *
 * #### Parameters
 * - `key` (string): The key under which to store the value in local storage.
 * - `initialValue` (T): The initial value to use if no value is found in local storage.
 *
 * #### Returns
 * - `[T, (newValue: T) => void]`:
 *   - `T`: The current state value.
 *   - `(newValue: T) => void`: A function to update the state and local storage.
 *
 * #### Example
 * ```tsx
 * import { useLocalStorage } from './useLocalStorage';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = useLocalStorage<string>('myKey', 'defaultValue');
 *
 *   return (
 *     <div>
 *       <p>Value: {value}</p>
 *       <button onClick={() => setValue('newValue')}>Update Value</button>
 *     </div>
 *   );
 * };
 * ```
 * @template T
 * @param {string} key - The key under which the value is stored in local storage.
 * @param {T} initialValue - The default value if no value is found in local storage.
 * @returns {[T, (newValue: T) => void]} The current value and a function to update it.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (newValue: T) => void] => {
  const getInitialValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue !== null ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const [value, setValue] = useState<T>(getInitialValue)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, value])

  const updateValue = (newValue: T): void => {
    setValue(newValue)
  }

  return [value, updateValue]
}
