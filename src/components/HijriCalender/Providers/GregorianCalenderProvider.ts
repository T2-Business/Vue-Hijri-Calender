import ICalenderProvider from './ICalenderProvider';
import moment from 'moment-hijri';
import MonthVM from '../Model/MonthVM';
import DayVM from '../Model/DayVM';

export default class GregorianCalenderProvider implements  ICalenderProvider {
    public currentDate: any;
    public maxDate: string;
    public minDate: string;
    public months: MonthVM[] = [
        {number: 0, name: 'يناير'},
        {number: 1, name: 'فبراير'},
        {number: 2, name: 'مارس'},
        {number: 3, name: 'ابريل'},
        {number: 4, name: 'مايو'},
        {number: 5, name: 'يونيو'},
        {number: 6, name: 'يوليو'},
        {number: 7, name: 'أغسطس'},
        {number: 8, name: 'سبتمبر'},
        {number: 9, name: 'أكتوبر'},
        {number: 10, name: 'نوفمبر'},
        {number: 11, name: 'ديسمبر'},
    ];
    public dayNames: string[] = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    public selectedMonthDays: DayVM[] = [];
    public yearsList: number[];
    public minSupportedDate: any = new moment('1937-03-14', 'YYYY-MM-DD');
    public maxSupportedDate: any = new moment('2077-10-17', 'YYYY-MM-DD');
    public constructor(maxDate: string, minDate: string) {
        this.currentDate = moment();
        this.maxDate = maxDate;
        this.minDate = minDate;
        this.yearsList = [];
        const startYear = this.minSupportedDate.year();
        const endYear = this.maxSupportedDate.year();
        for (let year = startYear; year <= endYear; year++) {
            this.yearsList.push(year);
        }
    }
    public addMonth() {
        const temp = new moment(this.currentDate);
        if (!temp.add(1, 'Month').isAfter(this.maxSupportedDate)) {
            this.currentDate = this.currentDate.add(1, 'Month');
            this.reFillMonthDays();
        }
    }
    public subtractMonth() {
        const temp = new moment(this.currentDate);
        if (!temp.subtract(1, 'Month').isBefore(this.minSupportedDate)) {
            this.currentDate = this.currentDate.subtract(1, 'Month');
            this.reFillMonthDays();
        }
    }
    public getCurrentDateFormated(): string {
        return this.currentDate.format('MMMM') +
            ' (' + this.currentDate.format('MM') +
            ') ' + this.currentDate.format('YYYY');
    }
    public getCurrentYear(): number {
        return this.currentDate.year();
    }
    public getCurrentMonth(): number {
        return this.currentDate.month();
    }
    public selectedDate(value: string |any): string {
        if (value) {
            return moment(value, 'YYYY-MM-DD').locale('en').format('YYYY-MM-DD');
        } else  {
            return '';
        }
    }
    public isDateDisabled(date: string): boolean {
        let result: boolean = false;
        if (this.maxDate) {
            result = moment(date, 'YYYY-MM-DD').isAfter(moment(this.maxDate, 'YYYY-MM-DD')) || result;
        }
        if (this.minDate) {
            result = moment(date, 'YYYY-MM-DD').isBefore(moment(this.minDate, 'YYYY-MM-DD')) || result;
        }
        return result;
    }
    public onMonthChange(value: string): void {
        const year = this.currentDate.locale('en').format('YYYY');
        const month = (parseInt(value, 10) + 1);
        const day = this.currentDate.locale('en').format('DD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'YYYY-M-DD');
        this.reFillMonthDays();
    }
    public onYearChange(value: string): void {
        const year = value;
        const month = this.currentDate.locale('en').format('MM');
        const day = this.currentDate.locale('en').format('DD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'YYYY-M-DD');
        this.reFillMonthDays();
    }
    public reFillMonthDays(): void {
        this.selectedMonthDays = [];
        const monthStartDay = this.getCurrentMonthStartDayNumber();
        const temp = new moment(this.currentDate).startOf('Month');
        for (let i = monthStartDay ; i > 0; i--) {
          const x = new moment(temp).subtract(i, 'Day');
          x.locale('en');
          if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
            this.selectedMonthDays.push({
                number: x.format('D'),
                date: x.format('YYYY-MM-DD'),
                isSameMonth: false,
                isSelectableDate: true,
              });
          } else {
            this.selectedMonthDays.push({
                number: '',
                date: x.format('YYYY-MM-DD'),
                isSameMonth: false,
                isSelectableDate: false,
              });
          }
        }
        const temp2 = new moment(this.currentDate).startOf('Month');
        const monthDays = this.monthDays();
        for (let i = 0; i < monthDays; i++) {
          const x = new moment(temp2).add(i, 'Day');
          x.locale('en');
          if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
            this.selectedMonthDays.push({
                number: x.format('D'),
                date: x.format('YYYY-MM-DD'),
                isSameMonth: true,
                isSelectableDate: true,
              });
          } else {
            this.selectedMonthDays.push({
                number: '',
                date: x.format('YYYY-MM-DD'),
                isSameMonth: true,
                isSelectableDate: false,
              });
          }
        }
        const monthEndDay = (Number)(this.getCurrentMonthEndDayNumber());
        const temp3 = new moment(this.currentDate).endOf('Month');
        if (temp3.isAfter(this.currentDate)) {
            for (let index = 1; index < 7 - monthEndDay; index++) {
                const x = new moment(temp3).add(index, 'Day');
                x.locale('en');
                if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
                    this.selectedMonthDays.push({
                        number: x.format('D'),
                        date: x.format('YYYY-MM-DD'),
                        isSameMonth: false,
                        isSelectableDate: true,
                    });
                } else {
                    this.selectedMonthDays.push({
                        number: '',
                        date: x.format('YYYY-MM-DD'),
                        isSameMonth: true,
                        isSelectableDate: false,
                    });
                }
            }
        }
    }

    private getCurrentMonthStartDayNumber() {
        const time = new moment(this.currentDate);
        time.startOf('Month');
        return time.locale('en').format('d');
    }
    private getCurrentMonthEndDayNumber() {
        const time = new moment(this.currentDate);
        time.endOf('Month');
        return time.locale('en').format('d');
    }
    private monthDays() {
        const time = new moment(this.currentDate);
        return time.locale('en').daysInMonth();
    }
}
