import ControllerFinancesApp from "../Controller/controllerFinancesApp.js";


export default class ViewHome{

    constructor(){
        this.container = document.getElementById('root');
        this.containerTop = document.createElement('div');
        this.containerTop.className = "containerTop";
        this.container.appendChild(this.containerTop);
        this.overviewSection();
        this.inputSection();
        this.detailedInfo();
        
        this.tbody = document.getElementById('infoCont');

        this.ctrlFinancesApp = new ControllerFinancesApp();

        this.getDBInfo();
        this.addBtn = document.querySelector("#addBtn");

        this.onAddClick();
        this.onDeleteClick();
        this.onEditClick();

        this.overviewFunctionality();
    }

    overviewSection = () => {
        this.overviewTable();
        let tableBody = document.getElementById("overviewBody");
        tableBody.innerHTML += this.overviewContent();
    }

    overviewTable = () => {
        let thisMonth = new Date();
        thisMonth = thisMonth.getMonth() + 1;

        const overViewTable = `<div class="overview">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month <input id="monthValue" type="number" value="${thisMonth}" min="1" max="12"></th>
                                    <th>Totals</th>
                                    <th>€</th>
                                </tr>
                            </thead>
                            <tbody id="overviewBody"></tbody>
                        </table>
                        </div>
                    `;

        this.containerTop.innerHTML += overViewTable;
    }

    overviewContent = (incomme=0,groceries=0,rent=0,transportation=0,maintenance=0,clothing=0,leisure=0,education=0,taxes=0,extras=0,total=0) => {
        const overviewContent = `<tr>
                                    <td>Incomme</td>
                                    <td>${incomme}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Groceries</td>
                                    <td>${groceries}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Rent</td>
                                    <td>${rent}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Transportation</td>
                                    <td>${transportation}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>${maintenance}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Clothing</td>
                                    <td>${clothing}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Leisure</td>
                                    <td>${leisure}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Education</td>
                                    <td>${education}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Taxes</td>
                                    <td>${taxes}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Extras</td>
                                    <td>${extras}</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Total Sum</td>
                                    <td>${total}</td>
                                    <td>€</td>
                                </tr>
                                `;

        return overviewContent;
    }

    overviewFunctionality = () => {
        let monthValue = document.getElementById("monthValue");
        let tableBody = document.getElementById("overviewBody");

        let incomme = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Incomme");
        let groceries = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Groceries");
        let rent = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Rent");
        let transportation = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Transportation");
        let maintenance = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Maintentance");
        let clothing = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Clothing");
        let leisure = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Leisure");
        let education = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Education");
        let taxes = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Taxes");
        let extras = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Extras");

        let total = groceries + rent + transportation + maintenance + clothing + leisure + education + taxes + extras;

        tableBody.innerHTML = "";
        tableBody.innerHTML += this.overviewContent(incomme,groceries,rent,transportation,maintenance,clothing,leisure,education,taxes,extras,total);

        monthValue.addEventListener("change", () => {
            
            let incomme = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Incomme");
            let groceries = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Groceries");
            let rent = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Rent");
            let transportation = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Transportation");
            let maintenance = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Maintentance");
            let clothing = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Clothing");
            let leisure = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Leisure");
            let education = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Education");
            let taxes = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Taxes");
            let extras = this.ctrlFinancesApp.getDataByMonth(monthValue.value,"Extras");

            let total = groceries + rent + transportation + maintenance + clothing + leisure + education + taxes + extras;

            tableBody.innerHTML = "";
            tableBody.innerHTML += this.overviewContent(incomme,groceries,rent,transportation,maintenance,clothing,leisure,education,taxes,extras,total);
        })

        
    }
    

    detailedInfo = () => {
        let details = `
        <div class="detailed-info">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Cash/Card</th>
              <th>Currency</th>
              <th>Refunded</th>
              <th>Expence</th>
              <th>Incomme</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody id="infoCont"></tbody>
        </table>
      </div>
        `;

    this.container.innerHTML += details;
    }

    tableRow = (date,desc,cat,cashCard,currency,refund,expence=0,incomme=0) => {
        const tableRow = `
                        <tr>
                            <td>${date}</td>
                            <td>${desc}</td>
                            <td>${cat}</td>
                            <td>${cashCard}</td>
                            <td>${currency}</td>
                            <td>${refund}</td>
                            <td>
                                <span>${expence}</span>
                                <span>${currency}</span>
                            </td>
                            <td>
                                <span>${incomme}</span>
                                <span>${currency}</span>
                            </td>
                            <td class="buttons">
                                <button class="edit">Edit</button>
                                <button class="delete">Delete</button>
                            </ td>
                        </tr>   
                        `;
        this.tbody.innerHTML += tableRow;
    }

