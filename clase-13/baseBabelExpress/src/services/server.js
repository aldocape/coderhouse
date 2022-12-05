import express from 'express';

const app = express();

app.get('/', (req, res) => {
  
  res.json({
  'msg': 'ok'
  });
});

export default app;
