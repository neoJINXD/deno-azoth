export interface MessagePayload {
    t: string, // -> the event type 
    s: number, //TODO -> ? 
    op: number, // -> opcode for the discord gateway response
    d: Data, // -> data of the response
};

interface Data {
    timestamp: string, // -> timestamp of the message read
    mentions: Object[], // -> if has elements, content has a user id
    member: Member,
    id: string, // -> unique id assigned to the message
    content: string, // -> the actual message that was sent
    channel_id: string, // -> unique id of the text channel
    author: User,
    guild_id: string, // -> unique id for the server
}

interface Member {
    role: string[], // -> ids of the roles given to the user in the guild
    nick: string, // -> nickanme given to the user in the guild
}

interface User {
    username: string, // -> username that user has
    id: string, // -> used for mentions
    avatar: string, // -> id for the avater of the user
}