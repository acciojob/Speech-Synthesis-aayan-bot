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
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();

    // Always fetch current textarea text directly when toggle runs
    const textInput = document.querySelector('[name="text"]').value;
    msg.text = textInput;

    if (startOver && textInput.trim().length > 0) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    msg[this.name] = this.value;
    toggle();
  }

  // Initial call to catch voices if already loaded synchronously
  populateVoices();

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));

  stopButton.addEventListener('click', () => toggle(false));