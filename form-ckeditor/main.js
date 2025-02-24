const h1 = document.querySelector("h1");
const submitBtn = document.getElementById("submit");
const hide_content = document.getElementById("hide_content");

submitBtn.addEventListener("click", () => {
  const data = editor.getData();
  hide_content.innerHTML = data;
  const imgs = hide_content.querySelectorAll("img");
  console.log(imgs);
  const postData = [];
  imgs.forEach((img, index) => {
    const startIndex = img.src.indexOf(":");
    const endIndex = img.src.indexOf(";");
    const type = img.src.slice(startIndex + 1, endIndex);
    postData[index] = {
      name: `${h1.innerText}${index}`,
      type: type,
      data: img.src.split(",")[1],
    };
  });
  postFile(postData);
});
async function postFile(postData) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwmSGXwVL6m5_IVjDruxJb3NdxuqpglqLqWBPLwmJEV2vrfBcb36BxF9PH0OYMmrzVU/exec",
      {
        method: "POST",
        body: JSON.stringify(postData),
      }
    );
    const data = await response.json();
    const imgs = hide_content.querySelectorAll("img");
    imgs.forEach((img, index) => {
      img.src = data[index].link;
    });
    const content = hide_content.innerHTML;
    postToSheets(content);
  } catch (error) {
    alert("Vui lòng thử lại");
  }
}

async function postToSheets(content) {
  const formData = new FormData();
  formData.append("entry.565900978", h1.innerText);
  formData.append("entry.1139897525", content);
  fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSetLNbZa7t7yWtgyo5trKEJVfxVCFXE_rKYu-Cy4GaBdJIVUQ/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );
}