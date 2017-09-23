var ColorModule = (function () {
  var options = {};
  var init = function (_options) {
    options = {
      form: _options.form || null
    };

    if (_options.form === null || _options.form === undefined || _options.form === 0) {
      console.warn('ColorModule: Źle przekazany kalendarz!');
      return false;
    }
  };
  return {
    init: init
  };
})();

export { ColorModule };
