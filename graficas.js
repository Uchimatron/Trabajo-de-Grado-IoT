function datos(){
    var datos = [],
    tiempo = (new Date()).getTime(), i;
    for( i = -8; i <= 0;  i += 1){
        datos.push({
            x: tiempo + i * 1000,
            y: -1
        });
    }
    return datos;
}


//----------------------------------
//      INICIO GRAFICA HUMEDAD
// ---------------------------------
var dataH = [{
    label: 'Humedad',
    backgroundColor: 'rgb(0, 48, 87)',
    borderColor: 'rgb(0, 48, 87)',
    data: datos(0),
    fill: false
}];

var configH = {
    type: 'line',
    data: {
        datasets: dataH
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time'
            }],
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 100
                }
            }]
        }
    }
};

var ctx1 = document.getElementById('humedadTk').getContext('2d');
var grafica1 = new Chart(ctx1, configH);


function updateH() {
    var time = (new Date()).getTime();
    dataH.forEach(function(dataset1) {
        dataset1.data.shift();
        dataset1.data.push({x: time, y: ValorHumedad});
    })
    grafica1.update();  
}
setInterval(updateH, 30000);
//----------------------------------
//      FIN GRAFICA HUMEDAD
// ---------------------------------


// -----------------------------------------------------------
//             Inicio Grafica 2
//----------------------------------------------------------
var dataTk = [{
    label: 'Presion Acumulador',
    backgroundColor: 'rgb(0, 48, 87)',
    borderColor: 'rgb(0, 48, 87)',
    data: datos(0),
    fill: false
}];
var configTk = {
    type: 'line',
    data: {
        datasets: dataTk
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time'
            }],
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 200
                    }
                }]
            }
    }
};
var ctx2 = document.getElementById('presionTk').getContext('2d');
var grafica2 = new Chart(ctx2, configTk);

function updatePtk() {
    var time = (new Date()).getTime();
    dataTk.forEach(function(dataset2) {
        dataset2.data.shift();
        dataset2.data.push({x: time, y: ValorPresionTk});
    })
    grafica2.update();  
}
setInterval(updatePtk, 30000);

// // // -----------------------------------------------------------
// // //             Inicio Grafica 3
// // //----------------------------------------------------------
var dataP1 = [{
    label: 'Presion Compresor Principal',
    backgroundColor: 'rgb(0, 48, 87)',
    borderColor: 'rgb(0, 48, 87)',
    data: datos(0),
    fill: false
}];
var configP1 = {
    type: 'line',
    data: {
        datasets: dataP1
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time'
            }],
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 200
                    }
                }]
            }
    }
};
var ctx3 = document.getElementById('presionC1').getContext('2d');
var grafica3 = new Chart(ctx3, configP1);

function updateP1() {
    var time = (new Date()).getTime();
    dataP1.forEach(function(dataset3) {
        dataset3.data.shift();
        dataset3.data.push({x: time, y: ValorPresion1});
    })
    grafica3.update();  
}
setInterval(updateP1, 30000);

// // // -----------------------------------------------------------
// // //             Inicio Grafica 4
// // //----------------------------------------------------------
var dataP2 = [{
    label: 'Presion Compresor Secundario',
    backgroundColor: 'rgb(0, 48, 87)',
    borderColor: 'rgb(0, 48, 87)',
    data: datos(0),
    fill: false
}];
var configP2 = {
    type: 'line',
    data: {
        datasets: dataP2
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time'
            }],
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 200
                    }
                }]
            }
    }
};
var ctx4 = document.getElementById('presionC2').getContext('2d');
var grafica4 = new Chart(ctx4, configP2);

function updateP2() {
    var time = (new Date()).getTime();
    dataP2.forEach(function(dataset4) {
        dataset4.data.shift();
        dataset4.data.push({x: time, y: ValorPresion2});
    })
    grafica4.update();  
}
setInterval(updateP2, 30000);