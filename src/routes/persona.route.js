const express = require('express');
const router = express.Router();

const Persona = require('../models/persona');

router.get('/', async (req,res) => {
    const p = await Persona.find();
    res.json(p);
});

router.get('/:id', async (req, res) => {
    const p = await Persona.findById(req.params.id);
    res.json(p);
});

router.post('/', async (req,res) => {
    const { name, lastname, phone } = req.body;
    const p = new Persona({name, lastname, phone});
    await p.save();
    res.json({status: 'Persona Saved'});
});

router.put('/:id', async (req, res) => {
    const { name, lastname, phone } = req.body;
    const p = { name, lastname, phone };
    await Persona.findByIdAndUpdate(req.params.id, p);
    res.json({status: 'Persona Updated'});
});

router.delete('/:id', async (req, res) => {
    await Persona.findByIdAndRemove(req.params.id);
    res.json({status: 'Persona Deleted'});
});

module.exports = router;