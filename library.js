let myLibrary = [];

class Book{
    Book(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){
        return(`${title} by ${author}, ${pages} pages, ${read}`);
    }

    readstat(){
        if (this.read == "Read"){
            this.read = "Not read yet";
        }
        else{
            this.read ="Read";
        }
    }
}

function addBookToLibrary(book){
       myLibrary.push(book);
}

function displayBooks(){
    booklist = document.getElementById("booklist");
    if(booklist != null){booklist.remove()}
    Bookdiv = document.createElement("div");
    Bookdiv.setAttribute("id","booklist");
    Bookdiv.setAttribute("style",`display:grid; 
                grid-template-columns : repeat(5,1fr);
                grid-template-rows : repeat(5,1fr);
                column-gap : 4px;
                row-gap : 4px`);
    document.body.appendChild(Bookdiv);

    for (let i = 0; i < myLibrary.length; i++) {
        curbook = myLibrary[i];
        newbook = document.createElement("div");
        newbook.setAttribute("class","newbook");
        newbook.setAttribute("id",`book${i+1}`);
        newbook.setAttribute("data",`${i+1}`);
        newbook.setAttribute("style","border: 4px solid black; padding:4px;");
        newbook.style.display = "flex";
        newbook.style.flexDirection = "column";
        Bookdiv.appendChild(newbook);

        curul = document.createElement("ul");
        curul.setAttribute("class","attrilist");
        newbook.appendChild(curul);

        let li1 = document.createElement("li");
        let li2 = document.createElement("li");
        let li3 = document.createElement("li");
        li1.textContent = `Title : ${myLibrary[i]["title"]}`;
        li2.textContent = `Author : ${myLibrary[i]["author"]}`;
        li3.textContent = `${myLibrary[i]["pages"]} pages`;
        curul.appendChild(li1);
        curul.appendChild(li2);
        curul.appendChild(li3);

        underblock = document.createElement("div");
        newbook.appendChild(underblock);
        underblock.style.display = "flex";
        underblock.style.justifyContent = "space-evenly"

        readdiv = document.createElement("button");
        readdiv.textContent = `${myLibrary[i]["read"]}`;
        if(myLibrary[i]["read"]=="Read"){
            readdiv.style.backgroundColor = "#98D8AA";
        }
        else {
            readdiv.style.backgroundColor = "#FF6D60";
        }
        readdiv.style.border = "1px solid gray";
        readdiv.setAttribute("id",`readdiv${i+1}`);
        readdiv.setAttribute("class","readdiv");
        readdiv.style.width = "fit-content";
        readdiv.style.borderRadius = "5px";
        underblock.appendChild(readdiv);

        let delbook = document.createElement("button");
        delbook.textContent = "X";
        delbook.style.backgroundColor = "#73A9AD";
        delbook.style.border = "1px solid gray";
        delbook.style.borderRadius = "5px";
        delbook.style.display = "flex";
        delbook.style.justifySelf = "right";
        delbook.setAttribute("id",`remobook${i+1}`);
        delbook.setAttribute("class",`delobooks`);
        underblock.appendChild(delbook);
    }

    delbot = document.querySelectorAll("button.delobooks")
    for (let j = 0; j < delbot.length; j++) {
        delbot[j].addEventListener('click', function() {
            kickbook = document.querySelector(`.newbook[data="${j+1}"]`)
            kickbook.remove();
            myLibrary.splice(j,1)
        });
      }

      readbot = document.querySelectorAll("button.readdiv")
    for (let j = 0; j < readbot.length; j++) {
        readbot[j].addEventListener('click', function() {
            myLibrary[j].readstat();
            selbook = document.querySelector(`#readdiv${j+1}`);
            if(myLibrary[j]["read"] == "Read"){
                selbook.style.backgroundColor = "#98D8AA";
                selbook.textContent = "Read";
            }
            else{ 
                selbook.style.backgroundColor = "#FF6D60";
                selbook.textContent = "Not read yet";
        }
        });
      }
}

function openModal(){
    var modal = document.getElementById('myModal');
    var backmodal = document.getElementById("backModal");
    backmodal.style.opacity = "1";
    backmodal.style.pointerEvents = "auto";
    modal.style.transform = "translate(-50%, -50%)";
}

function closeModal(){
    var modal = document.getElementById('myModal');
    var backmodal = document.getElementById("backModal");
    backmodal.style.opacity = "0";
    backmodal.style.pointerEvents = "none";
    modal.style.transform = "translate(-50%, -70%)";

}

var btnopen = document.querySelector("button#newbook")
btnopen.addEventListener('click',()=>{
    openModal();
})

var closeb = document.querySelector("span.close")

closeb.addEventListener('click',()=>{
    closeModal();
})

var modsub = document.getElementById("modub");

modsub.addEventListener('click',(event)=>{
    gettitle = document.getElementById("fortitle");
    getauthor = document.getElementById("forauthor");
    getforpages = document.getElementById("forpages");

    if(gettitle.value != "" && getauthor.value != "" && getforpages.value != ""){

        event.preventDefault();
        function getSelectedValue() {
            var radios = document.getElementsByName('read');
            
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                var selectedValue = radios[i].value;
                return(selectedValue);
                break;
                }
            }
            }


        newbook = new Book(gettitle.value,getauthor.value,getforpages.value,getSelectedValue())
        addBookToLibrary(newbook);
        closeModal();

    }

},false)

var dislib = document.getElementById("libdis");
dislib.addEventListener('click',displayBooks);

document.addEventListener('keydown',(event)=>{
    if(event.key=='Escape'){
        closeModal()
    }
})