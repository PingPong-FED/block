import cache from '../core/cache'

export function apiMapGetters (moduleName: string, userGetters: any = {}) {
  const { vuex } = cache
  if (!vuex || !vuex.store) {
    return
  }
  const apiState = vuex.store.getters['api/state']
  let res: any = {}
  normalizeMap(userGetters).forEach(({ key, val }) => {
    res[key] = function mappedGetter () {
      if (!apiState || !(moduleName in apiState)) {
        console.error(`[block ${moduleName}] 模块未装载`)
        return
      }
      if (
        process.env.NODE_ENV !== 'production' &&
        !(val in apiState[moduleName])
      ) {
        console.error(`[block api/state ${moduleName}] 找不到 getter: ${val}`)
        return
      }
      return apiState[moduleName][val]
    }
  })
  return res
}

/**
 * 规范map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map: any) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
