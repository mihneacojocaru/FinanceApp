
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
        this.tableRow(1,"2.Jan","Payment","Extras","Card","€","No",50);
        this.tableRow(2,"10.Feb","Lidl","Groceries","Card","€","No",20);
        this.tableRow(2,"12.Feb","Work","Incomme","Card","€","No",0,2000);

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
          <input type="date">
          <label for="">Description</label>
          <input type="text">
        </div>
        <div class="block --2">
          <label for="">Expences</label>
          <input type="text">
          <label for="">Incomme</label>
          <input type="text">
        </div>
        <div class="block --3">
          <label for="">Category</label>
          <select id="category">
            <option>Select</option>
            <option value="incomme">Incomme</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="transportation">Transportation</option>
            <option value="maintenance">Maintenance</option>
            <option value="clothing">Clothing</option>
            <option value="leisure">Leisure</option>
            <option value="education">Education</option>
            <option value="taxes">Taxes</option>
            <option value="extras">Extras</option>
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
            <input type="checkbox" name="yes">
            <label for="no">No</label>
            <input type="checkbox" name="no">
          </form>
          <button class="addBtn">Add</button>  
        </div>
      </div>
                                    `;
        this.containerTop.innerHTML += inputSection;
    }

}




