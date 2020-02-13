// Hacked together aimlessly by Kai Hilton-Jones
// Improved by Tim Payne
// Improved by Vojta Plzak 3.2.2018
// Improved by Simone Silini 11.01.2019

require.config({
    paths: {
        //create alias to plugins
        async: '/extensions/googtimeline/async',
        goog: '/extensions/googtimeline/goog',
        propertyParser: '/extensions/googtimeline/propertyParser',
    }
});
define(["jquery", 'goog!visualization,1,packages:[corechart,table,timeline]'], function ($) {
    'use strict';
    return {
        initialProperties: {
            version: 1.0,
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 25,
                    qHeight: 400
                }]
            },
            chartType: "timeline",
            showRowLabels: true,
            groupByRowLabel: true,
            singleColor: false,
            //  singleColorExpression: "1",

            colorByRowLabel: true,
            colorsExpression: "",
            //  backgroundColorExpression: "ffffff",
            dateFormat: "yyyy-MM-dd HH:mm",
            refdateminimum: "=DATE(MIN(START_DSTAMP),'YYYY-MM-DD HH:mm')",
            refdatemaximum: "=DATE(MAX(END_DSTAMP),'YYYY-MM-DD HH:mm')",
            thirdDimension: "t",
            RowFontSize: 15,
            BarFontSize: 13,
            rowFontnamestring: "Arial",
            barFontnamestring: "Arial"

        },
        //property panel
        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    min: 3,
                    max: 6
                },
                sorting: {
                    uses: "sorting"
                },

                //  /* DODANO SPOSÓB OBSŁUGI DANYCH */
                addons: {
                    uses: "addons",

                    items: { dataHandling: { uses: "dataHandling" } }
                },

                settings: {
                    uses: "settings",
                    items:
                    {
                        selection1:
                        {
                            type: "boolean",
                            component: "switch",
                            label: "Show Row Labels",
                            ref: "showRowLabels",
                            options: [{
                                value: true,
                                label: "On"
                            }, {
                                value: false,
                                label: "Off"
                            }]
                        },
                        selection2:
                        {
                            type: "boolean",
                            component: "switch",
                            label: "Group Row Label",
                            ref: "groupByRowLabel",
                            options: [{
                                value: true,
                                label: "On"
                            }, {
                                value: false,
                                label: "Off"
                            }]
                        },
                        selection3:
                        {
                            type: "items",
                            label: "Colors & Fonts",
                            items:
                            {
                                SingleColor:
                                {
                                    type: "items",
                                    label: "Single Color",
                                    items:
                                    {
                                        singleColor:
                                        {
                                            type: "boolean",
                                            component: "switch",
                                            label: "Use Single Color",
                                            ref: "singleColor",
                                            options: [{
                                                value: true,
                                                label: "On"
                                            }, {
                                                value: false,
                                                label: "Off"
                                            }]
                                        },
                                        singleColorExpression:
                                        {
                                            //type: "string",
                                            label: "Single Color expression",
                                            ref: "singleColorExpression"
                                            //,expression: "optional"
                                            //,defaultValue:  "46c646"
                                            , component: "color-picker"
                                            , type: "object"
                                            , defaultValue: {
                                                index: "1",
                                                color: "ffffff"
                                            },
                                            show: function (data) { return data.singleColor; }
                                        }
                                    }
                                },
                                colorByRowLabel:
                                {
                                    type: "items",
                                    label: "Color by Row Label",
                                    items:
                                    {
                                        ColorByRowLabel1:
                                        {

                                            type: "boolean",
                                            component: "switch",
                                            label: "Color by Row Label",
                                            ref: "colorByRowLabel",
                                            options: [{
                                                value: true,
                                                label: "On"
                                            }, {
                                                value: false,
                                                label: "Off"
                                            }]
                                        }
                                    }
                                }
                                ,
                                thirdDimension_setings: {
                                    type: "string",
                                    component: "buttongroup",
                                    label: "Dimension 3 - Colors or Tooltip",
                                    ref: "thirdDimension",
                                    options: [{
                                        value: "c",
                                        label: "Colors",
                                        tooltip: "Select to use 3 dimension for coloring"

                                    }, {
                                        value: "t",
                                        label: "Tooltip",
                                        tooltip: "Select to use 3 dimension for tooltip"
                                    }],
                                    defaultValue: "c"
                                }

                                ,
                                BackroundColor:
                                {
                                    //type: "string",
                                    label: "Background Color",
                                    ref: "backgroundColorExpression",
                                    // expression: "optional",
                                    component: "color-picker"
                                    , type: "object"
                                    , defaultValue: {
                                        index: "1",
                                        color: "ffffff"
                                    }
                                },

                                FontColor1:
                                {
                                    label: "Font Color",
                                    ref: "fontColor1",
                                    component: "color-picker"
                                    , type: "string"
                                    , defaultValue: {
                                        color: "black",
                                        index: "000000"
                                    }
                                }


                                , RowFontName:
                                {
                                    type: "string",
                                    label: "Row Font Name",
                                    ref: "rowFontnamestring"
                                    , expression: "optional"
                                    , defaultValue: "Arial"
                                },
                                RowFontSize1:
                                {
                                    type: "number",
                                    label: "Row Font Size",
                                    ref: "RowFontSize",
                                    expression: "optional",
                                    defaultValue: 15
                                },

                                BarFontName:
                                {
                                    type: "string",
                                    label: "Bar Font Name",
                                    ref: "barFontnamestring"
                                    , expression: "optional"
                                    , defaultValue: "Arial"
                                },
                                BarFontSize1:
                                {
                                    type: "number",
                                    label: "Bar Font Size",
                                    ref: "BarFontSize",
                                    expression: "optional",
                                    defaultValue: 13
                                }

                            }

                        }
                        ,

                        dateFormat_selection:
                        {
                            type: "string",
                            label: "Displayed Date Format",
                            ref: "dateFormat",
                            expression: "optional"
                        }
                        ,

                        Date_settings: {
                            type: "items",
                            label: "Date settings",
                            items: {
                                switch_Datesettings:
                                {
                                    type: "boolean",
                                    component: "switch",
                                    label: 'Manual hAxis settings range',
                                    ref: 'Datesettings',
                                    defaultValue: false,
                                    options: [{
                                        value: true,
                                        label: 'On'
                                    }, {
                                        value: false,
                                        label: 'Off'
                                    }]
                                }
                                ,
                                refdateminimum_selection:
                                {
                                    type: "string",
                                    label: "Date minimum",
                                    ref: "refdateminimum",
                                    //  defaultValue: "2015-01-01",
                                    expression: "optional",
                                    show: function (data) { return data.Datesettings; }
                                },
                                refdatemaximum_selection:
                                {
                                    type: "string",
                                    label: "Date maximum",
                                    ref: "refdatemaximum",
                                    //  defaultValue: "2015-01-01",
                                    expression: "optional",
                                    show: function (data) { return data.Datesettings; }
                                }
                            }
                        },


               /*         Font_settings: {
                            type: "items",
                            label: "Font settings",
                            items: {
                               
                            }
                        } */
                    }
                },
                about: {
                    component: "items", label: "About",
                    items: {
                        header: { label: "Timeline", style: "header", component: "text" },
                        header2: { label: "Version: 1.01 2020-02-13", component: "text" },
                        header3: { label: "Developed by Łukasz Dylewski", component: "text" },

                        emptyh1a:  { label: "__________________________________" , component: "text" },


                        paragraph1:   { label: "   - Dimension 1 (required):" , component: "text" },
                        paragraph2:   { label: "     Main dimension and row label" , component: "text" },
                        empty2a:  { label: "__________________________________" , component: "text" },

                        paragraph3:   { label: "   - Dimension 2 (optional):" , component: "text" },
                        paragraph4:   { label: "     Bar label" , component: "text" },
                        empty3a:  { label: "__________________________________" , component: "text" },

                        paragraph5:   { label: "   - Dimension 3 (optional):" , component: "text" },
                        paragraph6:   { label: "     Bar color or Bar Tooltip" , component: "text" },
                        empty6a:  { label: "__________________________________" , component: "text" },

                        paragraph7:   { label: "   - Dimension 4 (optional):" , component: "text" },
                        paragraph8:   { label: "     Bar Tooltip" , component: "text" },
                        empty8a:  { label: "__________________________________" , component: "text" },

                        paragraph9:   { label: "   - Dimension 5 (required):" , component: "text" },
                        paragraph10:  { label: "     Start datetime" , component: "text" },
                        empty10a:  { label: "__________________________________" , component: "text" },

                        paragraph11:  { label: "   - Dimension 6 (required):" , component: "text"  },
                        paragraph12:  { label: "     End datetime" , component: "text" },
                        empty2a:  { label: "__________________________________" , component: "text" },


                     
                    }
                }
            }
        }
        ,

        snapshot: {
            canTakeSnapshot: true
        },



        paint: function ($element, layout) {


            var backgroundcolor1 = layout.backgroundColorExpression.color.replace("#", "");
            var singleColor1 = layout.singleColorExpression.color.replace("#", "");
            var RowFontname1 = layout.rowFontnamestring;
            var BarFontname1 = layout.barFontnamestring;
            var FontColor1 = layout.fontColor1.color.replace("#", "");


            console.log("backgroundcolor1: " + backgroundcolor1);
            console.log("singleColorExpression: " + singleColor1);
            console.log("rowFontname: " + RowFontname1);
            console.log("barFontname: " + BarFontname1);
            console.log("FontColor: " + FontColor1);


            var self = this, elemNos = [], dimCount = this.backendApi.getDimensionInfos().length;
            var data = new google.visualization.DataTable();
            //  console.log("self: " + self);
            data.addColumn({ type: 'string', id: 'Campaign' });

            if (dimCount == 6) {
                data.addColumn({ type: 'string', id: 'Name' });
                data.addColumn({ type: 'string', role: 'style' });
                data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });

            } else if (dimCount == 5) {
                data.addColumn({ type: 'string', id: 'Name' });
                if (layout.thirdDimension == 'c') {
                    data.addColumn({ type: 'string', role: 'style' });
                } else {
                    data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
                }
            } else if (dimCount == 4) {
                data.addColumn({ type: 'string', id: 'Name' });
            }
            data.addColumn({ type: 'date', id: 'Start' });
            data.addColumn({ type: 'date', id: 'End' });


            this.backendApi.eachDataRow(function (key, row) {
                var values = [];
                row.forEach(function (cell, col) {

                    if (dimCount == 6) {
                        if (col < 4) {
                            values.push(cell.qText);
                        } else {
                            var myDate = new Date(cell.qText);
                            values.push(myDate);
                        }
                    } else if (dimCount == 5) {
                        if (col < 3) {
                            values.push(cell.qText);
                        } else {
                            var myDate = new Date(cell.qText);
                            values.push(myDate);
                        }
                    } else if (dimCount == 4) {
                        if (col < 2) {
                            values.push(cell.qText);
                        } else {
                            var myDate = new Date(cell.qText);
                            values.push(myDate);
                        }
                    } else {
                        if (col < 1) {
                            values.push(cell.qText);
                        } else {
                            var myDate = new Date(cell.qText);
                            values.push(myDate);
                        }
                    }

                });
                data.addRows([values]);
                //selections will always be on first dimension
                elemNos.push(row[0].qElemNumber);
            });

            var chart = new google.visualization.Timeline($element[0]);


            //Instantiating and drawing the chart
            //var chart = new google.visualization[layout.chartType]($element[0]);
            var options;
            if ((layout.singleColor === true) * (layout.Datesettings === true)) {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        singleColor: layout.singleColorExpression,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }
                    }
                    , backgroundColor: backgroundcolor1
                    ,
                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //tutaj data 1
                        , minValue: new Date(layout.refdateminimum)
                        , maxValue: new Date(layout.refdatemaximum)
                        //,color: FontColor1
                    }

                }

            } else if ((layout.singleColor === true) * (layout.Datesettings === false)) {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        singleColor: singleColor1,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }
                    }
                    , backgroundColor: backgroundcolor1
                    ,
                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //,color: FontColor1
                    }

                }

            } else if ((layout.colorByRowLabel === true) * (layout.Datesettings === true)) {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        colorByRowLabel: layout.colorByRowLabel,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }

                    }
                    , backgroundColor: backgroundcolor1

                    ,
                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //tutaj data 1
                        , minValue: new Date(layout.refdateminimum)
                        , maxValue: new Date(layout.refdatemaximum)
                        //,color: FontColor1
                    }

                }



            } else if ((layout.colorByRowLabel === true) * (layout.Datesettings === false)) {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        colorByRowLabel: layout.colorByRowLabel,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }

                    }
                    , backgroundColor: backgroundcolor1
                    ,
                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //,color: FontColor1

                    }

                }


            } else if (layout.Datesettings === true) {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        colorByRowLabel: layout.colorByRowLabel,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }
                    }
                    , backgroundColor: backgroundcolor1
                    ,

                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //tutaj data 1
                        , minValue: new Date(layout.refdateminimum)
                        , maxValue: new Date(layout.refdatemaximum),
                        color: FontColor1
                    }


                }



            } else {
                options =
                {
                    chartArea: {
                        left: 20,
                        top: 20,
                        width: "100%",
                        height: "100%"
                    },
                    timeline: {
                        showRowLabels: layout.showRowLabels,
                        groupByRowLabel: layout.groupByRowLabel,
                        colorByRowLabel: layout.colorByRowLabel,
                        rowLabelStyle: { fontName: RowFontname1, fontSize: layout.RowFontSize, color: FontColor1 },
                        barLabelStyle: { fontName: BarFontname1, fontSize: layout.BarFontSize, color: FontColor1 }
                    }
                    , backgroundColor: backgroundcolor1
                    ,

                    hAxis: {
                        format: layout.dateFormat.replace("'", "")
                        //,color: FontColor1

                    }


                }

            }








            chart.draw(data, options);
            //selections
            var selections = [];
            var tim = [];
            google.visualization.events.addListener(chart, 'select', function (e) {
                var sel = chart.getSelection();

                tim = sel;
                //   sel.forEach(function (val) {

                selections[0] = elemNos[sel[0].row]
                self.selectValues(0, selections, true);
                //  });
                chart.setSelection(tim);
                //  selections = selections.concat(sel);
            });
            chart.setSelection([]);
        }
    };

});

function newFunction() {
    return "date_minimum";
}
