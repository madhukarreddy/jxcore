// Copyright & License details are available under JXCORE_LICENSE file

/*
 This unit is testing if possible is to execute:
 require("../common.js")
 from inside  define()
 */


var assert = require('assert');

jxcore.tasks.on('message', function (threadId, msg) {
  assert.ifError(msg, msg);
});


var task = {};
task.define = function () {
  try {
    var common = require("../common.js");
  } catch (ex) {
    process.sendToMain("Cannot require from inside define(): " + ex + "\n__dirname = " + __dirname);
  }

  try {
    var common = require(__filename);
  } catch (ex) {
    process.sendToMain("Cannot require __filename from inside addTask(method): " + ex + "\n__filename = " + __filename);
  }
};

// when in main thread
if (process.threadId == -1) {
  jxcore.tasks.addTask(task);
}


