import {RequestStatus} from "./RequestStatus";
import {RequestAction} from "./RequestAction";

export interface Request {
  reqId: number,
  facilityId: number,
  status: RequestStatus,
  action: RequestAction,
  reqUserId: number,
  attributes: Object,
  modifiedAt: string,
  modifiedBy: number
}
