// Populate voices on page load and on voiceschanged
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
    const textInput = document.querySelector('[name="text"]').value.trim();
    if (textInput.length > 0) {
      toggle();
    }
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();

    const textInput = document.querySelector('[name="text"]').value;
    
    // Stop immediately if text area is empty or whitespace-only
    if (!textInput || textInput.trim().length === 0) {
      return;
    }

    msg.text = textInput;

    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    msg[this.name] = this.value;
    const textInput = document.querySelector('[name="text"]').value.trim();
    if (textInput.length > 0) {
      toggle();
    }
  }

  // Initial call to catch voices if already loaded synchronously
  populateVoices();

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));