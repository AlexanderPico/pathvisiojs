pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  'use strict';
  function render(args) {
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'node entity-node ' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.dataNodeType) + ' ';
          cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('label-' + decodeURIComponent(d.text.line[0])) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
            cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('xref-' + decodeURIComponent(d.DatasourceReference.ID + ',' + d.DatasourceReference.Database)) + ' ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += 'cellular-component ' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.CellularComponent) + ' ';
        }
        return cssClass;
      });
      if (args.data.nodeType === 'DataNode') { //all datanodes should be clickable
        var notDragged = true;
        nodeContainer
        .on("mousedown", function(d,i) {
          notDragged = true;
        })
        .on("mousemove", function(d,i) {
          notDragged = false;
        })
        .on("mouseup", function(d,i) {
          if (notDragged) {
            var dfId = null, dfDb = null;
            if (!!d.DatasourceReference){
              if (!!d.DatasourceReference.ID && !!d.DatasourceReference.Database){
                dfId = d.DatasourceReference.ID;
                dfDb = d.DatasourceReference.Database;
              }
            }

            pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, dfId, dfDb, d.text.line.join(' '), d.dataNodeType); //that's capital 'O' Organism from GPML vocab

          }
        });
      }
    });
  }

  return {
    render:render
  };
}();
