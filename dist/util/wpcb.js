"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wpcb = wpcb;

function wpcb(err, stats) {
  if (err || stats.hasErrors()) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < stats.compilation.errors.length; i++) {
        var error = stats.compilation.errors[i];
        console.log(error);
      }
    }
  } else {
    console.log('Finished building');
  }
}