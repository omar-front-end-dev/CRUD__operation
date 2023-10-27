// selection All input
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const advertisements = document.getElementById("advertisements");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const btnSubmit = document.getElementById("submit");


let mood = 'Create';
let tmp; 

// function get Total
function getTotal() {
    if (price.value != null) {
        let result = parseInt((+price.value + +taxes.value + +advertisements.value) - (+discount.value));
        total.textContent = result;
        total.style.backgroundColor = "#040";
    }else{
        total.style.backgroundColor = "#eb2323";
        total.textContent = 0
    }
    price.value
}



// create Products



let dataProducts = JSON.parse(localStorage.getItem("products")) || [];

btnSubmit.addEventListener("click", ()=>{
    let newProducts = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        advertisements: advertisements.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    // count
    if(title.value != "" && price.value != "" && category.value != "" && newProducts.count <= 100){
        if (mood === "Create") {
            if (newProducts.count > 1) {
                for(let index = 0; index < newProducts.count; index++) {
                    dataProducts.push(newProducts);
                }
            }else{
                dataProducts.push(newProducts);
            }
        }else{
            dataProducts[tmp] = newProducts;
            mood = "Create";
            btnSubmit.textContent = mood
            count.style.display = "block"
        }
        clearData()
    }
    
    
    // save localStorage
    localStorage.setItem("products", JSON.stringify(dataProducts))
    displayData()
})


// clear input Value

function clearData() {
        title.value = ""
        price.value = ""
        taxes.value = ""
        advertisements.value = ""
        discount.value = ""
        total.textContent = ""
        count.value = ""
        category.value = ""
        total.style.backgroundColor = "#eb2323";
}



// read data

function displayData() {
    let table = "";
    for (let index = 0; index < dataProducts.length; index++) {
        table+=`
            <tr>
                <td>${index + 1}</td>
                <td>${dataProducts[index].title}</td>
                <td>${dataProducts[index].price || 0}$</td>
                <td>${dataProducts[index].taxes || 0}$</td>
                <td>${dataProducts[index].advertisements || 0}$</td>
                <td>${dataProducts[index].discount || 0}$</td>
                <td>${dataProducts[index].total}$</td>
                <td>${dataProducts[index].category}</td>
                <td><button onclick="updateData(${index})" id="btn__update">Update</button></td>
                <td><button onclick="deleteData(${index})" id="btn__delete">Delete</button></td>
            </tr>    
            `
    }
        document.querySelector("#tbody").innerHTML = table ;
        let btnDeleteAll = document.getElementById("delete__all")
        if (dataProducts.length > 0) {
            btnDeleteAll.innerHTML = `
            <button onclick=deleteAll()>Delete All (${dataProducts.length})</button>
            `
        }else{
            btnDeleteAll.innerHTML = "";
        }
    }
    displayData()

// delete And delete All
function deleteData(index) {
    dataProducts.splice(index, 1)
    localStorage.products = JSON.stringify(dataProducts)
    displayData()
}

function deleteAll() {
    localStorage.clear()
    dataProducts.splice(0)
    displayData()
}





// update

function updateData(index) {
    title.value = dataProducts[index].title
    price.value = dataProducts[index].price
    taxes.value = dataProducts[index].taxes
    advertisements.value = dataProducts[index].advertisements
    discount.value = dataProducts[index].discount
    category.value = dataProducts[index].category
    getTotal()
    count.style.display = "none";
    btnSubmit.textContent = "Update"
    mood = "Update"
    tmp = index;
    scroll({
        top:0,
        behavior: "smooth"
    });
    getTotal()
}


// search
let searchMood = "title";


function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "search__title") {
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    search.placeholder = "Search By" + " " + searchMood;
    search.focus()
    search.value= "";
    displayData()
}


function searchData(value) {
    let table = "";
    for (let index = 0; index < dataProducts.length; index++) {
        if (searchMood == "title") {
            if (dataProducts[index].title.includes(value)) {
                table+=`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${dataProducts[index].title}</td>
                        <td>${dataProducts[index].price || 0}$</td>
                        <td>${dataProducts[index].taxes || 0}$</td>
                        <td>${dataProducts[index].advertisements || 0}$</td>
                        <td>${dataProducts[index].discount || 0}$</td>
                        <td>${dataProducts[index].total || 0}$</td>
                        <td>${dataProducts[index].category}</td>
                        <td><button onclick="updateData(${index})" id="btn__update">Update</button></td>
                        <td><button onclick="deleteData(${index})" id="btn__delete">Delete</button></td>
                    </tr>    
                    `
            }
        }else{
            
                if (dataProducts[index].category.includes(value)) {
                    table+=`
                            <tr>
                                <td>${index + 1}</td>
                                <td>${dataProducts[index].title}</td>
                                <td>${dataProducts[index].price || 0}$</td>
                                <td>${dataProducts[index].taxes || 0}$</td>
                                <td>${dataProducts[index].advertisements || 0}$</td>
                                <td>${dataProducts[index].discount || 0}$</td>
                                <td>${dataProducts[index].total || 0}$</td>
                                <td>${dataProducts[index].category}</td>
                                <td><button onclick="updateData(${index})" id="btn__update">Update</button></td>
                                <td><button onclick="deleteData(${index})" id="btn__delete">Delete</button></td>
                            </tr>    
                            `
            }
        }
    }
    document.querySelector("#tbody").innerHTML = table
}
// clean data weth input

