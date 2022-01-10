import get from "./get";
import getOne from "./getOne";
import post from "./post";
import patch from "./patch";
import deleteRoute from "./delete";

export default {
  path: "/",
  routers: [get, getOne, post, patch, deleteRoute],
};

export * from "./get";
export * from "./getOne";
export * from "./post";
export * from "./patch";
export * from "./delete";
export * from "./utils";
