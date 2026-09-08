const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized : false
    }
});


app.get('/',(req,res)=>{
    try{
        res.json('WELCOME')
    }catch(err)
    {
        res.status(500).json({error:err.message})
    }
});

app.get('/regions',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({error:err.message})
    }
});

app.get('/countries',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({error:err.message})
    }
});

app.get('/employees',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({error:err.message})
    }
});

app.listen(3000,()=>{
    console.log('RUNNING ON PORT 3000');
});