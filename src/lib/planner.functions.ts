import {createServerFn} from '@tanstack/react-start';
import {z} from 'zod';
export const extractJourney=createServerFn({method:'POST'}).inputValidator(z.object({text:z.string(),today:z.string()})).handler(async({data})=>{const {planFromText}=await import('./planner.server');return planFromText(data);});
