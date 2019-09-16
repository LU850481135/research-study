const STORAGE = 'storage'

export default {
  getItem: (key) => {
    return localStorage.getItem(`${STORAGE}_${key}`)
  },
  setItem: (key, value) => {
    return localStorage.setItem(`${STORAGE}_${key}`, value)
  },
  removeItem: (key) => {
    return localStorage.removeItem(`${STORAGE}_${key}`)
  },
  clear: () => {
    const reg = new RegExp(`^${STORAGE}_`)
    Object.keys(localStorage).filter(item => reg.test(item)).forEach(item => {
      localStorage.removeItem(item)
    })
  }
}
