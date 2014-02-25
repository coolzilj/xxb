var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var Table = require('cli-table');
var async = require('async');

module.exports = function(config) {

    var table = new Table({
        head: ['产品名称', '合作基金', '发售平台', '7日年化收益率', '万份收益', '数据日期']
    });

    async.forEach(config.funds, function(fund, callback) {

        var bao = {
            fundName: '',
            sevenRateReturn: '',
            tenThousandReturn: '',
            date: ''
        };

        var options = {
            uri: "http://fund.eastmoney.com/" + fund.code + ".html",
            encoding: "binary"
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                parse(iconv.decode(body, 'gbk'));
                table.push(
                    [fund.bao, bao.fundName.trim(), fund.platform, bao.sevenRateReturn.trim(), bao.tenThousandReturn.trim(), bao.date.trim()]
                );
                callback();
            }
        })

        function parse(body) {
            $ = cheerio.load(body);
            bao.fundName = $("div.bktit_new > a").text();
            bao.sevenRateReturn = $("div.bkinfo_new table tr:nth-child(2) td:nth-child(2)").text();
            bao.tenThousandReturn = $("div.bkinfo_new table tr:nth-child(1) td:nth-child(4) span").text() + "元";
            bao.date = $("div.bkinfo_new table tr:nth-child(1) td:nth-child(2)").text();
        }

    }, function(error) {

        console.log(table.toString());

    });

}
