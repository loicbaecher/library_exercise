let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return(`${title} by ${author}, ${pages} pages, ${read}`);
    }
}

let Book1 = new Book ('The Hobbit','J.R.R Tolkien','295','not read yet')
let Book2 = new Book ('The Bible','Several authors','2151','not read yet')

function addBookToLibrary(book){
       myLibrary.push(book);
}

addBookToLibrary(Book1)
addBookToLibrary(Book2)

function displayBooks(){
    e = document.getElementById("booklist");
    if(e != null){e.remove()}
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
        newbook.setAttribute("style","border: 4px solid black; padding:4px;")

        Bookdiv.appendChild(newbook);

        curul = document.createElement("ul");
        curul.setAttribute("class","attrilist");
        newbook.appendChild(curul);

        let li1 = document.createElement("li");
        let li2 = document.createElement("li");
        let li3 = document.createElement("li");
        let li4 = document.createElement("li");
        li1.textContent = `Title : ${myLibrary[i]["title"]}`;
        li2.textContent = `Author : ${myLibrary[i]["author"]}`;
        li3.textContent = `Pages : ${myLibrary[i]["pages"]}`;
        li4.textContent = `Read : ${myLibrary[i]["read"]}`;
        curul.appendChild(li1);
        curul.appendChild(li2);
        curul.appendChild(li3);
        curul.appendChild(li4);

        let delbook = document.createElement("button");
        delbook.textContent = "X";
        delbook.style.backgroundColor = "#73A9AD";
        delbook.style.border = "1px solid gray"
        delbook.setAttribute("id",`remobook${i+1}`)
        delbook.setAttribute("class",`delobooks`)

        newbook.appendChild(delbook);
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
    event.preventDefault();
    gettitle = document.getElementById("fortitle");
    getauthor = document.getElementById("forauthor");
    getforpages = document.getElementById("forpages");

    function getSelectedValue() {
        var radios = document.getElementsByName('read');
      
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            var selectedValue = radios[i].value;
            console.log(selectedValue);
            return(selectedValue);
            break;
          }
        }
      }


    newbook = new Book(gettitle.value,getauthor.value,getforpages.value,getSelectedValue())
    addBookToLibrary(newbook);

},false)

var dislib = document.getElementById("libdis");
dislib.addEventListener('click',displayBooks);

document.addEventListener('keydown',(event)=>{
    if(event.key=='Escape'){
        closeModal()
    }
})