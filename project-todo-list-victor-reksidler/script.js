const button = document.getElementById("criar-tarefa");

button.addEventListener('click', add);

function add(){
    event.preventDefault();
    let x = Math.random();
    let lista = document.getElementById("texto-tarefa").value;  
        listN = document.getElementById("lista-tarefas");
        ln = document.createElement("li");
        ln.setAttribute('class', 'lista-cor');
        ln.setAttribute('id', x)
        tn = document.createTextNode(lista);
        document.getElementById("texto-tarefa").value = ""

    ln.appendChild(tn);
    listN.appendChild(ln);

    const clickTxt = document.getElementById(x);

    clickTxt.addEventListener('click', paint);

    function paint(){
      document.getElementById(x).style.backgroundColor = 'rgb(128, 128, 128)';
      clickTxt.addEventListener('click', notPaint);
      function notPaint(){
        document.getElementById(x).style.backgroundColor = 'rgb(144, 130, 98)';
      }

  }

    const DclickTxt = document.getElementById(x);

    DclickTxt.addEventListener('dblclick', complete);

    function complete(){
      document.getElementById(x).style.textDecoration = 'line-through solid rgb(0, 0, 0)'
      DclickTxt.addEventListener('dblclick', notComplete);
      function notComplete(){
        document.getElementById(x).style.textDecoration = 'none'
        document.getElementById(x).className = "lista-cor"
      }

      document.getElementById(x).className += " completed";
  }

}

const buttonFinished = document.getElementById("remover-finalizados");

buttonFinished.addEventListener('click', finished);
// parte da função 'finished' foi consultada no link: https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
  function finished(){
    event.preventDefault();
    const elements = document.getElementsByClassName("completed");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  }