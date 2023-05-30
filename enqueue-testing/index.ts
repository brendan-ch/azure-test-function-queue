import { QueueServiceClient } from '@azure/storage-queue';
import { config } from 'dotenv';
import { AzureFunction, Context } from "@azure/functions"

if (process.env.NODE_ENV !== 'production') {
    config();
}

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString();

    if (myTimer.isPastDue)
    {
        context.log('Enqueue function is running late!');
    }

    const serviceClient = QueueServiceClient.fromConnectionString(process.env.CONNECTION_STRING);

    const queueClient = serviceClient.getQueueClient('testing');
    // If it doesn't exist yet, create a new queue
    await queueClient.createIfNotExists();

    // Send a new message
    await queueClient.sendMessage(`Hello World! ${timeStamp}`, {
        messageTimeToLive: 3600,  // TTL of one hour
    });

    // Check if the message has been sent
    const response = await queueClient.peekMessages({
        numberOfMessages: 32,
    });
    console.log(response.peekedMessageItems);
    
    context.log('Enqueue function ran!', timeStamp);   
};

export default timerTrigger;
