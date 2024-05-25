const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json([
    {
      "id":"1",
      "title":"Book Review: The Name of the Wind"
    },
    {
      "id":"2",
      "title":"Game Review: Pokemon Brillian Diamond"
    },
    {
      "id":"3",
      "title":"Show Review: Alice in Borderland"
    },
      {
      "id":"4",
      "title":"Show Review: Hamlet: Prince of Denmark"
    }
  ])
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})
