'use strict'
const State = require('../ledger-api/state');


/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define an Asset
 */
class PatientDetails extends State {

    constructor(obj){
        super(PatientDetails.getClass(),[obj.assetId])
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
        return PatientDetails.deserialize(Buffer.from(JSON.parse(buffer)))
    }

    toBuffer(){
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to Asset
     * @param {Buffer} data
     */
    static deserialize(data){
        return State.deserializeClass(data, PatientDetails)
    }

    /**
     * Factory method to create an asset object
     */
    static createInstance(assetId){
        return new PatientDetails({assetId})
    }

    static getClass(){
        return 'org.patientdetails.asset'
    }

}

module.exports = PatientDetails