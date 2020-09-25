import { StoreModules } from '../core/store'
import { assert, forEachValue, isObject } from '../utils'
import Module, { ApisConfig, ModuleConfig } from './module'
import { ApiRequest } from '../core/request'
import Block from '../core/block'
export interface Api {
  [key: string]: ApiRequest
}

export default class ModuleCollection {
  public namespaceModules: ApisConfig
  // 所有module
  private module: {
    [key: string]: Module;
  }
  constructor (modules: StoreModules) {
    this.module = {}
    this.namespaceModules = {}
    this.register(modules)
  }

  /**
   * 注册模块
   * @param modules
   */
  public register (modules: StoreModules, commonConf?: ModuleConfig) {
    const registerModuleNames = Object.keys(this.module)

    let blockPri: Block | undefined = undefined
    if (commonConf && Object.keys(commonConf).length) {
      const { config, ...ints } = commonConf
      blockPri = new Block(config || {})
      if (ints.request || ints.response) {
        blockPri.addInts(ints)
      }
    }
    forEachValue(modules, (module, parentName: string) => {
      assert(isObject(module), '模块必须是类')
      if (registerModuleNames.includes(parentName)) {
        return
      }
      // assert(
      //   !registerModuleNames.includes(parentName),
      //   `${parentName}模块已经注册`
      // )
      this.module[parentName] = new Module(module, parentName, blockPri)
      // 可优化
      forEachValue(this.module[parentName].apisConfig, (childVal, childKey) => {
        const namespace = `${parentName}/${childKey}`
        this.namespaceModules[namespace] = childVal
      })
    })
  }
}
