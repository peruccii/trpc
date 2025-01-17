import { Injectable } from '@nestjs/common';

interface request_date {
  age: number;
}

export interface response_data {
  age: number;
  monthsLived: number;
  monthsToLive: number;
}

@Injectable()
export class GetDataService {
  constructor() {}

  getData(request: request_date): response_data {
    const hundreadyears_months = 960;

    const calculateMonthsFromYears = (years: number): number => {
      const monthsPerYear = 12;
      return Math.round(years * monthsPerYear);
    };

    const yourMonths = calculateMonthsFromYears(request.age);
    return {
      age: request.age,
      monthsLived: yourMonths,
      monthsToLive: hundreadyears_months,
    };
  }
}
