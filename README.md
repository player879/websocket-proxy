# MPP Proxy Server
This is a simple WebSocket server that, upon connection, creates a corresponding connection to `ws://www.multiplayerpiano.com:443` and relays data between each.

To use it, just connect directly to it instead of Multiplayer Piano's server! No client modification needed.

It also works in the browser, and you can use it to indirectly connect to the official Multiplayer Piano server from a different website.

> To use your proxy with browser MPP, type into console:
> ```js
> MPP.client.stop();
> MPP.client.uri = "<your websocket URL>";
> MPP.client.start();
> ```

Another advantage over forward proxies is that you can host it on cloud applications, such as Heroku and OpenShift, so you can **host your own 24/7 MPP proxy for free!** Just create an app using this repository (you may need to fork it for Heroku). Then use the app's URL like so: `wss://<hostname of app>`.
*Most cloud app platforms support TLS so you can connect securely with `wss://`. But if that doesn't work, try `ws://`.*

> Also works on Repl.it: https://repl.it/@ledlamp89/mpp-proxy-server
> 
> Repl.it hosts web apps indefinitely—sometimes they will go to sleep but they will wake up when you access them and stay running as long as you use them. And because each app runs on a random host (with different IP), you can fork the app multiple times to have multiple readily-available MPP proxies. Note that there are a limited number of hosts (58 when I tested) so the more forks you use, the more likely you will have proxies merged with the same IP address.

To install on your own server:
```sh
git clone https://github.com/ledlamp/mpp-proxy-server.git
cd mpp-proxy-server
npm install

# the server defaults to port 8080, but you can set the PORT environment variable
export PORT=80     # for example

# for temporary run just do
npm start

# to run as daemon (in background)
nohup npm start &
# or you can use your preferred process manager (pm2, forever, etc)

# and don't forget to make it start at reboot (such as in `crontab -e` or with `pm2 startup`)
# if you want it to be permanently available.
```

If you need to install node.js on shared hosting, see [this example](https://gist.github.com/ledlamp/6602505c520e7434d06239a72204091d)
