const { session } = require("electron");
const urlStore = require("./urlconfig.js").default;
class AuthService {
  constructor(url) {
    this.role = null;
    this.url = url;
  }

  async login(username, password) {
    const response = await fetch(url+"/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("登录失败");
    }
    const setCookieHeaders = response.headers.get("set-cookie");
    const parts = setCookieHeaders.split(";")[0].split("=");
    const parseCookie = { name: parts[0], value: parts[1] };
    await session.defaultSession.cookies.set({
      url: url,
      ...parseCookie,
    });
    const roleResponse = await this.getCurrentUser();
    this.role = roleResponse.user.roles;
    const data = await response.json();
    return data.user;
  }

  async logout() {
    const cookies = await session.defaultSession.cookies.get({
      url: url,
    });
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const response = await fetch(url+'/logout', {
      method: "POST",
      headers: { Cookie: cookieHeader }, 
    });

    await session.defaultSession.clearStorageData({ storages: ["cookies"] });
    const data = await response.json();
    return data;
  }
  async getCurrentUser() {
    const cookies = await session.defaultSession.cookies.get({
      url: url,
    });
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    const response = await fetch(url+"/me", {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });

    if (response.status === 401) {
      return null; 
    }

    const data = await response.json();
    return data;
  }
  async perTest() {
    const cookies = await session.defaultSession.cookies.get({
      url: url,
    });
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    const response = await fetch(url+"/test", {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });

    if (response.status === 401) {
      return null; // 未登录
    }

    const data = await response.json();
    return data;
  }
}

module.exports = new AuthService();
