let mesa = document.querySelector(".mesa");
let interator = document.querySelector(".interar");
let area = document.querySelector(".area");
let seqEscolhida;
let cartas = [], imgsMostradas = [], numsCartas = [[], [], [], [], [], [], []], auxCartas = [], tagsDivImgs = [[], [], []], seq = [];
let numCarta;
let carta;
let tagDivImg, divBtn, btn;
let count = 0;


MostrarCartas(0);
function MostrarCartas(criaBtn) {

        for (let i = 0; i < 3; i++) {
                cartas[i] = document.createElement("div");
                cartas[i].classList.add("cartas");
                for (let j = 0; j < 7; j++) {
                        if (numsCartas[j].length < 3) {
                                do {
                                        numCarta = Math.floor(Math.random() * 22);
                                } while (
                                        imgsMostradas.includes(numCarta)
                                        || numCarta == 0
                                );
                                let img = `<img src='./imgs_icons/img${numCarta}.png' alt='emogin'>`;
                                numsCartas[j].push(img);
                                imgsMostradas.push(numCarta);
                                carta = CriarCartas("micro_carta");
                                tagsDivImgs[i].push(tagDivImg);
                        }
                        cartas[i].appendChild(carta);
                }
                area.appendChild(cartas[i]);

                if (criaBtn == 1) {
                        divBtn = document.createElement("div");
                        divBtn.classList.add("div_btn");
                        btn = document.createElement("button");
                        btn.id = "btnSeq"; //sequência
                        btn.innerHTML = "Está Aqui";
                        divBtn.appendChild(btn);
                        area.appendChild(divBtn);
                }

        }
        if (criaBtn == 0) {
                btn = document.createElement("button");
                btn.id = "escolha";
                btn.innerHTML = "já escolhi";
                mesa.appendChild(btn);
        } else {
                cartas[0].style.backgroundColor = "#9ff9";
                cartas[1].style.backgroundColor = "#9ff9";
                cartas[2].style.backgroundColor = "#9ff9";

        }
}


function CriarCartas(classCarta) {
        carta = document.createElement("div");
        carta.classList.add(classCarta);
        carta.id = "carta";
        tagDivImg = document.createElement("div");
        tagDivImg.classList.add("tagDivImg");
        carta.appendChild(tagDivImg);
        return carta;
}

let btnEscolha = document.querySelector("#escolha");
let excluirCarta = document.querySelectorAll("#carta");
let divCartas = document.querySelectorAll(".cartas");
btnEscolha.addEventListener("click", () => {
        RecarregarPagina();


        numsCartas = [[], [], [], [], [], [], []];
        imgsMostradas = [];
        tagsDivImgs = [[], [], []];


        for (let i = 0; i < excluirCarta.length; i++) {
                excluirCarta[i].parentNode.removeChild(excluirCarta[i]);
        }
        for (let key = 0; key < divCartas.length; key++) {
                divCartas[key].parentNode.removeChild(divCartas[key]);
        }
        interator.innerHTML = "em que fila está sua carta?";
        MostrarCartas(1);
        ExibirNumeros();
        Execultor();
        btnEscolha.parentNode.removeChild(btnEscolha);
});

ExibirNumeros();
function ExibirNumeros() {
        let i = 0;
        const delay0 = setInterval(function () {
                for (let j = 0; j < 3; j++) {
                        tagsDivImgs[j][i].innerHTML = numsCartas[i][j] + "";
                }
                i++
                if (i == 7) {
                        clearInterval(delay0);
                }
        }, 100);
}

function Execultor() {
        seqEscolhida = document.querySelectorAll("#btnSeq");
        for (let key = 0; key < 3; key++) {
                seqEscolhida[key].addEventListener("click", () => {
                        count++;
                        do {
                                num = Math.floor(Math.random() * 3);
                        } while (num == key);
                        for (let i = 0; i < tagsDivImgs[num].length; i++) {
                                auxCartas.push(tagsDivImgs[num][i].innerHTML);
                        }
                        for (let i = 0; i < tagsDivImgs[num].length; i++) {
                                auxCartas.push(tagsDivImgs[key][i].innerHTML);
                        }
                        switch ((key)) {
                                case 0:
                                        if (num == 1) {
                                                num = 2;
                                        } else {
                                                num = 1;
                                        }
                                        break;
                                case 1:
                                        if (num == 0) {
                                                num = 2;
                                        } else {
                                                num = 0;
                                        }
                                        break;
                                case 2:
                                        if (num == 0) {
                                                num = 1;
                                        } else {
                                                num = 0;
                                        }
                                        break;
                        }
                        for (let i = 0; i < tagsDivImgs[num].length; i++) {
                                auxCartas.push(tagsDivImgs[num][i].innerHTML);
                        }
                        let col = 0;
                        let row = 0;
                        numsCartas = [[], [], [], [], [], [], []];
                        imgsMostradas = [];
                        for (let i = 0; i < auxCartas.length; i++) {
                                numsCartas[row].push(auxCartas[i]);
                                if (col == 2) {
                                        row++;
                                        col = -1;
                                }
                                col++;
                        }
                        auxCartas = [];
                        ExibirNumeros();

                        if (count == 3) {
                                MostrarCartaPensada();
                        }
                });
        }
}


function MostrarCartaPensada() {
        let divBotao = document.querySelectorAll(".div_btn");
        divCartas = document.querySelectorAll(".cartas");
        for (let key = 0; key < divCartas.length; key++) {
                divBotao[key].parentNode.removeChild(divBotao[key]);
                divCartas[key].parentNode.removeChild(divCartas[key]);
        }
        interator.innerHTML = "esta é a sua carta?";
        for (let i = 0; i < carta.length; i++) {
                carta[i].parentNode.removeChild(carta[i]);
        }
        carta = CriarCartas("carta");
        tagDivImg.innerHTML = numsCartas[3][1];
        area.appendChild(carta);

        let divCorrecao = document.querySelector(".correct");
        divCorrecao.style.display = "flex";

        let btnsCertoErrado = document.querySelectorAll(".correct button");
        for (let i = 0; i < btnsCertoErrado.length; i++) {
                btnsCertoErrado[i].addEventListener("click", () => {
                        let divPopUp = document.querySelector(".popUp");
                        let divPopUp_p = document.querySelector(".popUp p");
                        divPopUp.style.display = "flex";
                        if(i == 0){
                                divPopUp_p.innerHTML = "Possivelmente você informou algo errado! <br><br> Vamos outra vez!"; 
                        }else{
                                divPopUp_p.innerHTML = "Acredite! só erro se informar algo errado! <br><br> Vamos continuar!";
                        }
                });
        }

}

function RecarregarPagina() {
        let reload = document.querySelectorAll(".reload");
        reload[1].style.display ="block";
        for (let i = 0; i < reload.length; i++) {
                reload[i].addEventListener("click", () => {
                        location.reload();
                });
        }


}