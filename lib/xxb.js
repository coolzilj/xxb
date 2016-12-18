var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var Table = require('cli-table');
var async = require('async');

module.exports = function(config) {

    var table = new Table({
        head: ['产品名称', '合作基金', '发售平台', '7日年化收益率', '万份收益']
    });
    var rows = [];

    async.forEach(config.funds, function(fund, callback) {

        var bao = {
            fundName: '',
            sevenRateReturn: '',
            tenThousandReturn: '',
            date: ''
        };

        var options = {
            uri: "http://fund.eastmoney.com/" + fund.code + ".html",
            encoding: "binary",
            proxy: this.protocol == 'http' ? process.env.http_proxy : process.env.https_proxy
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                parse(iconv.decode(body, 'utf8'));
                rows.push(
                    [fund.bao, bao.fundName.trim(), fund.platform, bao.sevenRateReturn.trim(), bao.tenThousandReturn.trim()]
                );
                callback();
            }
        })

        function parse(body) {
            $ = cheerio.load(body);
            bao.fundName = $("div.fundDetail-tit").text();
            bao.sevenRateReturn = $("dl.dataItem02 dd.dataNums").text();
            bao.tenThousandReturn = $("dl.dataItem01 dd.dataNums").text() + "元";
        }

    }, function(error) {
        // sort by price desc
        rows.sort(function (a, b) {
            return parseFloat(b[4]) - parseFloat(a[4]);
        });
        rows.forEach(function (r) {
            table.push(r);
        });

        console.log(table.toString());

    });

}
