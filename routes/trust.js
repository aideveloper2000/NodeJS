const express = require('express');
const router = express.Router();
const { getContract } = require('../fabric/gateway');

router.post('/submit', async (req, res) => {
    const { node_id, trust_score } = req.body;
    try {
        const contract = await getContract();
        await contract.submitTransaction('submitTrustScore', node_id, trust_score.toString());
        res.json({ status: 'Success', node_id, trust_score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/query/:node_id', async (req, res) => {
    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction('queryTrustScore', req.params.node_id);
        res.json({ trust_score: result.toString() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
