import {createFileRoute} from '@tanstack/react-router';
export const Route=createFileRoute('/api/transcribe')({server:{handlers:{POST:async({request})=>{
 const maxBytes=25*1024*1024;const key=process.env['LOVABLE_API_KEY'];if(!key)return Response.json({error:'Voice processing is not configured.'},{status:401});
 if(Number(request.headers.get('content-length'))>maxBytes)return Response.json({error:'The recording is too large. Please record a shorter journey.'},{status:413});
 const reader=request.body?.getReader();if(!reader)return Response.json({error:'No recording received.'},{status:400});
 const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();return Response.json({error:'Please record a shorter journey.'},{status:413});}chunks.push(value);}
 const body=new Uint8Array(size);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.length;}
 try{const bounded=new Request(request.url,{method:'POST',headers:request.headers,body});const form=await bounded.formData();const file=form.get('audio');if(!(file instanceof File)||file.size<2048)return Response.json({error:'The recording was empty. Please try again.'},{status:400});const {transcribe}=await import('@/lib/ai/transcribe.server');const response=await transcribe({baseURL:'https://ai.gateway.lovable.dev',apiKey:key,model:'openai/gpt-transcribe',maxFileBytes:maxBytes-65536,audioOnly:true},file,{signal:request.signal});return new Response(response.body,{status:response.status,headers:{'Content-Type':response.headers.get('content-type')||'text/event-stream','Cache-Control':'no-store'}});}
 catch(error){return Response.json({error:error instanceof Error?error.message:'Voice processing failed.'},{status:400});}
}}}});
