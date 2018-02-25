//module.exports = function solveSudoku(matrix) {
function solveSudoku(matrix) {

  let MM = matrix;

  function checkSolve(chekedMatrix){
    for (const key in SubMatrix) {
      for (let i = 0; i < SubMatrix[key].length; i++) {
        let val = SubMatrix[key][i];
        if(val == 0){
          return false;
        }
      }
      console.log('checkSolve');
    }
    return true;
  }
  

  function getFreeNumSubArr(r){
    tmp = {1 : 1, 2 : 2, 3 : 3, 4 : 4, 5 : 5, 6 : 6, 7 : 7, 8 : 8, 9 : 9};

    for (let index = 0; index < r.length; index++){
      if (r[index] != 0) delete tmp[r[index]];
    }

    let freeNum = [];
    for (const key in tmp) {
      freeNum.push(tmp[key]);
    }
    return freeNum;
  }


  let SubMatrix = { '00' : [], '01' : [], '02' : [],
                    '10' : [], '11' : [], '12' : [],
                    '20' : [], '21' : [], '22' : [],
  };
  let freeNumSub = {};

  for (let i_row = 0; i_row < MM.length; i_row++) {
    for (let i_col = 0; i_col < MM.length; i_col++) {
      const element = MM[i_row][i_col];
      let coordinates = {row : i_row, col : i_col};
      x = Math.floor(i_row / 3);
      y = Math.floor(i_col / 3);
      val_x = x * 3 + Math.floor(i_row % 3);
      val_y = y * 3 + Math.floor(i_col % 3);
      //console.log(x + " - x " + " y - " + y)
      strCor = (x + "" + y);
      SubMatrix[strCor].push(element);
      //console.log(val_x + " - val x " + " val y - " + val_y)
    }
    //console.log("----next row----");
  }

  console.log(SubMatrix);

  for (const key in SubMatrix) {
    freeNumSub[key] = getFreeNumSubArr(SubMatrix[key]);
    //console.log("key - " + key + " length " + freeNumSub[key].length);
  }
  console.log(freeNumSub);

  function getGlobalCoordinates(s_p, p_3x3){
    let g_row = Math.floor(s_p / 3) + 3 * Number(p_3x3[0]);
    let g_col = Math.floor(s_p % 3) + 3 * Number(p_3x3[1]);
    return { "row" : g_row, "col" : g_col }
  }

  function canSetVal(val, pos_3x3, subPos){
    let coord = getGlobalCoordinates( subPos, pos_3x3 );

    let g_row = coord.row;
    let g_col = coord.col;
    //let g_row_x = Math.floor(subPos / 3) + 3 * Number(pos_3x3[0]);
    //let g_col_y = Math.floor(subPos % 3) + 3 * Number(pos_3x3[1]);
    console.log("pos -" + pos_3x3 + " subPos "  +subPos + " g_row -" + g_row + "g_col - " + g_col + " can insert val - " + val );
    
    return true;
  }

  function getCountPotentialVal(pos_3x3, subPos){
    arrValue = [];
    for (let index = 0; index < freeNumSub[pos_3x3].length; index++) {
      const val = freeNumSub[pos_3x3][index];
      if(canSetVal(val, pos_3x3, subPos))
        arrValue = [1,1,1,1];
        //arrValue.push({})
      
    }
    console.log("----------------getCountPotentialVal");
    return arrValue;
  }

  for (const key in SubMatrix) {
    for (let i = 0; i < SubMatrix[key].length; i++) {
      let val = SubMatrix[key][i];
      if(val == 0){
        //console.log(val  + " in pos " + i);
        //trySetVal(key, i);
        let arrTmpVal = getCountPotentialVal(key, i);
        if (arrTmpVal.length < 2) {
          SubMatrix[key][i] = arrTmpVal[0];
        }
      }
      
    }
    console.log('-------');
      
  }

  

  let isSolveDone = false;
  while(!isSolveDone){

    
    isSolveDone = checkSolve(SubMatrix);
    console.log( checkSolve(SubMatrix));
    break;
  }


}

init = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

solveSudoku(init);






/*
 row = [1,2,2,5,5]
  function getSumRow(arr){
    let rez = 0;
    for (let index = 0; index < arr.length; index++) {
      rez += arr[index];
    }
    return rez;
  }

  function getSumCol(arr){
    return getSumRow(arr);
  }


//get free num in row and current colum
  function getFreeNumInRow(r, c){
    freeNum = {1 : 1, 2 : 2, 3 : 3, 4 : 4,
               5 : 5, 6 : 6, 7 : 7, 8 : 8, 9 : 9};

    for (let index = 0; index < r.length; index++) {
      if (r[index] != 0) {
        delete freeNum[r[index]];
      }
    }
    
    for (let index = 0; index < c.length; index++) {
      if ( c[index] != 0 && freeNum[c[index]] ) {
        delete freeNum[c[index]];
      }
    }
    return freeNum;
  }
  rw = [0, 0, 4, 0, 5, 0, 0, 0, 0];
  cl = [0, 0, 0, 0, 3, 0, 6, 5, 4];
  
  console.log( getSumCol(row) );

  console.log( getFreeNumInRow(rw, cl) );

*/


/*
  fa = {1: 1, 2 : 9}
  na = {2: 9, 1 : 1}

  var eq = JSON.stringify(fa) == JSON.stringify(na);
  console.log(eq);

 init = [
    [0, 8, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 4, 3, 0, 0, 9, 8, 0],
    [3, 0, 1, 0, 0, 8, 7, 0, 0],
    [0, 1, 0, 5, 4, 0, 0, 6, 0],
    [0, 0, 0, 2, 9, 0, 4, 1, 0],
    [0, 4, 3, 0, 0, 6, 0, 9, 0],
    [0, 0, 8, 0, 0, 5, 0, 3, 0],
    [0, 6, 7, 0, 3, 9, 5, 0, 8],
    [1, 0, 5, 0, 8, 0, 0, 0, 0]
  ];
  function stateErrSolves(r, {}){
    
  }

  function getFreeNumCurrentRow(r){
    freeNum = {1 : 1, 2 : 2, 3 : 3, 4 : 4, 5 : 5, 6 : 6, 7 : 7, 8 : 8, 9 : 9};

    for (let index = 0; index < r.length; index++) {
      if (r[index] != 0) delete freeNum[r[index]];
    }
    return freeNum;
  }

  function createStackFreeNum(mm){
    let stackFreeNum = []; 
    for (let i_row = 0; i_row < mm.length; i_row++) {
      stackFreeNum.push(getFreeNumCurrentRow(mm[i_row]));
    }
    return stackFreeNum;
  }

  stackFreeNumForRow = createStackFreeNum(init);
  //console.log("stack " + JSON.stringify(stackFreeNumForRow));

  loooop = 1;
  


  function setRowValue(row){

  }

  
  while(loooop > 0){
    //setRowValue(clone);

    for (let i_row = 0; i_row < MM.length; i_row++) {
      for (let i_col = 0; i_col < MM.length; i_col++) {
        const element = MM[i_row][i_col];
        let coordinates = {row : i_row, col : i_col};
        //console.log(coordinates);
        setRowValue();





      }
      //console.log("----next row----");
    }

  loooop--;

  }*/