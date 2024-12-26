import { Queue } from "bullmq";
export const redisConnection={
    host:'localhost',
    port:6379
};
export const MovimentacaoQue=new Queue('movimentacao',{connection:redisConnection});
export const reportQueue=new Queue('reports',{connection:redisConnection});