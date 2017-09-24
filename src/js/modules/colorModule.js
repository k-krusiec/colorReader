var ColorModule = (function () {
  var options = {};
  var rgbColor = {};

  var hexToRgb = function (color, outputs) {
    rgbColor.r = parseInt(color.substring(0, 2), 16);
    rgbColor.g = parseInt(color.substring(2, 4), 16);
    rgbColor.b = parseInt(color.substring(4, 6), 16);

    outputs[1].lastElementChild.innerText = 'R: ' + rgbColor.r + ' G: ' + rgbColor.g + ' B: ' + rgbColor.b;
  };

  var setOutputColor = function (color, outputColor) {
    outputColor.style.backgroundColor = '#' + color;
  };

  var testColorInput = function (input, outputColor, outputs) {
    var color = input.value;
    var isValid = true;

    color = color.replace(/#/g, '');

    if (!color) {
      console.log('to pole jest wymagane');
      isValid = false;
    } else if (color.length !== 6) {
      console.log('numer hex powinien mieć 6 znaków');
      isValid = false;
    }

    if (isValid) {
      hexToRgb(color, outputs);
      setOutputColor(color, outputColor)
      return true;
    }
  };

  var prepareElements = function () {
    var form = options.form;
    var colorInput = options.form.querySelector('[name="enter-color"]');
    var outputColor = options.output.querySelector('.output-color');
    var outputs = options.output.querySelectorAll('.output');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      testColorInput(colorInput, outputColor, outputs);
      // this.submit();
    });
  };

  var init = function (_options) {
    options = {
      form: _options.form || null,
      output: _options.outputBox || null
    };

    if (_options.form === null || _options.form === undefined || _options.form === 0) {
      console.warn('ColorModule: Źle przekazany kalendarz!');
      return false;
    }

    prepareElements();
  };
  return {
    init: init
  };
})();

export { ColorModule };
