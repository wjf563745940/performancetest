import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsKeyChart = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this);
    this.type = "kline"
}
var _getscale = D3Charts.prototype.getScaleParam;
var _getAxisParam = D3Charts.prototype.getAxisParam;
D3ChartsKeyChart.prototype = new D3Charts();
D3ChartsKeyChart.prototype.constructor = D3ChartsKeyChart;

D3ChartsKeyChart.prototype.drawContent = function () {

    console.log(this.options)
    console.log("drwa keychart")
    // this.drawK();
    // this.drawLine();
    // this.drawKey();
    this.drawRenko();
}
D3ChartsKeyChart.prototype.drawRenko = function () {
    console.log("draw renko")
    var seriesOption = this.getRenkoDataSet();
    var svg = this.$el;
    var staticp = this.options.static;
    var padding = staticp.padding;
    // var seriesOption = this.getKDataSet();
    var ScaleParam = this.getScaleParam();
    var { xScale, yScale } = createScale(ScaleParam);
    var renkos = svg.append("g")
        .classed("renkos", true);
    var renko = renkos.selectAll(".renko")
        .data(seriesOption)
        .enter()
        .append("g")
        .classed("renko", true)
        .attr("transform", (d, i) => { return "translate(" + padding.left + "," + padding.right + ")" })

        renko.append("rect")
        .attr("x", (d, i) => {  return xScale(d.index) })
        .attr("y", d => { return yScale(d3.max([d.from,d.to])) ;})
        .attr("width", xScale(2)-xScale(1))
        .attr("height", (d, i) => { return  Math.abs(yScale(d.from)-yScale(d.to)) })
        .attr("fill", (d, i) => {
            console.log(d)
            if(d.type=="down")
             return "#111"
           return "#fff"
        })
}


D3ChartsKeyChart.prototype.getRenkoDataSet = function getRenkoDataSet() {
    var datas = this.options.series[0].data;
    var danwei = 1;//单位是一
    var ii = 1;
    var ver = "";
    var initData = datas[0][0];
    var result = []
    for (var i = 1; i < datas.length; i++) {
        var item = datas[i][0];
        var num = Math.floor(Math.abs(item - initData) / danwei)
        if (num == 0) {
            continue;
        }
        if (item < initData) {
            if (ver == "down" || ver == "") {
                for (var j = 0; j < num; j++) {
                    result.push({ from: initData - j * danwei, to: initData - (j + 1) * danwei, index: ii, indexOri: i + 1, type: "down" })

                    ii++;
                }
                initData = initData - num * danwei

            } else {
                if (num == 1) {
                    continue
                }
                for (var j = 1; j < num; j++) {
                    result.push({ from: initData - j * danwei, to: initData - (j + 1) * danwei, index: ii, indexOri: i + 1, type: "down" })

                    ii++;
                }
                initData = initData - num * danwei

            }
            ver = "down";
        } else if (item > initData) {
            if (ver == "up" || ver == "") {
                for (var j = 0; j < num; j++) {
                    result.push({ from: initData + j * danwei, to: initData + (j + 1) * danwei, index: ii, indexOri: i + 1, type: "up" })
                    ii++;
                }
                initData = initData + num * danwei

            } else {
                if (num == 1) {
                    continue
                }
                for (var j = 1; j < num; j++) {
                    result.push({ from: initData + j * danwei, to: initData + (j + 1) * danwei, index: ii, indexOri: i + 1, type: "up" })
                    ii++;
                }
                initData = initData + num * danwei

            }
            ver = "up";
        }
    }
    return result;
}
D3ChartsKeyChart.prototype.getScaleParam = function () {
    var r = _getscale.apply(this, Array.prototype.slice.apply(arguments));
    var xAxis = this.options.xAxis[0];
    console.log(this.options)
    var num = Math.ceil((xAxis.data.length) / 2);
    var arr = d3.range(1, num, 1);
    console.log(arr, num)
    r.x.domainto = arr;
    return r

}

D3ChartsKeyChart.prototype.getAxisParam = function () {
    var r = _getAxisParam.apply(this, Array.prototype.slice.apply(arguments));
    var xAxis = this.options.xAxis[0];
    console.log(this.options)
    var num = Math.ceil((xAxis.data.length) / 2);
    var arr = d3.range(1, num, 1);
    console.log(arr, num)
    r.x.tickValues = arr;
    return r
}
export default new D3ChartsKeyChart()