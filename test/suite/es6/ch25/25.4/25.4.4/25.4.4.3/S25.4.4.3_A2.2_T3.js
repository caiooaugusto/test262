// Copyright 2014 Cubane Canada, Inc.  All rights reserved.
// See LICENSE for details.

/*---
info: > 
    Promise.race rejects when GetIterator() returns an abrupt completion
    4. Let iterator be GetIterator(iterable).
    5. IfAbruptRejectPromise(iterator, promiseCapability)

author: Sam Mikes
description: Promise.race rejects if GetIterator throws
---*/

var iterThrows = {};
Object.defineProperty(iterThrows, Symbol.iterator, {
    get: function () {
        throw new Error("abrupt completion");
    }
});

Promise.race(iterThrows).then(function () {
    $ERROR('Promise unexpectedly fulfilled: Promise.race(iterThrows) should throw');
}, function (err) {
    if (!(err instanceof Error)) {
        $ERROR('Expected Promise to be rejected with an error, got ' + err);
    }
}).then($DONE, $DONE);

