import Vue from 'vue'
import { VueComponentOptions } from './types'

export declare interface BlockDecorator {
  <V extends Vue>(target: V, key: string): void
}

export interface BindingHelper {
  (map: string): BlockDecorator
}

export declare function createDecorator(
  factory: (options: VueComponentOptions, key: string) => void
): BlockDecorator
export declare const BlockGetters: BindingHelper
