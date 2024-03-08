import { ReactNode, useState } from 'react';
import AgentContext from './AgentContext';

interface AgentContextProviderProps {
  children?: ReactNode;
}

function AgentContextProvider({ children }: AgentContextProviderProps) {
  const [agentData, setAgentData] = useState({} as unknown);

  return (
    <AgentContext.Provider value={{ agentData, setAgentData }}>
      {children}
    </AgentContext.Provider>
  );
}

export default AgentContextProvider;
