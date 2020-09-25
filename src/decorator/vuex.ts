import Vue from 'vue'
import { mapState } from 'vuex'
import { DecoratorInstance, VueComponentOptions } from './types'

/**
 * BlockGetters注解 -- 方便block的状态绑定
 * @param {String} map -- block状态映射名
 * @returns {Function}
 * 示例：
 * block绑定状态为 user模块下memberInfo
 * -- @BlockGetters('user.memberInfo')
 */
export const BlockGetters = (map: string): Function => {
  return createDecorator(
    (componentOptions: VueComponentOptions, key: string) => {
      const blockModuleName = 'api'
      if (!componentOptions['computed']) {
        componentOptions['computed'] = {}
      }
      const mapKeys = map.split('.')

      const mapObject = {
        [key]: (state: any) => state[mapKeys[0]][mapKeys[1]]
      }

      componentOptions['computed'][key] = mapState(blockModuleName, mapObject)[
        key
      ]
    }
  )
}

/**
 * 装饰器的工程函数
 * @param {Function} factory
 * @returns {Function}
 */
function createDecorator<V extends Vue> (
  factory: (componentOptions: VueComponentOptions, key: string) => void
): Function {
  return function (target: V, key: string) {
    let Ctor: DecoratorInstance =
      typeof target === 'function' ? target : target.constructor
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }
    Ctor.__decorators__.push(function (options: VueComponentOptions) {
      return factory(options, key)
    })
  }
}
