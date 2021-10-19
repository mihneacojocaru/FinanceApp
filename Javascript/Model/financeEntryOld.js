class FinanceEntryOld{

    constructor(obj){
        this.cashCard = obj[0].cashCard;
        this.category = obj[0].category;
        this.date = obj[0].date;
        this.description = obj[0].description;
        this.expence = obj[0].expence;
        this.incomme = obj[0].incomme;
        this.refunded = obj[0].refunded;
    }

    printToConsole = () => {
        console.log("Date: " +
                    this.date + 
                    "\nDescription: " + 
                    this.description +
                    "\nCategory: " +
                    this.category +
                    "\nCash/Card: " +
                    this.cashCard +
                    "\nRefunded: " + 
                    this.refunded +
                    "\nExpence: " +
                    this.expence + 
                    "\nIncomme: " +
                    this.incomme
                    );
    }

}

export default FinanceEntry;