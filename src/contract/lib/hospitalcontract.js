/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const deepmerge = require('deepmerge');

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
	// NOTE: currently this contract is using the patientdeatils asset. This is for concept purpose (POC)


    async patientRecordExists(ctx, patientRecordId) {
        const buffer = await ctx.stub.getState(patientRecordId);
        return (!!buffer && buffer.length > 0);
    }

	/**
	 * createPatientRecord
	 *
	 * @param {context} ctx
	 */

    async createPatientRecord(ctx, assetTag) {
		console.log("In createPatientRecord");

		// create a new patient record object
        const assetId = await this.generateValidAssetId(ctx, PATIENTDETAILS_CLASS, assetTag);
		const asset = patientdetails.createInstance(assetId);

		asset.transaction = "createPatientRecord";
		asset.patientInfo = [];
		asset.medicalRecords = [];
		asset.medicalResults = [];
		asset.medicalNotes = [];
		asset.hash = "";

		// update ledger (or rather insert this record to the ledger)
        //const bufferedAsset = Buffer.from(JSON.stringify(asset));
        const bufferedAsset = asset.toBuffer();
        await ctx.stub.putState(patientRecordId, bufferedAsset);

		// Define and set event
		try {
			await ctx.stub.setEvent(asset.transaction, bufferedAsset);
		}
		catch (error){
			console.log("Error in sending event");
		}
		finally {
			console.log("Attempted to send event = ", asset);
		}

		// Return a serialized asset to caller of smart contract
		console.log(asset);
		return asset.toBuffer();
    } /** createPatientRecord **/

	// Also a create patient record template
	//async createPatientRecord(ctx, patientRecordId, value) {
    //    const exists = await this.patientRecordExists(ctx, patientRecordId);
    //    if (exists) {
    //        throw new Error(`The patient record ${patientRecordId} already exists`);
    //    }
    //    const asset = { value };
    //    const buffer = Buffer.from(JSON.stringify(asset));
    //    await ctx.stub.putState(patientRecordId, buffer);
    //}




    async readPatientRecord(ctx, assetId) {
		console.log("In readPatientRecord");

        /**** Access control goes here ***/
		// TO DO : userId = await this.getCallingUserType(ctx);
		// TO DO : userId = await this.getCallingUserId(ctx);

		/********/
		let asset;
		

		// If assetId was sent in, return just the one asset
		if (typeof assertId !== 'undefined') {

			// Validate asset
			let assetAsBytes = await ctx.stub.getState(assetId);
			utilFunctions.validateAsset(assetAsBytes, assetId, PATIENTDETAILS_CLASS);

			asset = patientdetails.deserialize(assetAsBytes);

			// Access Control
			//let userId = await this.getCallingUserId(ctx);
			//if ((userId != "admin") && (userId != asset.owner)) // && (userType != "specific user")
			//	throw new Error(`${userId} does not have access to the details of asset ${assetId}`);

			return asset;
		}
		else {
			// Return all patient assets
			//
			const iterator = await ctx.stub.getQueryResult(JSON.stringify({"selector":{"class":"org.patientdetails.asset"}}));
			const allAssets = [];

			while(true){
				let asset = await iterator.next();

				if (asset.value && asset.value.value.toString()){
					console.log(asset.value.value.toString('utf8'));
					let jsonRes = {};

					jsonRes.Key = asset.value.key;
					
					// Store Asset details
					try{
						jsonRes.Record = JSON.parse(asset.value.value.toString('utf8'));
					}
					catch(err){
						console.log(err);
						jsonRes.Record = asset.value.value.toString('utf8');
					}

					// Add to array of transaction history on asset
					allAssets.push(jsonRes);
				}

				if(asset.done){
					console.log("end of data");
					await iterator.close();
					return allAssets;
				}
			}
		}
		
		const buffer = await ctx.stub.getState(patientRecordId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    } /** readPatientRecord **/

	//async readPatientRecord(ctx, patientRecordId) {
    //    const exists = await this.patientRecordExists(ctx, patientRecordId);
    //    if (!exists) {
    //        throw new Error(`The patient record ${patientRecordId} does not exist`);
    //    }
    //    const buffer = await ctx.stub.getState(patientRecordId);
    //    const asset = JSON.parse(buffer.toString());
    //    return asset;
    //}


	/**
	 *
	 * @param {context} ctx
	 * @param {agrs} jsonData
	 */

    async updatePatientRecord(ctx, args) {
		console.log("In updatePatientRecord");

		let update = JSON.parse(args);

		consol.log("Incomming asset updates: " + JSON.stringify(update));

		let assetId = update.assetId;

		// Validate parameter
		if ((typeof assertId === 'undefined'))
			throw new Error(`Error message from updatePatientRecord: assetId is required`);

		// Validate asset
		let assetAsBytes = await ctx.stub.getState(assetId);
		utilFunctions.validateAsset(assetAsBytes, assetId, PATIENTDETAILS_CLASS)

		var asset = patientdetails.deserialize(assetAsBytes);

		// Access Control
		//let userId = await this.getCallingUserId(ctx);
		//if ((userId != "admin") && (userId != asset.owner))
		//	throw new Error(`${userId} does not have access to the details of asset ${assetId}`);

		// update object based on input jsonData. see https://davidwalsh.name/javascript-deep-merge
		newAsset = deepmerge(asset, update);
		newAsset.transaction = "updatePatientRecord";
		//newAsset.modifiedBy = userId;

        const bufferedAsset = Buffer.from(JSON.stringify(newAsset));
        await ctx.stub.putState(patientRecordId, bufferedAsset);


		// Define and set event
		try {
			await ctx.stub.setEvent(newAsset.transaction, bufferedAsset);
		}
		catch (error){
			console.log("Error in sending event");
		}
		finally {
			console.log("Attempted to send event = ", newAsset);
		}

		console.log(newAsset);
		return bufferedAsset;
    } /** updatePatientRecord **/

	//async updatePatientRecord(ctx, patientRecordId, newValue) {
    //    const exists = await this.patientRecordExists(ctx, patientRecordId);
    //    if (!exists) {
    //        throw new Error(`The patient record ${patientRecordId} does not exist`);
    //    }
    //    const asset = { value: newValue };
    //    const buffer = Buffer.from(JSON.stringify(asset));
    //    await ctx.stub.putState(patientRecordId, buffer);
    //}

    /**
	 *
	 * @param {context} ctx
	 * @param {string} args
	 */

    async deletePatientRecord(ctx, assetId) {
		console.log("In deletePatientRecord" + "assetId: " + assetId);

		// validate assetId
		if ((typeof assertId === 'undefined'))
			throw new Error(`Error message from updatePatientRecord: assetId is required`);

		// Validate asset
		let assetAsBytes = await ctx.stub.getState(assetId);
		utilFunctions.validateAsset(assetAsBytes, assetId, PATIENTDETAILS_CLASS)

		var asset = patientdetails.deserialize(assetAsBytes);

		// Access Control
		//let userId = await this.getCallingUserId(ctx);
		//if ((userId != "admin") && (userId != asset.owner))
		//	throw new Error(`${userId} does not have access to the details of asset ${assetId}`);

		asset.transaction = "deletePatientRecord";
		//newAsset.modifiedBy = userId;


		// Define and set event
		try {
			await ctx.stub.setEvent(asset.transaction, asset.toBuffer());
		}
		catch (error){
			console.log("Error in sending event");
		}
		finally {
			console.log("Attempted to send event = ", asset);
		}

        await ctx.stub.deleteState(assetId); // remove asset from chaincode state
    } /** deletePatientRecord **/

	//async deletePatientRecord(ctx, patientRecordId) {
    //    const exists = await this.patientRecordExists(ctx, patientRecordId);
    //    if (!exists) {
    //        throw new Error(`The patient record ${patientRecordId} does not exist`);
    //    }
    //    await ctx.stub.deleteState(patientRecordId);
    //}

	/**
	 * assetHistory
	 * @param {Context} ctx
	 * @param {string} args
	 */
	async assetHistory(ctx, assetId){
		console.log("In assetHistory(" + assetId +")");

		// Validate assetId
		if (typeof assetId === 'undefined')
			Throw new Error(`Error message from assetHistory: assetTag arg is required.`);

		// validate asset
		let assetAsBytes = await ctx.stub.getState(assetId);
		if(!assetAsBytes || assetAsBytes.length === 0)
			Throw new Error(`Error Message fromassetHistory: ${assetId} doesn't exist`);

		// get list of transactions for asset
		const iterator = await ctx.stub.getHistoryForKey(assetId);
		const assetHistoryList = [];

		while(true){
			let history = await iterator.next();

			if(history.value && history.value.value.toString()){
				let jsonRes = {};
				jsonRes.TxId = history.value.tx_id;
				jsonRes.IsDelete = history.value.is_delete.toString();
				// Convert TimeStamp date
				let d = new Date(0);
				d.setUTCSeconds(history.value.timestamp.seconds.low);
				jsonRes.Timestamp = d.toLocalString("en-US", { timeZone: "America/Chicago" }) + "CST";

				// Store Asset details
				try{
					jsonRes.value = JSON.parse(history.value.value.toString('utf8'));
				}
				catch(err){
					jsonRes.value = history.value.value.toString('utf8');
				}

				// Add to array of transaction history on asset
				assetHistoryList.push(jsonRes);
			}

			if(history.done){
				await iterator.close();
				console.log("leaving assetHistory (" + assetId + ")");
				return assetHistoryList;
			}
		}
	} /** assetHistory ***/


	/**
	 * getCallingUserId
	 *
	 * @param {context} ctx the transaction context
	 */
	//async getCallingUserId(ctx){
	//	let id = [];
	//	id.push(ctx.clientIdentity.getID());
	//	let begin = id[0].indexOf("/CN=");
	//	let end = id[0].lastIndexOf("::/C=");
	//	return id[0].substring(begin + 4, end);
	//}

	/**
	 * generateValidAssetId
	 */
	async generateValidAssetId(ctx, prefix, assetTag){
		console.log("In generateValidAssetId");
		let assetId, assetAsBytes;

		// If tag is passed in create id from that and validate that asset doesn't exist with that id
		if(assetTag != null){
			assetId = prefix + '-' + assetTag;
			assetAsBytes = await ctx.stub.getState(assetId);
			console.log("generateValidAssetId #1 assetId: " + assetId);
			if(!assetAsBytes || assetAsBytes.toString().length <= 0){
				console.log("generateValidAssetId #2 asset does not exist, return assetId");
			}
			else
				throw new Error(`Error Message\nAsset with assetId = ${assetId} already exists`);
		}
		else{
		// create a unique asset id
			let notUnique = true;
			while(notUnique){
				//get new asset id
				assetId = prefix + '-' + utilFunctions.random_num();

				console.log("generateValidAssetId #2 assetId: " + assetId);
				assetAsBytes = await ctx.stub.getState(assetId);
				if(!assetAsBytes || assetAsBytes.toString().length <= 0){

					notUnique = false;
					console.log("generateValidAssetId #3 asset with id doesn't exist, exit loop");
				}
				else
					console.log("generateValidAssetId #4 asset exists, regenerate id. assetAsBytes: " + assetAsBytes.toString());
			}
			console.log("generateValidAssetId #5 final assetId: " + assetId);
		}
		console.log("leave generateValidAssetId");

		return assetId;
	}

	/***************** User Managment Transactions ****************************************/

} // Class PatientRecordContract

/*********************** Class Exports *******************************************/

module.exports = PatientRecordContract;
