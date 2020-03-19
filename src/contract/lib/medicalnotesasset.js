'use strict'
const State = require('../ledger-api/state')

// Enumerateion of different notes taken
const noteType = {
    PROBLEM_LIST: 0,
    CLINICAL_NOTES: 1,
    TREATMENT_NOTES: 2
}

/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define an Asset
 */
class MedicalNote extends State {

    constructor(obj){
        super(MedicalNote.getClass(),[obj.assetId])
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
        return MedicalNote.deserialize(Buffer.from(JSON.parse(buffer)))
    }

    toBuffer(){
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to Asset
     * @param {Buffer} data
     */
    static deserialize(data){
        return State.deserializeClass(data, MedicalNote)
    }

    /**
     * Factory method to create an asset object
     */
    static createInstance(assetId){
        return new MedicalNote({assetId})
    }

    static getClass(){
        return 'org.medicalnote.asset'
    }

}

module.exports = MedicalNote
module.exports.noteType = noteType