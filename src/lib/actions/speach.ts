"use client";

export function speak(text: string, lang: string, pitch = 1, rate = 1) {
  const dataMapping = new Map();
  dataMapping.set("polish", {
    languageCode: "pl-PL",
    voiceName: "Zosia"
  });
  dataMapping.set("english", {
    languageCode: "en-GB",
    voiceName: "Daniel"
  });

  const languageSettings = dataMapping.get(lang);
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();

  for (const voice of voices) {
    if (
      voice.name === languageSettings.voiceName &&
      voice.lang === languageSettings.languageCode
    ) {
      utterThis.voice = voice;
    }
  }

  utterThis.pitch = pitch;
  utterThis.rate = rate;

  synth.speak(utterThis);
}
