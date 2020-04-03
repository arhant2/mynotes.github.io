// 0 - Create
// 1 - All
// 2 - current
// 3 - Archive
// 4 - Trash
// 5 - Viewing
// 6 - Editing

var currentState;
var arr = []; //tile, desc, state
var n = 0;
var aside = document.querySelector("aside");
var main = document.querySelectorAll("main");
var buttonAdd = document.querySelector(".main-add .add-comp");
var buttonEdit = document.querySelector(".main-add .save-changes");
var tit = document.querySelector(".main-add #tit");
var desc = document.querySelector(".main-add #desc");
var content = document.querySelector(".content");
var genHeads = document.querySelectorAll(".for-every .top-desc h1");
var asideChilds = document.querySelectorAll("aside div");
var nothing = document.querySelector(".for-every .nothing");

var editH1 = document.querySelector(".main-add h1.edit");
var newH1 = document.querySelector(".main-add h1.new");
var newBtnBelow = document.querySelector(".main-add .add-comp");
var editBtnBelow = document.querySelector(".main-add .save-changes");

var viewerTitle = document.querySelector(".viewer .view-title h1");
var viewerContent = document.querySelector(".viewer .act-content");
var viewerChangingBtns = document.querySelector(".viewer .ex-symbols");



var unarchiveBtnHTML = '<div class="s-un"><i class="fas fa-calendar-check"></i></div> ';
var archiveBtnHTML = '<div class="s-ar"><i class="fas fa-calendar-times"></i></div> ';
var trashBtnHTML = '<div class="s-tr"><i class="fas fa-trash"></i></div> ';
var editBtnHTML = '<div class="s-ed"><i class="fas fa-pen"></i></div> ';

var previousState;
var viewingEditingWhich;

//////////////////////////////////Init////////////////
currentState = 2;
display2to4(2);
////////////////////////////////////////////////////

// Aside Hover effect //

aside.addEventListener("mouseover", function(){
    for(i=0; i<main.length; i++){
        main[i].style.paddingLeft = "205px";
    }
});


aside.addEventListener("mouseout", function(){
    for(i=0; i<main.length; i++){
        main[i].style.paddingLeft = "50px";
    }
});


// Aside child click
for(var i=0; i<asideChilds.length; i++){
    asideChilds[i].addEventListener("click", function(){
        var k;
        if(this.id === "add-new"){
            k = 0;
        }else if(this.id === "view-all"){
            k = 1;
        }else if(this.id === "view-current"){
            k = 2;
        }else if(this.id === "view-archived"){
            k = 3;
        }else{
            k = 4;
        }
        if(currentState != k){
            display(k);
        }
    });
}


//Back for viewing
var backBtn = document.querySelector(".viewer .s-back");
backBtn.addEventListener("click", function(){
    display(previousState);
})



// Add Notes button set //

buttonAdd.addEventListener("click", function(){
    // alert("Into it")
    if(tit.value == ""){
        alert("Please enter the title!");
    }else{
        arr.push( {
            title: tit.value,
            desc: desc.value,
            state: 2
        });
        // alert("button pressed");
        display(2);
    }
});


// Edit button set //

buttonEdit.addEventListener("click", function(){
    if(tit.val == ""){
        alert("Please enter the title!");
    }
    else{
        arr[viewingEditingWhich].title = tit.value;
        arr[viewingEditingWhich].desc = desc.value;
        display(5);
    }
});


function symbolCreator(KiskeLiye){
    var htmlMade = '<div class="symbols">'
    if(KiskeLiye != 2){
        htmlMade += unarchiveBtnHTML;
    }
    if(KiskeLiye != 3){
        htmlMade += archiveBtnHTML;
    }
    htmlMade += trashBtnHTML;
    htmlMade += "</div>"
    return htmlMade;
}

var AllSymbols = symbolCreator(4);
var NoUnarchiveSymbols = symbolCreator(2);
var NoArchiveSymbols = symbolCreator(3);

function DivCreator(index, KiskeLiye){
    var divMade = document.createElement("div");
    divMade.className = "c" + index;
    divMade.innerHTML = '<div class="text">' + arr[index].title + '</div>';
    if(KiskeLiye === 1){
        if(arr[index].state === 2){
            divMade.innerHTML += NoUnarchiveSymbols;
        }else{
            divMade.innerHTML += NoArchiveSymbols;
        }
    }
    else if(KiskeLiye === 2){
        divMade.innerHTML += NoUnarchiveSymbols;
    }
    else if(KiskeLiye === 3){
        divMade.innerHTML += NoArchiveSymbols;
    }else{
        divMade.innerHTML += AllSymbols;
    }
    return divMade;
}



function displayAuxClearing0and6(){
    main[0].style.display = "none";
    editH1.style.display = "none";
    editBtnBelow.style.display = "none";
    newH1.style.display = "none";
    newBtnBelow.style.display = "none";
    tit.value = "";
    desc.value = "";
}

