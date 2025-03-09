// models/Person.js
class PurchaseModel {
    constructor(data, seq) {
        this.seq = seq
        
        Object.keys(data).map((key) => {
            if (key === 'id') {
                this.id = data[key]
            } else if (key === 'name') {
                this.name = data[key]
            } else if (key === 'otherPurchase') {
                this.otherPurchase = data[key]
            } else if (key === 'price') {
                this.price = data[key]
            } else if (key === 'materialPrice') {
                this.materialPrice = data[key]
            } else if (key === 'vatPrice') {
                this.vatPrice = data[key]
            } else if (key === 'gpPrice') {
                this.gpPrice = data[key]
            } else if (key === 'wagePrice') {
                this.wagePrice = data[key]
            } else if (key === 'platformName') {
                this.platformName = data[key]
            }
        });
    }
}

export default PurchaseModel;
