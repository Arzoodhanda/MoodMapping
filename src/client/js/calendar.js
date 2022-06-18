var today = new Date();

var events = [
    {
        // id: "imwyx6S",
        // name: "Event #3",
        // description: "Lorem ipsum dolor sit amet.",
        // date: today.getMonth() + 1 + "/18/" + today.getFullYear(),
        // type: "event"
    },
];

var active_events = [];

var week_date = [];

var curAdd, curRmv;

function getRandom(a) {
    return Math.floor(Math.random() * a);
}

function getWeeksInMonth(a, b) {
    var c = [],
        d = new Date(b, a, 1),
        e = new Date(b, a + 1, 0),
        f = e.getDate();
    var g = 1;
    var h = 7 - d.getDay();
    while (g <= f) {
        c.push({
            start: g,
            end: h,
        });
        g = h + 1;
        h += 7;
        if (h > f) h = f;
    }
    return c;
}

week_date = getWeeksInMonth(today.getMonth(), today.getFullYear())[2];

$(document).ready(function () {
    $("#demoEvoCalendar").evoCalendar({
        format: "MM dd, yyyy",
        titleFormat: "MM",
        calendarEvents: [],
    });

    const AddEmojis = (InsideEmoji) => {
        let selectedDate = [...document.getElementsByClassName("calendar-active")];
        if (selectedDate.length > 0) {
            selectedDate.map((item) => {
                if (item.childElementCount > 0) {
                    document.querySelector(".calendar-active .inside-emoji").src =
                        InsideEmoji.src;
                } else {
                    item.appendChild(InsideEmoji);
                }
            });
        } else {
            // document.querySelector(".today").appendChild(InsideEmoji);
            let Today = document.querySelector(".today");
            if (Today.childElementCount > 0) {
                document.querySelector(".today .inside-emoji").src = InsideEmoji.src;
            } else {
                Today.appendChild(InsideEmoji);
            }
        }
    };

    // Adding Emojis to Date OverAll...
    const Images = [...document.getElementsByClassName("image")];
    Images.map((img) => {
        img.addEventListener("click", () => {
            let InsideEmoji = document.createElement("img");
            InsideEmoji.setAttribute("class", "inside-emoji");
            InsideEmoji.setAttribute("src", img.getAttribute("src"));
            AddEmojis(InsideEmoji);
        });
    });
});

const showText = (e) => {
    document.getElementById(e).style.display = "block";
};

const hideText = (e) => {
    document.getElementById(e).style.display = "none";
};
