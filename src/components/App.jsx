import '@nlux/themes/nova.css';
import { AiChat, AiChatUI } from '@nlux/react';
import { useChatAdapter } from '@nlux/nlbridge-react';

const adapterOptions = {
  url: 'http://localhost:8080/chat-api',
};

export const App = () => {
  const nlbridgeAdapter = useChatAdapter(adapterOptions);

  const assistantCssStyle = {
    background: 'linear-gradient(#c8bdff, #55d7fe)',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  };

  return (
    <AiChat
      adapter={nlbridgeAdapter}
      personaOptions={{
        assistant: {
          name: 'Експерт',
          avatar: <span style={ assistantCssStyle }>🤖</span>,
          tagline: 'Експертна система у проєктуванні СЕС',
        }
      }}
      composerOptions={{
        placeholder: 'Яку сонячну електростанцію ви б хотіли?'
      }}
      displayOptions={{ colorScheme: 'light' }}
    >
      <AiChatUI.Loader>
        <span className="rounded">Loading 👻</span>
      </AiChatUI.Loader>
    </AiChat>
  );
};
