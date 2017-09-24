import { ColorModule } from './modules/colorModule.js';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.form');
  var outputBox = document.querySelector('.output-box');

  ColorModule.init({form: form, outputBox: outputBox});
});
