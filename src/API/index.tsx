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

export interface EmployeeData {
  id: number;
  status: 'NEW' | 'ACTIVE' | 'INACTIVE';
  organization: {
    id: number;
    shortName: string;
    type: OrganizationType;
  };
  user: {
    id: number;
    email: string;
    password: string;
    msisdn: string;
    firstName: string;
    patronymic: string;
    lastName: string;
    status: 'NEW' | 'ACTIVE' | 'INACTIVE';

    created: string;
    abbreviatedName: string;
    fullName: string;
  };
  roleSet: Array<{id: string; permissions: Array<string>}>;
  type: EmployeeType;
  created: string;
}

export interface PreMedCreateCheckup {
  checkupData: {
    bloodPressureDia: string;
    bloodPressureSys: string;
    bodyTemperature: string;
    alcoholTestPassed: boolean;
  };
  type: CheckupType;
  specialist: {id: number};
  waybill: {id: number};
}
export interface PostMedCreateCheckup {
  checkupData: {
    alcoholTestPassed: boolean;
  };
  type: CheckupType;
  specialist: {id: number};
  waybill: {id: number};
}
export interface PreTechCreateCheckup {
  checkupData: {desinfected: boolean; odometerData: string};
  type: CheckupType;
  specialist: {id: number};
  waybill: {id: number};
}
export interface PostTechCreateCheckup {
  checkupData: {washed: boolean; odometerData: string};
  type: CheckupType;
  specialist: {id: number};
  waybill: {id: number};
}

export interface PreMedEditCheckup {
  checkupData: {
    bloodPressureDia: string;
    bloodPressureSys: string;
    bodyTemperature: string;
    alcoholTestPassed: boolean;
  };
  type: CheckupType;
  specialist: {
    id: number;
    abbreviatedName: string;
    organization: {id: number; shortName: string};
  };
  waybill: {id: number};
  id: number;
  dateTimePassed: string;
}

export interface PostMedEditCheckup {
  checkupData: {
    alcoholTestPassed: boolean;
  };
  type: CheckupType;
  specialist: {
    id: number;
    abbreviatedName: string;
    organization: {id: number; shortName: string};
  };
  waybill: {id: number};
  id: number;
  dateTimePassed: string;
}

export interface PreTechEditCheckup {
  checkupData: {desinfected: boolean; odometerData: string};

  type: CheckupType;
  specialist: {
    id: number;
    abbreviatedName: string;
    organization: {id: number; shortName: string};
  };
  waybill: {id: number};
  id: number;
  dateTimePassed: string;
}

export interface PostTechEditCheckup {
  checkupData: {washed: boolean; odometerData: string};
  type: CheckupType;
  specialist: {
    id: number;
    abbreviatedName: string;
    organization: {id: number; shortName: string};
  };
  waybill: {id: number};
  id: number;
  dateTimePassed: string;
}

export interface DriverFromSearch {
  id: number;
  fullName: string;
}

export interface VehicleFromSearch {
  id: number;
  shortName: string;
}

export interface SearchResponse<Type> {
  entries: Array<Type>;
  pageNum: number;
  total: number;
}

export interface Vehicle {
  id: number;
  organization: {
    id: number;
    shortName: string;
    type: OrganizationType;
  };
  licensePlateNumber: string;
  payload: {
    licenseNumber: string;
    region: string;
    manufacturer: string;
    model: string;
    diagnosticCardNumber: string;
    diagnosticCardValidThru: string;
    insuranceSeries: string;
    insuranceNumber: string;
    insuranceIssueDate: string;
    insuranceValidThru: string;
    insuranceVehicleOwner: string;
    insuranceVehiclePurpose: string;
  };
  licenseStatus:
    | 'Unknown'
    | 'NotFound'
    | 'Initial'
    | 'Duplicate'
    | 'Suspended'
    | 'Canceled'
    | 'Resumed'
    | 'Expired'
    | 'Expired2'
    | 'Reissued'
    | 'Terminated';
  created: string;
  shortName: string;
}

export interface CreateReportBody {
  status: 'ISSUED';
  vehicle: {id: number};
  driver: {id: number};
}

export const base_url = 'https://art.taxi.mos.ru/api';
export function getImages(url: string) {
  return axios.get<Image[]>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function authEmployee(id: number) {
  let data = new FormData();
  data.append('msisdn', id === 238353 ? '9266440454' : '9261255865');
  data.append('password', id === 238353 ? '64hSuldQ' : 'WyM9MyW9');
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

export function getEmployee(id: number, token: string) {
  return axios.get<EmployeeData>(base_url + '/employees/' + id, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function preMedCreate(data: PreMedCreateCheckup, token: string) {
  return axios.post(base_url + '/checkups/PRE_MED', data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function postMedCreate(data: PostMedCreateCheckup, token: string) {
  return axios.post(base_url + '/checkups/POST_MED', data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function preTechCreate(data: PreTechCreateCheckup, token: string) {
  return axios.post(base_url + '/checkups/PRE_TECH', data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function postTechCreate(data: PostTechCreateCheckup, token: string) {
  return axios.post(base_url + '/checkups/POST_TECH', data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function preMedEdit(
  data: PreMedEditCheckup,
  token: string,
  checkupID: number,
) {
  return axios.post(base_url + '/checkups/PRE_MED/' + checkupID, data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function postMedEdit(
  data: PostMedEditCheckup,
  token: string,
  checkupID: number,
) {
  return axios.post(base_url + '/checkups/POST_MED/' + checkupID, data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function preTechEdit(
  data: PreTechEditCheckup,
  token: string,
  checkupID: number,
) {
  return axios.post(base_url + '/checkups/PRE_TECH/' + checkupID, data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function postTechEdit(
  data: PostTechEditCheckup,
  token: string,
  checkupID: number,
) {
  return axios.post(base_url + '/checkups/POST_TECH/' + checkupID, data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function getDrivers(token: string, page: number, searchTerm: string) {
  return axios.get<SearchResponse<DriverFromSearch>>(
    base_url + '/employees/drivers/brief',
    {
      headers: {Authorization: token, 'Content-Type': 'application/json'},
      params:
        searchTerm === ''
          ? {
              pageNum: page,
              pageSize: 10,
              // filters: 'status|ACTIVE',
            }
          : {
              pageNum: page,
              pageSize: 10,
              search: searchTerm,
              // filters: 'status|ACTIVE',
            },
    },
  );
}

export function getLastVehicleId(driver_id: number, token: string) {
  return axios.get<number>(
    base_url + '/waybills/last_vehicle/driver/' + driver_id,
    {
      headers: {Authorization: token, 'Content-Type': 'application/json'},
    },
  );
}

export function getVehicle(id: number, token: string) {
  return axios.get<Vehicle>(base_url + '/vehicles/' + id, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function createReport(data: CreateReportBody, token: string) {
  return axios.post(base_url + '/waybills', data, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  });
}

export function getVehicles(token: string, page: number, searchTerm: string) {
  return axios.get<SearchResponse<VehicleFromSearch>>(
    base_url + '/vehicles/brief',
    {
      headers: {Authorization: token, 'Content-Type': 'application/json'},
      params:
        searchTerm === ''
          ? {
              pageNum: page,
              pageSize: 10,
            }
          : {
              pageNum: page,
              pageSize: 10,
              search: searchTerm,
            },
    },
  );
}
