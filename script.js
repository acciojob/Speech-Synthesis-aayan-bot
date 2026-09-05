// Populate voices on load and on voiceschanged
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      voicesDropdown.innerHTML = '<option value="">No voices available</option>';
      return;
    }
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();

    const textInput = document.querySelector('[name="text"]').value;
    
    if (!textInput || textInput.trim().length === 0) {
      return;
    }

    msg.text = textInput;

    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    // Explicitly update property on the SpeechSynthesisUtterance instance
    msg[this.name] = this.value;
    
    // Only restart speech if text exists
    const textInput = document.querySelector('[name="text"]').value.trim();
    if (textInput.length > 0) {
      toggle();
    }
  }

  // Initial call to load voices immediately if available
  populateVoices();

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);

  // Listen for both 'change' and 'input' events so range sliders update instantly in tests
  options.forEach(option => {
    option.addEventListener('change', setOption);
    option.addEventListener('input', setOption);
  });

  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));