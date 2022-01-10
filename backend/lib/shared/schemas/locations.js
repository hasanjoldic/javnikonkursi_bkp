"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locations = exports.SpecialLocation = exports.Regija = exports.Canton = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Canton;
exports.Canton = Canton;

(function (Canton) {
  Canton["Unsko-sanski kanton"] = "Unsko-sanski kanton";
  Canton["Posavski kanton"] = "Posavski kanton";
  Canton["Tuzlanski kanton"] = "Tuzlanski kanton";
  Canton["Zenicko-dobojski kanton"] = "Zenicko-dobojski kanton";
  Canton["Bosansko-podrinjski kanton"] = "Bosansko-podrinjski kanton";
  Canton["Srednjobosanski kanton"] = "Srednjobosanski kanton";
  Canton["Hercegovacko-neretvanski kanton"] = "Hercegovacko-neretvanski kanton";
  Canton["Zapadnohercegovacki kanton"] = "Zapadnohercegovacki kanton";
  Canton["Kanton Sarajevo"] = "Kanton Sarajevo";
  Canton["Kanton 10"] = "Kanton 10";
})(Canton || (exports.Canton = Canton = {}));

var Regija;
exports.Regija = Regija;

(function (Regija) {
  Regija["Banjalucka regija"] = "Banjalucka regija";
  Regija["Dobojsko-bijeljinska regija"] = "Dobojsko-bijeljinska regija";
  Regija["Sarajevsko-zvornicka regija"] = "Sarajevsko-zvornicka regija";
  Regija["Trebinjsko-focanska regija"] = "Trebinjsko-focanska regija";
})(Regija || (exports.Regija = Regija = {}));

var SpecialLocation;
exports.SpecialLocation = SpecialLocation;

(function (SpecialLocation) {
  SpecialLocation["Brcko distrikt"] = "Brcko distrikt";
})(SpecialLocation || (exports.SpecialLocation = SpecialLocation = {}));

var locations = [].concat(_toConsumableArray(Object.values(Canton)), _toConsumableArray(Object.values(Regija)), _toConsumableArray(Object.values(SpecialLocation)));
exports.locations = locations;