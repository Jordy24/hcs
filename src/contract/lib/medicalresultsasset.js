'use strict'
const State = require('../ledger-api/state')

// Enumerateion of test results values
const resultType = {
    LABORATORY_RESULTS: 0,
    DIAGNOSTIC_RESULTS: 1
}

/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define an Asset
 */
class MedicalResult extends State {

    constructor(obj){
        super(MedicalResult.getClass(),[obj.assetId])
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
        return MedicalResult.deserialize(Buffer.from(JSON.parse(buffer)))
    }

    toBuffer(){
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to Asset
     * @param {Buffer} data
     */
    static deserialize(data){
        return State.deserializeClass(data, MedicalResult)
    }

    /**
     * Factory method to create an asset object
     */
    static createInstance(assetId){
        return new MedicalResult({assetId})
    }

    static getClass(){
        return 'org.medicalresult.asset'
    }

}

module.exports = MedicalResult
module.exports.resultType = resultType