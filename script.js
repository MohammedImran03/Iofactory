let inputValues = [];

function PutInputValues(value) {
    document.getElementById('display').value += value;
}

function ClearDisplayValues() {
    document.getElementById('display').value = '';
}

function BackSpaceValues() {
    let displayValue = document.getElementById('display').value;
    document.getElementById('display').value = displayValue.slice(0, -1);
}

function GetValues() {
    let displayValue = document.getElementById('display').value;
    let digits = displayValue.split('').map(Number);
    inputValues = GetWaterUnitsValues(digits); 
    DisplayBuildingBlocks();
    displaywaterUnits();
}

function GetWaterUnitsValues(digits) {
    let adjustedValues = [];
    let currentValue = digits[0];
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] === 0) {
            let j = i + 1;
            let nextNonZeroValue = currentValue;
            while (j < digits.length && digits[j] === 0) {
                j++;
            }
            if (j < digits.length) {
                nextNonZeroValue = digits[j];
            }
            if (nextNonZeroValue > currentValue && digits[i - 1] > 0 && digits[j] > 0) {
                currentValue *= 10;
            }
        } else {
            adjustedValues.push(currentValue);
            currentValue = digits[i];
        }
    }
    adjustedValues.push(currentValue);
    return adjustedValues;
}

function DisplayBuildingBlocks() {
    let blocksContainer = document.getElementById('blocks-container');
    blocksContainer.innerHTML = ''; 

    inputValues.forEach(value => {
        let block = document.createElement('div');
        block.className = 'block';
        block.style.height = value * 10+ 'px';
        block.style.backgroundColor = GetRandomColor(value);
        blocksContainer.appendChild(block);
    });
}

function GetRandomColor(value) {
    let color = value * 10; 
    return `hsl(${color}, 70%, 50%)`;
}

function displaywaterUnits() {
    let totalUnits = inputValues.reduce((acc, cur) => acc + cur, 0);
    document.getElementById('total-units').innerText = `Total Units: ${totalUnits}`;
}