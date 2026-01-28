'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './chat-bot.module.css';
import { getData } from '@/services/datosclima.service';
import mensajes from './Mensajes';
import { HiChat } from 'react-icons/hi'; 
import { AiOutlineClose } from 'react-icons/ai'; 

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);

    const keywordArray = ['fecha', 'temperatura', 'humedad', 'dióxido de carbono', 'dioxido de carbono', 'co2'];

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && message.trim()) {
            event.preventDefault();
            const userMessage = { sender: 'user', text: message };
            setMessages([...messages, userMessage]);

            var fecha = '';

            keywordArray.map((keyword) => {
                if (message.toLowerCase().includes(keyword)) {
                    if (keyword === 'fecha') {
                        const arrayA = message.split(keyword);
                        fecha = arrayA[arrayA.length - 1].trim();
                    }
                }
            });

            const body = {
                'message': message,
                'keywords': keywordArray.filter(keyword => 
                    message.toLowerCase().includes(keyword)
                )
            };

            if (fecha)
                body.fecha = fecha;

            try {
                setLoading(true);
                setMessage('');
                const response = await getData(body);
                const data = response.data;
                setMessages([...messages, userMessage, { sender: 'bot', text: data }]);
            } catch (error) {
                console.log(error?.response?.data);
                mensajes(error?.response?.data?.data, "Error al recuperar datos", "error");
            } finally {
                setLoading(false);
                setMessage('');
            }
        }
    };

    const resetChat = () => {
        setMessage('');
        setMessages([]);
        setLoading(false);
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.chatbotWrapper}>
            <div className={isOpen ? styles.chatbotContainer : styles.chatbotContainerClosed}>
                <div ref={chatRef} className={styles.chatWindow}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className={styles.loading}>Cargando...</div>}
                </div>
                {isOpen && (
                    <>
                        <textarea
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu mensaje..."
                            rows="2"
                            className={styles.textArea}
                        />
                        <button onClick={resetChat} className={styles.resetButton}>Reiniciar</button>
                    </>
                )}
            </div>
            <button onClick={toggleChat} className={styles.toggleButton}>
                {isOpen ? <AiOutlineClose size={24} /> : <HiChat size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
