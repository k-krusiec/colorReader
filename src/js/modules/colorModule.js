var ColorModule = (function () {
  var options = {};
  var rgbColor = {};

  var hexToRgb = function (color, outputs) {
    rgbColor.r = parseInt(color.substring(0, 2), 16);
    rgbColor.g = parseInt(color.substring(2, 4), 16);
    rgbColor.b = parseInt(color.substring(4, 6), 16);

    outputs[1].lastElementChild.innerHTML = '<span class="value-name">R: </span>' + rgbColor.r + '<span class="value-name"> G: </span>' + rgbColor.g + '<span class="value-name"> B: </span>' + rgbColor.b;
  };

  var hexToCmyk = function (color, outputs) {
    var colorC = 0;
    var colorM = 0;
    var colorY = 0;
    var colorK = 0;
    var cmyk;
    var minCMY;

    if (rgbColor.r === 0 && rgbColor.g === 0 && rgbColor.b === 0) {
      colorK = 1;
      cmyk = [0, 0, 0, 1];
    } else {
      colorC = 1 - (rgbColor.r / 255);
      colorM = 1 - (rgbColor.g / 255);
      colorY = 1 - (rgbColor.b / 255);

      minCMY = Math.min(colorC, Math.min(colorM, colorY));

      colorC = Math.ceil((colorC - minCMY) / (1 - minCMY) * 100);
      colorM = Math.ceil((colorM - minCMY) / (1 - minCMY) * 100);
      colorY = Math.ceil((colorY - minCMY) / (1 - minCMY) * 100);
      colorK = Math.ceil(minCMY * 100);

      cmyk = [colorC, colorM, colorY, colorK];
    }

    outputs[0].lastElementChild.innerHTML = '<span class="value-name">C: </span>' + cmyk[0] + '%<span class="value-name"> M: </span>' + cmyk[1] + '%<span class="value-name"> Y: </span>' + cmyk[2] + '%<span class="value-name"> K: </span>' + cmyk[3] + '%';
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
      hexToCmyk(color, outputs);
      setOutputColor(color, outputColor);
      return true;
    }
  };

  var getElements = function () {
    var form = options.form;
    var colorInput = options.form.querySelector('[name="enter-color"]');
    var outputColor = options.output.querySelector('.output-color');
    var outputs = options.output.querySelectorAll('.output');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      testColorInput(colorInput, outputColor, outputs);
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

    getElements();
  };
  return {
    init: init
  };
})();

export { ColorModule };
