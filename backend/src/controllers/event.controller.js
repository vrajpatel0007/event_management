const event_service = require("../services/event.service")
const fs = require("fs")
const path = require('path');

const createEvent = async (req, res) => {
    const reqbody = req.body;
    try {
        if (!reqbody.title || !reqbody.description || !reqbody.date || !reqbody.location || !reqbody.maxAttendees) {
            return res.status(400).json({ message: "fil tha all fild" })
        }
        if (!req.files || !req.files.image || req.files.image.length === 0) {
            return res.status(400).json({ message: "Image is required" });
        }
        const image = "/public/temp/" + req.files.image[0].filename;
        const body = {
            title: reqbody.title,
            description: reqbody.description,
            date: reqbody.date,
            location: reqbody.location,
            maxAttendees: reqbody.maxAttendees,
            createdBy: req.user.id,
            image: image
        };
        const newEvent = await event_service.createEvent(body);

        res.status(201).json({ message: "create Event successfully", data: newEvent });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err });
        console.log("🚀 ~ createEvent ~ err:", err)
    }
}

const getallevents = async (req, res) => {
    try {
        const events = await event_service.getAllevents();
        res.status(200).json({ message: "all  events", data: events });

    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err });
    }
}

const rsvpEvent = async (req, res) => {
    try {
        const event = await event_service.geteventById(req.body.id);
        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: "User has already RSVPed" });
        }
        if (event.attendees.length >= event.maxAttendees) {
            return res.status(400).json({ message: "Event is full" })
        }
        const attendee = await event_service.rsvpEvent(req.body.id, req.user._id);

        return res.status(200).json({ message: "user successfully added", attendee: attendee });
    } catch (err) {
        console.log("🚀 ~ rsvpEvent ~ err:", err)
        res.status(500).json({ message: 'Error fetching events', error: err });
    }
};


const updateevent = async (req, res) => {
    try {
        const eventid = req.body.id;
        const event = await event_service.geteventById(eventid)
        if (!event) {
            return res.status(400).json({ message: "event not  found" });

        }
        console.log("🚀 ~ updateevent ~ eventid:", eventid)
        const body = {};
        if (req.body) {
            body.title = req.body.title,
                body.description = req.body.description,
                body.date = req.body.date,
                body.location = req.body.location,
                body.maxAttendees = req.body.maxAttendees
        }
        if (req.files && req.files.image) {
            const relativePath = event.image;
            const fullPath = path.join(__dirname, '..', relativePath);
            console.log("🚀 ~ updateevent ~ fullPath:", fullPath)

            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.log(`An error occurred while deleting the image: ${err.message}`);
                } else {
                    console.log("Deleted old image");
                }
            });
            body.image = "/public/temp/" + req.files.image[0].filename;
        }
        console.log("🚀 ~ updateevent ~ body.image:", body.image)
        const updatedevent = await event_service.updateevent(eventid, body);

        res.status(200).json({ message: "update event successfully", data: updatedevent });
    } catch (err) {
        console.log("🚀 ~ updateevent ~ err:", err)
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteevent = async (req, res) => {
    try {
        const eventid = req.body.id;
        const event = await event_service.geteventById(eventid);
        console.log("🚀 ~ deleteevent ~ event:", event)
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        const deletedevent = await event_service.deleteevent(eventid);
        res.status(200).json({ message: "delete event successfully" });
    } catch (err) {
        console.log("🚀 ~ deleteevent ~ err:", err)
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createEvent,
    getallevents,
    rsvpEvent,
    updateevent,
    deleteevent
}