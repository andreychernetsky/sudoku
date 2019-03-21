module.exports = function solveSudoku(matrix) {
    const rows = copyArray(matrix);

    rows.forEach((row) => {
            const uncertaintiesInRow = findUncertainties(row);
            calculateUncertainties(row, uncertaintiesInRow);

            const columns = uncertaintiesInRow.map((index) => getColumn(rows, index));
            columns.forEach((column) => {
                calculateUncertainties(column, findUncertainties(column))
            });

            revealTheSecret(row);
        }
    );

    return rows;

    function calculateUncertainties(array, uncertainties) {
        uncertainties.forEach((zeroIndex) => calcPossibleValues(array, zeroIndex));
    }

    function calcPossibleValues(array, zeroIndex) {
        let values = isSet(array[zeroIndex]) && array[zeroIndex] || possibleValues();

        array.forEach((item) => values.delete(item));
        array[zeroIndex] = values;
    }

    function revealTheSecret(array) {
        array.forEach((item, index) => {
            if (isPossibleReveal(item)) {
                array[index] = item.values().next().value;
            }
        });

        function isPossibleReveal(item) {
            return isSet(item) && item.size === 1;
        }
    }

    function isSet(item) {
        return item instanceof Set;
    }

    function getColumn(matrix, columnId) {
        return matrix.reduce((buffer, row) => {
            buffer.push(row[columnId]);
            return buffer;
        }, []);
    }

    function findUncertainties(array) {
        const zeroIndexes = [];
        array.forEach((item, index) => {
            if (item === 0 || isSet(item)) {
                zeroIndexes.push(index)
            }
        });

        return zeroIndexes;
    }

    function possibleValues() {
        return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }

    function copyArray(array) {
        return [...array];
    }
};

}
