import express from 'express';
import { Lambda } from 'aws-sdk'

const lambda = new Lambda({
  region: 'us-east-1'
});

const app = express();

app.post('/checkout', async (req, res) => {
  const response = await lambda.invoke({
    FunctionName: 'sls-node-local-sls-checkout',
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({
      body: {
        clientId: '123456',
        products: [
          { id: 1, title: 'Product 1', price: 10, quantity: 1 },
          { id: 2, title: 'Product 2', price: 30, quantity: 2 },
        ]
      }
    }),
  }).promise();

  const { data } = response.$response;

  return res.json({ data })
});

app.listen(3333);