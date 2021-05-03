<template>
  <div>
    <popper
      trigger="click"
      :options="{placement: 'bottom', }"
      ref="popperRef"
      @show="openCalender()"
    >
      <div class="popper">
        <div>
          <div class="hijriCalender">
              <div class="hijriCalenderControls"> 
                    <button class="previousButton" @click="subtractMonth" type="button">&lt;&lt;</button>
                    <strong v-bind="calenderProvider.currentDate">{{getCurrentDateFormated()}}</strong>
                    <button class="nextButton" @click="addMonth" type="button">&gt;&gt;</button>
                    <div class="yearAndMonthList" v-if="showMonthYearSelect">
                      <div class="dropdowns">
                        <span class="yearListContainer">
                          <select class="yearSelect" :value="getCurrentYear()" @change="onYearChange($event)">
                            <option  v-for="year in calenderProvider.yearsList" v-bind:key="year" :value="year">{{year}}</option> 
                          </select>
                        </span>
                        <span class="monthListContainer">
                          <select class="monthSelect" :value="getCurrentMonth()" @change="onMonthChange($event)">
                            <option v-for="month in calenderProvider.months" v-bind:key="month.number" :value="month.number" >{{month.name}}</option>)
                          </select>
                        </span>
                      </div>
                    </div>
                    <div class="dayNamesList">
                      <div class="dayName" v-for="dayName in calenderProvider.dayNames" v-bind:key="dayName">
                          {{dayName}}
                      </div>
                    </div>
                    <div class="monthDays">
                      <div v-for="i in calenderProvider.selectedMonthDays" v-bind:key="i.date" class="monthDay" :class="{selected: isSelectedDate(i.date)}">
                        <Button class="monthDayButton" :class="{selected: isSelectedDate(i.date),otherMonth: !(i.isSameMonth || ! i.isSelectableDate),disabled: isDateDisabled(i.date)}" :value="i.date" type="button" @click="onDateSelected(i)">{{i.number}}</Button>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      <div slot="reference" :class="{Divdisabled : isDisabled}">
        <div class="datepicker" :class="{disabled : isDisabled}">
          <input
            type="text"
            autocomplete="off"
            readonly
            :value="selectedDateinHijri()"
            :disabled="isDisabled"
            class="datePickerInput"
          />
        </div>
      </div>
    </popper>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Popper, { PopperType } from 'vue-popperjs';
import moment from 'moment-hijri';
import MonthVM from './Model/MonthVM';
import DayVM from './Model/DayVM';
import ICalenderProvider from './Providers/ICalenderProvider';
import HijriCalenderProvider from './Providers/HijriCalenderProvider';
import GregorianCalenderProvider from './Providers/GregorianCalenderProvider';

