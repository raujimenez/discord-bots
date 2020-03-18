const Discord = require("discord.js");
const { Builder, By, Key, util } = require("selenium-webdriver");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const fetch = require("node-fetch");
require("dotenv").config();

const client = new Discord.Client();

client.login(process.env.TONY_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  if (/^!tony.status$/.test(message.content)) {
    const response = await fetch("https://itsmetony.aternos.me/");
    const text = await response.text();
    await message.reply(text.includes("offline") ? "offline" : "online");
  } else if (/^!tony.ip$/.test(message.content)) {
    message.reply("`itsmetony.aternos.me`");
  } else if (/^!tony.start$/.test(message.content)) {
    console.log('start')
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(new ServiceBuilder("/usr/bin/chromedriver"))
      .build();
    await driver.get("https://aternos.org/go/");
    // login
    await driver.findElement(By.id("user")).sendKeys("itsmetony");
    await driver.findElement(
      By.id("password").sendKeys(process.env.aternoskey)
    );
    await driver.findElement(By.id("login")).click();
    console.log("logged in");

    const start = await driver.findElement(By.id("start"));
    if (start.isDisplayed()) {
      start.click();
      console.log("click");
    }

    await message.reply("starting");
  } else if (/^!tony.help$/.test(message.content)) {
    help = "!tony.up - test if server is up\n";
    help += "!tony.ip - show ip address for server\n";
    help += "!tony.start - start server";
    help += "!tony.stop - stop server";
    message.reply(help);
  } else if (/^!tony.*$/.test(message.content)) {
    message.reply("type !tony.help to see list of commands.");
  }
});
