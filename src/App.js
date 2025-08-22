import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GEMINI_API_KEY, SUPPORTED_LANGUAGES } from './config';

// --- SVG Icon Components ---
const MicrophoneIcon = () => (
    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4zM4 10a1 1 0 00-1 1v1a5 5 0 0010 0v-1a1 1 0 00-1-1H4z" />
    </svg>
);

// Main App Component
export default function App() {
    const [mode, setMode] = useState('dashboard'); // 'dashboard', 'chat', 'roleplay'
    const [language, setLanguage] = useState('en-US');
    const [showTeluguNote, setShowTeluguNote] = useState(false);

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        if (newLanguage === 'te-IN') {
            setShowTeluguNote(true);
            // Auto-hide the note after 5 seconds
            setTimeout(() => setShowTeluguNote(false), 5000);
        }
    };

    const renderContent = () => {
        switch (mode) {
            case 'chat':
                return <ChatInterface key="chat" language={language} />;
            case 'roleplay':
                return <RoleplayInterface key="roleplay" language={language} />;
            default:
                return <Dashboard setMode={setMode} />;
        }
    };

    return (
        <div className="bg-[#F0FAF7] min-h-screen font-sans text-gray-800 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 z-10 relative">
                    <h1 className="text-3xl font-bold text-[#00A878]">SpeakGenie</h1>
                    <div className="flex items-center gap-2">
                        <LanguageSelector language={language} setLanguage={handleLanguageChange} />
                        {mode !== 'dashboard' && (
                            <button
                                onClick={() => setMode('dashboard')}
                                className="px-4 py-2 bg-[#00A878] text-white rounded-lg hover:bg-[#008961] transition-colors shadow-sm"
                            >
                                Home
                            </button>
                        )}
                    </div>
                </header>
                {showTeluguNote && (
                    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">
                                    Note: Only text responses available in Telugu. Voice features are not supported.
                                </p>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setShowTeluguNote(false)}
                                    className="inline-flex text-yellow-400 hover:text-yellow-600"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="relative z-10">
                    {renderContent()}
                </div>
                 {/* Decorative background elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D9F2EC] rounded-full opacity-50"></div>
                <div className="absolute -bottom-16 -right-12 w-48 h-48 bg-[#D9F2EC] rounded-full opacity-50"></div>
            </div>
        </div>
    );
}

// Language Selector Component
const LanguageSelector = ({ language, setLanguage }) => (
    <div className="relative">
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 text-[#008961] py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-[#00A878]"
        >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);

// Dashboard Component
const Dashboard = ({ setMode }) => (
    <div className="text-center p-4">
        <img src="https://placehold.co/150x150/00A878/FFFFFF?text=SG" alt="SpeakGenie Mascot" className="mx-auto mb-4 rounded-full border-4 border-white shadow-lg" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to SpeakGenie</h2>
        <p className="text-gray-500 mb-8">Your AI English Speaking Coach for Children</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
                onClick={() => setMode('chat')}
                className="px-8 py-4 bg-[#00A878] text-white font-bold rounded-xl shadow-md hover:bg-[#008961] transition-transform transform hover:scale-105"
            >
                Chat with Genie
            </button>
            <button
                onClick={() => setMode('roleplay')}
                className="px-8 py-4 bg-[#FFC107] text-gray-800 font-bold rounded-xl shadow-md hover:bg-[#e6af00] transition-transform transform hover:scale-105"
            >
                Practice Roleplay
            </button>
        </div>
    </div>
);

// --- Services ---

// Speech Recognition Hook
const useSpeechRecognition = (onResult, lang = 'en-US') => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition API is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = lang;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
    }, [onResult, lang]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error("Could not start speech recognition:", error);
                setIsListening(false);
            }
        }
    }, [isListening]);

    return { isListening, startListening };
};

// Text to Speech Hook
const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synthRef = useRef(window.speechSynthesis);

    const speak = useCallback((text, lang = 'en-US') => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }
        // Don't use text-to-speech for Telugu
        if (lang === 'te-IN') {
            return;
        }
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
                setIsSpeaking(false);
            };
            synthRef.current.speak(utterance);
        }
    }, []);

    return { isSpeaking, speak };
};

// Gemini API Service
const geminiService = {
    generateResponse: async (prompt, chatHistory = [], language = 'hi-IN') => {
        const languageName = SUPPORTED_LANGUAGES[language] || 'English';
        const systemPrompt = `You are Genie, a friendly and encouraging AI tutor for children aged 6-12.
        - IMPORTANT: You MUST respond ONLY in ${languageName}. Do not include English translations or any text in brackets.
        - Use simple, age-appropriate language. Be positive, patient, and encouraging.
        - Keep responses concise (2-3 sentences).
        - Do not use any emojis in your responses.
        - Ask follow-up questions to keep the conversation going.
        - Make sure all content is child-safe.`;

        const fullHistory = [{ role: "user", parts: [{ text: systemPrompt }] }, ...chatHistory, { role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: fullHistory };
        const apiKey = GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // If no API key is provided, return a helpful message
        if (!apiKey) {
            return "Hi! I'm Genie, your AI tutor. To have full conversations with me, please add your Gemini API key to the config file. For now, let's practice with the roleplay scenarios!";
        }

        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;
            return "I'm not sure how to respond to that. Let's talk about something else!";
        } catch (error) {
            console.error("Gemini API error:", error);
            throw new Error("Oops! I'm having a little trouble thinking right now.");
        }
    }
};

// --- Roleplay Data ---
const roleplayScenarios = [
    { 
        id: 1, 
        title: "Morning Greetings", 
        icon: "☀️", 
        turns: [ 
            { speaker: 'genie', text: "Good morning! It's a beautiful day. How are you feeling?" }, 
            { speaker: 'user', prompt: "Say you are feeling happy and ask how Genie is.", keywords: ["happy", "how are you", "feeling good"], example: "For example: 'I'm happy! How are you?'" }, 
            { speaker: 'genie', text: "I'm feeling wonderful, thank you for asking! Are you ready for school today?" }, 
            { speaker: 'user', prompt: "Say yes, you are excited to see your friends.", keywords: ["yes", "excited", "friends"], example: "For example: 'Yes, I can't wait to see my friends.'" }, 
            { speaker: 'genie', text: "That's fantastic! Seeing friends is one of the best parts of school. Have a great day!" }, 
        ] 
    },
    { 
        id: 2, 
        title: "Asking in Class", 
        icon: "📚", 
        turns: [ 
            { speaker: 'genie', text: "Imagine the lesson is a bit tricky. What would you say to the teacher?" }, 
            { speaker: 'user', prompt: "Try saying, 'Excuse me, I don't understand. Can you please help me?'", keywords: ["understand", "help me", "please"], example: "For example: 'Excuse me, can you help me?'" }, 
            { speaker: 'genie', text: "That's a perfect way to ask for help. The teacher is happy to explain it again." }, 
            { speaker: 'genie', text: "Now, what if you finished your work early? What could you ask?" },
            { speaker: 'user', prompt: "Ask, 'I'm finished. What should I do next?'", keywords: ["finished", "what", "do next"], example: "For example: 'I'm done, what's next?'" },
            { speaker: 'genie', text: "Great question! Being ready for the next task is a wonderful skill." },
        ] 
    },
    { 
        id: 3, 
        title: "Shopping at a Store", 
        icon: "🛒", 
        turns: [ 
            { speaker: 'genie', text: "Welcome to the toy store! What are you looking for today?" }, 
            { speaker: 'user', prompt: "Say you would like to buy a red car.", keywords: ["red car", "buy", "like to"], example: "For example: 'I would like to buy a red car.'" }, 
            { speaker: 'genie', text: "A red car is an excellent choice! That will be five dollars, please." }, 
            { speaker: 'user', prompt: "Say 'Here is the money, thank you.'", keywords: ["here", "money", "thank you"], example: "For example: 'Here you go, thank you!'" }, 
            { speaker: 'genie', text: "Thank you! Here is your new red car. Enjoy playing with it!" }, 
        ] 
    },
];

// --- Components ---

// Chat Interface Component
const ChatInterface = ({ language }) => {
    const [conversation, setConversation] = useState([{sender: 'genie', text: "Hi there! I'm Genie. Let's talk!"}]);
    const [isLoading, setIsLoading] = useState(false);
    const { isSpeaking, speak } = useTextToSpeech();
    const chatHistoryRef = useRef([]);

    const handleSendMessage = useCallback(async (message) => {
        if (!message.trim()) return;
        const newUserMessage = { sender: 'user', text: message };
        setConversation(prev => [...prev, newUserMessage]);
        chatHistoryRef.current.push({ role: 'user', parts: [{ text: message }] });
        setIsLoading(true);
        try {
            const aiResponse = await geminiService.generateResponse(message, chatHistoryRef.current, language);
            const newAiMessage = { sender: 'genie', text: aiResponse };
            setConversation(prev => [...prev, newAiMessage]);
            chatHistoryRef.current.push({ role: 'model', parts: [{ text: aiResponse }] });
            const cleanedResponse = aiResponse; // No longer stripping emojis
            speak(cleanedResponse, language);
        } catch (error) {
            const errorMessage = { sender: 'genie', text: error.message, isError: true };
            setConversation(prev => [...prev, errorMessage]);
            speak(error.message, language);
        } finally {
            setIsLoading(false);
        }
    }, [language, speak]);

    const handleSpeechResult = useCallback((transcript) => {
        handleSendMessage(transcript);
    }, [handleSendMessage]);

    const { isListening, startListening } = useSpeechRecognition(handleSpeechResult, language);

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    return (
        <div className="flex flex-col h-[70vh]">
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                {conversation.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'genie' && <div className="w-8 h-8 rounded-full bg-[#00A878] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">SG</div>}
                        <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md shadow-sm ${ msg.sender === 'user' ? 'bg-[#00A878] text-white rounded-br-none' : msg.isError ? 'bg-red-200 text-red-800 rounded-bl-none' : 'bg-gray-200 text-gray-800 rounded-bl-none' }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex items-center justify-center">
                <button
                    onClick={startListening}
                    disabled={isListening || isLoading || isSpeaking}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                        ${isListening ? 'bg-red-500 animate-pulse' : 'bg-[#00A878] hover:bg-[#008961]'}
                        disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-110`}
                >
                    <MicrophoneIcon />
                </button>
            </div>
        </div>
    );
};

// Roleplay Interface Component
const RoleplayInterface = ({ language }) => {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [userResponse, setUserResponse] = useState('');
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    
    const { isSpeaking, speak } = useTextToSpeech();

    const validateResponse = (transcript, keywords) => {
        if (!keywords) return true;
        const lowerTranscript = transcript.toLowerCase();
        return keywords.some(keyword => lowerTranscript.includes(keyword));
    };

    const handleSpeechResult = useCallback((transcript) => {
        if (!selectedScenario) return;
        setUserResponse(transcript);
        const currentKeywords = selectedScenario.turns[currentTurn].keywords;
        const isValid = validateResponse(transcript, currentKeywords);
        if (isValid) {
            setFeedback({ text: 'Perfect! That was great.', type: 'success' });
            setTimeout(() => {
                if (currentTurn + 1 < selectedScenario.turns.length) {
                    setCurrentTurn(currentTurn + 1);
                    setUserResponse('');
                    setFeedback({ text: '', type: '' });
                } else {
                    setFeedback({ text: 'You completed the scenario!', type: 'success' });
                }
            }, 2000);
        } else {
            const tryAgainMsg = "That's not quite right. Let's try that again!";
            setFeedback({ text: tryAgainMsg, type: 'error' });
            // Don't speak for Telugu
            if (language !== 'te-IN') {
                speak(tryAgainMsg, language);
            }
        }
    }, [currentTurn, selectedScenario, language, speak]);

    const { isListening, startListening } = useSpeechRecognition(handleSpeechResult, language);

    useEffect(() => {
        if (selectedScenario && selectedScenario.turns[currentTurn].speaker === 'genie') {
            const genieText = selectedScenario.turns[currentTurn].text;
            const cleanedText = genieText; // No longer stripping emojis
            // Don't speak for Telugu
            if (language !== 'te-IN') {
                speak(cleanedText, language);
            }
            const nextTurnIsUser = currentTurn + 1 < selectedScenario.turns.length;
            if (nextTurnIsUser) {
                 const speechDuration = genieText.length * 60;
                 setTimeout(() => {
                    if (currentTurn < selectedScenario.turns.length -1 && selectedScenario.turns[currentTurn + 1].speaker === 'user') {
                        setCurrentTurn(currentTurn + 1);
                    }
                 }, Math.max(2000, speechDuration));
            }
        }
    }, [selectedScenario, currentTurn, speak, language]);

    const handleSelectScenario = (scenario) => {
        setSelectedScenario(scenario);
        setCurrentTurn(0);
        setUserResponse('');
        setFeedback({ text: '', type: '' });
    };
    
    const resetScenario = () => setSelectedScenario(null);

    if (!selectedScenario) {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Choose a Roleplay Scenario</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {roleplayScenarios.map(scenario => (
                        <button key={scenario.id} onClick={() => handleSelectScenario(scenario)} className="p-4 bg-green-100 rounded-lg text-center hover:bg-green-200 transition-colors shadow-sm">
                            <div className="text-4xl mb-2">{scenario.icon}</div>
                            <div className="font-semibold text-green-800">{scenario.title}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const turn = selectedScenario.turns[currentTurn];
    const progress = (currentTurn / (selectedScenario.turns.length - 1)) * 100;

    return (
        <div className="flex flex-col items-center p-4 h-[70vh]">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{selectedScenario.title}</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-[#00A878] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                {turn.speaker === 'user' ? (
                    <>
                        <p className="text-lg mb-4 text-gray-600">Your turn! Try saying:</p>
                        <p className="text-xl font-semibold p-4 bg-yellow-100 rounded-lg">"{turn.prompt}"</p>
                        {/* **CHANGE IS HERE**: Added the example display */}
                        {turn.example && (
                            <p className="mt-2 text-sm text-gray-500 italic">{turn.example}</p>
                        )}
                        {userResponse && <p className="mt-4 text-blue-600">You said: "{userResponse}"</p>}
                        {feedback.text && <p className={`mt-2 font-semibold ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{feedback.text}</p>}
                    </>
                ) : (
                     <p className="text-xl font-semibold p-4 bg-green-100 rounded-lg text-green-800">Genie says: "{turn.text}"</p>
                )}
            </div>
            <div className="mt-auto flex flex-col items-center">
                 {turn.speaker === 'user' && (
                     <button onClick={startListening} disabled={isListening || isSpeaking} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-[#00A878] hover:bg-[#008961]'} disabled:bg-gray-400`}>
                        <MicrophoneIcon />
                     </button>
                 )}
                 {feedback.text.includes('completed') && (
                     <button onClick={resetScenario} className="mt-4 px-6 py-2 bg-[#FFC107] text-gray-800 font-bold rounded-lg shadow-md hover:bg-[#e6af00]">Play Another!</button>
                 )}
            </div>
        </div>
    );
};
