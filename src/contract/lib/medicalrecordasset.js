'use strict'
const State = require('../ledger-api/state')

// Enumerateion values
const recordType = {
    CHIEF_COMPLAINT: 0,
    FAMILY_HISTORY: 1,
    ALLERGIES: 2,
    MEDICATION_HISTORY: 3,
    PHYSICAL_EXAMINATION: 4
}

/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define an Asset
 */
class MedicalRecord extends State {

    constructor(obj){
        super(MedicalRecord.getClass(),[obj.assetId])
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
        return MedicalRecord.deserialize(Buffer.from(JSON.parse(buffer)))
    }

    toBuffer(){
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to Asset
     * @param {Buffer} data
     */
    static deserialize(data){
        return State.deserializeClass(data, MedicalRecord)
    }

    /**
     * Factory method to create an asset object
     */
    static createInstance(assetId){
        return new MedicalRecord({assetId})
    }

    static getClass(){
        return 'org.medicalrecord.asset'
    }

}

module.exports = MedicalRecord
module.exports.recordType = recordType 