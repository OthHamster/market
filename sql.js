const AuthService = require("./auth.js");
const { session } = require("electron");
const urlStore = require("./urlconfig.js").default;
url = urlStore.getUrl();
const sqlSender = async (data, api) => {
  const cookies = await session.defaultSession.cookies.get({
    url: url,
  });
  const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
  const response = await fetch(url + "/" + api, {
    method: "POST",
    headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = response.status;
    console.error("后端返回内容:", errorText);
    throw new Error("发送失败");
  }
  const responseJson = await response.json();
  return responseJson;
};

module.exports = { sqlSender };
