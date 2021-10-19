export default class FinanceEntry{

    constructor(cashCard,category,date,description,expence,incomme,refunded){
        this.cashCard = cashCard;
        this.category = category;
        this.date = date;
        this.description = description;
        this.expence = expence;
        this.incomme = incomme;
        this.refunded = refunded;
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

