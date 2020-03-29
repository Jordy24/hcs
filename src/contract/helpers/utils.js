/****** Utility functions **** */

/**
 *  validateAsset
 */

function validateAsset(assetAsBytes, assetId, assetExpectedType){
    // Check that the assetId is a valid Asset
    if( !assetAsBytes || assetAsBytes.toString().length <= 0){
        throw new Error(`Error Message\nAsset with assetId = ${assetId} does not exist`)
    }

    if( typeof assetExpectedType !== 'undefined'){
        // check that it is the correct type of asset
        let assetType = assetId.substring(0,assetId.indexOf("-"))
        if(assetType != assetExpectedType){
            throw Error(`Error Message\nAsset ${assetId} is not the correct asset for this transaction. Expecting type ${assetExpectedType}`)
        }
    }
}

/***
 * random num - generate a complex random number xxxx-xxx
 */
function random_num(){
    const s4 = () => Math.floor(Math.random() * 0x10000).toString().substring(1)
    const s3 = () => Math.floor(Math.random() * 0x1000).toString().substring(1)

    return `${s4()} - ${s3()}`
}

/***
 * random_date - generate a random date
 */
function random_date(start, end){
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = {validateAsset, random_num, random_date }
