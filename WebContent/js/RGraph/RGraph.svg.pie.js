
RGraph=window.RGraph||{isRGraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{var RG=RGraph,ua=navigator.userAgent,ma=Math,win=window,doc=document;RG.SVG.Pie=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){var ret=RG.SVG.commonSetter({object:this,name:i,value:arguments[0][i]});name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RG.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;}
return this;};this.id=conf.id;this.uid=RG.SVG.createUID();this.container=document.getElementById(this.id);this.svg=RG.SVG.createSVG({container:this.container});this.isRGraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.data=conf.data;this.type='pie';this.angles=[];this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.nodes=[];this.shadowNodes=[];RG.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={centerx:null,centery:null,radius:null,gutterLeft:35,gutterRight:35,gutterTop:35,gutterBottom:35,colors:['#f66','#6f6','#66f','#ff6','#6ff','#ccc','pink','orange','cyan','maroon','olive','teal'],strokestyle:'rgba(0,0,0,0)',margin:3,textColor:'black',textFont:'sans-serif',textSize:12,textBold:false,textItalic:false,labels:[],labelsSticks:true,labelsSticksHlength:50,linewidth:1,tooltips:null,tooltipsOverride:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsEvent:'click',highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',highlightLinewidth:1,title:'',titleSize:16,titleX:null,titleY:null,titleHalign:'center',titleValign:null,titleColor:'black',titleFont:null,titleBold:false,titleItalic:false,titleSubtitle:'',titleSubtitleSize:10,titleSubtitleX:null,titleSubtitleY:null,titleSubtitleHalign:'center',titleSubtitleValign:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:false,titleSubtitleItalic:false,shadow:false,shadowOffsetx:2,shadowOffsety:2,shadowBlur:2,shadowOpacity:0.25,exploded:0,roundRobinMultiplier:1,donut:false,donutWidth:75,attribution:true,attributionX:null,attributionY:null,attributionHref:null,attributionHalign:'right',attributionValign:'bottom',attributionSize:7,attributionColor:'gray',attributionFont:'sans-serif',attributionItalic:false,attributionBold:false};if(RG.SVG.FX&&typeof RG.SVG.FX.decorate==='function'){RG.SVG.FX.decorate(this);}
var prop=this.properties;this.draw=function()
{RG.SVG.fireCustomEvent(this,'onbeforedraw');RG.SVG.createDefs(this);this.graphWidth=this.width-prop.gutterLeft-prop.gutterRight;this.graphHeight=this.height-prop.gutterTop-prop.gutterBottom;this.centerx=(this.graphWidth/2)+prop.gutterLeft;this.centery=(this.graphHeight/2)+prop.gutterTop;this.radius=ma.min(this.graphWidth,this.graphHeight)/2;this.centerx=typeof prop.centerx==='number'?prop.centerx:this.centerx;this.centery=typeof prop.centery==='number'?prop.centery:this.centery;this.radius=typeof prop.radius==='number'?prop.radius:this.radius;if(typeof prop.radius==='string'&&prop.radius.match(/^\+|-\d+$/))this.radius+=parseFloat(prop.radius);if(typeof prop.centerx==='string'&&prop.centerx.match(/^\+|-\d+$/))this.centerx+=parseFloat(prop.centerx);if(typeof prop.centery==='string'&&prop.centery.match(/^\+|-\d+$/))this.centery+=parseFloat(prop.centery);if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.max=RG.SVG.arrayMax(this.data);this.total=RG.SVG.arraySum(this.data);if(typeof prop.exploded==='number'&&prop.exploded>0){var val=prop.exploded;prop.exploded=[];for(var i=0;i<this.data.length;++i){prop.exploded[i]=val;}}
this.drawSegments({shadow:true});RG.SVG.drawTitle(this);if(prop.labelsSticks){this.drawLabelsSticks();}else{this.drawLabels();}
RG.SVG.attribution(this);var obj=this;document.body.addEventListener('mousedown',function(e)
{RG.SVG.removeHighlight(obj);},false);RG.SVG.fireCustomEvent(this,'ondraw');return this;};this.drawSegments=function(opt)
{var start=0,end=0,angle=0,sum=RG.SVG.arraySum(this.data),segment=0;for(var i=0,len=this.data.length;i<len;++i){var value=this.data[i]*prop.roundRobinMultiplier;start=angle;segment=((value/sum)*RG.SVG.TRIG.TWOPI);end=start+segment;var explosion=RG.SVG.TRIG.getRadiusEndPoint({angle:start+(segment/2),r:prop.exploded[i]});var explosionX=explosion[1],explosionY=explosion[0];this.angles[i]={start:start,end:end,angle:end-start,halfway:((end-start)/2)+start,cx:this.centerx+(parseFloat(explosionX)||0),cy:this.centery-(parseFloat(explosionY)||0),radius:this.radius};angle+=(end-start);}
if(opt.shadow){RG.SVG.setShadow({object:this,offsetx:prop.shadowOffsetx,offsety:prop.shadowOffsety,blur:prop.shadowBlur,opacity:prop.shadowOpacity,id:'dropShadow'});}
for(var i=0;i<this.angles.length;++i){var path=RG.SVG.TRIG.getArcPath({cx:this.angles[i].cx,cy:this.angles[i].cy,r:this.radius,start:this.angles[i].start,end:this.angles[i].end});if(prop.donut){var donutWidth=prop.donutWidth;var donut_path=RG.SVG.TRIG.getArcPath({cx:this.angles[i].cx,cy:this.angles[i].cy,r:this.radius-donutWidth,start:this.angles[i].end,end:this.angles[i].start,moveto:false,anticlockwise:true});var xy=RG.SVG.TRIG.getRadiusEndPoint({angle:this.angles[i].end-RG.SVG.TRIG.HALFPI,r:this.radius-donutWidth});path=path
+" L {1} {2} ".format(xy[0]+this.angles[i].cx,xy[1]+this.angles[i].cy)
+donut_path
+" Z";}else{path=path+" L {1} {2} ".format(this.angles[i].cx,this.angles[i].cy)+" Z"}
var arc=RG.SVG.create({svg:this.svg,type:'path',attr:{d:path,fill:prop.colors[i],stroke:prop.strokestyle,'stroke-width':prop.linewidth,'data-tooltip':(!RG.SVG.isNull(prop.tooltips)&&prop.tooltips.length)?prop.tooltips[i]:'','data-index':i,'data-value':value,'data-start-angle':this.angles[i].start,'data-end-angle':this.angles[i].end,'data-radius':this.radius,filter:(prop.shadow&&opt.shadow)?'url(#dropShadow)':''}});if(prop.shadow&&opt.shadow){this.shadowNodes[i]=arc;}else{this.nodes[i]=arc;}
if(prop.tooltips&&prop.tooltips[i]&&(!opt.shadow||!prop.shadow)){if(prop.tooltipsEvent!=='mousemove'){prop.tooltipsEvent='click';}
(function(index,obj)
{arc.addEventListener(prop.tooltipsEvent,function(e)
{obj.removeHighlight();RG.SVG.tooltip({object:obj,index:index,sequentialIndex:index,text:prop.tooltips[index],event:e});obj.highlight(e.target);var highlight=RG.SVG.REG.get('highlight');if(prop.tooltipsEvent==='mousemove'){highlight.style.cursor='pointer';}},false);if(prop.tooltipsEvent==='click'){arc.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}(i,this));}}
if(prop.shadow&&opt.shadow){this.redrawSegments();}};this.redrawSegments=function()
{this.drawSegments({shadow:false});};this.drawLabels=function()
{var angles=this.angles,prop=this.properties,labels=prop.labels;for(var i=0;i<angles.length;++i){var endpoint=RG.SVG.TRIG.getRadiusEndPoint({angle:angles[i].halfway-RG.SVG.TRIG.HALFPI,r:angles[i].radius+15});var x=endpoint[0]+angles[i].cx,y=endpoint[1]+angles[i].cy,valign,halign;if(angles[i].halfway>0&&angles[i].halfway<RG.SVG.TRIG.HALFPI){halign='left';valign='bottom';}else if(angles[i].halfway>RG.SVG.TRIG.HALFPI&&angles[i].halfway<RG.SVG.TRIG.PI){halign='left';valign='top';}else if(angles[i].halfway>RG.SVG.TRIG.PI&&angles[i].halfway<(RG.SVG.TRIG.HALFPI+RG.SVG.TRIG.PI)){halign='right';valign='top';}else if(angles[i].halfway>(RG.SVG.TRIG.HALFPI+RG.SVG.TRIG.PI)&&angles[i].halfway<RG.SVG.TRIG.TWOPI){halign='right';valign='top';}
RG.SVG.text({object:this,text:typeof labels[i]==='string'?labels[i]:'',font:prop.textFont,size:prop.textSize,x:x,y:y,valign:valign,halign:halign,bold:prop.textBold,italic:prop.textItalic,color:prop.textColor});}};this.drawLabelsSticks=function()
{var labels_right=[],labels_left=[],labels_coords=[];for(var i=0;i<this.angles.length;++i){var angle=(this.angles[i].start+((this.angles[i].end-this.angles[i].start)/2))-RGraph.SVG.TRIG.HALFPI,endpoint_inner=RG.SVG.TRIG.getRadiusEndPoint({angle:angle,r:this.radius+5}),endpoint_outer=RG.SVG.TRIG.getRadiusEndPoint({angle:angle,r:this.radius+20}),explosion=[(typeof prop.exploded==='number'?prop.exploded:prop.exploded[i]),ma.cos(angle)*(typeof prop.exploded==='number'?prop.exploded:prop.exploded[i]),ma.sin(angle)*(typeof prop.exploded==='number'?prop.exploded:prop.exploded[i])];labels_coords[i]=[];var labels={};if(angle>RG.SVG.TRIG.HALFPI){var index=labels_left.length;labels_left[index]=[];labels_left[index].text=prop.labels[i];labels_left[index].halign='right';labels=labels_left;labels_coords[i].halign='right';}else{var index=labels_right.length;labels_right[index]=[];labels_right[index].text=prop.labels[i];labels_right[index].halign='right';labels=labels_right;labels_coords[i].halign='left';}
endpoint_inner[0]+=(explosion[1]||0);endpoint_inner[1]+=(explosion[2]||0);endpoint_outer[0]+=(explosion[1]||0);endpoint_outer[1]+=(explosion[2]||0);var x,y;if(labels[index].text){var stick=RG.SVG.create({svg:this.svg,type:'path',attr:{d:'M {1} {2} L {3} {4}'.format(this.centerx+endpoint_inner[0],this.centery+endpoint_inner[1],this.centerx+endpoint_outer[0],this.centery+endpoint_outer[1]),stroke:'#999',fill:'rgba(0,0,0,0)'}});}
if(stick){labels[index].stick=stick;}
x=(this.centerx+endpoint_outer[0]+(angle>1.57?-50:50));y=(this.centery+endpoint_outer[1]);labels_coords[i].x=x;labels_coords[i].y=y;labels_coords[i].text=prop.labels[i];}
var vspace_right=(this.height-prop.gutterTop-prop.gutterBottom)/labels_right.length;var vspace_left=(this.height-prop.gutterTop-prop.gutterBottom)/labels_left.length;x=y=0;for(var i=0;i<labels_right.length;++i){if(labels_right[i]&&labels_right[i].text){x=this.centerx+this.radius+100;y=prop.gutterTop+(vspace_right*i)+(vspace_right/2);RGraph.SVG.text({object:this,text:typeof labels_right[i].text==='string'?labels_right[i].text:'',font:prop.textFont,size:prop.textSize,x:x,y:y,valign:'center',halign:labels_right[i].text,bold:prop.textBold,italic:prop.textItalic,color:prop.textColor});labels_right[i].stick.setAttribute('d',labels_right[i].stick.getAttribute('d')+' H {3} L {1} {2} '.format(x-5,y,this.centerx+this.radius+prop.labelsSticksHlength));}}
for(var i=0;i<labels_left.length;++i){if(labels_left[i]&&labels_left[i].text){x=this.centerx-this.radius-100;y=this.height-(prop.gutterTop+(vspace_left*i)+(vspace_left/2));RGraph.SVG.text({object:this,text:typeof labels_left[i].text==='string'?labels_left[i].text:'',font:prop.textFont,size:prop.textSize,x:x-7,y:y,valign:'center',halign:labels_left[i].halign,bold:prop.textBold,italic:prop.textItalic,color:prop.textColor});labels_left[i].stick.setAttribute('d',labels_left[i].stick.getAttribute('d')+' H {3} L {1} {2} '.format(x-5,y,this.centerx-this.radius-prop.labelsSticksHlength));}}};this.highlight=function(segment)
{var highlight=RG.SVG.create({svg:this.svg,type:'path',attr:{d:segment.getAttribute('d'),fill:prop.highlightFill,stroke:prop.highlightStroke,'stroke-width':prop.highlightLinewidth}});if(prop.tooltipsEvent==='mousemove'){highlight.addEventListener('mouseout',function(e)
{highlight.parentNode.removeChild(highlight);RG.SVG.hideTooltip();RG.SVG.REG.set('highlight',null);},false);}
RG.SVG.REG.set('highlight',highlight);};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RG.SVG.arrayClone(prop.colors),highlightFill:RG.SVG.arrayClone(prop.highlightFill)}}
var colors=prop.colors;if(colors){for(var i=0;i<colors.length;++i){colors[i]=RG.SVG.parseColorRadial({object:this,color:colors[i]});}}
prop.highlightFill=RG.SVG.parseColorRadial({object:this,color:prop.highlightFill});};this.roundRobin=function()
{var obj=this,opt=arguments[0]||{},data=RG.SVG.arrayClone(this.data),prop=this.properties,frame=1,frames=opt.frames||30,callback=typeof opt.callback==='function'?opt.callback:function(){},dataSum=RG.SVG.arraySum(this.data),textColor=prop.textColor;this.properties.textColor='rgba(0,0,0,0)';obj.draw();angles=RG.SVG.arrayClone(obj.angles);function iterator()
{prop.roundRobinMultiplier=1/frames*frame++;for(var i=0;i<obj.angles.length;++i){var value=obj.data[i];obj.angles[i].start=angles[i].start*prop.roundRobinMultiplier;obj.angles[i].end=angles[i].end*prop.roundRobinMultiplier;var segment=((obj.angles[i].end-obj.angles[i].start)/2);var explodedX=ma.cos(obj.angles[i].start+segment-RG.SVG.TRIG.HALFPI)*(prop.exploded[i]||0);var explodedY=ma.sin(obj.angles[i].start+segment-RG.SVG.TRIG.HALFPI)*(prop.exploded[i]||0);var path=RG.SVG.TRIG.getArcPath({cx:obj.centerx+explodedX,cy:obj.centery+explodedY,r:obj.radius,start:obj.angles[i].start,end:obj.angles[i].end});if(prop.donut){var donutWidth=prop.donutWidth;var donut_path=RG.SVG.TRIG.getArcPath({cx:obj.angles[i].cx,cy:obj.angles[i].cy,r:obj.radius-donutWidth,start:obj.angles[i].end,end:obj.angles[i].start,moveto:false,anticlockwise:true});var xy=RG.SVG.TRIG.getRadiusEndPoint({angle:obj.angles[i].end-RG.SVG.TRIG.HALFPI,r:obj.radius-donutWidth});path=path
+" L {1} {2} ".format(xy[0]+obj.angles[i].cx,xy[1]+obj.angles[i].cy)
+donut_path
+" Z";}else{path=path+" L {1} {2} ".format(obj.angles[i].cx,obj.angles[i].cy)+" Z"}
path=path+" L {1} {2} Z".format(obj.centerx+explodedX,obj.centery+explodedY);if(obj.shadowNodes&&obj.shadowNodes[i]){obj.shadowNodes[i].setAttribute('d',path);}
obj.nodes[i].setAttribute('d',path);}
if(frame<=frames){RG.SVG.FX.update(iterator);}else{prop.textColor=textColor;RG.SVG.redraw(obj.svg);callback(obj);}}
iterator();return this;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RG.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};this.removeHighlight=function()
{var highlight=RG.SVG.REG.get('highlight');if(highlight&&highlight.parentNode){highlight.parentNode.removeChild(highlight);}
RG.SVG.REG.set('highlight',null);};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}};return this;})(window,document);