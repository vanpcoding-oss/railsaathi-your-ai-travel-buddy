export type Journey = { origin: string; destination: string; date: string; passengers: number; budget: number; travelClass: string; preferences: string };
export const defaultJourney: Journey = { origin: 'Chennai', destination: 'Bengaluru', date: '2026-10-15', passengers: 1, budget: 800, travelClass: 'Sleeper Class', preferences: 'Direct trains preferred' };
export type Train = { id: string; name: string; price: number; depart: string; arrive: string; duration: string; minutes: number; label: string; classes: string[] };
export const trains: Train[] = [
 { id: '12627', name: 'Karnataka Express', price: 480, depart: '06:15', arrive: '11:25', duration: '5h 10m', minutes:310, label: 'Best Match', classes: ['SL','3A','2A'] },
 { id: '16209', name: 'Mysuru Express', price: 320, depart: '07:30', arrive: '13:45', duration: '6h 15m', minutes:375, label: 'Cheapest', classes: ['SL','2S'] },
 { id: '12007', name: 'Shatabdi Express', price: 1210, depart: '06:00', arrive: '10:30', duration: '4h 30m', minutes:270, label: 'Fastest', classes: ['CC','EC'] },
];
export function sortTrains(mode: string) { return [...trains].sort((a,b) => mode === 'Cheapest' ? a.price-b.price : mode === 'Fastest' ? a.minutes-b.minutes : 0); }
export function formatDate(value:string) { return new Date(`${value}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}); }
export const stationCode = (name:string) => ({ Chennai:'MAS', Bengaluru:'SBC', Coimbatore:'CBE', Madurai:'MDU', Tiruchirappalli:'TPJ' }[name] || name.slice(0,3).toUpperCase());
