let spreadsheetId = "1BErwi9YS_LNdyG7mXS29PsHMKOX0QMWbg9F3wk6e69k"; // ID của bảng tính Google
let sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();

function doPost(request) {
  const postData = JSON.parse(request.postData.contents);
  if(postData.action === "POST_COMMENT")
  {
    return handlePostComment(postData);
  }
  else
  {
    return uploadMedia(postData);
  }

}

function doGet() {
  let data = sheet.getDataRange().getValues();
  let headers = data[0];
  let dataArray = [];

  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    let obj = {};
    obj["ID"] = i+1;
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].toLowerCase().replace(/\s+/g, "_")] = row[j];
    }
    dataArray.push(obj);
  }

  return ContentService.createTextOutput(JSON.stringify(dataArray)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handlePostComment(postData){
  const commentRange = sheet.getRange(postData.postID,4);
  let commentValue = commentRange.getValue();
  if(!commentValue){
    commentValue =[];
  }
  else
  {
    commentValue = JSON.parse(commentValue);
  }

  commentValue = [...commentValue,postData.data];
  commentRange.setValue(JSON.stringify(commentValue));
  return ContentService.createTextOutput(JSON.stringify(postData.data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function uploadMedia(postData){
  const files = postData;
  const folderId = "1PQCaZsMtLxh0RuoQgv05wo2It3MUW49M"; // Thay đổi id của thư mục cần lưu file tại đây
  const folder = DriveApp.getFolderById(folderId);

  const output = [];

  files.forEach((file,index) => {
    const datafile = Utilities.base64Decode(file.data);
    const blob = Utilities.newBlob(datafile, file.type, file.name);
    const newFile = folder.createFile(blob);
    const url = newFile.getUrl();
    const id = newFile.getId();
    output[index] = { status: "success", name: file.name, id: id, view: url, link: `https://lh3.googleusercontent.com/d/${id}`}; 
  // Link img kích thước gốc thêm vào =s500 để đặt kích thước nhỏ lại còn 500 hoặc chiều rộng bất kì ví dụ: https://lh3.googleusercontent.com/d/${id}=s500
  // LINK: https://drive.google.com/thumbnail?id=${id} này cũng dùng đc mà kích thước mặt định là 220 xấu
  });
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON); 
}
