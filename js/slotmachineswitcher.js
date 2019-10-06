$(document).ready(function(){
	AnimateTryMe();
	$('#spinButton').click(function() { MoveTryMeForward("spin"); });
	$(".btnChangeBackground").click(function(){ RotateBackground(); MoveTryMeForward("black_bar"); return false; });
	$(".btnChangeReels").click(function(){ RotateReels(); MoveTryMeForward("black_bar"); return false; });
	$(".btnChangeMachine").click(function(){ RotateMachine(); MoveTryMeForward("black_bar"); return false; });
	$(".examples a").click(function() { ShowExample($(this)); return false; });
});

var TryMePosition = "spin";
function AnimateTryMe() {
	if (TryMePosition == "gone") { return; }

	// Try Me Arrow
	var $tryMe = $("#tryMe");
	$tryMe.removeAttr('style'); // allow the arrow to reset to natural CSS position
	$tryMe.stop();

	var tryMeLeft = $tryMe.position().left;
	var animate = function() {
		$tryMe.animate({ left: tryMeLeft + 25 }, 500, 'easeOutQuad', function() {
			$tryMe.animate({ left: tryMeLeft }, 500, 'easeInQuad', function() {
				AnimateTryMe();
			});
		});
	}
	animate();
}

function MoveTryMeForward(cur) {
	if (TryMePosition != cur) { return; }

	if (TryMePosition == "spin") {
		TryMePosition = "black_bar";
		$(".black_bar")[0].appendChild($("#tryMe")[0]);
		AnimateTryMe();
	} else if (TryMePosition == "black_bar") {
		HideTryMe();
	}
}

function HideTryMe() {
	TryMePosition = "gone";
	$("#tryMe").hide();
}

function RotateBackground() {
	var numBackgrounds = $(".changeable_background").length;
	var nextBackground = (curBackground() % numBackgrounds) + 1;
	ShowBackground(nextBackground);
}

function curBackground() {
	return $(".changeable_background:visible").data("id");
}

function ShowBackground(num) {
	var $curBackground = $(".changeable_background:visible");
	var $nextBackground = $("#changeable_background_" + num);
	var $BGContainer = $("#slot_machines_backgrounds");

	var width = $curBackground.width();
	$curBackground.css("width", width);
	$nextBackground.css("width", width);
	$BGContainer.css("width", width);
	$nextBackground.css("left", width);
	$nextBackground.show();
	$BGContainer.animate({ left: -width }, 500, function(){
		$curBackground.hide();
		$curBackground.css("width", "100%");
		$nextBackground.css("width", "100%").css("left", 0);
		$BGContainer.css("width", "100%").css("left", 0);
	});
}

var numReels = 3;
function RotateReels() {
	var nextReels = (curReels() % numReels) + 1;
	ShowReel(nextReels);
}

function curReels() {
	return $("#slotsSelectorWrapper").data("reel");
}

function ShowReel(num) {
	for (var i = 1; i <= numReels; i++) {
		$("#slotsSelectorWrapper").removeClass("reelSet" + i);
	}
	$("#slotsSelectorWrapper").addClass("reelSet" + num)
							  .data("reel", num);
}


var numMachines = $(".prizes_list_slot_machine").length;
function RotateMachine() {
	var nextMachine = (curMachine() % numMachines) + 1;
	ShowMachine(nextMachine);
}

function curMachine() {
	return $("#slotsSelectorWrapper").data("machine");
}

function ShowMachine(num) {
	var $wrapper = $("#slotsSelectorWrapper");
	var width = $wrapper.width();

	$wrapper.animate({ left: +width }, 250, function(){

		// Show the new machine
		for (var i = 1; i <= numMachines; i++) { $wrapper.removeClass("slotMachine" + i); }
		$wrapper.addClass("slotMachine" + num).data("machine", num);
		$(".prizes_list_slot_machine").hide();
		$("#prizes_list_slotMachine" + num).show();
		window["machineName"] = "slotmachine" + num;

		$wrapper.css("left", -width);
		$wrapper.animate({ left: 0 }, 250, function(){
			$wrapper.css("left", "0");
			AnimateTryMe();
		});
	});
}

function SetCombo(bg, reel, machine) {
	if (bg != curBackground()) { ShowBackground(bg); }
	if (reel != curReels()) { ShowReel(reel); }
	if (machine != curMachine()) { ShowMachine(machine); }
}

function ShowExample($button) {
	switch ($button.data("example")) {
		case 1: SetCombo(1, 1, 1); break;
		case 2: SetCombo(2, 2, 2); break;
		case 3: SetCombo(3, 3, 4); break;
	}

	$('html, body').stop().animate({
		scrollTop: $("#slot_machines_container").offset().top
	}, 500,'easeInOutExpo');
}