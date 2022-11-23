const express = require('express');
const tables = require('./database/tables');
const app = express();

app.use(express.json());

app.get('/', (req, resp)=>{
    resp.send({'mensagem':'tudo está conectado'});
})

app.get('/search', async (req, resp)=>{
    await tables.Compra.findAll({
        attributes: ['id_compra','produto_compra', 'preco_compra', 'quantidade_compra']
      })
    .then((data)=>{resp.send({'data': data})})
    .catch((err)=>{console.log(err)})
    ;
})

app.post('/add-compra', (req, resp)=>{
    tables.Compra.create({
        produto_compra: req.body.produto_compra,
        preco_compra:req.body.preco_compra,
        quantidade_compra: req.body.quantidade_compra      
    })
    .then(()=>{resp.send('Cadastrado com sucesso')})
    .catch((err)=>{resp.send("Erro: Pagamento não foi cadastrado com sucesso!" + err)})
})

app.get('/delete/:id', async (req, resp)=>{    
    await tables.Compra.destroy({where: {id_compra: req.params.id}, force: true})
    .then(()=>{resp.send('Deletado com sucesso')})
    .catch((err)=>{resp.send("Erro: Não foi possível deletar. Erro:" + err)})
})

app.get('/delete/:id', async (req, resp)=>{    
    await tables.Compra.destroy({where: {id_compra: req.params.id}, force: true})
    .then(()=>{resp.send('Deletado com sucesso')})
    .catch((err)=>{resp.send("Erro: Não foi possível deletar. Erro:" + err)})
})

app.patch('/update/:id', async (req, resp)=>{    
    await tables.Compra.findOne({where: {id_compra: req.params.id}, force: true})
    .then((response)=>{response.update({
        quantidade_compra: '5000'  
    })})
    .catch((err)=>{resp.send("Erro: Não foi possível atualizar. Erro:" + err)})
})


app.listen(3001,()=>{
    console.log('Servidor Iniciado');
})