const {Router} = require('express');

const router = Router();
const db = require('../database');



router.get('/', async (req, res)=>{
    const users = await db.query('SELECT * FROM users');
    
    const arrayUsers = [];
    users.forEach(element => {
        arrayUsers.push({
            'id': element.id_user,
            'name':element.name,
            'lastname':element.lastname,
            'email':element.email,
            'password':element.password,
            'status':element.status,
            'verified': element.verified
        })
    });
    res.json(arrayUsers);
})

//save user
router.post('/add', async (req, res)=>{
    const {name, lastname, email, password} = req.body;
    if(name && lastname && email && password){
        const newUser = {
            name,
            lastname,
            email,
            password
        }
        
        const result = await db.query('INSERT INTO users SET ?',[newUser]);
        const meta = {
            id_user: result.insertId
        }
        await db.query('INSERT INTO user_meta SET ?', [meta]);
        
        res.send('ok');
        
    }
    
})

// show
router.get('/:id', async (req, res)=>{
    const {id} = req.params;

    const user = await db.query('SELECT id_user, name, lastname, email, status FROM users WHERE id_user = ?', [id]);
    const arrayUsers = [];
    user.forEach(element => {
        arrayUsers.push({
            'id': element.id_user,
            'name':element.name,
            'lastname':element.lastname,
            'email':element.email,
            'password':element.password,
            'status':element.status,
            'verified': element.verified
        })
    });
    res.json(arrayUsers);   
    
    
})

module.exports = router;    