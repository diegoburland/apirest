const { Router } = require('express');
const router = Router();

const db = require('../database');
//routes
router.get('/test', async (req, res)=>{
    const users = await db.query('SELECT * FROM users');
    
    const arrayUsers = [];
    users.forEach(element => {
        arrayUsers.push({
            'id': element.id,
            'name':element.name,
            'lastname':element.lastname,
            'password':element.password,
            'status':element.status,
            'verified': element.verified
        })
    });

    res.send(arrayUsers);
})

module.exports = router;