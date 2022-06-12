window.addEventListener('DOMContentLoaded', () => {  
  $containerAllBtns = document.querySelector('#container-all-btns');

  $btnCawCaw = document.querySelector('#cawcaw');
  $btnWoopWoop = document.querySelector('#woopwoop');
  $btnWiFive = document.querySelector('#wifive');
  $btnMeasure = document.querySelector('#measure');
  $btnReset = document.querySelector('#reset');

  $counterCawCaw = document.querySelector('#counter-cawcaw');
  $counterWoopWoop = document.querySelector('#counter-woopwoop');
  $counterWiFive = document.querySelector('#counter-wifive');
  $counterMeasure = document.querySelector('#counter-measure');

  let cawcawCount = 0;
  let woopwoopCount = 0;
  let wifiveCount = 0;
  let measureCount = 0;

  $btnCawCaw.addEventListener('click', (event) => {
    cawcawCount++;
    $counterCawCaw.innerText = cawcawCount;
    console.log(event);
  });

  $btnWoopWoop.addEventListener('click', (event) => {
    woopwoopCount++;
    $counterWoopWoop.innerText = woopwoopCount;
    console.log(event);
  });

  $btnWiFive.addEventListener('click', (event) => {
    wifiveCount++;
    $counterWiFive.innerText = wifiveCount;
    console.log(event);
  });

  $btnMeasure.addEventListener('click', (event) => {
    measureCount++;
    $counterMeasure.innerText = measureCount;
    console.log(event);
  });

  $btnReset.addEventListener('click', (event) => {
    cawcawCount = 0;
    $counterCawCaw.innerText = '';
    
    woopwoopCount = 0;
    $counterWoopWoop.innerText = '';
    
    wifiveCount = 0;
    $counterWiFive.innerText = '';
    
    measureCount = 0;
    $counterMeasure.innerText = '';
  });

  // Events on button clicks will bubble up parents
  // Capturing click event on parent which will use to reset counter
  $containerAllBtns.addEventListener('click', (event) => {
    console.log('target event', event.target)
  });

});
