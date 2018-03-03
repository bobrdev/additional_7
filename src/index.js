module.exports = function solveSudoku(matrix) {

  //  y - row
  //  x - colum
  function canSetValInGlobMatrix(row, colum, condidat_insert){

    //ищем совпадения в строке глобально
    for (let c = 0; c < 9; c++) {
      if ( matrix[row][c] == condidat_insert ) {
        return false;
      }
    }

    //ищем совпадения в столбце глобально
    for (let r = 0; r <= 8; r++) {
      if ( matrix[r][colum] == condidat_insert ) {
        return false;
      }
    }

    //ищем совпадения в квадрате 3x3
    let subRow_3x3 = Math.floor(row / 3);
    let subCol_3x3 = Math.floor(colum / 3);

    for (let subRow = 0; subRow < 3; subRow++) {
      for (let subCol = 0; subCol < 3; subCol++) {
        
        let g_row = subRow % 3 + 3 * subRow_3x3;
        let g_col = subCol % 3 + 3 * subCol_3x3;

        if(matrix[g_row][g_col] == condidat_insert){
          return false;
        }
      }
    }

    return true;
  }


  //y - row
  //x - colum
  function nextSolve(row, colum){
    if (matrix[row][colum] == 0) {
      
      //подставляем числа от 1 до 9
      for (let value = 1; value <= 9; value++) {
        let condidat_insert = value;
        if (canSetValInGlobMatrix(row, colum, condidat_insert)) {

          //присваеваем значение и в nextSolve на входе должна сработать проверка  != 0
          matrix[row][colum] = condidat_insert;
          if (nextSolve(row, colum)) {
            return true;
          }
        }
      }
      //если ни одно число не подошло обнуляем ячейку и возвращаемся в предыдущую ветку
      matrix[row][colum] = 0;
      return false;

    }else{
      colum++;

      if(colum == 9){
        colum = 0; row++;
        if(row == 9) return true;
      }
      if(nextSolve(row, colum)) return true;
    }

  }

  if(nextSolve(0,0)) return matrix;

}


/*
y - row
x - colum

y
^
|
|
|
-------- >x

00 01 02
10 11 12
20 21 22


0 1 2 % 3 = 2 + 3 * 0  = 2 colum
*/