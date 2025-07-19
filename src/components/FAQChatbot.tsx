import { useState, useRef, useEffect } from 'react';

const BOT = 'bot';
const USER = 'user';

const initialMessages = [
    { sender: BOT, text: "Hi! I'm your FAQ bot. How can I help you today?" },
];

const options = [
    { value: 'services', label: 'What services do you offer?' },
    { value: 'trust', label: 'How can I trust your data?' },
    { value: 'start', label: 'How do I get started?' },
    { value: 'contact', label: 'How do I contact support?' },
    { value: 'other', label: 'Other question' },
];

function getBotReply(userValue: string, userText: string = '') {
    switch (userValue) {
        case 'services':
            return 'We offer property listings, landlord/tenant data, and property management tools.';
        case 'trust':
            return 'All our data is verified and regularly updated for accuracy.';
        case 'start':
            return 'Just sign up on our website and start exploring!';
        case 'contact':
            return 'You can contact support at etracka.tech@gmail.com or use the contact form on our site.';
        case 'other':
            return 'Thank you for your question. Our team will get back to you soon.';
        default:
            return userText
                ? 'Thank you for your question. Our team will get back to you soon.'
                : '';
    }
}

export default function FAQChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [showOptions, setShowOptions] = useState(true);
    const [awaitingOther, setAwaitingOther] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open) {
            setMessages(initialMessages);
            setShowOptions(true);
            setAwaitingOther(false);
            setInput('');
        }
    }, [open]);

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as HTMLDivElement).scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [messages, open]);

    const handleOption = (value: string) => {
        setMessages((msgs) => [
            ...msgs,
            {
                sender: USER,
                text: options.find((o) => o.value === value)?.label || value,
            },
        ]);
        if (value === 'other') {
            setAwaitingOther(true);
            setShowOptions(false);
        } else {
            setTimeout(() => {
                setMessages((msgs) => [
                    ...msgs,
                    { sender: BOT, text: getBotReply(value, '') },
                    {
                        sender: BOT,
                        text: 'Would you like to ask another question?',
                    },
                ]);
                setShowOptions(false);
            }, 600);
        }
    };

    const handleOtherSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages((msgs) => [...msgs, { sender: USER, text: input }]);
        setInput('');
        setAwaitingOther(false);
        setTimeout(() => {
            setMessages((msgs) => [
                ...msgs,
                { sender: BOT, text: getBotReply('other', input) },
                {
                    sender: BOT,
                    text: 'Would you like to ask another question?',
                },
            ]);
        }, 600);
    };

    const handleYesNo = (yes: boolean) => {
        if (yes) {
            setShowOptions(true);
        } else {
            setMessages((msgs) => [
                ...msgs,
                {
                    sender: BOT,
                    text: 'Thank you for using our FAQ bot! Have a great day!',
                },
            ]);
            setShowOptions(false);
        }
    };

    // Only show Yes/No if last bot message is 'Would you like to ask another question?'
    const showYesNo =
        !showOptions &&
        !awaitingOther &&
        messages.length > 0 &&
        messages[messages.length - 1].sender === BOT &&
        messages[messages.length - 1].text ===
            'Would you like to ask another question?';

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setOpen((o) => !o)}
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                    background: '#2563eb',
                    border: 'none',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    boxShadow: '0 4px 24px rgba(37,99,235,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                aria-label={open ? 'Close FAQ Chatbot' : 'Open FAQ Chatbot'}
            >
                {open ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#2563eb" />
                        <path
                            d="M7 10.5C7 9.11929 8.11929 8 9.5 8H14.5C15.8807 8 17 9.11929 17 10.5V13.5C17 14.8807 15.8807 16 14.5 16H10.4142C10.149 16 9.89464 16.1054 9.70711 16.2929L8.35355 17.6464C8.15829 17.8417 7.84171 17.8417 7.64645 17.6464C7.45118 17.4512 7.45118 17.1346 7.64645 16.9393L9 15.5858V13.5C8.11929 13.5 7 12.3807 7 11V10.5Z"
                            fill="#fff"
                        />
                    </svg>
                )}
            </button>
            {/* Chatbot Window */}
            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 112,
                        right: 32,
                        zIndex: 1001,
                        width: 350,
                        maxWidth: '95vw',
                        borderRadius: 18,
                        boxShadow: '0 8px 32px rgba(37,99,235,0.18)',
                        overflow: 'hidden',
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            background: '#2563eb',
                            color: '#fff',
                            padding: 16,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                        }}
                    >
                        E-Tracka FAQ
                    </div>
                    <div
                        style={{
                            flex: 1,
                            padding: 16,
                            overflowY: 'auto',
                            background: '#fff',
                        }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        msg.sender === USER
                                            ? 'flex-end'
                                            : 'flex-start',
                                    marginBottom: 8,
                                }}
                            >
                                <div
                                    style={{
                                        background:
                                            msg.sender === USER
                                                ? '#f3f4f6'
                                                : '#2563eb',
                                        color:
                                            msg.sender === USER
                                                ? '#222'
                                                : '#fff',
                                        borderRadius: 16,
                                        padding: '8px 14px',
                                        maxWidth: '80%',
                                        fontSize: 15,
                                        boxShadow:
                                            msg.sender === USER
                                                ? '0 1px 4px #e0e7ff'
                                                : '0 1px 4px #c7d2fe',
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div
                        style={{
                            padding: 16,
                            borderTop: '1px solid #e5e7eb',
                            background: '#f9fafb',
                        }}
                    >
                        {showOptions && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 8,
                                }}
                            >
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleOption(opt.value)}
                                        style={{
                                            background: '#e0e7ff',
                                            color: '#2563eb',
                                            border: 'none',
                                            borderRadius: 12,
                                            padding: '8px 12px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        {awaitingOther && (
                            <form
                                onSubmit={handleOtherSubmit}
                                style={{ display: 'flex', gap: 8 }}
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    style={{
                                        flex: 1,
                                        borderRadius: 8,
                                        border: '1px solid #d1d5db',
                                        padding: '8px 10px',
                                        fontSize: 15,
                                    }}
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    style={{
                                        background: '#2563eb',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '8px 16px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Send
                                </button>
                            </form>
                        )}
                        {showYesNo && (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 12,
                                    marginTop: 8,
                                }}
                            >
                                <button
                                    onClick={() => handleYesNo(true)}
                                    style={{
                                        background: '#e0e7ff',
                                        color: '#2563eb',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '8px 16px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => handleYesNo(false)}
                                    style={{
                                        background: '#f3f4f6',
                                        color: '#222',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '8px 16px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
