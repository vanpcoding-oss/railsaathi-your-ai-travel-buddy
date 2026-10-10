import {createFileRoute} from '@tanstack/react-router';import {Planner} from '@/components/rail/planner';import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/plan')({head:()=>pageHead('AI Voice Journey Planner','Speak in Tamil, English or your language to fill your railway journey plan.'),component:Planner});
