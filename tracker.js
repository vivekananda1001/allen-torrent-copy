'use strict'

import * as dgram from 'dgram'
import { Buffer as Buffer } from 'buffer'
import { URL } from 'url'

function getPeers(torrent,callback){
    const socket = dgram.createSocket(udp4);
    const url = new URL(Buffer.from(torrent.announce).toString('utf-8'));

    // 1. send connection request
    udpSend(socket,buildConnReq(),url);

    socket.on('message',res=>{
        const type = respType(res);
        if(type==='connect'){
            // 2. receive and parse connect response
            const connResp = parseConnResp(res);
            // 3. send announce request
            const announceReq = buildAnnounceReq(connResp.connectionId);
            udpsend(socket,announceReq,url);
        }
        else if(type==='announce'){
            // 4. parse announce response
            const announceResp = parseAnnounceResp(res);
            // 5. pass peers to callback
            callback(announceResp.peers);
        }
    });
};

function respType(res){

}

function parseConnResp(res){

}

function parseAnnounceResp(res){
    
}

function buildAnnounceReq(res){

}

function buildConnReq(res){

}
