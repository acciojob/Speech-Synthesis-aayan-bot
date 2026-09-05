// Set default utterance text from the textarea
  msg.text = document.querySelector('[name="text"]').value;

  // Populate available voices into the dropdown
  function populateVoices() {
    voices = this.getVoices();
    if (voices.length === 0) {
      voicesDropdown.innerHTML = '<option value="">No voices available</option>';
      return;
    }
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set the voice selected by the user
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  // Play, restart, or stop speech synthesis
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver && msg.text.trim().length > 0) {
      speechSynthesis.speak(msg);
    }
  }

  // Update utterance settings (rate, pitch, text) dynamically
  function setOption() {
    msg[this.name] = this.value;
    toggle();
  }

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));