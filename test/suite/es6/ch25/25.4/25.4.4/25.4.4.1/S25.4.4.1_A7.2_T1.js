// Copyright 2014 Cubane Canada, Inc.  All rights reserved.
// See LICENSE for details.

/*---
info: >
    Promise.all with 1-element array
    should accept an array with settled promise
author: Sam Mikes
description: Promise.all() accepts a one-element array
includes: [PromiseHelper.js]
---*/

var sequence = [];

var p1 = new Promise(function (resolve) { resolve({}); } );

sequence.push(1);

Promise.all([p1]).then(function (resolved) {
    sequence.push(4);
    checkSequence(sequence, "Expected Promise.all().then to queue second");
}).catch($DONE);

p1.then(function () {
    sequence.push(3);
    checkSequence(sequence, "Expected p1.then to queue first");
}).then(function () {
    sequence.push(5);
    checkSequence(sequence, "Expected final then to queue last");
}).then($DONE, $DONE);

sequence.push(2);
