import {ClientIdNameAddress} from "./ClientIdNameAddress";
import {UserSessionSummary} from "./UserSessionSummary";

export class ClientAndSessionDetails {
  clientIdNameAddress: ClientIdNameAddress;
  sessions: UserSessionSummary[];
  filerDate: string;
  selectedDate: Date;
}
