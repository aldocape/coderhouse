import fs from 'fs';
import * as util from 'util';
import express from 'express';

import {
  original,
  normalizado,
  originalEmpresa,
  normalizadoEmpresa,
  desnormalizadoEmpresa,
} from './normalizado.js';

const app = express();

app.get('/original', original);
app.get('/normalizado', normalizado);
app.get('/originalEmpresa', originalEmpresa);
app.get('/normalizadoEmpresa', normalizadoEmpresa);
app.get('/desnormalizadoEmpresa', desnormalizadoEmpresa);

app.get('/articulos', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  const { authorId } = req.query;

  // Id para probar: 6145f15975a527f507148a95

  const response = data.filter((article) => article.author._id == authorId);

  res.json({
    articles: response,
  });
});

app.get('/comentarios', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  const { userId } = req.query;

  // Id para probar: 6145f159968fbe8029b49c21

  const userComments = [];

  data.forEach((article) => {
    article.comments.forEach((comment) => {
      if (comment.commenter._id == userId) {
        userComments.push(comment);
      }
    });
  });

  res.json({
    comments: userComments,
  });
});

app.get('/comentarios-por-usuario', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  let commentsPerUser = {};

  data.forEach((article) => {
    article.comments.forEach((comment) => {
      if (commentsPerUser[comment.commenter._id]) {
        commentsPerUser[comment.commenter._id].count++;
      } else {
        commentsPerUser[comment.commenter._id] = {
          count: 1,
          ...comment.commenter,
        };
      }
    });
  });

  return res.json({
    commentsPerUser,
    keys: Object.keys(commentsPerUser),
  });
});

app.listen(8080, () => {
  console.log(`Server up en puerto 8080`);
});
