class Validator {

    static validate(sudoku) {
        const validator = new Validator
        return validator.validate(sudoku)
    }

    validate(sudoku) {
        const sudokuArray = madeSudokuArray(sudoku);
        const columnsCheckAnswer = checkColumns(sudokuArray);
        const rowsCheckAnswer = checkColumns(transposeArray(sudokuArray));
        const squaresCheckAnswer = checkSquares(sudokuArray)
        if (columnsCheckAnswer === "Invalid" ||
            rowsCheckAnswer === "Invalid" ||
            squaresCheckAnswer === "Invalid") {
            return ("Sudoku is invalid.");
        } else if (columnsCheckAnswer === "ValidIncomplete" ||
            rowsCheckAnswer === "ValidIncomplete" ||
            squaresCheckAnswer === "ValidIncomplete") {
            return ("Sudoku is valid but incomplete.");
        } else {
            return ("Sudoku is valid.");
        }
    }
}

function madeSudokuArray(sudokuFields) {
    let dimensionalArray = [];
    let lineArray = sudokuFields.replaceAll(/[+|-]/g, '')
        .replaceAll(/\n/g, ' ')
        .replaceAll('  ', ' ')
        .trim()
        .split(' ');
    for (let x = 0; x < lineArray.length; x += 9) {
        dimensionalArray.push(lineArray.slice(x, x + 9));
    }
    return dimensionalArray;
}

function transposeArray(getArray) {
    return getArray[0].map((num, colIndex) => getArray.map(row => row[colIndex]));
}

function checkFields(readFields) {
    const numLine = "123456789";
    if (readFields.sort().join('') !== numLine) {
        const checkNum = readFields.every(num => num >= 0 && num <= 9);
        const removeZero = readFields.join('').replaceAll('0', '');
        const removeSame = Array.from(new Set(removeZero)).join('');
        if (removeSame !== removeZero || checkNum !== true) {
            return "Invalid";
        } else {
            return "ValidIncomplete";
        }
    } else {
        return "Valid"
    }
}

function checkColumns(readArray) {
    let column = [];
    let validation = "Valid";
    for (let columFirstIndex = 0; columFirstIndex < 9; columFirstIndex++) {
        for (let columSecondIndex = 0; columSecondIndex < 9; columSecondIndex++) {
            column.push(readArray[columFirstIndex][columSecondIndex]);
        }
        let answer = checkFields(column);
        if (answer === "Invalid") {
            return answer;
        } else if (answer === "ValidIncomplete") {
            validation = answer;
        }
        column.length = 0;
    }
    return validation;
}

function checkSquares(readArray) {
    let square = [];
    let validation = "Valid";
    for (let rowIndex = 0; rowIndex < 9; rowIndex += 3) {
        for (let columnIndex = 1; columnIndex <= 9; columnIndex++) {
            for (let squareLimit = rowIndex; squareLimit < 3 + rowIndex; squareLimit++) {
                square.push(readArray[columnIndex - 1][squareLimit]);
            }
            if (columnIndex % 3 === 0) {
                let answer = checkFields(square);
                if (answer === "Invalid") {
                    return answer;
                } else if (answer === "ValidIncomplete") {
                    validation = answer;
                }
                square.length = 0;
            }
        }
    }
    return validation;
}

module.exports = Validator