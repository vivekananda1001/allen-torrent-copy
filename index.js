'use strict'
import * as fs from 'fs';
import bencode from 'bencode';
import * as dgram from 'dgram';
import { Buffer as Buffer } from 'buffer';
import { URL } from 'url'

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));
// console.log(torrent.announce.toString('utf-8'))
// console.log('Announce: ',announce);

const announce = Buffer.from(torrent.announce).toString('utf-8');
const url = new URL(announce);

// console.log(url);

const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?','utf-8');

socket.send(myMsg,0,myMsg.length,url.port,url.host,()=>{
    console.log(`Message sent succesfully on ${url}`)
});

// myMsg: Data to send.
// 0: Offset in the buffer to start sending from.
// myMsg.length: Number of bytes to send.
// url.port: Destination port (extracted from the URL).
// url.host: Destination host (extracted from the URL).
// ()=>{}: Callback executed when the message is sent.

socket.on('message',msg=>{
    console.log('message is ',msg);
})