@Component({
  components: {
    Popper,
  },
})
export default class HijriCalender extends Vue {
  @Prop({default: '', required: true})
  public value: string|any;
  @Prop({default: ''})
  public minDate: string|any;
  @Prop({default: ''})
  public maxDate: string|any;
  @Prop({default: true})
  public showMonthYearSelect: boolean|any;
  @Prop({default: true})
  public isHijri: boolean|any;
  @Prop({default: false})
  public isDisabled: boolean|any;
  private calenderProvider: ICalenderProvider|any;
  public created() {
    if (this.isHijri) {
      this.calenderProvider = new HijriCalenderProvider(this.maxDate, this.minDate);
    } else {
      this.calenderProvider = new GregorianCalenderProvider(this.maxDate, this.minDate);
    }
  }
  @Watch('value')
  public onValueChanged(value: string, oldValue: string) {
    if (this.value) {
      this.calenderProvider.currentDate = new moment(this.value, 'YYYY-MM-DD');
    } else {
      this.calenderProvider.currentDate = moment();
    }
    this.calenderProvider.reFillMonthDays();
  }
  @Watch('minDate')
  public onMinDateChanged(value: string, oldValue: string) {
    this.calenderProvider.minDate = value;
  }
  @Watch('maxDate')
  public onMaxDateChanged(value: string, oldValue: string) {
    this.calenderProvider.maxDate = value;
  }
  public addMonth() {
    this.calenderProvider.addMonth();
    this.$forceUpdate();
  }
  public subtractMonth() {
    this.calenderProvider.subtractMonth();
    this.$forceUpdate();
  }
  public getCurrentDateFormated() {
    return this.calenderProvider.getCurrentDateFormated();
  }
  public getCurrentYear() {
    return this.calenderProvider.getCurrentYear();
  }
  public getCurrentMonth() {
    return this.calenderProvider.getCurrentMonth();
  }
  public onDateSelected(date: DayVM) {
    if (!this.isDateDisabled(date.date) && date.isSelectableDate) {
      this.$emit('input', date.date);
      this.calenderProvider.currentDate = new moment(date.date, 'YYYY-MM-DD');
      (this.$refs.popperRef as PopperType).doClose();
      this.calenderProvider.reFillMonthDays();
      this.$forceUpdate();
    }
  }
  public selectedDateinHijri() {
    return this.calenderProvider.selectedDate(this.value);
  }
  public isSelectedDate(date: string) {
    return date === this.value;
  }
  public isDateDisabled(date: string) {
    return this.calenderProvider.isDateDisabled(date);
  }
  public onMonthChange(event: any) {
    this.calenderProvider.onMonthChange(event.target.value);
    this.$forceUpdate();
  }
  public onYearChange(event: any) {
    this.calenderProvider.onYearChange(event.target.value);
    this.$forceUpdate();
  }
  public openCalender() {
    if (this.value) {
      this.calenderProvider.currentDate = new moment(this.value, 'YYYY-MM-DD');
    } else {
      this.calenderProvider.currentDate = moment();
    }
    this.calenderProvider.reFillMonthDays();
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
.hijriCalender {
  width: 266px;
  direction: rtl;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #ddd;
  margin-top: 2px;
  font-family: serif;
  box-sizing: unset;
  -webkit-box-sizing: unset;
  font-size: 14px;
  border-radius: 4px;
  z-index: 1000;
  color: black !important;
}
.hijriCalenderControls , .dropdowns {
  direction: rtl;
  text-align: center !important;
}

.hijriCalenderControls button {
  font: 400 13.3333px Arial !important;
}

.hijriCalenderControls select {
    border: 1px solid !important;
}

.previousButton {
  position: absolute;
  border: 0px;
  font: 900 13.3333px Arial !important;
  cursor: pointer;
  background-color: #fff;
  right: 15px;
}
.previousButton:hover {
  color: #888888;
}
.nextButton {
  position: absolute;
  border: 0px;
  font: 900 13.3333px Arial !important;
  cursor: pointer;
  background-color: #fff;
  left: 15px;
}
.nextButton:hover {
  color: #888888;
}

.dayNamesList {
  text-align: right;
  border-bottom: 1px solid #ddd;
}
.dayName {
  display: inline-block;
  margin: 2px;
  width: 30px;
  height: 25px;
  padding: 1px;
  border: 1px solid #fff;
  text-align: center !important;
  -webkit-box-sizing: unset !important;
  box-sizing: unset;
}

.yearAndMonthList {
  margin-top: 10px;
}

.yearListContainer {
  padding: 5px;
}

.yearSelect {
  width: 100px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 12px;
}

.monthListContainer {
  padding: 5px;
}
.monthSelect {
  width: 100px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 14px;
}

.monthDays {
  text-align: right;
  display: flex;
  flex-flow: wrap;
}

.monthDay {
  margin: 2px;
  width: 30px;
  padding: 1px;
  border: 1px solid #fff;
  text-align: center;
  -webkit-box-sizing: unset !important;
  box-sizing: unset;
  border-radius: 4px;
}
.monthDay:hover {
  border: 1px solid black;
}
.noHover:hover {
  border: "";
}
.monthDayButton {
    cursor: pointer;
    border: 0px;
    width: 30px;
    height: 30px;
    padding: 5px;
    font-size: 14px;
    border-radius: 0px;
    background-color: white;
    color: "";
    text-align: center !important;
}
.monthDayButton:focus {
  outline: unset;
}
.monthDayButton.selected {
  outline: unset;
  background-color: #1284e7;
  color: black;
}
.monthDayButton.otherMonth {
  background-color: #d0d0d0;
}

.monthDayButton.disabled {
  color: #c1d1e5;
  background-color: #f3f3f3 !important;
  cursor: not-allowed;
}
.datepicker {
  display: block !important;
  width: 100% !important;
  height: 34px !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #495057 !important;
  background-color: #fff !important;
  background-clip: padding-box !important;
  border: 1px solid #ced4da !important;
  border-radius: 10px !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
  box-sizing: border-box;
  outline: none;
  padding: 0 34px 0 12px;
  -webkit-user-select: none;
  background: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik01NjQgMTgwLjJINDQ4Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1aDExNmM4LjIgMCAxNSA2LjcgMTUgMTVzLTYuOCAxNS0xNSAxNXoiIGZpbGw9IiM5ODk4OTgiLz48cGF0aCBkPSJNOTQ1IDk1Mi4ySDgxLjJjLTguMiAwLTE1LTYuNy0xNS0xNVYxNjIuOGMwLTguMyA2LjgtMTUgMTUtMTVIMjk0YzguMiAwIDE1IDYuNyAxNSAxNXMtNi44IDE1LTE1IDE1SDk2LjJ2NzQ0LjRIOTMwVjE3Ny44SDcxMy42Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1SDk0NWM4LjIgMCAxNSA2LjcgMTUgMTV2Nzc0LjRjMCA4LjMtNi44IDE1LTE1IDE1eiIgZmlsbD0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik0zMzMuMyA1NTFIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zMzMuMyA3NDBIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zNzAuOCAyNTguNmMtOC4zIDAtMTUtNi43LTE1LTE1Vjg2LjhjMC04LjIgNi43LTE1IDE1LTE1czE1IDYuOCAxNSAxNXYxNTYuOGMwIDguMy02LjcgMTUtMTUgMTV6bTI3MC4yIDBjLTguMyAwLTE1LTYuNy0xNS0xNVY4Ni44YzAtOC4yIDYuNy0xNSAxNS0xNXMxNSA2LjggMTUgMTV2MTU2LjhjMCA4LjMtNi43IDE1LTE1IDE1ek05NDUgMzcyLjJIODEuMmMtOC4yIDAtMTUtNi43LTE1LTE1czYuOC0xNSAxNS0xNUg5NDVjOC4yIDAgMTUgNi43IDE1IDE1cy02LjggMTUtMTUgMTV6IiBmaWxsPSIjOTg5ODk4Ii8+PC9zdmc+")
    no-repeat 96% 50%;
}
.datepicker.disabled {
  background-color: #e9ecef;
}
.datepicker::before {
  content: "";
  display: block;
  position: absolute;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
}
.popper {
  z-index: 1;
}

.Divdisabled{
  pointer-events: none;
}
.datePickerInput {
  width: 98%;
  border: none;
}
</style>
