import Vue, { ComponentOptions } from 'vue'

export declare type VueComponentOptions = ComponentOptions<Vue>

export interface OptionsFunction {
  (option: VueComponentOptions): void
}

export interface DecoratorInstance extends Function {
  __decorators__?: OptionsFunction[]
}
