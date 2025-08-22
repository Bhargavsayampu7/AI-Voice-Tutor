# SpeakGenie - AI Voice Tutor

An interactive AI-powered voice tutor designed to help children aged 6-12 learn and practice conversation skills in multiple languages.

## Features

- **Multi-language Support**: English, Hindi, Telugu
- **Voice Chat**: Natural conversation with Genie, the AI tutor
- **Roleplay Scenarios**: Interactive practice sessions for real-world situations
- **Speech Recognition**: Voice input for hands-free interaction
- **Text-to-Speech**: AI responses are spoken aloud
- **Child-Safe Content**: Age-appropriate conversations and scenarios
- **Enhanced UI**: Beautiful, modern interface with helpful examples

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A modern web browser with speech recognition support (Chrome recommended)
- Google Gemini API key (optional - for AI responses)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Bhargavsayampu7/AI-Voice-Tutor.git
cd AI-Voice-Tutor
```

2. Install dependencies:
```bash
npm install
```

3. Add Tailwind CSS:
```bash
npm install -D tailwindcss
npx tailwindcss init
```

4. (Optional) Add your Gemini API key:
   - Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `src/config.js`
   - Replace the empty string in `GEMINI_API_KEY` with your API key
   - Save the file and the app will automatically use your key

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. Allow microphone permissions when prompted

4. Choose your preferred language from the dropdown

5. Select a mode:
   - **Chat with Genie**: Have a natural conversation with the AI tutor
   - **Practice Roleplay**: Work through interactive scenarios

## How It Works

### Chat Mode
- Click the microphone button to start speaking
- The AI will respond in your selected language
- Responses are spoken aloud using text-to-speech
- Conversation history is maintained for context

### Roleplay Mode
- Choose from predefined scenarios (Morning Greetings, Asking in Class, Shopping)
- Follow the prompts and speak when it's your turn
- Get instant feedback on your responses
- Progress through the scenario step by step

## Browser Compatibility

This app requires a modern browser with support for:
- Web Speech API (Speech Recognition and Speech Synthesis)
- ES6+ JavaScript features
- CSS Grid and Flexbox

**Recommended browsers:**
- Google Chrome (best support)
- Microsoft Edge
- Safari (limited speech recognition support)

## API Configuration

The app uses Google's Gemini API for AI responses. If you don't have an API key, the app will show a fallback message when trying to generate responses.

To add your API key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Replace the empty `GEMINI_API_KEY` variable in `src/config.js`

## Project Structure

```
AI-Voice-Tutor/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── config.js       # Configuration file
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── README.md
```

## Customization

### Adding New Languages
1. Add the language code and name to `SUPPORTED_LANGUAGES` in `src/config.js`
2. Update the system prompt in `geminiService.generateResponse()`

### Adding New Roleplay Scenarios
1. Add a new scenario object to the `roleplayScenarios` array
2. Include `id`, `title`, `icon`, and `turns` properties
3. Each turn should have `speaker` ('genie' or 'user'), `text` (for genie), and `prompt`/`keywords` (for user)

## Troubleshooting

### Speech Recognition Not Working
- Ensure you're using a supported browser (Chrome recommended)
- Check that microphone permissions are granted
- Try refreshing the page

### AI Responses Not Working
- Check your internet connection
- Verify your API key is correct (if using one)
- Check the browser console for error messages

### Audio Not Playing
- Ensure your device's audio is not muted
- Check browser audio permissions
- Try refreshing the page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on the project repository.
