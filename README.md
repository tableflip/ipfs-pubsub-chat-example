# IPFS pubsub chat example

> A ~76KB example chat app that uses window.ipfs, provided by the IPFS Companion web extension

Demo: https://tableflip.github.io/ipfs-pubsub-chat-example/dist/

<img width="752" alt="screen shot of IPFS pubsub chat example" src="https://user-images.githubusercontent.com/152863/36670485-744ca964-1af0-11e8-82f9-a591a90522a3.png">

## Install

1. This app requires `window.ipfs`. Install the IPFS Companion web extension:

    <a href="https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/" title="Get the add-on"><img width="86" src="https://blog.mozilla.org/addons/files/2015/11/AMO-button_1.png" /></a> <a href="https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch" title="Get the extension"><img width="103" src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png" /></a>

2. You need to be using the **embedded** JS-IPFS node, click the extension icon in the top right of your browser and toggle the switch to "embedded"
3. Open the preferences and paste in the following to configure your JS-IPFS node to use pubsub:

    ```json
    {
      "config": {
        "Addresses": {
          "Swarm": [
            "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"
          ]
        }
      },
      "EXPERIMENTAL": {
        "pubsub": true
      }
    }
    ```

4. Install dependencies `npm install`
5. Build the app `npm run build`
6. Start the app `npm start`
