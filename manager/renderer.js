async function deleteData(id) {
  {
    const data = { CustomerID: id };
    try {
      const response = await window.API.sender(data, "delCustomer");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function updateData(updata) {
  {
    const data = updata;
    try {
      const response = await window.API.sender(data, "updateCustomer");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function deleteProduct(id) {
  {
    const data = { ProductID: id };
    try {
      const response = await window.API.sender(data, "delProduct");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function updateProduct(updata) {
  {
    const data = updata;
    try {
      const response = await window.API.sender(data, "updateProduct");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function send(data) {
  {
    try {
      const response = await window.API.sender(data, "addCustomer");
      console.log("收到主进程响应:", response);
    } catch (error) {
      console.error("调用失败:", error);
    }
  }
}
async function logout() {
  try {
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
