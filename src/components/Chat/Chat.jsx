import '@nlux/themes/nova.css';
import { AiChat, AiChatUI } from '@nlux/react';
import { useChatAdapter } from '@nlux/nlbridge-react';

const adapterOptions = {
    url: `${process.env.DEV_BACKEND_API}/chat-api`,
};

const assistantCssStyle = {
    background: 'linear-gradient(#c8bdff, #55d7fe)',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
};

export const Chat = () => {
    const nlbridgeAdapter = useChatAdapter(adapterOptions);

    return (
        <AiChat
            adapter={nlbridgeAdapter}
            personaOptions={{
                assistant: {
                    name: 'Експерт',
                    avatar: <span style={assistantCssStyle}>🤖</span>,
                    // tagline: 'Експертна система у проєктуванні СЕС',
                }
            }}
            composerOptions={{
                placeholder: 'Добрий день. Для яких потреб Вам потрібна СЕС? '
            }}
            displayOptions={{ colorScheme: 'light' }}
        >
            <AiChatUI.Loader>
                <span className="rounded">Loading 👻</span>
            </AiChatUI.Loader>
        </AiChat>
    );
}