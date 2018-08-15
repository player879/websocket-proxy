# MPP Proxy Server
This is a simple WebSocket server that, upon connection, creates a corresponding connection to `ws://www.multiplayerpiano.com:443` and relays data between each.

To use it, just connect to it instead of Multiplayer Piano's server! No client modification needed.

It also works in the browser, and you can use it to indirectly connect to the official Multiplayer Piano server from a different website.

Another advantage over forward proxies is that you can host it on cloud applications, such as Heroku and OpenShift, so you can **host your own 24/7 MPP proxy for free!** Just create an app using this repository (you may need to fork it for Heroku). Then use the app's URL like so: `ws://<hostname of app>:80`.

To install on your own server:
```sh
git clone https://github.com/ledlamp/mpp-proxy-server.git
cd mpp-proxy-server
npm install
# the server defaults to port 8080, but you can set the PORT environment variable
export PORT=443
nohup npm start &
# or use your preferred process manager
# and don't forget to make it start at reboot (such as in `crontab -e` or with `pm2 startup`)
```
If you need to install node.js on shared hosting, see [this](https://gist.github.com/ledlamp/6602505c520e7434d06239a72204091d)
