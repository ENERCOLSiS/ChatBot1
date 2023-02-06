module.exports = class Order{
    constructor(){
        this.sNumber = this.sNumber;
        this.sUrl = sUrl;
        this.bDone = false;
    }
    isDone(bDone){
        if(bDone){
            this.bDone = bDone;
        }
        return this.bDone;
    }
}