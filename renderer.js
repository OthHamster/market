document.getElementById("ans").addEventListener("click", async () => {
  try {
    id = document.getElementById("id").value;
    psw = document.getElementById("psw").value;
    console.log("id:", id);

    const response = await window.API.login(id, psw);
    console.log("收到主进程响应:", response);
    if (response.success == false) {
      output = document.getElementById("output");
      output.innerHTML = "登录出错";
      document.getElementById("id").value = "";
      document.getElementById("psw").value = "";
    }
  } catch (error) {}
});
const url = document.getElementById("url");
document.getElementById("setUrl").addEventListener("click", async () => {
  try {
    await window.API.setUrl(url.value);
    await window.API.relaunchApp();
  } catch (error) {}
});
async function initUrl() {
  url.value = await window.API.getUrl();
}
initUrl();
console.log("114514");
