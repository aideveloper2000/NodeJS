const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const getContract = async () => {
    const ccpPath = path.resolve(__dirname, 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
    const wallet = await Wallets.newFileSystemWallet('./wallet');
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'Admin',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    return network.getContract('trustcc');
};

module.exports = { getContract };
