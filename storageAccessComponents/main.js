import { get } from "./get.js";
import { set } from "./set.js";
export var main = {
  respond: function (data, status, callback) {
    callback({ status: status, data: data });
  },
  set: set,
  get: get,
};
