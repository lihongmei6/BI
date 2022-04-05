interface UrlObj {
  development: string;
  production: string;
}
// 接口地址
const baseURLObj: UrlObj = {
  // development: "http://127.0.0.1:4523/mock/727321/", //mock服务器
  development: "http://127.0.0.1:19102/", //本地服务器
  // development: "http://10.1.10.142:19102/", //本地服务器
  production: "http://gzh.hzzsfs.com/api/", //生产服务器
};
export const baseURL = baseURLObj[process.env.NODE_ENV as keyof UrlObj];
