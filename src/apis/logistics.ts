import request, { IAxiosResponse } from "@/utils/request";
import {
  LogisticsInfoReq,
  LogisticsInfoRes,
  LogisticsRankingReq,
  LogisticsRankingRes,
} from "@/interface/logistics";

export const logistics = (
  params: LogisticsInfoReq
): Promise<IAxiosResponse<LogisticsInfoRes>> => {
  return request.get("/v1/logistics/info", params);
};

export const logisticsRanking = (
  params: LogisticsRankingReq
): Promise<IAxiosResponse<LogisticsRankingRes>> => {
  return request.get("/v1/logistics/ranking", params);
};
