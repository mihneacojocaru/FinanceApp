import FinanceEntry from "../Model/financeEntry.js";
import ViewHome from "../View/ViewHome.js";


export default class ControllerFinancesApp{

    constructor(){
        this.financeEntry;
        this.addBtn = document.getElementById("addBtn");
        // this.onAddBtn();
        // this.readFromDB();
    }

    readFromDB = () => {
        let list = [];
        let storage = JSON.parse(localStorage.getItem("FinancesApp"));

        if(storage){
            for(let item of storage){
                list.push(item);
            }
        }

        return list;
    }

    getFormData = () => {
        const date = document.querySelector("#dateValue").value;
        const description = document.querySelector("#descriptionValue").value.trim();
        const category = document.querySelector("#categoryValue").value.trim();
        const cashCard = document.querySelector("#cashCard").value.trim();

        let expence = 0;
        let incomme = 0;

        let newExpence = document.querySelector("#expenceValue").value.trim(); 
        let newIncomme = document.querySelector("#incommeValue").value.trim();

        let refunded = "No";
        const newRefunded = document.querySelector("#refundedCheck").checked;

        if (date === ""){
            alert("date can not be left empty");
            document.querySelector("#dateValue").focus();
            return;
        }
        if (description === "") {
            alert("description can not be left empty");
            document.querySelector("#descriptionValue").focus();
            return;
        } 
        if (category === "") {
            alert("category can not be left empty");
            document.querySelector("#categoryValue").focus();
            return;
        }
        if(newExpence === ""){
            if(newIncomme === ""){
                alert("Expences and Incomme cannot be both empty");
                document.querySelector("#expenceValue").focus;
                return;
            }else{
                incomme = parseFloat(newIncomme);
            }
        } else{
            expence = parseFloat(newExpence);
        }
        if(newRefunded == true){
            refunded = "Yes";
        }

        this.financeEntry = new FinanceEntry(cashCard,category,date,description,expence,incomme,refunded);
        this.updateLocalStorage(this.financeEntry);
        this.resetForm();
    }

    putFormData = (obj) => {
        const description = document.querySelector("#descriptionValue");
        const date = document.querySelector("#dateValue");
        const category = document.querySelector("#categoryValue");
        const cashCard = document.querySelector("#cashCard");
        const expence = document.querySelector("#expenceValue");
        const incomme = document.querySelector("#incommeValue");
        const newRefunded = document.querySelector("#refundedCheck");
        description.value = obj.description;
        date.value = obj.date;
        category.value = obj.category;
        cashCard.value = obj.cashCard;
        expence.value = obj.expence;
        incomme.value = obj.incomme;
        //newRefunded.checked = obj.refunded;
    }

    resetForm = () => {
        document.querySelector("#dateValue").value = "";
        document.querySelector("#descriptionValue").value = "";
        document.querySelector("#categoryValue").value = "";
        document.querySelector("#expenceValue").value = "";
        document.querySelector("#incommeValue").value = "";
        document.querySelector("#refundedCheck").checked = false;
    }

    onAddBtn = () => {
        this.addBtn.addEventListener("click", () => {
            this.getFormData();
        });
    }

    updateLocalStorage = (obj) => {
        
        let list = [];   
        try {
            if(localStorage.getItem("FinancesApp") === null){
                list.push(obj);
                localStorage.setItem("FinancesApp", JSON.stringify(list));
            } else{
                let storage = JSON.parse(localStorage.getItem("FinancesApp"));
                for(let element of storage){
                    list.push(element);
                }
                list.push(obj);
                localStorage.setItem("FinancesApp",JSON.stringify(list));
            }
        } catch (error) {
            console.log(error);
        }
        
        
    }

    deleteItem = (obj) => {
        let list = [];
        let storage = JSON.parse(localStorage.getItem("FinancesApp"));
        for (let item of storage){
            list.push(item);
        }
        
        list.forEach( e => {
            if(e.cashCard == obj.cashCard
            && e.category == obj.category
            && e.date == obj.date
            && e.description == obj.description
            && e.expence == obj.expence
            && e.incomme == obj.incomme
            && e.refunded == obj.refunded
                ){
                list = list.filter(item => item !== e);
            }
        })
        localStorage.setItem("FinancesApp",JSON.stringify(list));
    }

    testDeleteFunction = (number) => {
        let storage = JSON.parse(localStorage.getItem("FinancesApp"));
        let myObj = storage[number];
        let x = new FinanceEntry(myObj.cashCard,myObj.category,myObj.date,myObj.description,myObj.expence,myObj.incomme,myObj.refunded);
        // x = JSON.stringify(x);
        // x = JSON.parse(x);

        
        this.deleteItem(x);
        
    }
}