function displayAuxClearing5(){
    main[2].style.display = "none";
    viewerTitle.innerHTML = "";
    viewerContent.innerHTML = "";
    viewerChangingBtns.innerHTML = "";
}

function displayAuxClearing2to4(){
    main[1].style.display = "none";
    genHeads[currentState-1].style.display = "none";
    content.innerHTML = "";
}

function displayAuxClearing(){
    nothing.style.display = "none";
    if(currentState === 0 || currentState === 6){
        displayAuxClearing0and6();
    }
    else if(currentState === 5){
        displayAuxClearing5();
    }
    else{
       displayAuxClearing2to4();
    }
}

function display(state){
    displayAuxClearing();
    if(state === 0 || state === 6){
        display0and6(state);
    }
    else if(state === 5){
        display5(state);
    }
    else{
        display2to4(state);
    }
    currentState = state;
}

function display0and6(state){
    main[0].style.display = "block";
    if(state==0){
        newH1.style.display ="block";
        newBtnBelow.style.display ="inline-block";
    }
    else{
        editH1.style.display = "block";
        editBtnBelow.style.display = "inline-block";
        tit.value = arr[viewingEditingWhich].title;
        desc.value = arr[viewingEditingWhich].desc;
    }
}

function display5(state){
    main[2].style.display = "block";

    var str = arr[viewingEditingWhich].title + "<span>";
    if(arr[viewingEditingWhich].state === 2){
        str += "Current";
    }
    else if(arr[viewingEditingWhich].state === 3){
        str += "Archived";
    }
    else{
        str += "Bin";
    }
    str += "</span>";

    viewerTitle.innerHTML = str;

    viewerContent.textContent = arr[viewingEditingWhich].desc;

    viewerChangingBtns.innerHTML = "";

    if(arr[viewingEditingWhich].state != 4){
        viewerChangingBtns.innerHTML += editBtnHTML;
    }
    if(arr[viewingEditingWhich].state != 2){
        viewerChangingBtns.innerHTML += unarchiveBtnHTML;
    }
    if(arr[viewingEditingWhich].state != 3){
        viewerChangingBtns.innerHTML += archiveBtnHTML;
    }
    viewerChangingBtns.innerHTML += trashBtnHTML;

    var children = viewerChangingBtns.children;

    for(i=0; i<2; ++i){
        children[i].addEventListener("click", function(){
            if(this.className === "s-ed"){
                display(6);
            }
            else if(this.className === "s-un"){
                arr[viewingEditingWhich].state = 2;
                display(2);
            }
            else if(this.className === "s-ar"){
                arr[viewingEditingWhich].state = 3;
                display(3);
            }
        });
    }

    children[2].addEventListener("click", function(){
        if(arr[viewingEditingWhich].state === 4){
            arr.splice(viewingEditingWhich, 1);
            display(4);
        }
        else{
            arr.state = 4;
            display(previousState);
        }
    });
}

function display2to4(state){
    var haveSomething = false;
    genHeads[state-1].style.display = "block";
    main[1].style.display = "block";
    for(var i=arr.length-1; i>=0; i--){
        if( arr[i].state === state || (state === 1 && arr[i].state != 4) ){
        content.appendChild(DivCreator(i, state));
        haveSomething = true;
        }
    }
    if(!haveSomething){
        nothing.style.display = "block";
    }
    else{

        var btns = document.querySelectorAll(".symbols div");
        previousState = state;                                      ///For back button in viewing
        for(var i=0; i<btns.length; i++){
            btns[i].addEventListener("click", function(){
                var arrIndex = Number( this.parentElement.parentElement.className.slice(1) );
                if(this.className === "s-un"){
                    arr[arrIndex].state = 2;
                    if(currentState != 1){
                        this.parentElement.parentElement.remove();
                    }else{
                        this.className = "s-ar";
                        this.innerHTML = '<i class="fas fa-calendar-times"></i>';
                    }
                }else if(this.className === "s-ar"){
                    arr[arrIndex].state = 3;
                    if(currentState != 1){
                        this.parentElement.parentElement.remove();
                    }else{
                        this.className = "s-un";
                        this.innerHTML = '<i class="fas fa-calendar-check"></i>';
                    }
                }else{
                    if(currentState==4){
                        arr.splice(arrIndex, 1);
                        display(4);
                    }else{
                        arr[arrIndex].state = 4;
                        this.parentElement.parentElement.remove();
                    }
                }
                if(content.childElementCount == 0){
                    nothing.style.display = "block";
                }
            });
        }

        var viewClicks = document.querySelectorAll(".for-every .text");
        for(var i=0; i<viewClicks.length; i++){
                viewClicks[i].addEventListener("click", function(){
                var arrIndex = Number( this.parentElement.className.slice(1) );
                viewingEditingWhich = arrIndex;
                display(5);
            });
        }

    }
}
