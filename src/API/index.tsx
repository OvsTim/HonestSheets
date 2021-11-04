import axios from 'axios';

export interface Image {
  id: number;
  author: string;
  url: string;
}

export type EmployeeType =
  | 'DRIVER'
  | 'DRIVER_SP'
  | 'MEDIC'
  | 'TECHNICIAN'
  | 'OPERATOR';

export type OrganizationType =
  | 'CONTROL_ORG'
  | 'TAXI_PARK'
  | 'TAXI_PARK_SP'
  | 'TECH_ORG'
  | 'MED_ORG'
  | 'AGGREGATOR_ORG';

export interface Employee {
  employeeId: number;
  employeeType: EmployeeType;
  orgName?: string;
  orgType?: OrganizationType;
}

/*
 * [{"employeeId": 148530, "employeeType": "TECHNICIAN", "orgName": "ИП КОСЬЯНЕНКО АЛЕКСАНДР ВЛАДИМИРОВИЧ",
 * "orgType": "TECH_ORG"},
 *
 * {"employeeId": 149058, "employeeType": "TECHNICIAN", "orgName": "ИП БАЛАБКИНА ГАЛИНА АЛЕКСАНДРОВНА", "orgType": "TECH_ORG"}, {"employeeId": 223892, "employeeType": "MEDIC", "orgName": "ООО \"ЛАЙФ\"", "orgType": "MED_ORG"}]
 * */

/*
[{"id":376824,"created":"2021-10-10T16:25:18.610+00:00",
"issuerName":"Федоров С. Г.",
"driverName":"Федоров Сергей Геннадьевич",
"vehicleName":"Skoda Rapid К004ОВ750"},{
"id":264277,"created":"2021-09-23T16:48:22.886+00:00",
"issuerName":"Федоров С. Г.","driverName":"Федоров Сергей Геннадьевич","vehicleName":"Skoda Rapid К004ОВ750"}]
* */

export interface SearchReport {
  id: number;
  issuerName?: string;
  driverName?: string;
  vehicleName?: string;
  created: string;
}
export type CheckupType = 'PRE_MED' | 'PRE_TECH' | 'POST_MED' | 'POST_TECH';
export interface Checkup {
  id: number;
  type: CheckupType;
  dateTimePassed: string;
  specialist: {
    abbreviatedName: string;
    id: number;
    organization: {shortName: string; id: number};
  };
}

export interface Report {
  id: number;
  status: 'ISSUED' | 'ONLINE' | 'FINISHED' | 'FINALIZED' | 'CANCELED';
  issuer: {abbreviatedName: string; id: number};
  driver: {abbreviatedName: string; id: number};
  vehicle: {shortName: string; id: number};
  dateTimeGiven?: string;
  dateTimeValid?: string;
  dateTimeShiftStart?: string;
  dateTimeShiftEnd?: string;
  dateTimeShiftEndGuess?: string;
  created: string;
  checkups: Array<Checkup>;
}

export const base_url = 'https://art.taxi.mos.ru/api';
export function getImages(url: string) {
  return axios.get<Image[]>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function auth() {
  let data = new FormData();
  data.append('msisdn', '9261255865');
  data.append('password', 'WyM9MyW9');
  return axios.post<Array<Employee>>(base_url + '/authenticate', data);
}

export function authEmployee(id: number) {
  let data = new FormData();
  data.append('msisdn', '9261255865');
  data.append('password', 'WyM9MyW9');
  data.append('employeeId', id.toString());
  return axios.post<{token: string}>(base_url + '/authenticate', data);
}

export function search(term: string, token: string) {
  return axios.post<Array<SearchReport>>(base_url + '/waybills/driver', term, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function getReport(id: number, token: string) {
  return axios.get<Report>(base_url + '/waybills/' + id, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}
