window.onload=function() {
  var ocontrol_span=document.getElementById('control_span');
  var ocontrol_ul=document.getElementById('control_ul');
  var onoff=true;
  ocontrol_span.onclick=function() {
  	if(onoff) {
         ocontrol_ul.style.display="block";
         onoff=false;
  	}
  	else {
         ocontrol_ul.style.display="none";
         onoff=true;
  	} 
  };
};