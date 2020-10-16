const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {
        id: 0,
        firstName: 'Juku',
        lastName: 'Juurikas',
        email: 'juku@juurikas.ee',
        password: 'juku'
    },
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan'
    }
];

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});

// GET - users 
// Required: none
// Optional: none
app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true,
        users: users
    });
});

//GET - users
//REquired: id
//Optional: none
app.get('/api/users/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        success: true,
        user: users[req.params.id]
    });
});

// POST - users
// Required: firstName, lastName, email, password
// Optional: none
app.post('/api/users', (req, res) => {
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName :  false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName :  false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email :  false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password :  false;
    
    if (firstName && lastName && email && password) {
        const newUser = {
            id: users.length,
            firstName,
            lastName,
            email,
            password
        };

        users.push(newUser);
        delete newUser.password;


        res.status(201).json({
            success: true,
            
        });

    } else {
        res.status(400).json({
            success: true,
            message: 'Required fields missing or invalid'
    });
    }
});

app.listen(3000, () => {
    console.log('Server running');
});