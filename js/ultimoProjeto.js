function addEventToCalendar(date, title) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1); // Duração de 1 hora

    const event = {
        title: title,
        startDate: startDate,
        endDate: endDate,
    };

    if (window.navigator.msSaveOrOpenBlob) {
        // Para Internet Explorer
        const blob = new Blob([event], { type: 'text/calendar;charset=utf-8;' });
        window.navigator.msSaveOrOpenBlob(blob, `${title}.ics`);
    } else {
        const calendarEvent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDateToICS(startDate)}
DTEND:${formatDateToICS(endDate)}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function formatDateToICS(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}