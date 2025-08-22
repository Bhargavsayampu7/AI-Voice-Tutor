// Configuration file for AI Voice Tutor
// Add your Gemini API key here
// You can either set it directly below or use an environment variable REACT_APP_GEMINI_API_KEY
export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

// Instructions:
// 1. Go to https://makersuite.google.com/app/apikey
// 2. Create a new API key
// 3. Copy the API key and paste it above
// 4. Save this file
// 5. The app will automatically use your API key
// 
// Alternative: Create a .env file in the root directory and add:
// REACT_APP_GEMINI_API_KEY=your_api_key_here

export const SUPPORTED_LANGUAGES = {
    'en-US': 'English',
    'hi-IN': 'Hindi',
    'te-IN': 'Telugu',
};
