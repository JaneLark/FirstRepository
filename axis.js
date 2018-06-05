window.onload = init;

var model = {
    answer: [],
    answerLen: 0,
    counter: 0,

    createQuestion: function() {
        var first = [6,7,8,9];
        var third = [11,12,13,14];
    
        var a = first[Math.floor(Math.random() * 4)];
        var sum = third[Math.floor(Math.random() * 4)];
        var b = sum-a;
    
        this.answer.push(a,b,sum);
        this.answerLen = sum.toString().length;
    
        document.getElementById("number-0").innerHTML = a;
        document.getElementById("number-1").innerHTML = b;
    },

    createBlock: function() {
        var container = document.getElementById("axis-first-part");
        var newBlock = document.createElement("div");
        newBlock.classList.add("axis-block");
        newBlock.id ="axis-block-"+this.counter+"";
        container.appendChild(newBlock);

        var inputArea = document.createElement("div");
        inputArea.classList.add("input-area");
        inputArea.id ="input-area-"+this.counter+"";
        newBlock.appendChild(inputArea);

        var svgArea = document.createElement("div");
        svgArea.classList.add("svg-area");
        svgArea.id ="svg-area-"+this.counter+"";
        newBlock.appendChild(svgArea);

        model.createArrow();
        model.createInput();  
    },

    createArrow: function() {
        var svgArea = document.getElementById("svg-area-"+this.counter+"");

        var step = 39*(this.answer[this.counter]);
        var curve = 5*(this.answer[this.counter]);

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width',step);
        // svg.classList.add("svg-image");
        svg.className += " svg-image"; 

        svgArea.appendChild(svg);

        var path =  document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, "d", "M0,100 C" + curve +"," + (100-step/3) + " " + (step-curve) + "," + (100-step/3) + " " + step + ",100");
        path.setAttribute('fill','none');
        path.setAttribute('stroke','rgb(173, 20, 87)');
        path.setAttribute('stroke-width',2);

        svg.appendChild(path);

        var polyline =  document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        if (this.answer[this.counter]>=4) {
            polyline.setAttributeNS(null, "points", ""+ (step-13) + ",86 "+ step + ",100 " + (step-4) + ",80");
        } else {
            polyline.setAttributeNS(null, "points", ""+ (step-13) + ",92 "+ step + ",100 " + (step-2) + ",87");
        }
        polyline.setAttribute('fill','none');
        polyline.setAttribute('stroke','rgb(173, 20, 87)');
        polyline.setAttribute('stroke-width',2);

        svg.appendChild(polyline);
        document.getElementById("axis-block-"+this.counter+"").style.width = step + "px";
    },

    createInput: function() {
        var inputArea = document.getElementById("input-area-"+this.counter+"");
        var newInput = document.createElement("input");
        newInput.classList.add("input");
        newInput.classList.add("input-text");
        newInput.id ="input-numb-"+this.counter+"";
        newInput.setAttribute("type","text");
        inputArea.appendChild(newInput);
        newInput.focus();

        newInput.addEventListener("input", function() {
            var output = document.getElementById("number-"+model.counter);
            newInput.style.color = "rgb(51,51,51)";
            output.style.backgroundColor = "rgb(255,255,255)";
            if ((!newInput.value.match(/^\d+$/))||(newInput.value.length > model.answerLen)) {
                newInput.value = "";
            }
        
            if (output.textContent === newInput.value) {
                var inputArea = document.getElementById("input-area-"+model.counter+"");
                var newElem = document.createElement("div");
                newElem.classList.add("input-numb");
                newElem.innerHTML = newInput.value;
                inputArea.removeChild(newInput);
                inputArea.appendChild(newElem);
                model.counter +=1;
                if (model.counter<=1) {
                    model.createBlock();
                } else if (model.counter===2) {
                    model.createAnswer();
                } 
            }  else {
                newInput.style.color = "rgb(255, 0, 0)";
                output.style.backgroundColor = "rgb(240,230,140)"
            }
        })
    },

    createAnswer: function() {
        var sum = document.getElementById("sum");
        sum.innerHTML = "";
        var newInput = document.createElement("input");
        newInput.classList.add("input");
        newInput.classList.add("input-answer");
        newInput.id ="input-numb-"+this.counter+"";
        newInput.setAttribute("type","text");
        sum.appendChild(newInput);
        newInput.focus();

        newInput.addEventListener("input", function() {
            var output = (model.answer[model.counter]).toString();
            newInput.style.color = "rgb(51,51,51)";
            if ((!newInput.value.match(/^\d+$/))||(newInput.value.length > model.answerLen)) {
                newInput.value = "";
            }
        
            if (output === newInput.value) {
                var sum = document.getElementById("sum");
                var newElem = document.createElement("div");
                newElem.classList.add("symbol");
                newElem.innerHTML = newInput.value;
                sum.removeChild(newInput);
                sum.appendChild(newElem);
                document.getElementById("nextQuestion").style.backgroundColor = "rgb(248, 228, 126)";
                document.getElementById("nextQuestion").style.borderColor = "rgb(51,51,51)";
            }  else if ((newInput.value.length == model.answerLen ) && (output !== newInput.value)) {
                newInput.style.color = "rgb(255, 0, 0)";
            }
        })
    }
}

function init() {
    model.createQuestion();
    model.createBlock();
}

function openNextQuestion() {
    location.href = 'axis.html';
}
    
var nextQuestion = document.getElementById("nextQuestion");
nextQuestion.onclick = openNextQuestion;