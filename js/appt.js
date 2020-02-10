mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

var monthInst,
    dayInst,
    popupInst,
    dateInst,
    preventSet,
    allDaySwitch = document.getElementById('allDay'),
    eventTextInput = document.getElementById('eventText'),
    eventDescInput = document.getElementById('eventDesc'),
    now = new Date(),
    btn = '<button class="mbsc-btn mbsc-btn-outline mbsc-btn-danger md-delete-btn mbsc-ios">Delete</button>',
    myData = [{
        start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
        end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
        text: 'Lunch @ Butcher\'s' + btn,
        color: '#26c57d'
    }, {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
        text: 'General orientation' + btn,
        color: '#fd966a'
    }, {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
        text: 'Dexter BD' + btn,
        color: '#37bbe4'
    }, {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
        text: 'Stakeholder mtg.' + btn,
        color: '#d00f0f'
    }];

function navigate(inst, val) {
    if (inst) {
        inst.navigate(val);
    }
}

dateInst = mobiscroll.range('#eventDate', {
    controls: ['date', 'time'],
    dateWheels: '|D M d|',
    endInput: '#endInput',
    tabs: false,
    responsive: {
        large: {
            touchUi: false
        }
    },
    cssClass: 'md-add-event-range'
});

dayInst = mobiscroll.eventcalendar('#demo-add-event-day', {
    display: 'inline',
    view: {
        eventList: { type: 'day' }
    },
    data: myData,
    onPageChange: function (event, inst) {
        var day = event.firstDay;
        preventSet = true;
        navigate(monthInst, day);
        dateInst.setVal([day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)], true);
    },
    onEventSelect: function (event, inst) {
        if (event.domEvent.target.classList.contains('md-delete-btn')) {
            mobiscroll.confirm({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this item?',
                okText: 'Delete',
                callback: function (res) {
                    if (res) {
                        inst.removeEvent([event.event._id]);
                        monthInst.removeEvent([event.event._id]);
                        mobiscroll.toast({
                            message: 'Deleted'
                        });
                    }
                }
            });
        }
    }
});

monthInst = mobiscroll.eventcalendar('#demo-add-event-month', {
    display: 'inline',
    view: {
        calendar: { type: 'month' }
    },
    data: myData,
    onSetDate: function (event, inst) {
        if (!preventSet) {
            var day = event.date;
            navigate(dayInst, day);
            dateInst.setVal([day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)], true);
        }
        preventSet = false;
    }
});

document
    .getElementById('allDay')
    .addEventListener('change', function () {
        var allDay = this.checked;

        dateInst.option({
            controls: allDay ? ['date'] : ['date', 'time'],
            dateWheels: (allDay ? 'MM dd yy' : '|D M d|')
        });
    });

popupInst = mobiscroll.popup('#demo-add-event-popup', {
    display: 'center',
    cssClass: 'mbsc-no-padding',
    buttons: [{
            text: 'Add event',
            handler: 'set'
        },
        'cancel'
    ],
    headerText: 'Add new event',
    onSet: function (event, inst) {
        var eventDates = dateInst.getVal(),
            events = {
                start: eventDates[0],
                end: eventDates[1],
                text: (eventTextInput.value || 'New Event') + btn,
                title: eventTextInput.value || 'New Event',
                description: eventDescInput.value,
                allDay: allDaySwitch.checked,
                free: document.querySelector('input[name="free"]:checked').value == 'true'
            };
        monthInst.addEvent(events);
        dayInst.addEvent(events);
        eventTextInput.value = '';
        eventDescInput.value = '';
        // Navigate the calendar to the new event's start date
        monthInst.navigate(eventDates[0], true);
    }
});

document
    .getElementById('showAddEventPopup')
    .addEventListener('click', function () {
        popupInst.show();
    }, false);
