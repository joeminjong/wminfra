//관심목록 관련 기능
var totalConcerns = new Object;
var tableHead =['NO', '공고일', '제안서', '공고번호', '사업명', '사업위치', '추진방식', '사업내용', '참여조건', '진행현황']

fetch('./concerns.xlsx').then(function(response){
  response.blob().then(function(myBlob) {
    var reader = new FileReader();
    reader.onload = function(){
      var fileData = reader.result;
      var wb = XLSX.read(fileData, {type : 'binary'});
      wb.SheetNames.forEach(function(sheetName){
        var totalConcerns = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

        //테이블 해드값 설정
        var th=``
        for (let i=0; i < tableHead.length; i++){
          if (i < 3){
            th += `<th width="70">${tableHead[i]}</th>`
          } else if (i === 4) {
            th += `<th width="200">${tableHead[i]}</th>`
          }
          else{
            th += `<th >${tableHead[i]}</th>`
          }
        };

        document.getElementById("tableHead").innerHTML = th;

        //리스트값 붙여넣기
        var concerns=``
        for (let i=0; i < totalConcerns.length; i++){
          for (let j=0; j < tableHead.length; j++){
            if (j===0) {
              concerns += `<tr>`
              concerns += `<td>${i+1}</td>`
            } else {
              concerns += `<td>${totalConcerns[i][tableHead[j]]}</td>`
            }
          }
          concerns += `</tr>`
        }
        document.getElementById("tableList").innerHTML = concerns;
      });
    };
    reader.readAsBinaryString(myBlob);
  });
});



//export josn to excel
//이분 코드 가셔와서 수정 하였음 https://eblo.tistory.com/84
//참고 출처 : https://redstapler.co/sheetjs-tutorial-create-xlsx/
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}
// function exportExcel(){
//     // step 1. workbook 생성
//     var wb = XLSX.utils.book_new();
//
//     // step 2. 시트 만들기
//     var newWorksheet = excelHandler.getWorksheet();
//
//     // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
//     XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
//
//     // step 4. 엑셀 파일 만들기
//     var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
//
//     // step 5. 엑셀 파일 내보내기
//     saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
// }

function exportExcel() {
  fetch('./concerns.xlsx').then(function(response){
    response.blob().then(function(myBlob) {
      saveAs(myBlob, 'concerns.xlsx');
    });
  });
}

// $(document).ready(function() {
//     $("#excelFileExport").click(function(){
//         exportExcel();
//     });
// });
var excelHandler = {
        getExcelFileName : function(){
            return 'concerns1.xlsx';
        },
        getSheetName : function(){
            return 'concerns';
        },
        getExcelData : function(){
            return totalConcerns;
        },
        getWorksheet : function(){
            return XLSX.utils.json_to_sheet(this.getExcelData());
        }
}
