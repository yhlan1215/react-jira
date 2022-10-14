import { useEffect } from 'react'

export const cleanObject = (object) => {
  const isFalsy = (value) => (value === 0 ? true : !value)
  const result = { ...object }

  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const clone = (data) => JSON.parse(JSON.stringify(data))