    inputSection = () => {
        const inputSection = `
        <div class="input-section">
        <div class="block --1">
          <label for="">Date</label>
          <input type="date" id="dateValue">
          <label for="">Description</label>
          <input type="text" id="descriptionValue">
        </div>
        <div class="block --2">
          <label for="">Expence</label>
          <input type="text" id="expenceValue">
          <label for="">Incomme</label>
          <input type="text" id="incommeValue">
        </div>
        <div class="block --3">
          <label for="">Category</label>
          <select id="categoryValue">
            <option placeholder="Select"></option>
            <option value="Incomme">Incomme</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Clothing">Clothing</option>
            <option value="Leisure">Leisure</option>
            <option value="Education">Education</option>
            <option value="Taxes">Taxes</option>
            <option value="Extras">Extras</option>
        </select>
          <label for="">Cash/Card</label>
          <select id="cashCard">
            <option value="card">Card</option>
            <option value="cash">Cash</option>
        </select>
        </div>
        <div class="block --4">
          <label>Refunded</label>
          <form action="">
            <label for="yes">Yes</label>
            <input type="checkbox" name="yes" id="refundedCheck">
          </form>
          <button id="addBtn">Add</button>  
        </div>
      </div>
                                    `;
        this.containerTop.innerHTML += inputSection;
    }

    getDBInfo = () => {
        this.tbody.innerHTML = "";

        let x = this.ctrlFinancesApp.readFromDB();

        let date;
        let description;
        let category;
        let cashCard;
        let refunded;
        let expence;
        let incomme;        

        for(let i of x){
            
            let rawDate = i.date;
            rawDate = rawDate.split("-");
            date = rawDate[2]+"."+rawDate[1]+"."+rawDate[0];
            description = i.description;
            category = i.category;
            cashCard = i.cashCard;
            refunded = i.refunded;
            expence = i.expence;
            incomme = i.incomme;

            this.tableRow(date,description,category,cashCard,"€",refunded,expence,incomme);
            
        }
        this.overviewFunctionality();
    }

    onAddClick = () => {
        this.addBtn.addEventListener("click", () => {   
            this.ctrlFinancesApp.getFormData();
            this.getDBInfo();
        });
    }

    onDeleteClick = () => {
        this.tbody.addEventListener("click",this.deleteFunction);
    }

    deleteFunction = e => {
        const obj = e.target;
        if(obj.className == "delete"){

            let rawDate = obj.parentNode.parentNode.children[0].textContent;            
            rawDate = rawDate.split(".");            
            rawDate = rawDate[2] + "-" + rawDate[1] +"-"+ rawDate[0];


            let item = {
                cashCard:obj.parentNode.parentNode.children[3].textContent,
                category:obj.parentNode.parentNode.children[2].textContent,
                date:rawDate,
                description:obj.parentNode.parentNode.children[1].textContent,
                expence:obj.parentNode.parentNode.children[6].children[0].textContent,
                incomme:obj.parentNode.parentNode.children[7].children[0].textContent,
                refunded:obj.parentNode.parentNode.children[5].textContent
            }

            this.ctrlFinancesApp.deleteItem(item);
            this.getDBInfo();
        }
    }

    onEditClick = () => {
        this.tbody.addEventListener("click",this.editFunction);
    }

    editFunction = e => {
        const obj = e.target; 
        if(obj.className == "edit"){
            console.log("Edit clicked");
            let rawDate = obj.parentNode.parentNode.children[0].textContent;            
            rawDate = rawDate.split(".");            
            rawDate = rawDate[2] + "-" + rawDate[1] +"-"+ rawDate[0];
            let item = {
                cashCard:obj.parentNode.parentNode.children[3].textContent,
                category:obj.parentNode.parentNode.children[2].textContent,
                date:rawDate,
                description:obj.parentNode.parentNode.children[1].textContent,
                expence:obj.parentNode.parentNode.children[6].children[0].textContent,
                incomme:obj.parentNode.parentNode.children[7].children[0].textContent,
                refunded:obj.parentNode.parentNode.children[5].textContent
            }
            this.ctrlFinancesApp.putFormData(item);
            this.ctrlFinancesApp.deleteItem(item);
            this.getDBInfo();
            window.scrollTo(0,0);
            
        }
    }



}




