# vue-hijri-calander
## About
This is a Hijri / Gregorian Calendar for Vue.js Developed by T2 R&D Team.

## parameter
v-model='date' => string containing date with this format 'YYYY-MM-YY'

:minDate  => set min date to allow

:maxDate  => set max date to allow

:isHijri => true to display Hijri Calender false to use Gregorian Calender

:isDisabled => Disable or Enables the Calender
## Usage
```
<template>
  <div id="app">
    {{date}}
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate' :isHijri='true' :isDisabled='isDisabled'/>
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate' :isHijri='false' :isDisabled='isDisabled'/>
    <button @click='clearDate()'>Clear Date</button>
    <button @click='setDate()'>Set Date</button>
    <button @click='setMinDate()'>Set Min. Date</button>
    <button @click='setMaxDate()'>Set Max. Date</button>
    <button @click='flipDisabled()'>Flip Disabled</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HijriCalender from './components/HijriCalender/HijriCalender.vue';
@Component({
  components: {
    HijriCalender,
  },
})
export default class App extends Vue {
  public date: string = '';
  public minDate: string = '';
  public maxDate: string = '';
  public isDisabled: boolean = false;
  public clearDate() {
    this.date = '';
  }
  public setDate() {
    this.date = '2019-09-13';
  }
  public setMinDate() {
    this.minDate = '2019-09-01';
  }
  public setMaxDate() {
    this.maxDate = '2019-10-15';
  }
  public flipDisabled() {
    this.isDisabled = ! this.isDisabled;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


```