<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    -->
    <!-- {{getRootInfo}} -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// import store from "../store";
import apiStore from "../block/index";
import aaa from "../vuex/aaa";
import store from "../vuex/store";
store.registerModule("aaa", aaa);
import { BlockGetters } from "../../../src/index";
import fuck from "../block/fuck";
import Reattempt from "reattempt";
import { namespace } from "vuex-class";
const aaaModule = namespace("aaa");

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // @aaaModule.Getter("getRootInfo")
  @BlockGetters("user.getRootInfo")
  private getRootInfo: any;

  num = 0;

  async init() {
    console.log(this.num);
    this.num++;
    if (this.num < 2) {
      throw "errorrrrrr";
    }
    return "asd";
  }
  async mounted() {
    // const result = await Reattempt.run({ times: 1 }, this.init);
    // console.log(111, result);
    const data = await this.$block.dispatch("user/getRootInfo", {
      temp: { aaa: 123 },
      params: { bbb: 123, aaa: 456 },
      data: { ccc: 123 }
    });
    console.log("getRootInfo:", this.getRootInfo);
    console.log("data:", data);
    // setTimeout(() => {
    //   // this.$block.registerModule({
    //   //   fuck
    //   // });
    //   this.$block.dispatch("user/getRootInfo", {
    //     temp: { aaa: 123 },
    //     params: { bbb: 123, aaa: 456 },
    //     data: { ccc: 123 }
    //   });
    // }, 1000);
  }
}
</script>
