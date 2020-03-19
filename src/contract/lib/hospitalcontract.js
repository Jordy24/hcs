/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Medicalnotes = require('./medicalnotesasset')
const Medicalrecord = require('./medicalrecordasset')
const Medicalresults = require('./medicalresultsasset')
const Patientdetails = require('./patientdetails')


const MEDICALNOTES_CLASS = "Medicalnotes"
const MEDICALRECORD_CLASS = "Medicalrecord"
const MEDICALRESULTS_CLASS = "Medicalresults"
const PATIENTDETAILS_CLASS = "Patientdetails"


/**
 *  A custom context provides easy access to list of all records
 * Htoh -> hospital to hospital
 */
class HtohContractContext extends Context {
    constructor(){
        super()
    }
}

/**
 * A patient record smart contract
 */

class PatientRecordContract extends Contract {

    constructor(){
        // Unique namespace when multiple contracts per chaincode file are used
        super('PatientRecordContract')
    }

    /**
     * Define a custom context for patient record
     */
    createContext(){
        return new HtohContractContext()
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required
     * @param {Context} ctx 
     *  
     */
    async init(ctx){
        // Perform initial ledger setup here
        console.log('Initantiate the contract')
    }


    /******************** General Contract Transactions ********************** */


    async patientRecordExists(ctx, patientRecordId) {
        const buffer = await ctx.stub.getState(patientRecordId);
        return (!!buffer && buffer.length > 0);
    }

    async createPatientRecord(ctx, patientRecordId, value) {
        const exists = await this.patientRecordExists(ctx, patientRecordId);
        if (exists) {
            throw new Error(`The patient record ${patientRecordId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(patientRecordId, buffer);
    }

    async readPatientRecord(ctx, patientRecordId) {
        const exists = await this.patientRecordExists(ctx, patientRecordId);
        if (!exists) {
            throw new Error(`The patient record ${patientRecordId} does not exist`);
        }
        const buffer = await ctx.stub.getState(patientRecordId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePatientRecord(ctx, patientRecordId, newValue) {
        const exists = await this.patientRecordExists(ctx, patientRecordId);
        if (!exists) {
            throw new Error(`The patient record ${patientRecordId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(patientRecordId, buffer);
    }

    async deletePatientRecord(ctx, patientRecordId) {
        const exists = await this.patientRecordExists(ctx, patientRecordId);
        if (!exists) {
            throw new Error(`The patient record ${patientRecordId} does not exist`);
        }
        await ctx.stub.deleteState(patientRecordId);
    }

}

module.exports = PatientRecordContract;