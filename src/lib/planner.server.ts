import {createOpenAI} from '@ai-sdk/openai';
import {streamText,Output,NoObjectGeneratedError} from 'ai';
import {z} from 'zod';
import {createLovableAiGatewayRunIdFetch} from './ai/run-id';
const schema=z.object({origin:z.string().nullable(),destination:z.string().nullable(),date:z.string().nullable(),passengers:z.number().nullable(),budget:z.number().nullable(),travelClass:z.string().nullable(),preferences:z.string().nullable()});
export async function planFromText(data:{text:string;today:string}){
 const key=process.env['LOVABLE_API_KEY'];if(!key)return {error:'Voice planning is not configured yet.',journey:null};
 if(!data.text.trim()||data.text.length>12000)return {error:'Please describe your journey in a shorter message.',journey:null};
 const run=createLovableAiGatewayRunIdFetch();const provider=createOpenAI({apiKey:key,baseURL:'https://ai.gateway.lovable.dev/v1',headers:{'Lovable-API-Key':key,'X-Lovable-AIG-SDK':'vercel-ai-sdk'},fetch:run.fetch});
 try {const result=streamText({model:provider.responses('openai/gpt-6-astra'),maxRetries:0,system:`Extract Indian railway journey preferences from any language, including Tamil and English. Today is ${data.today}. Return city names in English (Bangalore becomes Bengaluru, Madras becomes Chennai). Date YYYY-MM-DD. Budget in INR. Only extract information spoken; absent fields null. Classes: Sleeper Class, AC 3 Tier, AC 2 Tier, Chair Car, Any Class. Passengers must be at least one; if unspecified use null. Do not invent train schedules or bookings.`,messages:[{role:'user',content:data.text}],output:Output.object({schema}),providerOptions:{openai:{forceReasoning:true,reasoningEffort:'low',reasoningSummary:'auto',store:false,include:['reasoning.encrypted_content']}}});return {journey:await result.output,error:null};}
 catch(error){if(NoObjectGeneratedError.isInstance(error))return {journey:null,error:'I could not understand every detail. Please edit your journey below.'};return {journey:null,error:error instanceof Error?error.message:'Journey planning is unavailable.'};}
}
