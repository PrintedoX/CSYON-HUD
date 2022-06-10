var rgbStart = [139,195,74]
var rgbEnd = [183,28,28]

$(function(){
	window.addEventListener('message', function(event) {
		if (event.data.action == "setValue")
		{
			if (event.data.key == "job"){
				setJobIcon(event.data.icon)
			}
			setValue(event.data.key, event.data.value)

		}
		else if (event.data.action == "updateStatus")
		{
			updateStatus(event.data.status);
		}
		else if (event.data.action == "setTalking"){

			setTalking(event.data.value)
		}
		else if (event.data.action == "setProximity")
		{
			setProximity(event.data.value)
		}
		else if (event.data.action == "toggle")
		{
			if (event.data.show){
				$('#ui').show();
			} else{
				$('#ui').hide();
			}
		} 
		else if (event.data.action == "toggleCar")
		{
			if (event.data.show){
				//$('.carStats').show();
			} else{
				//$('.carStats').hide();
			}
		}
		else if (event.data.action == "updateCarStatus")
		{
			updateCarStatus(event.data.status)
			/*}else if (event.data.action == "updateWeight"){
			updateWeight(event.data.weight)*/
		}
	});

});

function updateWeight(weight){


	var bgcolor = colourGradient(weight/100, rgbEnd, rgbStart)
	$('#weight .bg').css('height', weight+'%')
	$('#weight .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function updateCarStatus(status){
	var gas = status[0]
	$('#gas .bg').css('height', gas.percent+'%')
	var bgcolor = colourGradient(gas.percent/100, rgbStart, rgbEnd)
	//var bgcolor = colourGradient(0.1, rgbStart, rgbEnd)
	//$('#gas .bg').css('height', '10%')
	$('#gas .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function setValue(key, value){
	$('#'+key+' span').html(value)

}
function setJobIcon(value){
	$('#job img').attr('src', 'img/jobs/'+value+'.png')
}

function silentErrorHandler() {return true;}
window.onerror=silentErrorHandler;

$(document).ready(function() {
    window.addEventListener('message', function(event) {
        var data = event.data;
        if (event.data.action == "updateStatus") {
            updateStatus(event.data.st);
        }
    })
})

function updateStatus(status){
	var hunger = status[0]  // Falls Nötig var hunger = status[1]
	var thirst = status[1]  // Falls Nötig var hunger = status[2]
	var drunk = status[2]   // Falls Nötig var hunger = status[3]
    $('#hunger').css('width', hunger.percent+'%')
    $('#thirst').css('width', thirst.percent+'%')
    $('#alk').css('width', drunk.percent+'%')
}

function setValueProg(key, value, color)
{
	if (color == '')
	{
		$('#'+key+' div').css('width', value+'%');
	}
	else
	{
		$('#'+key+' div').css('width', value+'%');
		$('#'+key+' div').css('background-color', color);
	}
		

}

function setProximity(value)
{
	var color;
	var parcent;
	if (value == "shout")
	{
		color = "#FFEB3B";
		parcent = "25";
	}
	else if (value == "whisper")
	{
		color = "#039BE5"
		parcent = "50";
	}
	else if (value == "normal")
	{
		color = "#e53935"
		parcent = "100";
	}
	//if you dont want color then leave empty
	setValueProg('voiceprogress', parcent, color);
}	

function setTalking(value)
{
	if (value)
	{
		//#64B5F6
		$('#voice').css('color', 'rgba(3, 169, 244, 1)')
	}
	else
	{
		//#81C784
		$('#voice').css('color', '#ffff')
	}
}

//API Shit
function colourGradient(p, rgb_beginning, rgb_end)
{
    var w = p * 2 - 1;

    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;

    var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
        parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
            parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
    return rgb;
};