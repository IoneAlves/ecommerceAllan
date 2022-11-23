const express = require('express');
const tables = require('./database/tables');
const app = express();

app.use(express.json());

// Teste de Conexão Localhost 3001
app.get('/', (req, resp)=>{
    resp.send({'mensagem':'tudo está conectado'});
})

// Pesquisar Produtos do Carrinho
app.get('/search', async (req, resp)=>{
    await tables.Compra.findAll({
        attributes: ['id_compra','produto_compra', 'preco_compra', 'quantidade_compra']
      })
    .then((data)=>{resp.send({'data': data})})
    .catch((err)=>{console.log(err)})
    ;
})

// Adicionar Produto do Carrinho
app.post('/add-compra', (req, resp)=>{
    tables.Compra.create({
        produto_compra: req.body.produto_compra,
        preco_compra:req.body.preco_compra,
        quantidade_compra: req.body.quantidade_compra      
    })
    .then(()=>{resp.send('Cadastrado com sucesso')})
    .catch((err)=>{resp.send("Erro: Pagamento não foi cadastrado com sucesso!" + err)})
})

// Deletar item por Id
app.get('/delete/:id', async (req, resp)=>{    
    await tables.Compra.destroy({where: {id_compra: req.params.id}, force: true})
    .then(()=>{resp.send('Deletado com sucesso')})
    .catch((err)=>{resp.send("Erro: Não foi possível deletar. Erro:" + err)})
})

// Atualizar item por Id
app.patch('/update/:id', async (req, resp)=>{    
    await tables.Compra.findOne({where: {id_compra: req.params.id}, force: true})
    .then((response)=>{
        response.update({
        produto_compra: req.body.produto_compra,
        preco_compra:req.body.preco_compra,
        quantidade_compra: req.body.quantidade_compra    
    }), resp.send('Atualizado com sucesso')
    })
    .catch((err)=>{resp.send("Erro: Não foi possível atualizar. Erro:" + err)})
})


app.listen(3001,()=>{
    console.log('Servidor Iniciado');
})