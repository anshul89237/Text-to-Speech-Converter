const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const error = document.querySelector(".error-para");
const voiceSelect = document.getElementById("voiceSelect");
const rateRange = document.getElementById("rateRange");
const rateValue = document.getElementById("rateValue");

const synth = window.speechSynthesis;
let utterance = null;


function populateVoices() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}



if (typeof speechSynthesis !== "undefined") {
    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }
}



rateRange.addEventListener("input", () => {
    rateValue.textContent = rateRange.value;
});



convertBtn.addEventListener("click", () => {
    const enteredText = text.value.trim();
    if (!enteredText) {
        error.textContent = "❗ Please enter some text.";
        return;
    }

    error.textContent = "";
    utterance = new SpeechSynthesisUtterance(enteredText);

    const voices = synth.getVoices();
    const selectedVoiceIndex = voiceSelect.value;
    utterance.voice = voices[selectedVoiceIndex];

    utterance.rate = parseFloat(rateRange.value);

    convertBtn.disabled = true;
    stopBtn.disabled = false;

    synth.speak(utterance);

    utterance.onend = () => {
        convertBtn.disabled = false;
        stopBtn.disabled = true;
    };
});


stopBtn.addEventListener("click", () => {
    if (synth.speaking) {
        synth.cancel();
        convertBtn.disabled = false;
        stopBtn.disabled = true;
    }
});


resetBtn.addEventListener("click", () => {
    text.value = "";
    error.textContent = "";
    convertBtn.disabled = false;
    stopBtn.disabled = true;
});
