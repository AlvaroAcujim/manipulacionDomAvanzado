const create = document.getElementById('create');
const addBefore = document.getElementById('insertBefore');
const addAfter = document.getElementById('insertAfter');
const addStart = document.getElementById('insertStart');
const addEnd = document.getElementById('insertEnd');
const remove = document.getElementById('delete');
const replace = document.getElementById('replace');
const contentItems = document.getElementById('contentItems');
const itemsList = document.getElementsByClassName('main__container__section__buttonsAction__button__itemsContainer__items');
const itemsParagraph = document.getElementsByClassName('main__container__section__buttonsAction__button__itemsContainer__items__paragraph');
const itemsTitles = document.getElementById('contentTitles')
const input = document.getElementById('text');

let itemSelected = '';
let countElement = itemsList.length;





// --- Metodo para agregar listener a los divs recogiendo su id, tambien introduce un h3 con el div seleccionado y borra el h3 original

const addListenerDivs = () => {
    for(let el of itemsList){
        el.addEventListener('click', ev => {
            itemSelected = ev.target.getAttribute('id'); //esto lo agregamos para que cuando se haga click en el p no de problemas ya que hace que sea null por algun motivo
            if(itemSelected){
                const msg = document.getElementById('msg');
                msg.remove();
                itemSelected = ev.target.getAttribute('id');
                const txt = document.createTextNode('Ha seleccionado el elemento: ' + ev.target.children[0].textContent);
                const h3 = document.createElement('h3');
                h3.append(txt);
                h3.setAttribute('id', 'msg')
                itemsTitles.append(h3);
                for(let el of itemsList){
                    if((el.getAttribute('id') === itemSelected)){
                        el.setAttribute('class', 'main__container__section__buttonsAction__button__itemsContainer__items selected')
                    }else{
                        el.setAttribute('class', 'main__container__section__buttonsAction__button__itemsContainer__items')
                    }
                }  
            }
            
            
        });
    };
    
}

//Agregamos los action listener a cada div al principio del flujo de ejecucion
addListenerDivs();

//Metodo para crear un node element de tipo div con el texto que incluyamos en el input
const createNode = (input) => {
    countElement += 1;
    const txt = document.createTextNode(input);
    const paragraph = document.createElement('p');
    const div = document.createElement('div');
    paragraph.append(txt);
    paragraph.setAttribute('class', 'main__container__section__buttonsAction__button__itemsContainer__items__paragraph');
    div.append(paragraph);
    div.setAttribute('class', 'main__container__section__buttonsAction__button__itemsContainer__items');
    div.setAttribute('id', ('item'+countElement));
    return div
}

const createItemAndAddEnd = (input) => {
    contentItems.appendChild(createNode(input)); //es necesario meterle como parametros el input, por que si no se veria como un html element object
}

const addStartItem = (input) => {
    contentItems.prepend(createNode(input));
}
const addBeforeItem = (id ,input) => {
    if(document.getElementById(id)){ //si el usuario pulsa fuera de los divs no se recoge el id por lo que se le solicita en caso de que no encuentre el elemento que lo seleccione.
        const node = document.getElementById(id);
        let nodeRef = '';
        for(let el of itemsList){
            if(el.getAttribute('id') === node.getAttribute('id')){
                nodeRef = el;
            };
        };
        contentItems.insertBefore(createNode(input), nodeRef);
    } else{
        alert('Seleccione un elemento para agregar antes')
    }
}
const addAfterItem = (id ,input) => {
    if(document.getElementById(id)){//si el usuario pulsa fuera de los divs no se recoge el id por lo que se le solicita en caso de que no encuentre el elemento que lo seleccione.
        const node = document.getElementById(id);
        let nodeRef = '';
        for(let el of itemsList){
            if(el.getAttribute('id') === node.getAttribute('id')){
                nodeRef = el;
            };
        };
        contentItems.insertBefore(createNode(input), nodeRef.nextSibling);
    } else{
        alert('Seleccione un elemento para agregar despues')
    }
}

const deleteItem = (id) => {
    if(document.getElementById(id)){//si el usuario pulsa fuera de los divs no se recoge el id por lo que se le solicita en caso de que no encuentre el elemento que lo seleccione.
        const node = document.getElementById(id);
        for(let el of itemsList){
            if(el.getAttribute('id') === node.getAttribute('id')){
                el.remove();
            };
        };
    } else{
        alert('Seleccione un elemento para borrar')
    }
   
}
const replaceItem = (id, input) => {
    if(document.getElementById(id)){//si el usuario pulsa fuera de los divs no se recoge el id por lo que se le solicita en caso de que no encuentre el elemento que lo seleccione.
        const node = document.getElementById(id);
        let nodeRef = '';
        for(let el of itemsList){
            if(el.getAttribute('id') === node.getAttribute('id')){
                nodeRef = el;
            };
        };
        contentItems.replaceChild(createNode(input), nodeRef);
    } else{
        alert('Seleccione un elemento remplazarlo')
    }
}


create.addEventListener('click', () => {
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        createItemAndAddEnd(valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }
    
});

addEnd.addEventListener('click', () => {
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        createItemAndAddEnd(valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }
    
});

addStart.addEventListener('click', () => {
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        addStartItem(valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }
    
})


addBefore.addEventListener('click', () =>{
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        addBeforeItem(itemSelected, valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }

});

addAfter.addEventListener('click', () =>{
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        addAfterItem(itemSelected, valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }

});
replace.addEventListener('click', () => {
    const valueInput = input.value;
    if(valueInput){ //comprueba que tenga valor el input
        replaceItem(itemSelected, valueInput);
        addListenerDivs();
    }else{
        alert('Escriba en el input')
    }
})

remove.addEventListener('click', () => deleteItem(itemSelected));