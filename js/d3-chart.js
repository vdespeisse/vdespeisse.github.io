d3.chart = (options) => {
  if (d3.charts.includes(options)) return
  var chart = Object.assign({}, d3.chart.defaults, d3.chart[options.type], options)

  d3.chart.init(chart)
  return chart
} // REQUIRED options : bindto,

d3.chart.init = (chart) => {
  chart.root = d3.select(chart.bindto).classed("d3-chart", true)
  chart.svg = chart.root.append("svg").classed("d3-chart-svg", true)
  chart.wrapper = chart.svg.append("g")
  chart.AxisX = chart.wrapper.append("g").classed("axis x", true)
  chart.AxisY = chart.wrapper.append("g").classed("axis y", true)

  chart.domainX = chart._domainX(chart)
  chart.scaleX = chart._scaleX(chart).domain(chart.domainX)
  chart.axisX = chart._axisX(chart)
  chart.domainY = chart._domainY(chart)
  chart.scaleY = chart._scaleY(chart).domain(chart.domainY)
  chart.axisX = chart._axisY(chart)
  d3.chart.draw(chart)

}

d3.chart.resize = (chart) => {

  chart.width = chart.root.node().clientWidth
  chart.height = chart.root.node().clientHeight
  if (!chart.padding) chart.padding = {
    top: 20,
    bottom: 40,
    left: chart.fieldsY.length === 0 ? 20 : 60,
    right: 20,
  }

  chart.innerWidth = chart.width - chart.padding.left - chart.padding.right
  chart.innerHeight = chart.height - chart.padding.top - chart.padding.bottom
  chart.svg
      .attr("width", chart.width)
      .attr("height", chart.height)
  chart.wrapper
      .attr("width", chart.innerWidth)
      .attr("height", chart.innerHeight)
      .attr("transform", "translate(" + chart.padding.left + "," + chart.padding.top + ")")
  chart.AxisX.attr("transform", "translate(0,"+ chart.innerHeight ")")
  
}
d3.chart.draw = (chart) => {

}

d3.chart.bar = (chart) => {

}

d3.chart.defaults = {
  fieldX : '',
  fieldsY : [''],
  _domainX: (chart) => chart.data.map(d => d[fieldX]),
  _scaleX: (chart) => d3.scaleOrdinal().range([0, chart.innerWidth]),
  _axisX: (chart) => d3.axisBottom(chart.scaleX),
  _domainY: (chart) => d3.max(chart.fieldsY.map(field => d3.max(chart.data.map(d => d[field]))))
  _scaleY: (chart) => d3.scaleLinear().range([0, chart.innerHeight])
  _axisY: (chart) => d3.axisLeft(chart.scaleY)

}
