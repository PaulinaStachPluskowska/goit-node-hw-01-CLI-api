const fs = require('fs').promises;
const path = require('path');

const { nanoid } = require('nanoid');

require('colors');

const contactsPath = path.resolve('./db/contacts.json');

async function fetchContacts() { 
    try {
        const contacts = await fs.readFile(contactsPath);
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    }
    catch (err) { 
        console.log(err.message);
    }
}

async function listContacts() {
  // ...twój kod
    try {
        const contacts = await fetchContacts();
        console.table(contacts);
        return;
    }
    catch (error) { 
        console.log(err.message);
    }
}

async function getContactById(contactId) {
  // ...twój kod
    try {
        const contacts = await fetchContacts();
        const searchedContact = contacts.find((contact) => contact.id === contactId);
        if (!searchedContact) {
            console.log(`We couldn't find this contact`.red);
            return;
        }
        console.log(`Success. Your contact: ${searchedContact}`.green);
        return;
    }
    catch (error) { 
        console.log(err.message);
    }
}

async function removeContact(contactId) {
  // ...twój kod
    try { 
        const contacts = await fetchContacts();
        const filteredContact = contacts.filter((contact) => contact.id !== contactId);
        if (!filteredContact) { 
            return console.log(`We couldn't find this contact`.red);
        }
        fs.writeFile(contactsPath, JSON.stringify(filteredContact));
        console.log(`Contact ${filteredContact} successfully deleted`.yellow);
        return;
    }
    catch (error) {
        console.log(err.message);
    }
}

async function addContact(name, email, phone) {
  // ...twój kod
    try {
        const contacts = await fetchContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        };

        contacts.push(newContact);
        console.table(contacts);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(`Contact ${name} added sucssessfully.`.brightgreen);
        return;
    }
    catch (error) { 
        console.log(err.message);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };