import { createContext, useContext, useState, type ReactNode } from 'react';
import { defaultJourney, trains, type Journey, type Train } from '@/lib/journey';
type JourneyContextValue = {journey:Journey; setJourney:(j:Journey)=>void; train:Train; setTrain:(t:Train)=>void; saved:boolean; setSaved:(s:boolean)=>void; language:string; setLanguage:(s:string)=>void};
const JourneyContext = createContext<JourneyContextValue | null>(null);
export function JourneyProvider({children}:{children:ReactNode}) { const [journey,setJourney]=useState(defaultJourney);const [train,setTrain]=useState(trains[0]); const [saved,setSaved]=useState(false); const [language,setLanguage]=useState('en'); return <JourneyContext.Provider value={{journey,setJourney,train,setTrain,saved,setSaved,language,setLanguage}}>{children}</JourneyContext.Provider>; }
export function useJourney() { const value=useContext(JourneyContext);if(!value) throw new Error('Journey provider missing');return value; }
