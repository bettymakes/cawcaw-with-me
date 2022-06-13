window.addEventListener('DOMContentLoaded', () => {  
  // ✨ Destructure Firestore fns
  const {db} = window;
  const {collection, doc, updateDoc, onSnapshot} = window.firestore;

  // ✨ Audio sources 
  // TODO: Update audio sources with real ones
  const lion = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
  const thump = new Audio('assets/audio/thump.mp3');

  // ✨ HTML Elements
  $containerAllBtns = document.querySelector('#container-all-btns');
  $containerReady = document.querySelector('#ready');

  $btnCawCaw = document.querySelector('#cawcaw');
  $btnWoopWoop = document.querySelector('#woopwoop');
  $btnWiFive = document.querySelector('#wifive');
  $btnMeasure = document.querySelector('#measure');
  $btnReset = document.querySelector('#reset');
  $btnReady = document.querySelector('#btn-ready');

  $counterCawCaw = document.querySelector('#counter-cawcaw');
  $counterWoopWoop = document.querySelector('#counter-woopwoop');
  $counterWiFive = document.querySelector('#counter-wifive');
  $counterMeasure = document.querySelector('#counter-measure');

  // ✨ Set up Firestore
  const appRef = collection(db, "app");
  const stateRef = doc(db, "app", "state");
  let appState = { cawcaw: 0, woopwoop: 0, isLoaded: false };
  let userIsReady = false;
  
  const unsub = onSnapshot(stateRef, (doc) => {
    const prevState = {
      ...appState
    };

    // Update appState with data from Firestore
    appState = {
      ...appState,
      ...doc.data(),
      isLoaded: true,
    };

    // Once connected to Firestore, render the updated data
    render();

    // Triggers playing sound if any value on Firestore changes
    playSoundOnChange(prevState, appState);
  });

  const render = () => {
    const {
      cawcaw: cawcawCount,
      woopwoop: woopwoopCount,
      wifive: wifiveCount,
      measure: measureCount,
      isLoaded,
    } = appState;

    if (!isLoaded) return; 

    $counterCawCaw.innerText = cawcawCount || "";
    $counterWoopWoop.innerText = woopwoopCount || "";
    $counterWiFive.innerText = wifiveCount || "";
    $counterMeasure.innerText = measureCount || "";
  };

  const playSoundOnChange = (prevState, nextState) => {
    // Don't play sound if Firestore connection is not ready OR if user is not ready 
    if (!prevState.isLoaded || !userIsReady) return;
    
    appAudioState = {
      prevState,
      nextState
    };

    // Verify count for sound has changed, and the updated count is not 0
    if (countHasChangedFor('cawcaw', appAudioState) && nextState.cawcaw) {
      // TODO: replace sound
      lion.cloneNode(true).play();
    };

    if (countHasChangedFor('woopwoop', appAudioState) && nextState.woopwoop) {
      // TODO: replace sound
      thump.cloneNode(true).play();
    }

    if (countHasChangedFor('wifive', appAudioState) && nextState.wifive) {
      // TODO: replace sound
      lion.cloneNode(true).play();
    }

    if (countHasChangedFor('measure', appAudioState) && nextState.measure) {
      // TODO: replace sound
      thump.cloneNode(true).play();
    }

    console.log('ps', prevState);
    console.log('ns', nextState);
  };

  const countHasChangedFor = (soundName, appAudioState) => {
    const {
      prevState,
      nextState,
    } = appAudioState;

    return prevState[soundName] !== nextState[soundName];
  };

  // ✨ Event listeners
  $btnReady.addEventListener('click', () => {
    // Needed to add a "ready" button to trigger a user event, otherwise play() will fail
    // See screencap of error: https://bit.ly/3MPVG1z
    // Docs referenced in error: https://goo.gl/xX8pDD

    $containerReady.classList.remove('show');
    $containerReady.classList.add('hide');

    $containerAllBtns.classList.remove('hide');
    $containerAllBtns.classList.add('show');

    userIsReady = true;
  });
  
  $btnCawCaw.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { cawcaw: appState.cawcaw + 1 });
  });

  $btnWoopWoop.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { woopwoop: appState.woopwoop + 1 });
  });

  $btnWiFive.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { woopwoop: appState.wifive + 1 });
  });

  $btnMeasure.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { woopwoop: appState.measure + 1 });
  });

  $btnReset.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), {
      cawcaw: 0,
      woopwoop: 0,
      wifive: 0,
      measure: 0,
    });
  });
});
