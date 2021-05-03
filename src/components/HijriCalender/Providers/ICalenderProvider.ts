import MonthVM from '../Model/MonthVM';
import DayVM from '../Model/DayVM';

export default interface ICalenderProvider {
    currentDate: any;
    maxDate: string;
    minDate: string;
    months: MonthVM[];
    selectedMonthDays: DayVM[];
    dayNames: string[];
    yearsList: number[];
    addMonth(): any;
    subtractMonth(): any;
    getCurrentDateFormated(): string;
    getCurrentYear(): number;
    getCurrentMonth(): number;
    selectedDate(value: string |any): string;
    isDateDisabled(date: string): boolean;
    onMonthChange(value: string): void;
    onYearChange(value: string): void;
    reFillMonthDays(): void;
}
