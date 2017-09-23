import { ColorModule } from './modules/colorModule.js';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.form');

  ColorModule.init({form: form});
  console.log(ColorModule);
});
