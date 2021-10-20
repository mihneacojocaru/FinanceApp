import ControllerFinancesApp from "../Controller/controllerFinancesApp.js";


export default class ViewHome{

    constructor(){
        this.container = document.getElementById('root');
        this.containerTop = document.createElement('div');
        this.containerTop.className = "containerTop";
        this.container.appendChild(this.containerTop);
        this.overviewTable();
        this.inputSection();
        this.detailedInfo();
        
        this.tbody = document.getElementById('infoCont');

        this.ctrlFinancesApp = new ControllerFinancesApp();

        this.getDBInfo();
        this.addBtn = document.querySelector("#addBtn");
        this.onAddClick();
    }

    overviewTable = () => {
        const overViewTable = `<div class="overview">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month <input type="number" placeholder="1" min="1" max="12"></th>
                                    <th>Totals</th>
                                    <th>€</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Incomme</td>
                                    <td>1000</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Groceries</td>
                                    <td>300</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Rent</td>
                                    <td>150</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Transportation</td>
                                    <td>50</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>20</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Clothing</td>
                                    <td>0</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Leisure</td>
                                    <td>30</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Education</td>
                                    <td>100</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Taxes</td>
                                    <td>100</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Extras</td>
                                    <td>50</td>
                                    <td>€</td>
                                </tr>
                                <tr>
                                    <td>Total Sum</td>
                                    <td>500</td>
                                    <td>€</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    `;

        this.containerTop.innerHTML += overViewTable;
    }

    detailedInfo = () => {
        let details = `
        <div class="detailed-info">
        <table>
          <thead>
            <tr>
              <th>Month</th>
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
          <tbody id="infoCont"> 
          </tbody>
        </table>
      </div>
        `;

    this.container.innerHTML += details;
    }

    tableRow = (monthNr,date,desc,cat,cashCard,currency,refund,expence=0,incomme=0) => {
        const tableRow = `
                        <tr>
                            <td>${monthNr}</td>
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
                            <td>
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

        let month;
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
            month = rawDate[1];
            date = rawDate[2]+"."+rawDate[1];
            description = i.description;
            category = i.category;
            cashCard = i.cashCard;
            refunded = i.refunded;
            expence = i.expence;
            incomme = i.incomme;

            this.tableRow(month,date,description,category,cashCard,"€",refunded,expence,incomme);
            
        }
    }

    onAddClick = () => {
        this.addBtn.addEventListener("click", () => {   
            this.ctrlFinancesApp.getFormData();
            this.getDBInfo();
        });
    }
}




