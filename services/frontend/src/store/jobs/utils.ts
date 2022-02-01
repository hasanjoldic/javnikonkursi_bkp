import { STATIC_PATH } from "env";

export function getJobInternalUrl(id: string) {
  return `${STATIC_PATH}/${id}`;
}
