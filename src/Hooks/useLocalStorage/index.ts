import React from 'react'
/**
 * ### useLocalStorage
 * A custom React hook to manage state in local storage.
 * #### Parameters
 * - `key` (string): The key under which to store the value in local storage.
 * - `initialValue` (string): The initial value to use if no value is found in local storage.
 * @example
 * import { useLocalStorage } from './useLocalStorage';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = useLocalStorage('key', 'initialValue');
 *   // Use value and setValue as needed
 *
 *   return (
 *     // Your component JSX
 *   );
 * };
 */
export const useLocalStorage = (
  key: string,
  initialValue: string | number | object | boolean | any[]
): [string, (newValue: string | number | boolean | object | any[]) => void] => {
  // Get initial value from local storage or use the provided initial value
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : initialValue

  // State to store our value
  const [value, setValue] = React.useState(initial)

  /**
   * Function to update local storage and state value.
   * @param {string} newValue - The new value to be set.
   * @returns {void}
   */
  const updateValue = (newValue: string | number | boolean | object | any[]): void => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  return [value, updateValue]
}
