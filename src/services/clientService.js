"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.addClient = exports.getClientById = exports.getClients = void 0;
const clients = [];
const getClients = () => {
    return clients;
};
exports.getClients = getClients;
const getClientById = (clientId) => {
    return clients.find((client) => client.id === clientId);
};
exports.getClientById = getClientById;
const addClient = (newClient) => {
    clients.push(newClient);
};
exports.addClient = addClient;
const updateClient = (clientId, updatedClient) => {
    const client = clients.find((client) => client.id === clientId);
    if (client != null) {
        Object.assign(client, updatedClient);
    }
};
exports.updateClient = updateClient;
const deleteClient = (clientId) => {
    const client = clients.find((client) => client.id === clientId);
    if (client != null) {
        const index = clients.indexOf(client);
        clients.splice(index, 1);
    }
};
exports.deleteClient = deleteClient;
