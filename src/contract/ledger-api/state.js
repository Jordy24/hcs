'use strict';

/**
 * State class
 */

 class State{

    /**
     * @param {String|object} class
     * @param {keparts[]} elements
     *
     */

    constructor(stateClass,keyParts){
        this.class = stateClass
        this.key = State.makeKey(keyParts)
        this.currentState = null
    }

    getClass(){
        return this.class
    }

    getKey(){
        return this.key
    }

    getSplitKey(){
        return State.splitKey(this.key)
    }

    getCurrentState(){
        return this.currentState
    }

    serialize(){
        return State.serialize(this)
    }

    /**
     * 
     * @param {object} JSON
     * @param {buffer} buffer with data to store 
     */

     static serialize(object){
         return Buffer.from(JSON.stringify(object))
     }

    /**
     * @param {data}
     * @param {supportedClass}
     * @return {json}
     */

    static deserialize(data, supportedClass){
        console.log(data.toString())
        let json = JSON.parse(data.toString())
        let objClass = supportedClasses[json.class]
        if (!objClass){
            throw new Error(`Unknown class of ${json.class}`)
        }
        let object = new (objClass)(json)

        return object
    }

    /**
     * @param {data}
     * @return {json}
     */

    static deserializeClass(data, objClass){
        let json = JSON.parse(data.toString())
        let object = new (objClass)(json)
        return object
    }

    /**
     * @param (String[]) keyParts
     */
    static makeKey(keyParts){
        return keyParts.map(part => JSON.stringify(part)).join(':')
    }

    static splitKey(key){
        return key.split(':')
    }

 }

 module.exports = State