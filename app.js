const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const axios = require('axios')
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.use(express.urlencoded({ extended: true }))

// URL da API
const API_URL = 'https://potential-trout-6xgrr4rwwvxh5rrw-8000.app.github.dev' 

// form
app.get('/', async (req, res) => {
    res.render('index');
})

app.post('/who', async (req, res) => {
  const username = req.body.username
  console.log(`Variável username recebida do form: ${username}`)

  try {
    const response = await axios.get(`${API_URL}/v1/hi/`)
    //console.log(response)
    res.render('message', {msg: response.data.msg});
  } catch (err) {
    res.send('Erro ao acessar API.')
  }
})

app.post('/whobypost', (req, res) => {
    const username = req.body.username
    const url_ = `${API_URL}/v1/hi`
    console.log(`Variável username recebida do form: ${username}`)
    axios({
        method: 'post',
        url: url_,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            name: `${username}`
        }
    })
    .then(response => {
        //console.log(response)
        res.render('message', {msg: response.data.msg});
    })
    .catch(err => {
        console.error(err.message)
        res.send('Erro ao acessar API.')
    })
})