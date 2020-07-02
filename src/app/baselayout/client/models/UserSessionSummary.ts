import {Time} from "@angular/common";

export class UserSessionSummary {
  sessionId: string;
  date: string;
  availableToken: number;
  nextAvailableToken: number;
  noOfTokens: number;
  fromTime: Time;
  toTime: Time;
  booked: boolean;
  tokenNumber: string;
}
