const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModels')
//@desc get all Contacts
//@route GET /api/contacts
//access Private
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contact)
})

//@desc create new Contacts
//@route POST /api/contacts
//access Private
const createContact = asyncHandler(async (req, res) => {
    console.log('Body', req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are mandatory!!')
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(201).json(contact)
})

//@desc get Contacts
//@route GET /api/contacts/:id
//access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc update Contacts
//@route PUT /api/contacts/:id
//access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

//@desc delete Contacts
//@route DELETE /api/contacts/:id
//access Private
const deleteContact = asyncHandler(async (req, res) => {
    let contact = await Contact.findById(req.params.id); // Fetch the contact
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }


    // Delete the contact
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
});


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}