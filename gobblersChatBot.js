const Order = require("./doneOrder");

//Food Prices
const kebabCost = 7;
const pizzaCost = 5;
const arepaCost = 4;
const empanadaCost = 3;
const drinkCost = 2.5;
const icecreamCost = 3.5;

//Constants to add price for regular and large
const largeAdd = 2.5;
const regularAdd = 1.5;

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FIRST_ITEM: Symbol("first_item"),
    SIZE1:   Symbol("size1"),
    TOPPINGS1:   Symbol("toppings1"),

    SECOND_ITEM: Symbol("second_item"),
    SIZE2: Symbol("size2"),
    TOPPINGS2:   Symbol("toppings2"),

    THIRD_ITEM: Symbol("third_item"),
    SIZE3: Symbol("size3"),
    TOPPINGS3:   Symbol("toppings3"),

    FOURTH_ITEM: Symbol("fourth_item"),
    SIZE4: Symbol("size4"),
    TOPPINGS4:   Symbol("toppings4"),

    DRINK:  Symbol("drink"),
    ICECREAM: Symbol("icecream"),

    END_ORDER: Symbol("end_order")
});

module.exports = class GobblersOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem1 = ""; //Doner Kebab
        this.sSize1 = "";
        this.sToppings1 = "";
        this.pItem1 = 0;
        
        this.sItem2 = ""; //Pizza
        this.sSize2 = "";
        this.sToppings2 = "";
        this.pItem2;

        this.sItem3 = ""; //Arepa
        this.sSize3 = "";
        this.sToppings3 = "";
        this.pItem3 = 0;

        this.sItem4 = ""; //Empanada
        this.sSize4 = "";
        this.sToppings4 = "";
        this.pItem4 = 0;

        this.sUpSell1 = ""; //Drink

        this.sUpSell2 = ""; //Ice Cream

        this.total = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            
            //Welcoming
            case OrderState.WELCOMING:   
                this.stateCur = OrderState.FIRST_ITEM
                aReturn.push("Welcome to Gobblers");
                aReturn.push("Kebab is our specialty, would you like kebab? (yes/no)")
            break
            // 1st Item: Kebab
            case OrderState.FIRST_ITEM:
                if(sInput.toLowerCase() != "no" && sInput.toLowerCase() != "yes"){
                    aReturn.push("Please enter 'yes' or 'no'")
                }else{
                    if(sInput.toLowerCase() == "yes"){
                        this.sItem1 = "Kebab";
                        this.stateCur = OrderState.SIZE1;
                        aReturn.push("What size of Kebab would you like? (small, regular, large)");
                        break;
                    }
                    this.stateCur = OrderState.SECOND_ITEM;
                    aReturn.push("Would you like Pizza? (yes/no)");
                }
            break;

            case OrderState.SIZE1:
                if(sInput.toLowerCase() != "small" && sInput.toLowerCase() != "regular" && sInput.toLowerCase() != "large") {
                    aReturn.push("Please enter: 'small', 'regular', or 'large'")
                }
                else{
                    this.stateCur = OrderState.TOPPINGS1
                    this.sSize1 = sInput;
                    if(this.sSize1 == "small") this.pItem1 = kebabCost;
                    if(this.sSize1 == "regular") this.pItem1 = kebabCost + regularAdd;
                    if(this.sSize1 == "large") this.pItem1 = kebabCost + largeAdd;
                    aReturn.push("What type of meat would you like? (lamb, chicken, mix)");
                }  
            break;
            
            case OrderState.TOPPINGS1:
                if(sInput.toLowerCase() != "lamb" && sInput.toLowerCase() != "chicken" && sInput.toLowerCase() != "mix")
                {
                    aReturn.push("Please enter: 'lamb', 'chicken', or 'mix' only")
                }else{
                    this.stateCur = OrderState.SECOND_ITEM // this was added in class
                    this.sToppings1 = sInput;
                    aReturn.push("Would you like Pizza? (yes/no)");
                }
            break;

            //2nd Item: Pizza
            case OrderState.SECOND_ITEM:
                if(sInput.toLowerCase() != "no" && sInput.toLowerCase() != "yes"){
                    aReturn.push("Please enter 'yes' or 'no'")
                }else{
                    if(sInput.toLowerCase() == "yes"){
                        this.sItem2 = "Pizza";
                        this.stateCur = OrderState.SIZE2;
                        aReturn.push("What size of pizza would you like? (small, regular, large)");
                        break;
                    }
                    this.stateCur = OrderState.THIRD_ITEM
                    aReturn.push("Would you like Arepa? (yes/no)");
                }
            break;

            case OrderState.SIZE2:
                if(sInput.toLowerCase() != "small" && sInput.toLowerCase() != "regular" && sInput.toLowerCase() != "large") {
                    aReturn.push("Please only input: 'small', 'regular' or 'large'")
                }
                else{
                    this.stateCur = OrderState.TOPPINGS2
                    this.sSize2 = sInput;
                    if(this.sSize2 == "small") this.pItem2 = pizzaCost;
                    if(this.sSize2 == "regular") this.pItem2 = pizzaCost + regularAdd;
                    if(this.sSize2 == "large") this.pItem2 = pizzaCost + largeAdd;
                    aReturn.push("What toppings would you like? (lamb, chicken, mix)");
                }
            break;
            
            case OrderState.TOPPINGS2:
                if(sInput.toLowerCase() != "lamb" && sInput.toLowerCase() != "chicken" && sInput.toLowerCase() != "mix")
                {
                    aReturn.push("Please enter: 'lamb', 'chicken', or 'mix' only")
                }else{
                    this.stateCur = OrderState.THIRD_ITEM
                    this.sToppings2 = sInput;
                    aReturn.push("Would you like Arepa? (yes/no)");
                }
            break;
            
            //3rd Item: Arepa
            case OrderState.THIRD_ITEM:
                if(sInput.toLowerCase() != "no" && sInput.toLowerCase() != "yes"){
                    aReturn.push("Please enter 'yes' or 'no'")
                }else{
                    if(sInput.toLowerCase() == "yes"){
                        this.sItem3 = "Arepa";
                        this.stateCur = OrderState.SIZE3;
                        aReturn.push("What size of Arepa would you like? (small, regular, large)");
                        break;
                    }
                    this.stateCur = OrderState.FOURTH_ITEM
                    aReturn.push("Would you like Empanada? (yes/no)");
                }
            break;

            case OrderState.SIZE3:
                if(sInput.toLowerCase() != "small" && sInput.toLowerCase() != "regular" && sInput.toLowerCase() != "large") {
                    aReturn.push ("Please only input: 'small', 'regular' or 'large'")
                }
                else{
                    this.stateCur = OrderState.TOPPINGS3
                    this.sSize3 = sInput;
                    if(this.sSize3 == "small") this.pItem3 = arepaCost;
                    if(this.sSize3 == "regular") this.pItem3 = arepaCost + regularAdd;
                    if(this.sSize3 == "large") this.pItem3 = arepaCost + largeAdd;
                    aReturn.push("What toppings would you like? (lamb, chicken, mix)");
                }
            break;
            
            case OrderState.TOPPINGS3:
                if(sInput.toLowerCase() != "lamb" && sInput.toLowerCase() != "chicken" && sInput.toLowerCase() != "mix")
                {
                    aReturn.push("Please enter: 'lamb', 'chicken', or 'mix' only")
                }
                else{
                    this.stateCur = OrderState.FOURTH_ITEM
                    this.sToppings3 = sInput;
                    aReturn.push("Would you like Empanada? (yes/no)");
                }
            break;
            
            //4th Item: Empanada
            case OrderState.FOURTH_ITEM:
                if(sInput.toLowerCase() != "no" && sInput.toLowerCase() != "yes"){
                    aReturn.push("Please enter 'yes' or 'no'")
                }else{
                    if(sInput.toLowerCase() == "yes"){
                        this.sItem4 = "Empanada";
                        this.stateCur = OrderState.SIZE4;
                        aReturn.push("What size of Empanada would you like? (small, regular, large)");
                        break;
                    }
                    this.stateCur = OrderState.DRINK
                    aReturn.push("...something to Drink? if yes please type: 'water', 'soda', or 'iced tea' otherwise type 'no'");
                }
            break;

            case OrderState.SIZE4:
                
                if(sInput.toLowerCase() != "small" && sInput.toLowerCase() != "regular" && sInput.toLowerCase() != "large") {
                    aReturn.push("Please only input: 'small', 'regular' or 'large'")
                }
                else{
                    this.stateCur = OrderState.TOPPINGS4
                    this.sSize4 = sInput;
                    if(this.sSize4 == "small") this.pItem4 = empanadaCost;
                    if(this.sSize4 == "regular") this.pItem4 = empanadaCost + regularAdd;
                    if(this.sSize4 == "large") this.pItem4 = empanadaCost + largeAdd;
                    aReturn.push("What toppings would you like? (lamb, chicken, mix)");
                }
            break;
            
            case OrderState.TOPPINGS4:
                if(sInput.toLowerCase() != "lamb" && sInput.toLowerCase() != "chicken" && sInput.toLowerCase() != "mix")
                {
                    aReturn.push("Please enter: 'lamb', 'chicken', or 'mix' only")
                }
                else{
                    this.stateCur = OrderState.DRINK
                    this.sToppings4 = sInput;
                    aReturn.push("...something to Drink? if yes please type: 'water', 'soda', or 'iced tea' otherwise type 'no'");
                }
            break;

            //___________****  Up-Sell Items  ****_________________________________________

            case OrderState.DRINK:
                if(sInput.toLowerCase() != "water" && sInput.toLowerCase() != "soda" && sInput.toLowerCase() != "iced tea" && sInput.toLowerCase() != "no")
                {
                    aReturn.push("please type: 'water', 'soda', or 'iced tea' otherwise type 'no'")
                }
                else{    
                    if(sInput.toLowerCase() != "no"){
                        this.stateCur = OrderState.ICECREAM
                        this.sUpSell1 = sInput;
                        aReturn.push("...what about Ice Cream? if yes please type: 'vanilla', 'cherry', or 'bluebery' otherwise type 'no'")
                    }
                    else{
                        this.stateCur = OrderState.ICECREAM
                        aReturn.push("...what about Ice Cream? if yes please type: 'vanilla', 'cherry', or 'bluebery' otherwise type 'no'")
                    } 
                }
            break;

            case OrderState.ICECREAM:
                if(sInput.toLowerCase() != "vanilla" && sInput.toLowerCase() != "cherry" && sInput.toLowerCase() != "blue berry" && sInput.toLowerCase() != "no")
                {
                    aReturn.push("please type: 'vanilla', 'cherry', or 'blue berry' otherwise type 'no'")
                }
                else{
                    if(sInput.toLowerCase() != "no")this.sUpSell2 = sInput;
                
                    this.isDone(true);   // Here the order is completed!!!
                    aReturn.push("Awesome! Here is your order: ");
                    //Kebab
                    if(this.sItem1){
                        aReturn.push(`${this.sSize1} ${this.sToppings1} ${this.sItem1}`);
                        this.total = this.total + this.pItem1
                    }
                    
                    //Pizza
                    if(this.sItem2){
                        aReturn.push(`${this.sSize2} ${this.sToppings2} ${this.sItem2}`);
                        this.total = this.total + this.pItem2
                    }
                    
                    //Arepa
                    if(this.sItem3){
                        aReturn.push(`${this.sSize3} ${this.sToppings3} ${this.sItem3}`);
                        this.total = this.total + this.pItem3
                    }
                    
                    //Empanada
                    if(this.sItem4){
                        aReturn.push(`${this.sSize4} ${this.sToppings4} ${this.sItem4}`);
                        this.total = this.total + this.pItem4
                    }
                    
                    //Drink
                    if(this.sUpSell1){
                        aReturn.push(`Drink: ${this.sUpSell1}`);
                        this.total = this.total + drinkCost
                    }

                    //Ice Cream
                    if(this.sUpSell2){
                        aReturn.push(`Ice Cream: ${this.sUpSell2}`);
                        this.total = this.total + icecreamCost
                    }

                    //Printing total cost --\u00A0 Unicode for space - \u0009 or \t tab did not work
                    aReturn.push(`Sub-Total: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 $${this.total}`);
                    aReturn.push(`HST: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 $${(this.total*0.13).toFixed(2)}`);
                    aReturn.push(`Total: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 $${(this.total+this.total*0.13).toFixed(2)}`);

                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 30);
                    aReturn.push(`Thank you! Gobblers staff is now preparing your order...`);
                    aReturn.push(`Your order will be ready in 30min. Please pick it up at ${d.toTimeString()}`);
                    }                     
            break;
        }
        return aReturn;
    }
}