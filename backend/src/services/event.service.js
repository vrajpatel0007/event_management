const Event = require("../models/event.modal")

const createEvent = async (body) => {
    return await Event.create(body)
}

const getAllevents = async () => {
    return await Event.find()
}

const geteventById = async (id) => {
    return await Event.findById(id)
}

const rsvpEvent =  async (id, body) => {
    const eve = await Event.findById(id)
    console.log("🚀 ~ rsvpEvent ~ eve:", eve)
    eve.attendees.push(body);
    await eve.save();
}


const updateevent = async (id, body) => {
    return await Event.findByIdAndUpdate(id, { $set: body }, { new: true })
}

const deleteevent = async (id) => {
    return await Event.findByIdAndDelete(id)
}

module.exports = {
    createEvent,
    getAllevents,
    geteventById,
    rsvpEvent,
    updateevent,
    deleteevent
}