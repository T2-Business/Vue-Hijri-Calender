# vue-hijri-calander
## About
This is a Hijri / Gregorian Calendar for Vue.js Developed by T2 R&D Team.

## Parameters
v-model='date' => string containing date with this format 'YYYY-MM-YY'
:minDate  => set min date to allow
:maxDate  => set max date to allow
:isHijri => true to display Hijri Calender false to use Gregorian Calender
:isDisabled => Disable or Enables the Calender
:showMonthYearSelect => Show / Hide Month and Year Select
## Usage & Sample
```
<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-3">Selected Date:</div>
      <div class="col-md-3">{{ date }}</div>
    </div>
    <div class="row">
      <div class="col-md-3">Hijri Date:</div>
      <div class="col-md-3">
        <HijriCalender
          v-model="date"
          :minDate="minDate"
          :maxDate="maxDate"
          :isDisabled="isDisabled"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">Gregorian Date:</div>
      <div class="col-md-3">
        <HijriCalender
          v-model="date"
          :minDate="minDate"
          :maxDate="maxDate"
          :isDisabled="isDisabled"
          :isHijri="false"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <button type="button" class="btn btn-primary" style="margin:10px" @click="clearDate()">
          Clear Date
        </button>
        <button type="button" class="btn btn-primary" style="margin:10px" @click="setDate()">
          Set Date
        </button>
        <button type="button" class="btn btn-primary" style="margin:10px" @click="setMinDate()">
          Set Min. Date
        </button>
        <button type="button" class="btn btn-primary" style="margin:10px" @click="setMaxDate()">
          Set Max. Date
        </button>
        <button type="button" class="btn btn-primary" style="margin:10px" @click="flipDisabled()">
          Flip Disabled
        </button>
      </div>
    </div>
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
    this.date = '2019-11-05';
  }
  public setMinDate() {
    this.minDate = '2013-1-05';
  }
  public setMaxDate() {
    this.maxDate = '2022-11-05';
  }
  public flipDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



```