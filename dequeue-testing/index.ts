import { QueueServiceClient } from '@azure/storage-queue';
import { config } from 'dotenv';
import { AzureFunction, Context } from "@azure/functions"

if (process.env.NODE_ENV !== 'production') {
    config();
}

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString();

    console.log(process.env.NODE_ENV);
    console.log(process.env.CONNECTION_STRING);
    if (myTimer.isPastDue)
    {
        context.log('Dequeue function is running late!');
    }

    const serviceClient = QueueServiceClient.fromConnectionString(process.env.CONNECTION_STRING);

    const queueClient = serviceClient.getQueueClient('testing');
    // If it doesn't exist yet, create a new queue
    await queueClient.createIfNotExists();

    // Check for # of responses
    const response = await queueClient.peekMessages({
        numberOfMessages: 32,
    });
    console.log(response.peekedMessageItems);
    
    if (response.peekedMessageItems.length > 3) {
        // Dequeue the item in the front
        const retrieved = await queueClient.receiveMessages({
            numberOfMessages: 1,
        });
        
        console.log('Dequeueing first message item');
        console.log(retrieved.receivedMessageItems);
    }
    
    context.log('Dequeue function ran!', timeStamp);   
};

export default timerTrigger;
