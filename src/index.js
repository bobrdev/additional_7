module.exports = function solveSudoku(matrix) {

  function canSetValInGlobMatrix(row, colum){
    let value = matrix[row][colum];

    for (let subCol = 0; subCol <= 8; subCol++) {
      if (subCol != colum && matrix[row][subCol] == value) {
        return false;
      }
    }

    for (let subRow = 0; subRow <= 8; subRow++) {
      if (subRow != row && matrix[subRow][colum] == value) {
        return false;
      }
    }


    let subRow_3x3 = Math.floor(row / 3);
    let subCol_3x3 = Math.floor(colum / 3);

    for (let subRow = subRow_3x3 * 3; subRow < subRow_3x3 * 3 + 3; subRow++) {
      for (let subCol = subCol_3x3 * 3; subCol < subCol_3x3 * 3 + 3; subCol++) {
        if (subRow != row && subCol != colum && matrix[subRow][subCol] == value) {
          return false;
        }
      }
    }

    return true;
  }

  function nextSolve(row, colum){

    if (matrix[row][colum] != 0) {

      colum++;
      if (colum == 9) { colum -= colum; row++;
        if (row == 9) return true;
      }
      if (nextSolve(row, colum)) {
        return true;
      }
      
    } else {

      for (let i = 1; i <= 9; i++) {
        matrix[row][colum] = i;
        if (canSetValInGlobMatrix(row, colum)) {
          if (nextSolve(row, colum)) {
            return true;
          }
        }
      }

      matrix[row][colum] = 0;
      return false; 
    }
  }

  if(nextSolve(0,0)) return matrix;

}
