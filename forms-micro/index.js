const express = require('express');
const { forms_config, forms } = require('./db');

const app = express(); // instantiate express

app.use(express.json()) // for parsing application/json bodies


app.post('/forms', async (req, res) => {
    const { documentNo, data } = req.body;
    const toCreate = { documentNo, data };
    const insertedUser = await forms.put(toCreate);
    res.status(201).json(insertedUser);
});


app.get('/forms-config', async (req, res) => {
    const { documentNo } = req.query;

    if(!documentNo) {
        res.status(404).json({"message": "Form not found"}).end();
    }

    const { items, count } = await forms_config.fetch({'documentNo': documentNo});

    if(count <= 0) {
        res.status(404).json({"message": "Form not found"}).end();
    }

    if (items && items.length >= 1) {
        res.json(items[0]);
    } else {
        res.status(404).json({"message": "Form not found"}).end();
    }
});



const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Form app listening on port ${port}`)
// });

// export 'app'
module.exports = app