let namesListArray = [];
let valuesListArray = [];
let colorListArray = [];

let nameInput;

let ctx;
let chart;

loadCanvas();

// Create the chart
ctx = document.getElementById('myChartCanvas').getContext('2d');
chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: namesListArray,
        datasets: [{
            data: valuesListArray,
            backgroundColor: colorListArray,
            borderColor: 'rgba(0,0,0,.7)',
            borderWidth: 1,
            hoverOffset: 3
        }]
    },
    options: {
        animation: {
            duration: 1000,
        },
        legend: {
            display: false
        },
        plugins: {
            datalabels: {
                backgroundColor: 'rgba(0, 0, 0, .4)',
                labels: {
                    value: {
                          
                        font:{
                            size: 25,
                            weight: 'bold',
                        },
                        color: 'white',
                    }
                },   
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            }
        }
    }


});

nameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        addNameInput();
    }
});

function addNameInput() {
    nameInput.value = nameInput.value.toLowerCase();
    nameInput.value = nameInput.value.trim();

    if (nameInput.value.length > 0) {
        if (namesListArray.length < 10) {
            addNameToGraph();

            document.getElementById("arrow").style.display = "block";

            nameInput.value = '';
        } else {
            let message = document.getElementById('message');
            message.innerHTML = 'You can only enter 10 names!';
        }
    }

    activateButton();
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}

function selectRandomName() {
    let selectedName = document.getElementById('selectedName');
    let nameChoosen;

    if (namesListArray.length > 0) {
        nameChoosen = getRndInteger(0, namesListArray.length);

        selectedName.innerHTML = namesListArray[nameChoosen];
        //chart.options.rotation = Math.random() * 360;
        chart.update();
        document.getElementById("spinButton").disabled = true;

    } else {
        let message = document.getElementById('message');
        message.innerHTML = 'Please enter a name!';
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function addNameToGraph() {
    addName(nameInput.value);
    calculatePercent(namesListArray.length);
    addColor();

    chart.update();
}

function addName(name) {
    namesListArray.push(name);
}

function calculatePercent(length) {
    let percent = 100 / length;

    while (valuesListArray.length > 0) {
        valuesListArray.pop();
    }

    for (let index = 0; index < length; index++) {
        valuesListArray.push(percent);
    }
}

function addColor() {
    colorListArray.push(random_rgba());
}

function selectWinner() {
    let randomNumber = Math.random() * 360;
    let spinButton = document.getElementById("spinButton");

    chart.options.rotation = (-0.5 * Math.PI) - ((360 / chart.data.labels.length) * randomNumber / 180 * Math.PI);
    //rodar consoante as partes da roda, ex: se a roda tiver duas fatias, 180 uma 180 outra, se rodar de  180 em 180, a cada volta de 180 que da, muda o index, 
    //mesmo quando tem fatias maiores 4 fatias, 90graus, 1 roda (para a esquerda) index passa de 0 para 1, roda 90 passa de 1 para 2, quando chega ao index maximo, volta a 0


    var angle = chart.options.rotation;
    
    var index = 0;

    while (Math.floor(randomNumber) > 0) {
        if (index + 1 > chart.data.labels.length-1) {
            index = 0;
        }
        else {
            index++;
        }
        randomNumber--;
    }

    chart.data.datasets[0].backgroundColor[index] = '#ffff00';
    console.log(chart.data.labels[index]);
    setTimeout(() => {  document.getElementById("WinnerText").style.display = "inline-block"; }, 1000);
    
    let winnerText = document.getElementById("WinnerText").innerHTML;
    document.getElementById("WinnerText").innerHTML ="Congratulations " +  chart.data.labels[index] + "! " + winnerText; 
    spinButton.disabled = true;

    chart.update();
}

function activateButton() {
    let spinButton = document.getElementById("spinButton");

    if (namesListArray.length > 1) {
        spinButton.innerText = "Spin chart"
        spinButton.disabled = false;
    } else {
        spinButton.innerText = "..."
        spinButton.disabled = true;
    }
}

function loadCanvas() {    
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            let myChart = document.getElementById("myChart");
            
            if (this.status == 200) {
                myChart.innerHTML = this.responseText;
                nameInput = document.getElementById('name');
                activateButton();
            }
            
            if (this.status == 404) {
                myChart.innerHTML = "Page not found.";
            }
        }
    }
    xhttp.open("GET", '../spinningWheel/index.html', false);
    xhttp.send();
}
