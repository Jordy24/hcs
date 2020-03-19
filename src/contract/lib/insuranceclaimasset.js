'use strict'
const State = require('../ledger-api/state')

// Enumerateion of test results values
const claimStatus = {
    CREATED: 0,
    SUBMITTED: 1,
    COMPLETED: 2
}

/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define an Asset
 */
class InsuranceClaim extends State {

    constructor(obj){
        super(InsuranceClaim.getClass(),[obj.assetId])
        Object.assign(this,obj)
    }

    /**
     * Basic getters and setters
     */
    getId(){
        return this.assetId
    }

    setId(newId){
        this.id = newId
    }

    static fromBuffer(buffer){
        return InsuranceClaim.deserialize(Buffer.from(JSON.parse(buffer)))
    }

    toBuffer(){
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to Asset
     * @param {Buffer} data
     */
    static deserialize(data){
        return State.deserializeClass(data, InsuranceClaim)
    }

    /**
     * Factory method to create an asset object
     */
    static createInstance(assetId){
        return new InsuranceClaim({assetId})
    }

    static getClass(){
        return 'org.insuranceclaim.asset'
    }

}

module.exports = InsuranceClaim
module.exports.claimStatus = claimStatus