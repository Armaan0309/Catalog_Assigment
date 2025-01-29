const fs = require('fs');


function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let c = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (-points[j].x) / (points[i].x - points[j].x);
            }
        }
        c += term;
    }

    return Math.round(c);
}

function solvePolynomial(jsonInput) {
    const keys = jsonInput.keys;
    const n = keys.n;
    const k = keys.k;

    const points = [];
    for (let x in jsonInput) {
        if (x !== "keys") {
            const base = parseInt(jsonInput[x].base);
            const value = jsonInput[x].value;
            const y = decodeValue(value, base);
            points.push({ x: parseInt(x), y });
        }
    }

    if (points.length < k) {
        throw new Error("Insufficient roots provided.");
    }

    const c = lagrangeInterpolation(points);
    return c;
}

function readJsonInput(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function main() {
    try {
        const testCase1 = readJsonInput('testcase1.json');
        const secret1 = solvePolynomial(testCase1);
        console.log(`Secret for Test Case 1: ${secret1}`);

        const testCase2 = readJsonInput('testcase2.json');
        const secret2 = solvePolynomial(testCase2);
        console.log(`Secret for Test Case 2: ${secret2}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();