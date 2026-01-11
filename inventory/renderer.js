async function send(data) {
  {
    try {
      // 调用预加载脚本暴露的方法
      const response = await window.API.sender(data, "addCustomer");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function logout() {
  try {
    // 调用预加载脚本暴露的方法
    const response = await window.API.logout();
    console.log("收到主进程响应:", response);
    window.location.replace("../index.html");
  } catch (error) {
    console.error("调用失败:", error);
  }
}
function setdata(key, value) {
  window.API.setdata(key, value);
}
async function getdata(key, value) {
  return await window.API.getdata(key, value);
}
