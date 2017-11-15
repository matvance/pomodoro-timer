let timer = {
	"minutes": 0,
	"seconds": 0
};
let timerOn = false;
let isBreak = false;

$("button.start").click(function () {
	setTimer($("input.time").val(), 0);
	timerOn = true;
	$("div.breakTime").hide();
});

$("button.pause-resume").click(function () {
	if ($(this).text() == "Pause") {
		$(this).text("Resume");
		timerOn = false;
	} else {
		$(this).text("Pause");
		timerOn = true;
	}
});

$("button.reset").click(function () {
	setTimer(0, 0);
	timerOn = false;
	refreshTimer();
	$("input.time").val("");
	isBreak = false;
});

$("button.5min-break").click(function () {
	setTimer(5, 0);
	timerOn = true;
	isBreak = true;
	$("div.breakTime").hide();
});
$("button.10min-break").click(function () {
	setTimer(10, 0);
	timerOn = true;
	isBreak = true;
	$("div.breakTime").hide();
});
$("button.15min-break").click(function () {
	setTimer(15, 0);
	timerOn = true;
	isBreak = true;
	$("div.breakTime").hide();
});

function setTimer (minutes, seconds) {
	timer = {
		"minutes": parseInt(minutes),
		"seconds": parseInt(seconds)
	}
}

function timerTick () {
	if (timer.seconds == 0 && timer.minutes == 0) {
		timeUp();
	} else {
		if (timer.seconds > 0) {
			timer.seconds--;
		} else {
			timer.minutes--;
			timer.seconds = 59;
		}
	}
}

function timeUp () {
	timerOn = false;

	if (isBreak) {
		isBreak = false;
	} else {
		$("div.breakTime").show();
	}
}

function refreshTimer () {
	let minutes = timer.minutes;
	let seconds = timer.seconds;

	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	$("span.minutes").text(minutes);
	$("span.seconds").text(seconds);

	let title = "";
	if (minutes + seconds == 0) {
		title = "Time is up!";
	} else {
		title = minutes + ":" + seconds;
		title += isBreak ? " (break)" : "";
	}

	title += " - Pomodoro timer";
	document.title = title;
}

function update () {
	if (timerOn) {
		timerTick();
		refreshTimer();
	}
};

$(function() {
	refreshTimer();
	window.setInterval(update, 1000);
	$("div.breakTime").hide();
});
