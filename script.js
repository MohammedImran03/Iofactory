let inputValues = [];

function PutInputValues(value) {
    document.getElementById('display').value += value;
}

function ClearDisplayValues() {
    document.getElementById('display').value = '';
    document.getElementById('total-units').innerText = '';
    document.getElementById('blocks-container').innerText='';
}

function BackSpaceValues() {
    let displayValue = document.getElementById('display').value;
    document.getElementById('display').value = displayValue.slice(0, -1);
}

function GetValues() {
    let displayValue = document.getElementById('display').value;
    let digits = displayValue.split('').map(Number);
    inputValues = GetWaterUnitsValues(digits); 
    DisplayBuildingBlocks(digits);
    displaywaterUnits(digits);
}

function GetWaterUnitsValues(digits) {
    // console.log(25,digits);
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

function DisplayBuildingBlocks(digits) {
    let blocksContainer = document.getElementById('blocks-container');
    blocksContainer.style.padding = '5px';
    blocksContainer.style.border = '2px solid black';
    blocksContainer.style.borderRadius = '5px'; 
    blocksContainer.innerHTML = ''; 
    // blocksContainer.style.display='flex';
    // blocksContainer.style.flexDirection='row';
    // console.log(digits);
    // const customvalue=[0,4,0,0,0,6,0,6,4,0];
    digits.forEach(value => {
        let block = document.createElement('div');
        // let blockdigits=document.createElement('p');
        block.className = 'block';
        block.style.height = value * 20+ 'px';
        block.style.backgroundColor = GetRandomColor(value);
        // blockdigits.innerText=value;
        // blocksContainer.appendChild(blockdigits);
        blocksContainer.appendChild(block);
    });
}

function GetRandomColor(value) {
    let color = value * 10; 
    return `hsl(${color}, 70%, 50%)`;
}

document.getElementById('total-units').style.fontWeight = 'bold';
document.getElementById('total-units').style.fontSize = '30px';


function TotalUnits_Calculations(digits) {
    if (!Array.isArray(digits) || digits.length < 3) {
        return 0;
    }
    let maxUnits = 0;
    for (let i = 1; i < digits.length - 1; i++) {
        let leftMax = 0;
        let rightMax = 0;
        for (let j = i; j >= 0; j--) {
            leftMax = Math.max(leftMax, digits[j]);
        }

        for (let j = i; j < digits.length; j++) {
            rightMax = Math.max(rightMax, digits[j]);
        }
        const currentUnits = Math.min(leftMax, rightMax) - digits[i];
        if (currentUnits > 0) {
            maxUnits += currentUnits;
        }
    }
    return maxUnits;
}



function displaywaterUnits(digits) {
    const Total_Water_Units=TotalUnits_Calculations(digits);
    console.log(digits);
    // console.log(Total_Water_Units); 
    let totalUnits = inputValues.reduce((acc, cur) => acc + cur, 0);
    // console.log(totalUnits,inputValues);
    if(!digits.length){
        document.getElementById('total-units').innerText = `Please Enter the units.`;
    }else{
        document.getElementById('total-units').innerText = `Total Water Units: ${Total_Water_Units}`;
    }

}