window.addEventListener('DOMContentLoaded', () => {  
  // ✨ Destructure Firestore fns
  const {db} = window;
  const {collection, doc, updateDoc, onSnapshot} = window.firestore;

  // ✨ Audio sources 
  const cawcaw1 = new Audio('assets/audio/cawcaw-1.mp3');
  const cawcaw2 = new Audio('assets/audio/cawcaw-2.mp3');
  const cawcaw3 = new Audio('assets/audio/cawcaw-3.mp3');
  const cawcaw4 = new Audio('assets/audio/cawcaw-4.mp3');
  const cawcawList = [cawcaw1, cawcaw2, cawcaw3, cawcaw4];

  const woopwoop1 = new Audio('assets/audio/woopwoop-1.mp3');
  const woopwoop2 = new Audio('assets/audio/woopwoop-2.mp3');
  const woopwoop3 = new Audio('assets/audio/woopwoop-3.mp3');
  const woopwoop4 = new Audio('assets/audio/woopwoop-4.mp3');
  const woopwoopList = [woopwoop1, woopwoop2, woopwoop3, woopwoop4];
  
  const wifive1 = new Audio('assets/audio/wifive-1.mp3');
  const wifive2 = new Audio('assets/audio/wifive-2.mp3');
  const wifive3 = new Audio('assets/audio/wifive-3.mp3');
  const wifive4 = new Audio('assets/audio/wifive-4.mp3');
  const wifiveList = [wifive1, wifive2, wifive3, wifive4];

  const measure1 = new Audio('assets/audio/measure-1.mp3');
  const measure2 = new Audio('assets/audio/measure-2.mp3');
  const measure3 = new Audio('assets/audio/measure-3.mp3');
  const measure4 = new Audio('assets/audio/measure-4.mp3');
  const measureList = [measure1, measure2, measure3, measure4];

  const cheers1 = new Audio('assets/audio/cheers-1.mp3');
  const cheers2 = new Audio('assets/audio/cheers-2.mp3');
  const cheers3 = new Audio('assets/audio/cheers-3.mp3');
  const cheers4 = new Audio('assets/audio/cheers-4.mp3');
  const cheersList = [cheers1, cheers2, cheers3, cheers4];

  const choochoo1 = new Audio('assets/audio/choochoo-1.mp3');
  const choochoo2 = new Audio('assets/audio/choochoo-2.mp3');
  const choochoo3 = new Audio('assets/audio/choochoo-3.mp3');
  const choochoo4 = new Audio('assets/audio/choochoo-4.mp3');
  const choochooList = [choochoo1, choochoo2, choochoo3, choochoo4];

  const goodvibes1 = new Audio('assets/audio/goodvibes-1.mp3');
  const goodvibes2 = new Audio('assets/audio/goodvibes-2.mp3');
  const goodvibes3 = new Audio('assets/audio/goodvibes-3.mp3');
  const goodvibes4 = new Audio('assets/audio/goodvibes-4.mp3');
  const goodvibesList = [goodvibes1, goodvibes2, goodvibes3, goodvibes4];

  const itme1 = new Audio('assets/audio/itme-1.mp3');
  const itme2 = new Audio('assets/audio/itme-2.mp3');
  const itme3 = new Audio('assets/audio/itme-3.mp3');
  const itme4 = new Audio('assets/audio/itme-4.mp3');
  const itmeList = [itme1, itme2, itme3, itme4];

  const sparkle1 = new Audio('assets/audio/sparkle-1.mp3');
  const sparkle2 = new Audio('assets/audio/sparkle-2.mp3');
  const sparkle3 = new Audio('assets/audio/sparkle-3.mp3');
  const sparkle4 = new Audio('assets/audio/sparkle-4.mp3');
  const sparkleList = [sparkle1, sparkle2, sparkle3, sparkle4];

  const womp1 = new Audio('assets/audio/womp-1.mp3');
  const womp2 = new Audio('assets/audio/womp-2.mp3');
  const womp3 = new Audio('assets/audio/womp-3.mp3');
  const womp4 = new Audio('assets/audio/womp-4.mp3');
  const wompList = [womp1, womp2, womp3, womp4];

  const bye1 = new Audio('assets/audio/bye-1.mp3');
  const bye2 = new Audio('assets/audio/bye-2.mp3');
  const bye3 = new Audio('assets/audio/bye-3.mp3');
  const bye4 = new Audio('assets/audio/bye-4.mp3');
  const byeList = [bye1, bye2, bye3, bye4];

  // ✨ HTML Elements
  $containerAllBtns = document.querySelector('#container-all-btns');
  $containerReady = document.querySelector('#ready');

  $btnCawCaw = document.querySelector('#cawcaw');
  $btnWoopWoop = document.querySelector('#woopwoop');
  $btnWiFive = document.querySelector('#wifive');
  $btnMeasure = document.querySelector('#measure');
  $btnCheers = document.querySelector('#cheers');
  $btnChooChoo = document.querySelector('#choochoo');
  $btnGoodVibes = document.querySelector('#goodvibes');
  $btnItMe = document.querySelector('#itme');
  $btnSparkle = document.querySelector('#sparkle');
  $btnWomp = document.querySelector('#womp');
  $btnReset = document.querySelector('#reset');
  $btnReady = document.querySelector('#btn-ready');
  $btnBye = document.querySelector('#bye');

  $counterCawCaw = document.querySelector('#counter-cawcaw');
  $counterWoopWoop = document.querySelector('#counter-woopwoop');
  $counterWiFive = document.querySelector('#counter-wifive');
  $counterMeasure = document.querySelector('#counter-measure');
  $counterCheers = document.querySelector('#counter-cheers');
  $counterChooChoo = document.querySelector('#counter-choochoo');
  $counterGoodVibes = document.querySelector('#counter-goodvibes');
  $counterItMe = document.querySelector('#counter-itme');
  $counterSparkle = document.querySelector('#counter-sparkle');
  $counterWomp = document.querySelector('#counter-womp');
  $counterBye = document.querySelector('#counter-bye');


  // ✨ Set up Firestore
  const appRef = collection(db, "app");
  const stateRef = doc(db, "app", "state");
  let appState = { 
    cawcaw: 0,
    woopwoop: 0,
    wifive: 0,
    measure: 0,
    cheers: 0,
    choochoo: 0,
    goodvibes: 0,
    itme: 0,
    sparkle: 0,
    womp: 0,
    bye: 0,
    soundBiteIndex: 0,
    isLoaded: false,
  };
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
      cheers: cheersCount,
      choochoo: choochooCount,
      goodvibes: goodvibesCount,
      itme: itmeCount,
      sparkle: sparkleCount,
      womp: wompCount,
      bye: byeCount,
      isLoaded,
    } = appState;

    if (!isLoaded) return; 

    $counterCawCaw.innerText = cawcawCount || "";
    $counterWoopWoop.innerText = woopwoopCount || "";
    $counterWiFive.innerText = wifiveCount || "";
    $counterMeasure.innerText = measureCount || "";
    $counterCheers.innerText = cheersCount || "";
    $counterChooChoo.innerText = choochooCount || "";
    $counterGoodVibes.innerText = goodvibesCount || "";
    $counterItMe.innerText = itmeCount || "";
    $counterSparkle.innerText = sparkleCount || "";
    $counterWomp.innerText = wompCount || "";
    $counterBye.innerText = byeCount || "";
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
      cawcawList[nextState.soundBiteIndex].cloneNode(true).play();
    };

    if (countHasChangedFor('woopwoop', appAudioState) && nextState.woopwoop) {
      woopwoopList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('wifive', appAudioState) && nextState.wifive) {
      wifiveList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('measure', appAudioState) && nextState.measure) {
      measureList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('cheers', appAudioState) && nextState.cheers) {
      cheersList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('choochoo', appAudioState) && nextState.choochoo) {
      choochooList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('goodvibes', appAudioState) && nextState.goodvibes) {
      goodvibesList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('itme', appAudioState) && nextState.itme) {
      itmeList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('sparkle', appAudioState) && nextState.sparkle) {
      sparkleList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('womp', appAudioState) && nextState.womp) {
      wompList[nextState.soundBiteIndex].cloneNode(true).play();
    }

    if (countHasChangedFor('bye', appAudioState) && nextState.bye) {
      byeList[nextState.soundBiteIndex].cloneNode(true).play();
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

  const randomizedIndex = () => { 
    const nextIndex = Math.round(Math.random() * 3);

    return nextIndex !== appState.soundBiteIndex ? nextIndex : randomizedIndex();
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
    await updateDoc(doc(appRef, "state"), { cawcaw: appState.cawcaw + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnWoopWoop.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { woopwoop: appState.woopwoop + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnWiFive.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { wifive: appState.wifive + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnMeasure.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { measure: appState.measure + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnCheers.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { cheers: appState.cheers + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnChooChoo.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { choochoo: appState.choochoo + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnGoodVibes.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { goodvibes: appState.goodvibes + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnItMe.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { itme: appState.itme + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnSparkle.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { sparkle: appState.sparkle + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnWomp.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { womp: appState.womp + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnBye.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), { bye: appState.bye + 1, soundBiteIndex: randomizedIndex() });
  });

  $btnReset.addEventListener('click', async (event) => {
    await updateDoc(doc(appRef, "state"), {
      cawcaw: 0,
      woopwoop: 0,
      wifive: 0,
      measure: 0,
      cheers: 0,
      choochoo: 0,
      goodvibes: 0,
      itme: 0,
      sparkle: 0,
      womp: 0,
      bye: 0,
    });
  });
});
