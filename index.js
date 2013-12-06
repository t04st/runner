(function() {
  var t04st;
  t04st = function( conf, root ) {
    // If being called from mocha.run()
    if( window.Mocha && conf instanceof Mocha.Runner ) {
      var runner = conf;
      var suites = {};
      runner.on('suite', function( suite ) {
        if(suite.title.length) {
          suites[suite.title] = [];
          console.log("%cSuite: " + suite.title, 'color: blue');
        }
      });
      runner.on('test end', function( test ) {
        var parent = suites[test.parent.title];
        if(parent) {
          parent.push({
            title: test.title,
            state: test.state
          });
        }
        if(test.state === 'failed') {
          console.log('%cTest failed: ' + test.parent.title + '::' + test.title, "color: red");
        }
        else {
          console.log('%cTest passed: ' + test.parent.title + '::' + test.title, "color: #67a017");
        }
      });
      runner.on('end', function() {
        $.ajax({
          url: 'http://t04st.com/' + t04st.conf.org + '/' + t04st.conf.name + '/' + t04st.conf.version,
          type: "POST",
          crossDomain: true,
          data: {
            userAgent: navigator.userAgent,
            results: {
              suites: suites
            }
          },
          dataType: "json"
        });
      });
    }
    else {
      t04st.conf = conf;
    }
  };

  t04st.conf = {};
  window.t04st = t04st;
  if (window.mocha) {
    mocha.reporter(t04st);
  }
})()
