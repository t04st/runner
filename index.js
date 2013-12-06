var t04st = function( runner, root ) {
  var suites = {};
  runner.on('suite', function( suite ) {
    if(suite.title.length) {
      suites[suite.title] = [];
    }
    console.log("#cSuite: " + suite.title, 'color: blue');
  });
  runner.on('test end', function( test ) {
    var parent = suites[test.parent.title];
    if(parent) {
      parent.push({
        title: test.title,
        status: (test.state !== 'failed')
      });
    }
    if(test.state === 'failed') {
      console.log('%c Test failed: ' + test.parent.title + '::' + test.title, "color: red");
    }
    else {
      console.log('%c Test passed: ' + test.parent.title + '::' + test.title, "color: #67a017");
    }
  });
  runner.on('end', function() {
    console.log('done');

  });
};
if (window.mocha) {
  mocha.reporter(t04st);
} else {
  window.t04st = t04st;
}
