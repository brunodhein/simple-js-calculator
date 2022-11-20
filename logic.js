function initiateCalculator() {
    console.log('Calculator startup procedure...')

    const allPossibilities = [
        '0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9', '+', '-',
        '*', '/', '(', ')',
        'Backspace', 'Enter',
        '.', ','
    ]
    
    const allOperators = [
        '+', '-', '*', '/'
    ]

    let input = document.querySelector('.calculatorInput')
    let inputValues = []

    addEventListenerToDocument(allPossibilities, allOperators, input, inputValues)
}

function redefineCalculatorInputContet(input, arrayToAdjust) {
    input.innerHTML = generateAdjusteArrayOfValues(arrayToAdjust).join(' ')
}

function generateAdjusteArrayOfValues(arrayToAdjust) {
    let adjustedArray = []

    for(let i = 0; i < arrayToAdjust.length; i++) {
        if(!isNaN(Number(adjustedArray[adjustedArray.length -1])) && !isNaN(Number(arrayToAdjust[i]))
        || !isNaN(Number(adjustedArray[adjustedArray.length -1])) && arrayToAdjust[i] === '.'
        ) {
            adjustedArray[adjustedArray.length -1] += arrayToAdjust[i]
        } else {
            adjustedArray.push(arrayToAdjust[i])
        }
    }

    return adjustedArray
}

function checkIfLastNumberHasDot(arrayToAdjust) {
    const array = generateAdjusteArrayOfValues(arrayToAdjust)
    return array[array.length - 1].search(/\./) !== -1 ? true : false
}

function calculateResult(expression) {
    return Math.round(Function('return ' + expression)() * 100000000) / 100000000
}

function addEventListenerToDocument(allPossibilities, allOperators, input, inputValues) {
    document.addEventListener('keyup', e => {
        const value = allPossibilities.find(posib => posib === e.key)

        if(value) {
            if(value === 'Backspace') {
                inputValues.pop()
                redefineCalculatorInputContet(input, inputValues)
            } else if(value === 'Enter') {
                if(!isNaN(Number(inputValues[inputValues.length -1]))) {
                    inputValues = [calculateResult(generateAdjusteArrayOfValues(inputValues).join(' '))]
                    redefineCalculatorInputContet(input, inputValues)
                }
            } else if(value === '.' || value === ',') {
                let decimalSeparator = value
                if(value === ',') decimalSeparator = '.'
                
                if(!isNaN(Number(inputValues[inputValues.length -1]))) {
                    if(!checkIfLastNumberHasDot(inputValues)) {
                        inputValues.push(decimalSeparator)
                        redefineCalculatorInputContet(input, inputValues)
                    }
                }
            } else {
                const lastOperator = allOperators.find(opert => opert === inputValues[inputValues.length -1]) 

                if(allOperators.find(opert => opert === value) 
                && lastOperator
                ) {
                    if(value !== lastOperator) {
                        inputValues[inputValues.length -1] = value
                        redefineCalculatorInputContet(input, inputValues)
                    }
                } else {
                    inputValues.push(value)
                    redefineCalculatorInputContet(input, inputValues)
                } 
            }
        }
    })
}

initiateCalculator()