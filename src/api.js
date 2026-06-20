// Helper functions to call backend endpoints

export async function speechToText(audioContent) {
  const res = await fetch('/api/speech-to-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioContent })
  });
  return res.json();
}

export async function textToSpeech(text) {
  const res = await fetch('/api/text-to-speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

export async function describeImage(imageContent) {
  const res = await fetch('/api/describe-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageContent })
  });
  return res.json();
} 