import login from "./login";
import logout from "./logout";
import refresh from "./refresh";
import register from "./register";

export default {
  path: "/",
  routers: [login, logout, refresh, register],
};
