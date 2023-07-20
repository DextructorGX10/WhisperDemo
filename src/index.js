// app.js
const startButton = document.getElementById('startButton')
const outputDiv = document.getElementById('output')
const recognition = new webkitSpeechRecognition() // For Chrome/Edge support

let interimTranscript = '' // Use 'let' instead of 'const'
let finalTranscript = ''  // Use 'let' instead of 'const'

// When the user starts speaking
recognition.onstart = () => {
  startButton.textContent = 'Listening...'
}

// When speech is detected and transcribed
recognition.onresult = (event) => {
  interimTranscript = '' // Clear interimTranscript on each result
  finalTranscript = ''   // Clear finalTranscript on each result

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript
    } else {
      interimTranscript += event.results[i][0].transcript
    }
  }

  // Output interim and final transcriptions
  outputDiv.innerHTML = `
    <p>Interim Transcription: ${interimTranscript}</p>
    <p>Final Transcription: ${finalTranscript}</p>
  `

  // Pass the text data to a Python file using Axios to send a POST request
  // to the server-side script.
  axios.post('../src/index.py', { textData: finalTranscript })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error))
}

// When the user stops speaking
recognition.onend = () => {
  startButton.textContent = 'Start Listening'
}

// If an error occurs
recognition.onerror = (event) => {
  console.error('Error occurred in recognition: ', event.error)
}

// Start listening when the button is clicked
startButton.addEventListener('click', () => {
  recognition.start()
})
