## ![logo](http://ww3.sinaimg.cn/large/6273fe87gw1edvsb904slj201901bq2p.jpg) xxb ![npm](https://badge.fury.io/js/xxb.png)

A commandline-tool to check the fund income

![screenshot](http://ww2.sinaimg.cn/large/6273fe87gw1edvsjzz9q5j20k20ecgqd.jpg)

### Installation
````
$ [sudo] npm install xxb -g
````

### Usage
Just run `xxb` , you will get the pretty table.
````
$ xxb
````

### Configuration

Configuration options are set in the ~/.xxb file. If xxb cannot find an user defined configuration file in the home directory, the bundled config.json used instead.

Example configuration:
````
{
    "funds": [
      {
        "code": "000343",
        "bao": "理财通",
        "platform": "微信"
      }
    ]
}
````

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

---
Handmade by [Liu Jin](https://github.com/coolzilj)
