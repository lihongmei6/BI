import request, { IAxiosResponse } from "@/utils/request";
import { OrderReq, OrderRes } from "@/interface/mes/order";
import { GroupReq, GroupRes } from "@/interface/mes/group";
import { LineReq, LineRes } from "@/interface/mes/line";
import { DepartmentReq, DepartmentRes } from "@/interface/mes/department";
export const mesOrder = (
  params: OrderReq
): Promise<IAxiosResponse<OrderRes>> => {
  return request.get("/v1/mes/order", params);
};

export const mesGroup = (
  params: GroupReq
): Promise<IAxiosResponse<GroupRes>> => {
  return request.get("/v1/mes/group", params);
};

export const mesLine = (params: LineReq): Promise<IAxiosResponse<LineRes>> => {
  return request.get("/v1/mes/line", params);
};

export const mesDepartment = (
  params: DepartmentReq
): Promise<IAxiosResponse<DepartmentRes>> => {
  return request.get("/v1/mes/department", params);
};
