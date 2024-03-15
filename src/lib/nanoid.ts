import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
const nanoid = customAlphabet(alphabet, 10);

export default nanoid;
