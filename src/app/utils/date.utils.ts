import {differenceInDays, differenceInMonths, differenceInYears,
  isBefore, parse, subDays, subMonths, subYears, format, isDate, isValid, isFuture} from 'date-fns';
import {Age, AgeUnit} from '../shared/age-input/age-input.component';

export const toAge = (dateStr: string): Age => {
  const date = parse(dateStr);
  const now = Date.now();

  return isBefore(subDays(now, 90), date) ?
    {age: differenceInDays(now, date), unit: AgeUnit.Day} :
      isBefore(subMonths(now, 24), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
        {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        };
};

export const toDate = (age: Age): string => {
  const now = Date.now();
  const dateFormat = 'YYYY-MM-DD';
  switch (age.unit) {
    case AgeUnit.Year: {
      return format(subYears(now, age.age), dateFormat);
    }
    case AgeUnit.Month: {
      return format(subMonths(now, age.age), dateFormat);
    }
    case AgeUnit.Day: {
      return format(subDays(now, age.age), dateFormat);
    }
    default:
      return '';
  }
}

export const isValidDate = (val: string): boolean =>  {
  const date =parse(val);
  return isDate(date) && isValid(date) && !isFuture(date) && differenceInYears(Date.now(), date) < 150;
}
