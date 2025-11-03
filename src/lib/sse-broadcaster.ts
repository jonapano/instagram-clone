import { Notif } from "./notifications/broadcaster";

type Client = {
  id: number;
  res: WritableStreamDefaultWriter;
};

const clients: Client[] = [];

export function addClient(client: Client) {
  clients.push(client);
}

export function removeClient(id: number) {
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) clients.splice(index, 1);
}

export function broadcast(data: Notif) {
  const encoder = new TextEncoder();
  const payload = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
  clients.forEach(client => client.res.write(payload));
}
